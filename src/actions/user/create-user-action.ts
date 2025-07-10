'use server';

import {
  CreateUserSchema,
  PublicUserDto,
  PublicUserSchema,
} from '@/lib/user/schemas';
import { asyncDelay } from '@/utils/async-delay';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';

type CreateUserActionState = {
  user: PublicUserDto;
  errors: string[];
  success: boolean;
};

export async function createUserAction(
  prevState: CreateUserActionState,
  formData: FormData,
): Promise<CreateUserActionState> {
  await asyncDelay(2000);

  if (!(formData instanceof FormData)) {
    return {
      user: prevState.user,
      errors: ['Dados inválidos'],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = CreateUserSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      user: PublicUserSchema.parse(formObj),
      errors: getZodErrorMessages(parsedFormData.error.format()),
      success: false,
    };
  }

  // FETCH API
  // const apiUrl = process.env.API_URL || 'http://locahost:3001';
  const apiUrl = 'http://locahos:3001';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(parsedFormData.data),
    });
  } catch (e) {
    console.log(e);

    return {
      user: PublicUserSchema.parse(formObj),
      errors: ['Falha ao conectar-se ao servidor'],
      success: false,
    };
  }

  return {
    user: PublicUserSchema.parse(formObj),
    errors: ['Success'],
    success: true,
  };
}
