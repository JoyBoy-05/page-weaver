import { BlockConfig, BlockType } from '@/types/blocks';
import { HeaderBlock } from './HeaderBlock';
import { HeroBlock } from './HeroBlock';
import { SectionBlock } from './SectionBlock';
import { CardBlock } from './CardBlock';
import { CarouselBlock } from './CarouselBlock';
import { FooterBlock } from './FooterBlock';

type BlockComponent = React.ComponentType<{ props: any }>;

const blockRegistry: Record<BlockType, BlockComponent> = {
  header: HeaderBlock,
  hero: HeroBlock,
  section: SectionBlock,
  card: CardBlock,
  carousel: CarouselBlock,
  footer: FooterBlock,
};

interface BlockRendererProps {
  blocks: BlockConfig[];
}

export const BlockRenderer = ({ blocks }: BlockRendererProps) => {
  return (
    <>
      {blocks.map((block, index) => {
        const Component = blockRegistry[block.type];
        
        if (!Component) {
          console.warn(`Unknown block type: ${block.type}`);
          return null;
        }
        
        return <Component key={`${block.type}-${index}`} props={block.props} />;
      })}
    </>
  );
};

// Helper function to render nested children blocks
export const renderChildren = (children?: BlockConfig[]) => {
  if (!children || children.length === 0) return null;
  return <BlockRenderer blocks={children} />;
};
