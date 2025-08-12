'use client';

import { LockKeyholeIcon, OctagonXIcon, UserPenIcon } from 'lucide-react';
import { Button } from '../Button';
import { InputText } from '../InputText';
import Link from 'next/link';

export function UpdateUserForm() {
  return (
    <div>
      <form action={''}>
        <InputText
          type='text'
          name='name'
          labelText='Nome'
          placeholder='Digite seu nome'
          disabled={false}
          defaultValue={''}
        />

        <InputText
          type='email'
          name='email'
          labelText='E-mail'
          placeholder='Digite seu e-mail'
          disabled={false}
          defaultValue={''}
        />

        <div>
          <Button type='submit' size='md' disabled={false}>
            <UserPenIcon />
            Atualizar
          </Button>
        </div>

        <div>
          <Link href='/admin/user/password'>
            <LockKeyholeIcon />
            Trocar senha
          </Link>

          <Link href='#' onClick={() => {}}>
            <OctagonXIcon />
            Apagar conta
          </Link>
        </div>
      </form>
    </div>
  );
}
