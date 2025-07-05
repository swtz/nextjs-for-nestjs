import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { postsTable } from './schemas';

const sqliteDatabasePath = `${process.cwd()}/db.sqlite`;
const sqliteDatabase = new Database(sqliteDatabasePath);

export const drizzleDb = drizzle(sqliteDatabase, {
  schema: {
    posts: postsTable,
  },
  logger: false,
});
