'use client';

import { LockKeyholeIcon, OctagonXIcon, UserPenIcon } from 'lucide-react';
import { Button } from '../Button';
import { InputText } from '../InputText';
import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';
import { Dialog } from '../Dialog';

export function UpdateUserForm() {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'text-center max-w-sm mt-16 mb-32 mx-auto',
      )}
    >
      <form action={''} className='flex-1 flex flex-col gap-6'>
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

        <div className='flex items-center justify-center mt-4'>
          <Button type='submit' size='md' disabled={false}>
            <UserPenIcon />
            Atualizar
          </Button>
        </div>

        <div className='flex gap-4 items-center justify-between mt-8'>
          <Link
            className={clsx(
              'flex gap-2 items-center justify-center transition',
              'hover:text-blue-600',
            )}
            href='/admin/user/password'
          >
            <LockKeyholeIcon />
            Trocar senha
          </Link>

          <Link
            className={clsx(
              'flex gap-2 items-center justify-center transition',
              'text-red-600 hover:text-red-700',
            )}
            href='#'
            onClick={() => {}}
          >
            <OctagonXIcon />
            Apagar conta
          </Link>
        </div>
      </form>

      <Dialog
        content={
          <p>
            Ao pagar meu usuário, meus dados e todos os meus posts também serão
            excluídos. Essa ação é IRREVERSÍVEL. Em alguns segundos, os botões
            serão liberados. Clique em <b>OK</b> para confirmar ou{' '}
            <b>Cancelar</b> para fechar essa janela.
          </p>
        }
        // disabled={isPending || isTransitionRunning}
        onCancel={() => setIsDialogVisible(false)}
        // onConfirm={handleDeleteUserAccount}
        isVisible={isDialogVisible}
        title='Apagar meu usuário'
      />
    </div>
  );
}
