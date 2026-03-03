import { PageRenderer } from '@/components/blocks/PageRenderer';
import { PageProvider, usePageContext } from '@/context/PageContext';

const HomeContent = () => {
  const { config, isLoading } = usePageContext();

  if (!config.sections || config.sections.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen relative">
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}
      <PageRenderer config={config} />
    </div>
  );
};

const Home = () => (
  <PageProvider>
    <HomeContent />
  </PageProvider>
);

export default Home;
