import clsx from 'clsx';
import { useId } from 'react';

type InputTextProps = {
  type?: 'text' | 'password' | 'email' | 'textarea';
  labelText?: string;
} & React.ComponentProps<'input'>;

export function InputText({
  type = 'text',
  labelText = '',
  ...props
}: InputTextProps) {
  const id = useId();

  return (
    <div className='flex flex-col gap-2'>
      {labelText && (
        <label className='text-sm' htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        {...props}
        className={clsx(
          'bg-white outline-0 text-base/tight text-slate-900',
          'ring-2 ring-slate-400 rounded',
          'p-2 transition focus:ring-blue-600',
          'placeholder:text-slate-300 placeholder:italic',
          'disabled:placeholder:text-slate-400',
          'disabled:bg-slate-200 disabled:text-slate-400',
          'read-only:bg-slate-100',
          props.className,
        )}
        id={id}
        type={type}
      />
    </div>
  );
}
