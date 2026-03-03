import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SectionProp } from '@/types/blocks';
import { getProp } from './DynamicSection';
import { Button } from '@/components/ui/button';
import { usePageContext } from '@/context/PageContext';

interface Props {
  props: SectionProp[];
}

export const HeaderSection = ({ props }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { navigateTo } = usePageContext();

  const logoProp = getProp(props, 'logo');
  const navbarProp = getProp(props, 'navbar');
  const actionProp = getProp(props, 'actionButton');

  const logoItem = logoProp?.children?.[0];
  const navItems = navbarProp?.children || [];
  const actionItems = actionProp?.children || [];

  const handleClick = (e: React.MouseEvent, label: string, href: string) => {
    if (href.startsWith('http') || href.startsWith('mailto:')) return;
    e.preventDefault();
    navigateTo(label);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20">
        {logoItem && (
          <a href="/" className="flex items-center gap-2" onClick={(e) => handleClick(e, 'Home', '/')}>
            {logoItem.href ? (
              <img src={logoItem.href} alt={logoItem.alt || 'Logo'} className="h-8 w-auto object-contain" />
            ) : (
              <span className="font-display text-2xl font-bold tracking-tight text-foreground">Logo</span>
            )}
          </a>
        )}

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              onClick={(e) => handleClick(e, item.label, item.href)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
            >
              {item.label}
            </a>
          ))}
          {actionItems.map((item, i) => (
            <Button key={i} asChild>
              <a href={item.href} onClick={(e) => handleClick(e, item.label, item.href)}>{item.label}</a>
            </Button>
          ))}
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted md:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

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
              {navItems.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  onClick={(e) => { handleClick(e, item.label, item.href); setIsMenuOpen(false); }}
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
              {actionItems.map((item, i) => (
                <Button key={i} asChild className="mt-2 w-full">
                  <a href={item.href} onClick={(e) => handleClick(e, item.label, item.href)}>{item.label}</a>
                </Button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
