import { BlockRenderer } from '@/components/blocks/BlockRenderer';
import pageConfig from '@/config/pageConfig.json';
import { PageConfig } from '@/types/blocks';

const Home = () => {
  // Cast the imported JSON to our PageConfig type
  const config = pageConfig as PageConfig;

  // If no blocks exist in the config, render nothing
  if (!config.blocks || config.blocks.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <BlockRenderer blocks={config.blocks} />
    </div>
  );
};

export default Home;
