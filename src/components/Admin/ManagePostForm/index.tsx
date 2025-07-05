'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { createPostAction } from '@/actions/post/create-post-action';
import { updatePostAction } from '@/actions/post/update-post-action';

import { Button } from '@/components/Button';
import { InputCheckbox } from '@/components/InputCheckbox';
import { InputText } from '@/components/InputText';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { ImageUploader } from '../ImageUploader';

type ManagePostFormUpdateProps = {
  mode: 'update';
  publicPost: PublicPost;
};
type ManagePostFormCreateProps = {
  mode: 'create';
};
type ManagePostFormProps =
  | ManagePostFormCreateProps
  | ManagePostFormUpdateProps;

export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props;
  const searchParams = useSearchParams();
  const created = searchParams.get('created');
  const router = useRouter();

  let publicPost;
  if (mode === 'update') {
    publicPost = props.publicPost;
  }

  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };

  const actionsMap = {
    update: updatePostAction,
    create: createPostAction,
  };

  const [state, action, isPending] = useActionState(
    actionsMap[mode],
    initialState,
  );

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach(error => toast.error(error));
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success('Post atualizado com sucesso!');
    }
  }, [state.success]);

  useEffect(() => {
    if (created === '1') {
      toast.dismiss();
      toast.success('Post criado com sucesso!');
      const url = new URL(window.location.href);
      url.searchParams.delete('created');
      router.replace(url.toString());
    }
  }, [created, router]);

  const { formState } = state;
  const [contentValue, setContentValue] = useState(formState.content);

  return (
    <form action={action} className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText
          labelText='ID'
          name='ID'
          placeholder='ID gerado automaticamente'
          type='text'
          defaultValue={formState.id}
          disabled={isPending}
          readOnly
        />

        <InputText
          labelText='Slug'
          name='slug'
          placeholder='Slug gerado automaticamente'
          type='text'
          defaultValue={formState.slug}
          disabled={isPending}
          readOnly
        />

        <InputText
          labelText='Autor'
          name='author'
          placeholder='Digite o nome do autor'
          type='text'
          defaultValue={formState.author}
          disabled={isPending}
        />

        <InputText
          labelText='Título'
          name='title'
          placeholder='Digite o título'
          type='text'
          defaultValue={formState.title}
          disabled={isPending}
        />

        <InputText
          labelText='Excerto'
          name='excerpt'
          placeholder='Digite a descrição'
          type='text'
          defaultValue={formState.excerpt}
          disabled={isPending}
        />

        <MarkdownEditor
          labelText='Conteúdo'
          textAreaName='content'
          value={contentValue}
          setValue={setContentValue}
          disabled={isPending}
        />

        <ImageUploader disabled={isPending} />

        <InputText
          labelText='URL da imagem de capa'
          name='coverImageUrl'
          placeholder='Digite a descrição'
          type='text'
          defaultValue={formState.coverImageUrl}
          disabled={isPending}
        />

        <InputCheckbox
          labelText='Publicar?'
          name='published'
          type='checkbox'
          defaultChecked={formState.published}
          disabled={isPending}
        />

        <div className='mt-4'>
          <Button type='submit' disabled={isPending}>
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}
