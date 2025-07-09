'use server';

import {
  CreateUserSchema,
  PublicUserDto,
  PublicUserSchema,
} from '@/lib/user/schemas';
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

  return {
    user: prevState.user,
    errors: [],
    success: true,
  };
}
