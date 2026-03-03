import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import axios from 'axios';
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
    if (!pageName) return;

    setIsLoading(true);
    try {
      // TODO: Replace this URL with your actual backend endpoint
      const { data } = await axios.get(`/api/pages/${encodeURIComponent(pageName.toLowerCase())}`);

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
