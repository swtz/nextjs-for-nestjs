'use server';

import { redirect } from 'next/navigation';
import { deleteLoginSession } from '@/lib/login/manage-login';
import { getPublicUserFromApi } from '@/lib/user/api/get-user';
import { PublicUserDto } from '@/lib/user/schemas';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';

type DeleteUserActionState = {
  errors: string[];
  success: boolean;
};

export async function deleteUserAction(): Promise<DeleteUserActionState> {
  const user = await getPublicUserFromApi();

  if (!user) {
    await deleteLoginSession();

    return {
      errors: ['Você precisa fazer login novamente'],
      success: false,
    };
  }

  const deleteUserResponse = await authenticatedApiRequest<PublicUserDto>(
    '/user/me',
    {
      method: 'DELETE',
    },
  );

  if (!deleteUserResponse.success) {
    return {
      errors: deleteUserResponse.errors,
      success: false,
    };
  }

  await deleteLoginSession();
  redirect('/');
}
