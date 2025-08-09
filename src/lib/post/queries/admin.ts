import { PostModelFromApi } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { cache } from 'react';

export const findPostByIdAdmin = cache(async (id: string) => {
  return postRepository.findById(id);
});

export const findPostByIdFromApiAdmin = cache(async (id: string) => {
  const postResponse = await authenticatedApiRequest<PostModelFromApi>(
    `/post/me/${id}`,
    {
      headers: {
        'Content-type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  return postResponse;
});

export const findAllPostsAdmin = cache(async () => {
  return postRepository.findAll();
});
