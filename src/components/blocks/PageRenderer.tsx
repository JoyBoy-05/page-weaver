import { PageConfig } from '@/types/blocks';
import { useEffect } from 'react';
import { DynamicSection } from './DynamicSection';

interface PageRendererProps {
  config: PageConfig;
}

export const PageRenderer = ({ config }: PageRendererProps) => {
  useEffect(() => {
    if (config.seo) {
      document.title = config.seo.title || '';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', config.seo.description || '');
      const metaKeys = document.querySelector('meta[name="keywords"]');
      if (metaKeys) metaKeys.setAttribute('content', config.seo.keywords || '');
    }
  }, [config.seo]);

  return (
    <>
      {config.sections.map((section, index) => (
        <DynamicSection key={`${section.type}-${index}`} section={section} />
      ))}
    </>
  );
};
