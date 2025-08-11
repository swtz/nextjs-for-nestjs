'use server';

import {
  CreatePostForApiSchema,
  PublicPostForApiDto,
  PublicPostForApiSchema,
} from '@/lib/post/schemas';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { getLoginSessionForApi } from '@/lib/login/manage-login';

type CreatePostActionState = {
  formState: PublicPostForApiDto;
  errors: string[];
  success?: string;
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  const isAuthenticated = await getLoginSessionForApi();

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const formDataToObject = Object.fromEntries(formData.entries());
  const zodParsedObject = CreatePostForApiSchema.safeParse(formDataToObject);

  if (!isAuthenticated) {
    return {
      formState: PublicPostForApiSchema.parse(formDataToObject),
      errors: ['Faça login em outra aba antes de salvar.'],
    };
  }

  if (!zodParsedObject.success) {
    const errors = getZodErrorMessages(zodParsedObject.error.format());
    return {
      errors,
      formState: PublicPostForApiSchema.parse(formDataToObject),
    };
  }

  const validPostData = zodParsedObject.data;

  // revalidateTag('posts');
  // redirect(`/admin/post/${newPost.id}?created=1`);
}
