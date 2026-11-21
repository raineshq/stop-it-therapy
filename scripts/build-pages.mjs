import { mkdir, writeFile } from 'node:fs/promises';
import worker from '../src/index.js';

const response = await worker.fetch(new Request('https://freetherapynow.com/'), process.env);
await mkdir('dist', { recursive: true });
await writeFile('dist/index.html', await response.text());
