import { openDB } from 'idb';

const DB_NAME = 'golf_sg';
const DB_VERSION = 1;
const STORE = 'rounds';

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      db.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
    }
  });
}

export async function saveRound(round) {
  const db = await initDB();
  return db.add(STORE, round);
}

export async function getRounds() {
  const db = await initDB();
  return db.getAll(STORE);
}

