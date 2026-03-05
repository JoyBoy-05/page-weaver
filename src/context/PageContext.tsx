import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import axios from 'axios';
import { PageConfig } from '@/types/blocks';
import initialConfig from '@/config/pageConfig.json';
import { API_URL, CONTENT_TYPE_ID, AUTH_TOKEN } from '@/config/api';

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

    const normalizedPage = pageName.toLowerCase().trim();
    setIsLoading(true);

    try {
      const { data } = await axios.get(
        `${API_URL}/protected/${CONTENT_TYPE_ID}/${encodeURIComponent(normalizedPage)}`,
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        }
      );

      // Support both wrapped { data: { sections, seo, ... } } and flat format
      const pageData: PageConfig = data.data || data;
      setConfig(pageData);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error(`Failed to load page "${normalizedPage}":`, error);
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
