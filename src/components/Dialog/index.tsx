'use client';

import clsx from 'clsx';
import { Button } from '../Button';

type DialogProps = {
  isVisible?: boolean;
  title: string;
  content: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  disabled: boolean;
};

export function Dialog({
  title,
  content,
  isVisible = false,
  onCancel,
  onConfirm,
  disabled,
}: DialogProps) {
  if (!isVisible) return null;

  function handleCancel() {
    if (disabled) return;
    onCancel();
  }

  return (
    <div
      className={clsx(
        'fixed z-50 bg-black/50',
        'inset-0',
        'backdrop-blur-xs',
        'flex items-center justify-center',
      )}
      onClick={handleCancel}
    >
      <div
        className={clsx(
          'bg-slate-100 p-6 rounded-lg max-w-2xl mx-6',
          'flex flex-col gap-6',
          'shadow-lg shadow-black/30',
          'text-center',
        )}
        role='dialog'
        aria-modal='true'
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
        onClick={e => e.stopPropagation()}
      >
        <h3 id='dialog-title' className='text-xl font-extrabold'>
          {title}
        </h3>
        <div>{content}</div>
        <div
          id='dialog-description'
          className='flex gap-4 items-center justify-around'
        >
          <Button
            variant='ghost'
            autoFocus
            onClick={onCancel}
            disabled={disabled}
          >
            Cancelar
          </Button>
          <Button
            size='md'
            className='min-w-[102px]'
            onClick={onConfirm}
            disabled={disabled}
          >
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
}
