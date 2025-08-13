'use server';

import { deleteLoginSession } from '@/lib/login/manage-login';
import { getPublicUserFromApi } from '@/lib/user/api/get-user';
import {
  PublicUserDto,
  PublicUserSchema,
  UpdateUserSchema,
} from '@/lib/user/schemas';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { redirect } from 'next/navigation';

type UpdateUserActionState = {
  user: PublicUserDto;
  errors: string[];
  success: boolean;
};

export async function updateUserAction(
  prevState: UpdateUserActionState,
  formData: FormData,
): Promise<UpdateUserActionState> {
  const user = await getPublicUserFromApi();

  if (!user) {
    await deleteLoginSession();

    return {
      user: prevState.user,
      errors: ['Você precisa fazer login novamente'],
      success: false,
    };
  }

  if (!(formData instanceof FormData)) {
    return {
      user: prevState.user,
      errors: ['Dados inválidos'],
      success: false,
    };
  }

  const formObject = Object.fromEntries(formData.entries());
  const parsedFormData = UpdateUserSchema.safeParse(formObject);

  if (!parsedFormData.success) {
    return {
      user: PublicUserSchema.parse(formObject),
      errors: getZodErrorMessages(parsedFormData.error.format()),
      success: false,
    };
  }

  const updateResponse = await authenticatedApiRequest<PublicUserDto>(
    '/user/me',
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedFormData.data),
    },
  );

  if (!updateResponse.success) {
    return {
      user: PublicUserSchema.parse(formObject),
      errors: updateResponse.errors,
      success: false,
    };
  }

  if (user.email !== updateResponse.data.email) {
    await deleteLoginSession();
    redirect('/login?userChanged=1');
  }

  // Isso aqui é a lista de posts
  // Não vai atualizar o single post
  // O nome de usuário (caso atualizado) só vai mudar
  // após o revalidate por conta do cache → /lib/post/queries/public.ts
  // revalidateTag('posts');

  return {
    user: PublicUserSchema.parse(updateResponse.data),
    errors: [],
    success: true,
  };
}
