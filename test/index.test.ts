import fs from 'node:fs/promises';
import { unified } from 'unified';
import { beforeAll, describe, it, expect } from 'vitest';

import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import remarkSectionize from 'remark-sectionize';
import remarkExtractSections from '../src/index';

describe('remark-extract-sections', () => {

  let input: Buffer;
  let output: Buffer;

  beforeAll(async () => {
    input = await fs.readFile('./test/fixtures/input.md');
    output = await fs.readFile('./test/fixtures/output.json');
  });
  
  it('injects a list of sections with their title and description inside the data property on the vfile', async () => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkSectionize)
      .use(remarkExtractSections)
      .use(remarkHtml)

    const vfile = await processor.process(input);
    expect(vfile.data.sections).toEqual(JSON.parse(output.toString()));
  });

});
