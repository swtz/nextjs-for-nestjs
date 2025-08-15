'use client';

import { InputText } from '@/components/InputText';
import { Button } from '..';
import { LockKeyholeIcon } from 'lucide-react';
import clsx from 'clsx';

export function UpdateUserPasswordForm() {
  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'text-center, max-w-sm m016 mb-32 mx-auto',
      )}
    >
      <form action={''} className='flex-1 flex flex-col gap-6'>
        <InputText
          type='password'
          name='currentPassword'
          labelText='Senha antiga'
          placeholder='Senha antiga'
          disabled={false}
          defaultValue={''}
        />

        <InputText
          type='password'
          name='newPassword'
          labelText='Senha nova'
          placeholder='Senha nova'
          disabled={false}
          defaultValue={''}
        />

        <InputText
          type='password'
          name='newPassword2'
          labelText='Repetir senha nova'
          placeholder='Repetir senha nova'
          disabled={false}
          defaultValue={''}
        />

        <div className='flex items-center justify-center mt-4'>
          <Button size='md' disabled={false} type='submit'>
            <LockKeyholeIcon />
            Atualizar senha
          </Button>
        </div>
      </form>
    </div>
  );
}
