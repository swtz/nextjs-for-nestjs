'use server';

import { v4 as uuidV4 } from 'uuid';
import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { PostCreateSchema } from '@/lib/post/validations';
import { PostModel } from '@/models/post/post-model';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { makeSlugFromText } from '@/utils/make-slug-from-text';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { postRepository } from '@/repositories/post';
import { verifyLoginSession } from '@/lib/login/manage-login';

type CreateActionState = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};

export async function createPostAction(
  prevState: CreateActionState,
  formData: FormData,
): Promise<CreateActionState> {
  const isAuthenticated = await verifyLoginSession();

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const formDataToObject = Object.fromEntries(formData.entries());
  const zodParsedObject = PostCreateSchema.safeParse(formDataToObject);

  if (!isAuthenticated) {
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
  const newPost: PostModel = {
    ...validPostData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: uuidV4(),
    slug: makeSlugFromText(validPostData.title),
  };

  try {
    await postRepository.create(newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: newPost,
        errors: [e.message],
      };
    }

    return {
      formState: newPost,
      errors: ['Erro desconhecido'],
    };
  }

  revalidateTag('posts');
  redirect(`/admin/post/${newPost.id}?created=1`);
}
