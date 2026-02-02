import { motion } from 'framer-motion';
import { HeroProps } from '@/types/blocks';
import { Button } from '@/components/ui/button';

interface Props {
  props: HeroProps;
}

export const HeroBlock = ({ props }: Props) => {
  const { headline, subheadline, primaryCta, secondaryCta, image } = props;

  return (
    <section className="relative min-h-[90vh] overflow-hidden hero-gradient">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              {headline.split(' ').map((word, i, arr) => (
                <span key={i}>
                  {i === arr.length - 1 ? (
                    <span className="text-gradient">{word}</span>
                  ) : (
                    <>{word} </>
                  )}
                </span>
              ))}
            </h1>
            
            {subheadline && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-6 text-lg text-muted-foreground md:text-xl lg:max-w-lg"
              >
                {subheadline}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
            >
              {primaryCta && (
                <Button asChild size="lg" className="text-base">
                  <a href={primaryCta.href}>{primaryCta.label}</a>
                </Button>
              )}
              {secondaryCta && (
                <Button asChild variant="outline" size="lg" className="text-base">
                  <a href={secondaryCta.href}>{secondaryCta.label}</a>
                </Button>
              )}
            </motion.div>
          </motion.div>

          {/* Image */}
          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl card-shadow">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>
              {/* Floating decoration */}
              <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl bg-primary/10" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
    </section>
  );
};
