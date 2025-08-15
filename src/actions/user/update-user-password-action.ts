'use server';

import { redirect } from 'next/navigation';
import { getPublicUserFromApi } from '@/lib/user/api/get-user';
import {
  PublicUserDto,
  UpdatePasswordDto,
  UpdatePasswordSchema,
} from '@/lib/user/schemas';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { deleteLoginSession } from '@/lib/login/manage-login';

type UpdateUserPasswordActionState = {
  errors: string[];
  success: false;
};

export async function updateUserPasswordAction(
  prevState: UpdatePasswordDto,
  formData: FormData,
): Promise<UpdateUserPasswordActionState> {
  const user = await getPublicUserFromApi();

  if (!user) {
    await deleteLoginSession();

    return {
      errors: ['Você precisa fazer login novamente'],
      success: false,
    };
  }

  const formObject = Object.fromEntries(formData.entries());
  const parsedFormData = UpdatePasswordSchema.safeParse(formObject);

  if (!parsedFormData.success) {
    return {
      errors: getZodErrorMessages(parsedFormData.error.format()),
      success: false,
    };
  }

  const updatePasswordResponse = await authenticatedApiRequest<PublicUserDto>(
    '/user/me/password',
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedFormData.data),
    },
  );

  if (!updatePasswordResponse.success) {
    return {
      errors: updatePasswordResponse.errors,
      success: false,
    };
  }

  await deleteLoginSession();
  redirect('/login?userChanged=1');
}
