'use client';

import { uploadImageAction } from '@/actions/upload/upload-image-action';
import { Button } from '@/components/Button';
import { ImageUpIcon } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

type ImageUploadProps = {
  disabled?: boolean;
};

const imageUploaderMaxSize =
  Number(process.env.NEXT_PUBLIC_IMAGE_UPLOADER_MAX_SIZE) || 921600;

export function ImageUploader({ disabled = false }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState('');

  function handleChooseFile() {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  function handleChange() {
    toast.dismiss();

    if (!fileInputRef.current) {
      setImgUrl('');
      return;
    }

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0]; // existe 'files'? existe algo dentro de 'files'?

    if (!file) {
      setImgUrl('');
      return;
    }

    if (file.size > imageUploaderMaxSize) {
      const readableMaxSize = imageUploaderMaxSize / 1024;
      toast.error(
        `A imagem enviada é muito grande. Tamanho máximo: ${readableMaxSize}KB.`,
      );

      fileInput.value = ''; // caso o usuário envie a mesma imagem, o 'event onChange' não é provocado
      setImgUrl('');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toast.error(result.error);
        setImgUrl(result.url);
        fileInput.value = '';
        return;
      }

      setImgUrl(result.url);
      toast.success('Imagem enviada!');
    });

    fileInput.value = ''; // reset do campo 'input'
  }

  return (
    <div className='flex flex-col gap-4 py-4'>
      <Button
        onClick={handleChooseFile}
        type='button'
        className='self-start'
        disabled={isUploading || disabled}
      >
        <ImageUpIcon />
        Enviar uma imagem
      </Button>

      {!!imgUrl && (
        <div className='flex flex-col gap-4'>
          <p>
            <b>URL:</b> {imgUrl}
          </p>

          {/* eslint-disable-next-line */}
          <img
            className='rounded-lg max-w-[320px] max-h-auto'
            src={imgUrl}
            alt='Um prévia da imagem enviada pelo usuário.'
          />
        </div>
      )}

      <input
        onChange={handleChange}
        ref={fileInputRef}
        className='hidden'
        name='file'
        type='file'
        accept='image/*'
        disabled={isUploading || disabled}
      />
    </div>
  );
}
