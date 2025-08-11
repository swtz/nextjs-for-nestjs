'use server';

import { revalidateTag } from 'next/cache';
import { getLoginSessionForApi } from '@/lib/login/manage-login';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { PublicPostForApiDto } from '@/lib/post/schemas';

export async function deletePostAction(id: string) {
  const isAuthenticated = await getLoginSessionForApi();

  if (!isAuthenticated) {
    return {
      error: 'Faça login novamente.',
    };
  }

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados inválidos',
    };
  }

  const deletePostResponse = await authenticatedApiRequest<PublicPostForApiDto>(
    `/post/me/${id}`,
    {
      method: 'DELETE',
    },
  );

  if (!deletePostResponse.success) {
    return {
      error: 'Erro ao pagar o post',
    };
  }

  revalidateTag('posts');
  revalidateTag(`post-${deletePostResponse.data.slug}`);

  return {
    error: '',
  };
}
