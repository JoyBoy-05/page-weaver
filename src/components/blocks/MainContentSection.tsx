import { motion } from 'framer-motion';
import { Palette, Code, Smartphone, TrendingUp, Star, Zap, Shield, Globe } from 'lucide-react';
import { SectionProp } from '@/types/blocks';
import { getAllProps, getProp } from './DynamicSection';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  palette: Palette, code: Code, smartphone: Smartphone, 'trending-up': TrendingUp,
  star: Star, zap: Zap, shield: Shield, globe: Globe,
};

interface Props {
  props: SectionProp[];
}

/** Renders each prop dynamically based on its id */
const RenderProp = ({ prop }: { prop: SectionProp }) => {
  const { id, children } = prop;

  // Heading / SubHeading / Introduction — render text with tag
  if (['Heading', 'subHeading', 'introduction'].includes(id)) {
    return (
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl text-center">
            {children.map((child, i) => {
              const Tag = (child.tag as keyof JSX.IntrinsicElements) || 'p';
              const isHeading = ['h1','h2','h3','h4','h5','h6'].includes(child.tag);
              return (
                <Tag key={i} className={isHeading ? 'font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl' : 'mt-6 text-lg text-muted-foreground md:text-xl'}>
                  {child.text}
                </Tag>
              );
            })}
          </motion.div>
        </div>
      </section>
    );
  }

  // Cards
  if (id === 'cards') {
    return (
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {children.map((card, i) => {
              const IconComponent = card.icon ? iconMap[card.icon] : null;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -4 }} className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 card-shadow hover:card-shadow-hover">
                  {card.image && (
                    <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                      <img src={card.image} alt={card.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                  )}
                  {IconComponent && (
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <IconComponent className="h-6 w-6" />
                    </div>
                  )}
                  <h3 className="font-display text-xl font-semibold text-card-foreground">{card.title}</h3>
                  <p className="mt-2 flex-grow text-muted-foreground">{card.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Carousel
  if (id === 'carousel') {
    return (
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <Carousel opts={{ align: 'start', loop: true }} className="mx-auto w-full max-w-5xl">
            <CarouselContent className="-ml-4">
              {children.map((item, i) => (
                <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -4 }} className="group cursor-pointer">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl card-shadow">
                      <img src={item.href || item.image} alt={item.title || `Slide ${i + 1}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        {item.category && <span className="mb-1 inline-block text-xs font-medium uppercase tracking-wider text-primary">{item.category}</span>}
                        {item.title && <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>}
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
    );
  }

  // Highlights
  if (id === 'highlights') {
    return (
      <section className="bg-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto max-w-2xl text-center">
            {children.map((h, i) => (
              <p key={i} className="text-lg font-medium text-primary">{h.text}</p>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  // Generic fallback — render text children
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {children.map((child, i) => (
          <div key={i} className="text-muted-foreground">
            {child.text && <p>{child.text}</p>}
            {child.label && <a href={child.href} className="text-primary hover:underline">{child.label}</a>}
          </div>
        ))}
      </div>
    </section>
  );
};

export const MainContentSection = ({ props }: Props) => {
  return (
    <>
      {props.map((prop, i) => (
        <RenderProp key={`${prop.id}-${i}`} prop={prop} />
      ))}
    </>
  );
};
