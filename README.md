# remark-extract-sections

A remark plugin to extract sections while processing markdown files.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

```sh
yarn add remark-extract-sections
```

## Use

Running:

```js
import { unified } from "unified";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import remarkSectionize from "remark-sectionize";
import remarkExtractSections from 'remark-extract-sections';

const processor = unified()
  .use(remarkParse)
  .use(remarkSectionize)
  .use(remarkExtractSections)
  .use(remarkHtml);

const input = fs.readFileSync("input.md");

/*
# Heading 1
Paragraph for heading 1
## Heading 2
Paragraph for heading 2
*/

const vfile = await processor.process(input);

console.log(vfile.data.sections)
```

Yields:

```js
[
  {"title": 1, "description": "Paragraph for heading 1"},
  {"title": 2, "description": "Paragraph for heading 2"},
]
```
