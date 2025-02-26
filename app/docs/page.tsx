import { promises as fs } from 'fs';
import path from 'path';
import Markdown from 'react-markdown';

export default async function DocsPage() {
  const docsPath = path.join(process.cwd(), 'docs', 'api.md');
  const content = await fs.readFile(docsPath, 'utf8');

  return (
    <div className="container mx-auto px-4 py-8 prose prose-slate max-w-none">
      <Markdown>{content}</Markdown>
    </div>
  );
}
