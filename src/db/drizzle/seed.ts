import { JsonPostRepository } from '@/repositories/post/json-post-repository';
import { drizzleDb } from '.';
import { postsTable } from './schemas';

(async () => {
  const jsonPostRepository = new JsonPostRepository();
  const posts = await jsonPostRepository.findAll();

  console.log(`\n${posts.length} foram salvos na base de dados.`);

  try {
    await drizzleDb.delete(postsTable); // delete without 'where'
    await drizzleDb.insert(postsTable).values(posts);
  } catch (e) {
    console.log('Ocorreu um erro...\n', e);
  }
})();
