import { motion } from 'framer-motion';
import { Palette, Code, Smartphone, TrendingUp, Star, Zap, Shield, Globe } from 'lucide-react';
import { MainContentData } from '@/types/blocks';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  palette: Palette,
  code: Code,
  smartphone: Smartphone,
  'trending-up': TrendingUp,
  star: Star,
  zap: Zap,
  shield: Shield,
  globe: Globe,
};

interface Props {
  data: MainContentData;
}

export const MainContentSection = ({ data }: Props) => {
  const { introduction, cards, carousel, highlights } = data;

  const introText = introduction?.[0]?.text || '';
  const highlightText = highlights?.[0]?.text || '';

  return (
    <>
      {/* Introduction Section */}
      {introText && (
        <section id="about" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                Who We Are
              </h2>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                {introText}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Cards Section */}
      {cards && cards.length > 0 && (
        <section id="services" className="bg-muted/30 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                What We Do
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Comprehensive solutions tailored to your needs
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {cards.map((card, index) => {
                const IconComponent = card.icon ? iconMap[card.icon] : null;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 card-shadow hover:card-shadow-hover"
                  >
                    {card.image && (
                      <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}

                    {IconComponent && (
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <IconComponent className="h-6 w-6" />
                      </div>
                    )}

                    <h3 className="font-display text-xl font-semibold text-card-foreground">
                      {card.title}
                    </h3>

                    <p className="mt-2 flex-grow text-muted-foreground">
                      {card.description}
                    </p>

                    <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Learn more
                      <svg
                        className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Carousel Section */}
      {carousel && carousel.length > 0 && (
        <section id="portfolio" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                Our Work
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A selection of projects we're proud of
              </p>
            </motion.div>

            <Carousel
              opts={{ align: 'start', loop: true }}
              className="mx-auto w-full max-w-5xl"
            >
              <CarouselContent className="-ml-4">
                {carousel.map((item, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="group cursor-pointer"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl card-shadow">
                        <img
                          src={item.image}
                          alt={item.title || `Portfolio ${index + 1}`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          {item.category && (
                            <span className="mb-1 inline-block text-xs font-medium uppercase tracking-wider text-primary">
                              {item.category}
                            </span>
                          )}
                          {item.title && (
                            <h3 className="font-display text-lg font-semibold text-foreground">
                              {item.title}
                            </h3>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </section>
      )}

      {/* Highlights / CTA Section */}
      {highlightText && (
        <section id="contact" className="bg-primary/5 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-2xl text-center"
            >
              <p className="text-lg font-medium text-primary">{highlightText}</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                Let's Work Together
              </h2>
              <p className="mt-4 text-muted-foreground">
                Ready to start your next project? Get in touch with us.
              </p>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
};
