'use client';

import { useActionState, useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { LockKeyholeIcon, OctagonXIcon, UserPenIcon } from 'lucide-react';
import { Button } from '../Button';
import { InputText } from '../InputText';
import { Dialog } from '../Dialog';
import { asyncDelay } from '@/utils/async-delay';
import { PublicUserDto } from '@/lib/user/schemas';
import { updateUserAction } from '@/actions/user/update-user-action';
import { deleteUserAction } from '@/actions/user/delete-user-action';

export type UpdateUserFormProps = {
  user: PublicUserDto;
};

export function UpdateUserForm({ user }: UpdateUserFormProps) {
  const [state, action, isPending] = useActionState(updateUserAction, {
    user,
    errors: [],
    success: false,
  });

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isTransitioning, startTransition] = useTransition();
  const isElementsDisabled = isTransitioning || isPending;
  const safetyDelay = 10000;

  function showDeleteAccountDialog(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    e.preventDefault();
    setIsDialogVisible(true);

    startTransition(async () => {
      await asyncDelay(safetyDelay);
    });
  }

  function handleDeleteUserAccount() {
    startTransition(async () => {
      if (!confirm('Confirma só mais uma vez que quer continuar')) return;

      const result = await deleteUserAction();

      if (!result.success) {
        toast.dismiss();
        result.errors.forEach(error => toast.error(error));
      }

      setIsDialogVisible(false);
    });
  }

  useEffect(() => {
    toast.dismiss();

    if (state.errors.length > 0) {
      state.errors.forEach(error => toast.error(error));
    }

    if (state.success) {
      toast.success('Atualizado com sucesso');
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
          name='name'
          labelText='Nome'
          placeholder='Digite seu nome'
          disabled={isElementsDisabled}
          defaultValue={state.user.name}
        />

        <InputText
          type='email'
          name='email'
          labelText='E-mail'
          placeholder='Digite seu e-mail'
          disabled={isElementsDisabled}
          defaultValue={state.user.email}
        />

        <div className='flex items-center justify-center mt-4'>
          <Button type='submit' size='md' disabled={isElementsDisabled}>
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
            onClick={showDeleteAccountDialog}
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
        disabled={isElementsDisabled}
        onCancel={() => setIsDialogVisible(false)}
        onConfirm={handleDeleteUserAccount}
        isVisible={isDialogVisible}
        title='Apagar meu usuário'
      />
    </div>
  );
}
