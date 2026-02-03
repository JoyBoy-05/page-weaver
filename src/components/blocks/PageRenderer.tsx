import { PageData } from '@/types/blocks';
import { HeaderSection } from './HeaderSection';
import { BannerSection } from './BannerSection';
import { MainContentSection } from './MainContentSection';
import { FooterSection } from './FooterSection';

interface PageRendererProps {
  data: PageData;
}

export const PageRenderer = ({ data }: PageRendererProps) => {
  return (
    <>
      {data.header && <HeaderSection data={data.header} />}
      {data.banner && <BannerSection data={data.banner} />}
      {data.mainContent && <MainContentSection data={data.mainContent} />}
      {data.footer && <FooterSection data={data.footer} />}
    </>
  );
};
