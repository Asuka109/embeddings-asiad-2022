import path from 'path';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { LocalIndex } from 'vectra';
import findUp from 'find-up';
import assert from 'assert';

// load environment variables from dotenv files.
dotenv.config();
dotenv.config({ path: '.env.local' });

// initialize database and save it under the nearest node_modules directory.
const nearestModuleDir = findUp.sync('node_modules', { type: 'directory' });
assert(nearestModuleDir);
const dbDir = path.resolve(nearestModuleDir, '.cache/db');
export const db = new LocalIndex(dbDir);

// create OpenAI API instance and configure with environment variables.
// must ensure you setup the `.env.local` file.
export const api = new OpenAI({ baseURL: process.env.OPENAI_BASEURL });

/** Embedding text into being vector. */
export async function getVector(text: string) {
  const response = await api.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text,
  });
  return response.data[0].embedding;
}

export interface MetaData {
  text: string;
}

/** Embedding and insert text into vector database. */
export async function addItem(text: string) {
  await db.insertItem<MetaData>({
    vector: await getVector(text),
    metadata: { text },
  });
}

/** Query and rank records by relevance. */
export async function query(text: string) {
  const vector = await getVector(text);
  return await db.queryItems<MetaData>(vector, Infinity);
}
