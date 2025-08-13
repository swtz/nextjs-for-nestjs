import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { PublicUserDto, PublicUserSchema } from '../schemas';

export async function getPublicUserFromApi() {
  const userResponse = await authenticatedApiRequest<PublicUserDto>('/user/me');

  if (!userResponse.success) {
    return undefined;
  }

  return PublicUserSchema.parse(userResponse.data);
}
