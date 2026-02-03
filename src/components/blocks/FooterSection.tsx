import { motion } from 'framer-motion';
import { Twitter, Linkedin, Instagram, Github, Facebook, Youtube } from 'lucide-react';
import { FooterData } from '@/types/blocks';

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
};

interface Props {
  data: FooterData;
}

export const FooterSection = ({ data }: Props) => {
  const { links, socialIcons, contactInfo, copyrights } = data;

  const copyrightText = copyrights?.[0]?.text || '';
  const contactEmail = contactInfo?.[0]?.email || '';

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-border bg-card"
    >
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <span className="font-display text-2xl font-bold tracking-tight text-foreground">
              Artisan
            </span>
            <p className="mt-4 max-w-xs text-muted-foreground">
              Crafting digital experiences that inspire and drive results.
            </p>
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="mt-4 inline-block text-muted-foreground transition-colors hover:text-foreground"
              >
                {contactEmail}
              </a>
            )}
          </div>

          {/* Links */}
          {links && links.length > 0 && (
            <div className="lg:col-span-2">
              <h4 className="font-semibold text-foreground">Quick Links</h4>
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {links.map((link, index) => (
                  <li key={index}>
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
          )}

          {/* Social Icons */}
          {socialIcons && socialIcons.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground">Connect</h4>
              <div className="mt-4 flex gap-4">
                {socialIcons.map((social, index) => {
                  const IconComponent = socialIconMap[social.platform.toLowerCase()];
                  if (!IconComponent) return null;

                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                      aria-label={social.platform}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">{copyrightText}</p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
