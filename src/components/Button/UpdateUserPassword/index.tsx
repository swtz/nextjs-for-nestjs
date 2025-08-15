'use client';

import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { LockKeyholeIcon } from 'lucide-react';
import { InputText } from '@/components/InputText';
import { Button } from '..';
import { updateUserPasswordAction } from '@/actions/user/update-user-password-action';

export function UpdateUserPasswordForm() {
  const [state, action, isPending] = useActionState(updateUserPasswordAction, {
    errors: [],
    success: false,
  });

  useEffect(() => {
    toast.dismiss();

    if (state.errors.length > 0) {
      state.errors.forEach(error => toast.error(error));
    }
  }, [state]);

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'text-center, max-w-sm m016 mb-32 mx-auto',
      )}
    >
      <form action={action} className='flex-1 flex flex-col gap-6'>
        <InputText
          type='password'
          name='currentPassword'
          labelText='Senha antiga'
          placeholder='Senha antiga'
          disabled={isPending}
          defaultValue={''}
        />

        <InputText
          type='password'
          name='newPassword'
          labelText='Senha nova'
          placeholder='Senha nova'
          disabled={isPending}
          defaultValue={''}
        />

        <InputText
          type='password'
          name='newPassword2'
          labelText='Repetir senha nova'
          placeholder='Repetir senha nova'
          disabled={isPending}
          defaultValue={''}
        />

        <div className='flex items-center justify-center mt-4'>
          <Button size='md' disabled={isPending} type='submit'>
            <LockKeyholeIcon />
            Atualizar senha
          </Button>
        </div>
      </form>
    </div>
  );
}
