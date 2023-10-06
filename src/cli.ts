import { addItem, db, query } from './';

async function main() {
  // ensure database is existing.
  (await db.isIndexCreated()) || (await db.createIndex());

  // parse command line arguments.
  const cmd = process.argv[2];
  const input = process.argv[3];

  if (cmd === 'add') {
    console.log('Add:', input);
    await addItem(input);
  }

  if (cmd === 'query') {
    console.log('Query:', input);
    const records = await query(input);
    for (const r of records) {
      const score = r.score.toFixed(5);
      const title = r.item.metadata.text.split('\n')[0];
      console.log(`[${score}]`, title);
    }
  }
}

main();
