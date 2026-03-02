import { PageRenderer } from '@/components/blocks/PageRenderer';
import pageConfig from '@/config/pageConfig.json';
import { PageConfig } from '@/types/blocks';

const Home = () => {
  const config = pageConfig as PageConfig;

  if (!config.sections || config.sections.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <PageRenderer config={config} />
    </div>
  );
};

export default Home;
