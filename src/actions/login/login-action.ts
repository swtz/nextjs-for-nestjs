'use server';

import { LoginSchema } from '@/lib/login/schemas';
import { apiRequest } from '@/utils/api-request';
import { asyncDelay } from '@/utils/async-delay';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';

type LoginActionState = {
  email: string;
  errors: string[];
};

export async function loginAction(
  prevState: LoginActionState,
  formData: FormData,
) {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin) {
    return {
      email: '',
      errors: ['Login não permitido.'],
    };
  }

  await asyncDelay(5000); // manter delay

  if (!(formData instanceof FormData)) {
    return {
      email: '',
      errors: ['Dados inválidos'],
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const formEmail = formObj?.email?.toString() || '';
  const parsedFormData = LoginSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      email: formEmail,
      errors: getZodErrorMessages(parsedFormData.error.format()),
    };
  }

  const loginResponse = await apiRequest<{ accessToken: string }>(
    '/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedFormData.data),
    },
  );

  if (!loginResponse.success) {
    return {
      email: formEmail,
      errors: loginResponse.errors,
    };
  }

  console.log(loginResponse.data);

  return {
    email: formEmail,
    errors: ['Success'],
  };

  // await createLoginSession(email);
  // redirect('/admin/post');
}
