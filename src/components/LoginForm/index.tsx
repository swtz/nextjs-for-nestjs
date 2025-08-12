'use client';

import { useActionState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { LogInIcon } from 'lucide-react';
import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';
import { loginAction } from '@/actions/login/login-action';
import { HoneypotInput } from '../HoneypotInput';

export function LoginForm() {
  const initialState = {
    email: '',
    errors: [],
  };

  const [state, action, isPending] = useActionState(loginAction, initialState);
  const searchParams = useSearchParams();
  const created = searchParams.get('created');
  const userChanged = searchParams.get('userChanged');
  const router = useRouter();

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach(error => toast.error(error));
    }
  }, [state]);

  useEffect(() => {
    if (created === '1') {
      toast.dismiss();
      toast.success('Usuário criado com sucesso!');
      const url = new URL(window.location.href);
      url.searchParams.delete('created');
      router.replace(url.toString());
    }

    if (userChanged === '1') {
      toast.dismiss();
      toast.success('Usuário alterado com sucesso! Faça login novamente.');
      const url = new URL(window.location.href);
      url.searchParams.delete('userChanged');
      router.replace(url.toString());
    }
  }, [userChanged, created, router]);

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'text-center max-w-sm mt-16 mb-32 mx-auto',
      )}
    >
      <form action={action} className='flex-1 flex flex-col gap-6'>
        <InputText
          type='email'
          name='email'
          labelText='E-mail'
          placeholder='Digite seu e-mail'
          disabled={isPending}
          defaultValue={state.email}
          required
        />

        <InputText
          type='password'
          name='password'
          labelText='Senha'
          placeholder='Digite sua senha'
          disabled={isPending}
          required
        />

        <HoneypotInput />

        <Button disabled={isPending} type='submit' className='mt-4'>
          <LogInIcon />
          Fazer login
        </Button>

        <p className='text-sm/tight'>
          <Link href='/user/new'>Criar minha conta</Link>
        </p>

        {!!(state.errors.length > 0) &&
          state.errors.map(error => (
            <p key={error} className='text-red-600'>
              {error}
            </p>
          ))}
      </form>
    </div>
  );
}
