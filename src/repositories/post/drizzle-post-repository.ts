import { eq } from 'drizzle-orm';
import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { drizzleDb } from '@/db/drizzle';
import { asyncDelay } from '@/utils/async-delay';
import { postsTable } from '@/db/drizzle/schemas';

const simulateWaitInMs = Number(process.env.SIMULATE_WAIT_IN_MS) || 0;

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(simulateWaitInMs, true);

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }
  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(simulateWaitInMs, true);

    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { and }) =>
        and(eq(posts.published, true), eq(posts.slug, slug)),
    });

    if (!post) throw new Error('Post não encontrado pelo slug');

    return post;
  }
  async findAll(): Promise<PostModel[]> {
    await asyncDelay(simulateWaitInMs, true);

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }
  async findById(id: string): Promise<PostModel> {
    await asyncDelay(simulateWaitInMs, true);

    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) throw new Error('Post não encontrado pelo id');

    return post;
  }

  async create(post: PostModel): Promise<PostModel> {
    const postExists = await drizzleDb.query.posts.findFirst({
      where: (posts, { or, eq }) =>
        or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
      columns: { id: true },
    });

    if (!!postExists) {
      throw new Error('Post com ID ou Slug ja existe na base de dados');
    }

    await drizzleDb.insert(postsTable).values(post);
    return post;
  }

  async delete(id: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) {
      throw new Error('Post não existe');
    }

    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

    return post;
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel> {
    const oldPost = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!oldPost) {
      throw new Error('Post não existe');
    }

    const updatedAt = new Date().toISOString();
    const newPost = {
      title: newPostData.title,
      excerpt: newPostData.excerpt,
      content: newPostData.content,
      coverImageUrl: newPostData.coverImageUrl,
      published: newPostData.published,
      author: newPostData.author,
      updatedAt,
    };

    await drizzleDb
      .update(postsTable)
      .set(newPost)
      .where(eq(postsTable.id, id));

    return {
      ...oldPost,
      ...newPost,
    };
  }
}
