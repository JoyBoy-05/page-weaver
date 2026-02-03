// New backend-driven structure

export interface LogoItem {
  url: string;
  alt: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ActionButton {
  label: string;
  href: string;
}

export interface HeaderData {
  logo: LogoItem[];
  navbar: NavItem[];
  actionButton: ActionButton[];
}

export interface HeadlineItem {
  text: string;
}

export interface SubtextItem {
  text: string;
}

export interface HeroMediaItem {
  type: string;
  url: string;
}

export interface CTAItem {
  label: string;
  href: string;
}

export interface BannerData {
  headline: HeadlineItem[];
  subtext: SubtextItem[];
  heroMedia: HeroMediaItem[];
  primaryCTA: CTAItem[];
  secondaryCTA: CTAItem[];
}

export interface IntroductionItem {
  text: string;
}

export interface CardItem {
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

export interface CarouselItem {
  image: string;
  title?: string;
  category?: string;
}

export interface HighlightItem {
  text: string;
}

export interface MainContentData {
  introduction: IntroductionItem[];
  cards: CardItem[];
  carousel: CarouselItem[];
  highlights: HighlightItem[];
}

export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface SocialIconItem {
  platform: string;
  url: string;
}

export interface ContactInfoItem {
  email?: string;
  phone?: string;
  address?: string;
}

export interface CopyrightItem {
  text: string;
}

export interface FooterData {
  links: FooterLinkItem[];
  socialIcons: SocialIconItem[];
  contactInfo: ContactInfoItem[];
  copyrights: CopyrightItem[];
}

export interface PageData {
  header: HeaderData;
  banner: BannerData;
  mainContent: MainContentData;
  footer: FooterData;
}

export interface BackendResponse {
  _id: string;
  contentTypeId: string;
  userId: string;
  data: PageData;
  createdAt: string;
  updatedAt: string;
}
