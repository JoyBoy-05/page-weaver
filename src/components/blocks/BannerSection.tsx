import { motion } from 'framer-motion';
import { SectionProp } from '@/types/blocks';
import { getProp } from './DynamicSection';
import { Button } from '@/components/ui/button';
import { usePageContext } from '@/context/PageContext';

interface Props {
  props: SectionProp[];
}

export const BannerSection = ({ props }: Props) => {
  const { navigateTo } = usePageContext();

  const headingProp = getProp(props, 'heading');
  const subHeadingProp = getProp(props, 'subHeading');
  const heroMediaProp = getProp(props, 'heroMedia');
  const ctaProp = getProp(props, 'cta');

  const headings = headingProp?.children || [];
  const subHeadings = subHeadingProp?.children || [];
  const mediaItems = heroMediaProp?.children || [];
  const ctaItems = ctaProp?.children || [];
  const mediaItem = mediaItems[0];

  const handleClick = (e: React.MouseEvent, label: string, href: string) => {
    if (href.startsWith('http') || href.startsWith('mailto:')) return;
    e.preventDefault();
    navigateTo(label);
  };

  return (
    <section className="relative min-h-[90vh] overflow-hidden hero-gradient">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            {headings.map((h, i) => {
              const Tag = (h.tag as keyof JSX.IntrinsicElements) || 'h1';
              return (
                <Tag key={i} className="font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                  {h.text?.split(' ').map((word: string, wi: number, arr: string[]) => (
                    <span key={wi}>
                      {wi === arr.length - 1 ? <span className="text-gradient">{word}</span> : <>{word} </>}
                    </span>
                  ))}
                </Tag>
              );
            })}

            {subHeadings.map((s, i) => {
              const Tag = (s.tag as keyof JSX.IntrinsicElements) || 'p';
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
                  <Tag className="mt-6 text-lg text-muted-foreground md:text-xl lg:max-w-lg">{s.text}</Tag>
                </motion.div>
              );
            })}

            {ctaItems.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                {ctaItems.map((cta, i) => (
                  <Button key={i} asChild size="lg" variant={i === 0 ? 'default' : 'outline'} className="text-base">
                    <a href={cta.href} onClick={(e) => handleClick(e, cta.label, cta.href)}>{cta.label}</a>
                  </Button>
                ))}
              </motion.div>
            )}
          </motion.div>

          {mediaItem && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl card-shadow">
                <img src={mediaItem.href} alt="Hero" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl bg-primary/10" />
            </motion.div>
          )}
        </div>
      </div>

      <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
    </section>
  );
};
