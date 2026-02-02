import { motion } from 'framer-motion';
import { SectionProps, BlockConfig, CardProps } from '@/types/blocks';
import { CardBlock } from './CardBlock';
import { Button } from '@/components/ui/button';

interface Props {
  props: SectionProps;
}

export const SectionBlock = ({ props }: Props) => {
  const { id, title, subtitle, layout, content, cta, children } = props;

  const renderContent = () => {
    switch (layout) {
      case 'text-image':
        return (
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {content?.text && (
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {content.text}
                </p>
              )}
            </motion.div>
            {content?.image && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-2xl card-shadow">
                  <img
                    src={content.image.src}
                    alt={content.image.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            )}
          </div>
        );

      case 'cards':
        return (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {children?.map((child, index) => {
              if (child.type === 'card') {
                return (
                  <CardBlock
                    key={index}
                    props={child.props as CardProps}
                    index={index}
                  />
                );
              }
              return null;
            })}
          </div>
        );

      case 'cta':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="rounded-2xl border border-border bg-card p-8 card-shadow md:p-12">
              {cta && (
                <Button asChild size="lg" className="mt-4 text-base">
                  <a href={cta.href}>{cta.label}</a>
                </Button>
              )}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section id={id} className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Section Content */}
        {renderContent()}
      </div>
    </section>
  );
};
