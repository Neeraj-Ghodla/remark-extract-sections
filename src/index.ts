import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';

import type { Node } from 'unist-util-is/lib';
import type { VFileWithOutput } from "unified";

export interface Section {
  title: string;
  description: string;
}

export function extractSections(root: Node) {
  const sections: Section[] = [];
  
  visit(root, 'section', (node: any) => {
    const heading = node.children?.find((child: any) => child.type === 'heading');
    const paragraph = node.children?.find((child: any) => child.type === 'paragraph');

    sections.push({
      title: toString(heading),
      description: toString(paragraph),
    });
  });

  return sections;
}

export default function remarkExtractSections() {
  return (node: Node, file: VFileWithOutput<any>) => {
    file.data.sections = extractSections(node);
  }
}
