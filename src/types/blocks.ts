export interface LinkItem {
  label: string;
  href: string;
}

export interface ImageItem {
  src: string;
  alt: string;
}

export interface LogoProps {
  text: string;
  href: string;
}

export interface CtaProps {
  label: string;
  href: string;
}

// Header Block
export interface HeaderProps {
  logo: LogoProps;
  navItems: LinkItem[];
  cta?: CtaProps;
}

// Hero Block
export interface HeroProps {
  headline: string;
  subheadline?: string;
  primaryCta?: CtaProps;
  secondaryCta?: CtaProps;
  image?: ImageItem;
}

// Card Block
export interface CardProps {
  icon?: string;
  title: string;
  description: string;
  image?: ImageItem;
  href?: string;
}

// Section Block
export interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  layout: 'text-image' | 'cards' | 'cta' | 'grid';
  content?: {
    text?: string;
    image?: ImageItem;
  };
  cta?: CtaProps;
  children?: BlockConfig[];
}

// Carousel Block
export interface CarouselItemProps {
  image: string;
  title: string;
  category?: string;
}

export interface CarouselProps {
  id?: string;
  title: string;
  subtitle?: string;
  items: CarouselItemProps[];
}

// Footer Block
export interface FooterColumnProps {
  title: string;
  links: LinkItem[];
}

export interface FooterProps {
  logo: LogoProps;
  columns: FooterColumnProps[];
  copyright: string;
}

// Block Configuration
export type BlockType = 'header' | 'hero' | 'section' | 'card' | 'carousel' | 'footer';

export interface BlockConfig {
  type: BlockType;
  props: HeaderProps | HeroProps | SectionProps | CardProps | CarouselProps | FooterProps;
}

export interface PageConfig {
  blocks: BlockConfig[];
}
