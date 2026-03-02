// Dynamic JSON-driven block types

export interface PropChild {
  [key: string]: any;
}

export interface SectionProp {
  id: string;
  children: PropChild[];
}

export interface Section {
  type: 'header' | 'banner' | 'mainContent' | 'footer';
  props: SectionProp[];
}

export interface SEO {
  title: string;
  description: string;
  keywords: string;
}

export interface PageConfig {
  page: string;
  seo: SEO;
  sections: Section[];
}
