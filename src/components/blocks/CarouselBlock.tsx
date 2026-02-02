import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CarouselProps } from '@/types/blocks';
import { Button } from '@/components/ui/button';

interface Props {
  props: CarouselProps;
}

export const CarouselBlock = ({ props }: Props) => {
  const { id, title, subtitle, items } = props;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id={id} className="overflow-hidden bg-muted py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col items-center justify-between gap-4 md:mb-16 md:flex-row"
        >
          <div className="text-center md:text-left">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 text-lg text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="h-12 w-12 rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="h-12 w-12 rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 scrollbar-hide md:px-[calc((100vw-1280px)/2+1rem)]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative min-w-[300px] flex-shrink-0 snap-start sm:min-w-[400px]"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-xl card-shadow">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                {item.category && (
                  <span className="text-sm font-medium uppercase tracking-wider opacity-80">
                    {item.category}
                  </span>
                )}
                <h3 className="mt-1 font-display text-xl font-semibold">
                  {item.title}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
