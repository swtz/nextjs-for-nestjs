'use server';

import { revalidateTag } from 'next/cache';
import { postRepository } from '@/repositories/post';
import {
  makePartialPublicPost,
  makePublicPostFromDb,
  PublicPost,
} from '@/dto/post/dto';
import { PostUpdateSchema } from '@/lib/post/validations';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { asyncDelay } from '@/utils/async-delay';
import { makeRandomString } from '@/utils/make-random-string';
import { verifyLoginSession } from '@/lib/login/manage-login';

type UpdateActionState = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};

export async function updatePostAction(
  prevState: UpdateActionState,
  formData: FormData,
): Promise<UpdateActionState> {
  const isAuthenticated = await verifyLoginSession();

  await asyncDelay(3000);

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const id = formData.get('ID')?.toString() || '';

  if (!id || typeof id !== 'string') {
    return {
      formState: prevState.formState,
      errors: ['ID inválido'],
    };
  }

  const formDataToObject = Object.fromEntries(formData.entries());
  const zodParsedObject = PostUpdateSchema.safeParse(formDataToObject);

  if (!isAuthenticated) {
    formDataToObject.id = id;

    return {
      formState: makePartialPublicPost(formDataToObject),
      errors: ['Faça login em outra aba antes de salvar.'],
    };
  }

  if (!zodParsedObject.success) {
    const errors = getZodErrorMessages(zodParsedObject.error.format());
    return {
      errors,
      formState: makePartialPublicPost(formDataToObject),
    };
  }

  const validPostData = zodParsedObject.data;
  const newPost = {
    ...validPostData,
  };

  let post;
  try {
    post = await postRepository.update(id, newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: makePartialPublicPost(formDataToObject),
        errors: [e.message],
      };
    }

    return {
      formState: makePartialPublicPost(formDataToObject),
      errors: ['Erro desconhecido'],
    };
  }

  revalidateTag('posts');
  revalidateTag(`post-${post.slug}`);

  return {
    formState: makePublicPostFromDb(post),
    errors: [],
    success: makeRandomString(),
  };
}
