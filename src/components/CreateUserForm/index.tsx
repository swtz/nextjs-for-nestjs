'use client';

import { UserRoundIcon } from 'lucide-react';
import { Button } from '../Button';
import { InputText } from '../InputText';
import Link from 'next/link';
import clsx from 'clsx';

export function CreateUserForm() {
  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'text-center max-w-sm mt-16 mb-32 mx-auto',
      )}
    >
      <form action='' className='flex-1 flex flex-col gap-6'>
        <InputText
          type='text'
          name='name'
          labelText='Nome'
          placeholder='Digite seu nome'
          disabled={false}
          defaultValue={''}
          required
        />
        <InputText
          type='email'
          name='email'
          labelText='E-mail'
          placeholder='Digite seu e-mail'
          disabled={false}
          defaultValue={''}
          required
        />
        <InputText
          type='password'
          name='password'
          labelText='Senha'
          placeholder='Digite sua senha'
          disabled={false}
          defaultValue={''}
          required
        />
        <InputText
          type='password'
          name='password2'
          labelText='Repetir senha'
          placeholder='Digite sua de novo'
          disabled={false}
          defaultValue={''}
          required
        />

        <Button disabled={false} type='submit' className='mt-4'>
          <UserRoundIcon />
          Criar contra
        </Button>

        <p className='text-sm/tight'>
          <Link href='/login'>Já tem conta? Entrar</Link>
        </p>
      </form>
    </div>
  );
}
