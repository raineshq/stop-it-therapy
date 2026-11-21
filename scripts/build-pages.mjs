import { mkdir, writeFile } from 'node:fs/promises';
import worker from '../src/index.js';

for (const path of ['/', '/session/']) {
  const response = await worker.fetch(new Request(`https://freetherapynow.com${path}`), process.env);
  if (!response.ok) throw new Error(`Could not render ${path}: ${response.status}`);

  const directory = `dist${path}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}index.html`, await response.text());
}
