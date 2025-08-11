'use server';

import { revalidateTag } from 'next/cache';

import {
  PublicPostForApiDto,
  PublicPostForApiSchema,
  UpdatePostForApiSchema,
} from '@/lib/post/schemas';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { getLoginSessionForApi } from '@/lib/login/manage-login';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { makeRandomString } from '@/utils/make-random-string';

type UpdatePostActionState = {
  formState: PublicPostForApiDto;
  errors: string[];
  success?: string;
};

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  const isAuthenticated = await getLoginSessionForApi();

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
  const zodParsedObject = UpdatePostForApiSchema.safeParse(formDataToObject);

  if (!isAuthenticated) {
    formDataToObject.id = id;

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

  const newPost = zodParsedObject.data;
  const updatePostResponse = await authenticatedApiRequest<PublicPostForApiDto>(
    `/post/me/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newPost),
    },
  );

  if (!updatePostResponse.success) {
    return {
      formState: PublicPostForApiSchema.parse(formDataToObject),
      errors: updatePostResponse.errors,
    };
  }

  const updatedPost = updatePostResponse.data;

  revalidateTag('posts');
  revalidateTag(`post-${updatedPost.slug}`);

  return {
    formState: PublicPostForApiSchema.parse(updatedPost),
    errors: [],
    success: makeRandomString(),
  };
}
