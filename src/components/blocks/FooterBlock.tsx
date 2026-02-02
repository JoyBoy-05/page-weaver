import { motion } from 'framer-motion';
import { FooterProps } from '@/types/blocks';

interface Props {
  props: FooterProps;
}

export const FooterBlock = ({ props }: Props) => {
  const { logo, columns, copyright } = props;

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-border bg-card"
    >
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <a
              href={logo.href}
              className="inline-block font-display text-2xl font-bold tracking-tight text-foreground transition-colors hover:text-primary"
            >
              {logo.text}
            </a>
            <p className="mt-4 max-w-xs text-muted-foreground">
              Crafting digital experiences that inspire and drive results.
            </p>
          </div>

          {/* Link Columns */}
          {columns.map((column, index) => (
            <div key={index}>
              <h4 className="font-semibold text-foreground">
                {column.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            {copyright}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
