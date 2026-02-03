import { PageRenderer } from '@/components/blocks/PageRenderer';
import pageConfig from '@/config/pageConfig.json';
import { BackendResponse } from '@/types/blocks';

const Home = () => {
  // Cast the imported JSON to our BackendResponse type
  const config = pageConfig as BackendResponse;

  // If no data exists in the config, render nothing
  if (!config.data) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <PageRenderer data={config.data} />
    </div>
  );
};

export default Home;
