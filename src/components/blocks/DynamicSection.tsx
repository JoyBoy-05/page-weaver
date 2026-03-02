import { Section, SectionProp } from '@/types/blocks';
import { HeaderSection } from './HeaderSection';
import { BannerSection } from './BannerSection';
import { MainContentSection } from './MainContentSection';
import { FooterSection } from './FooterSection';

interface Props {
  section: Section;
}

/** Helper to find a prop by id from the props array */
export const getProp = (props: SectionProp[], id: string): SectionProp | undefined =>
  props.find((p) => p.id === id);

/** Helper to get all props — returns the full array for dynamic iteration */
export const getAllProps = (props: SectionProp[]): SectionProp[] => props;

const sectionMap: Record<string, React.ComponentType<{ props: SectionProp[] }>> = {
  header: HeaderSection,
  banner: BannerSection,
  mainContent: MainContentSection,
  footer: FooterSection,
};

export const DynamicSection = ({ section }: Props) => {
  const Component = sectionMap[section.type];
  if (!Component) return null;
  return <Component props={section.props} />;
};
