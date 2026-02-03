import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { HeaderData } from '@/types/blocks';
import { Button } from '@/components/ui/button';

interface Props {
  data: HeaderData;
}

export const HeaderSection = ({ data }: Props) => {
  const { logo, navbar, actionButton } = data;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoItem = logo?.[0];
  const ctaItem = actionButton?.[0];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          {logoItem?.url ? (
            <img
              src={logoItem.url}
              alt={logoItem.alt || 'Logo'}
              className="h-8 w-auto object-contain"
            />
          ) : (
            <span className="font-display text-2xl font-bold tracking-tight text-foreground">
              Artisan
            </span>
          )}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navbar?.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          {ctaItem && (
            <Button asChild>
              <a href={ctaItem.href}>{ctaItem.label}</a>
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted md:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-border bg-background md:hidden"
          >
            <nav className="container mx-auto flex flex-col gap-4 px-4 py-6">
              {navbar?.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
              {ctaItem && (
                <Button asChild className="mt-2 w-full">
                  <a href={ctaItem.href}>{ctaItem.label}</a>
                </Button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
