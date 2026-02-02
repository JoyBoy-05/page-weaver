import { motion } from 'framer-motion';
import { Palette, Code, Smartphone, TrendingUp, Star, Zap, Shield, Globe } from 'lucide-react';
import { CardProps } from '@/types/blocks';

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
  props: CardProps;
  index?: number;
}

export const CardBlock = ({ props, index = 0 }: Props) => {
  const { icon, title, description, image, href } = props;
  const IconComponent = icon ? iconMap[icon] : null;

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 card-shadow hover:card-shadow-hover"
    >
      {image && (
        <div className="mb-4 aspect-video overflow-hidden rounded-lg">
          <img
            src={image.src}
            alt={image.alt}
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
        {title}
      </h3>
      
      <p className="mt-2 flex-grow text-muted-foreground">
        {description}
      </p>

      {/* Hover indicator */}
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

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
};
