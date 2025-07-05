'use client';

import clsx from 'clsx';
import { LogInIcon } from 'lucide-react';
import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';
import { useActionState, useEffect } from 'react';
import { loginAction } from '@/actions/login/login-action';
import { toast } from 'react-toastify';

export function LoginForm() {
  const initialState = {
    username: '',
    error: '',
  };

  const [state, action, isPending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.error) {
      toast.dismiss();
      toast.error(state.error);
    }
  }, [state]);

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'text-center max-w-sm mt-16 mb-32 mx-auto',
      )}
    >
      <form action={action} className='flex-1 flex flex-col gap-6'>
        <InputText
          type='text'
          name='username'
          labelText='Usuário'
          placeholder='Digite seu usuário'
          disabled={isPending}
          defaultValue={state.username}
        />

        <InputText
          type='password'
          name='password'
          labelText='Senha'
          placeholder='Digite sua senha'
          disabled={isPending}
        />

        <Button disabled={isPending} type='submit' className='mt-4'>
          <LogInIcon />
          Fazer login
        </Button>

        {!!state.error && <p className='text-red-600'>{state.error}</p>}
      </form>
    </div>
  );
}
