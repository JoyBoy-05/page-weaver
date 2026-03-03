import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { PageConfig } from '@/types/blocks';
import initialConfig from '@/config/pageConfig.json';

interface PageContextType {
  config: PageConfig;
  navigateTo: (pageName: string) => Promise<void>;
  isLoading: boolean;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const usePageContext = () => {
  const ctx = useContext(PageContext);
  if (!ctx) throw new Error('usePageContext must be used within PageProvider');
  return ctx;
};

interface PageProviderProps {
  children: ReactNode;
}

export const PageProvider = ({ children }: PageProviderProps) => {
  const [config, setConfig] = useState<PageConfig>(initialConfig as PageConfig);
  const [isLoading, setIsLoading] = useState(false);

  const navigateTo = useCallback(async (pageName: string) => {
    // Skip hash links and external URLs
    if (!pageName || pageName === '#' || pageName.startsWith('#') || pageName.startsWith('http')) return;

    setIsLoading(true);
    try {
      // TODO: Replace this URL with your actual backend endpoint
      // It will fetch JSON for the page matching the given name
      const response = await fetch(`/api/pages/${encodeURIComponent(pageName.toLowerCase())}`);
      if (!response.ok) throw new Error(`Failed to fetch page: ${pageName}`);
      const data = await response.json();

      // Support both wrapped { data: { sections, seo, ... } } and flat format
      const pageData: PageConfig = data.data || data;
      setConfig(pageData);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error(`Failed to load page "${pageName}":`, error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <PageContext.Provider value={{ config, navigateTo, isLoading }}>
      {children}
    </PageContext.Provider>
  );
};
