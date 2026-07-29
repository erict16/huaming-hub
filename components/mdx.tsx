import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { DocExplorer } from '@/components/DocExplorer';
import { SeriesList } from '@/components/SeriesList';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    DocExplorer,
    SeriesList,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
