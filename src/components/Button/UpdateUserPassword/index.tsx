'use client';

import { InputText } from '@/components/InputText';
import { Button } from '..';
import { LockKeyholeIcon } from 'lucide-react';

export function UpdateUserPasswordForm() {
  return (
    <div>
      <form action={''}>
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

        <div>
          <Button size='md' disabled={false} type='submit'>
            <LockKeyholeIcon />
            Atualizar senha
          </Button>
        </div>
      </form>
    </div>
  );
}
