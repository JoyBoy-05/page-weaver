import { motion } from 'framer-motion';
import { Twitter, Linkedin, Instagram, Github, Facebook, Youtube } from 'lucide-react';
import { SectionProp } from '@/types/blocks';
import { getProp } from './DynamicSection';

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  twitter: Twitter, linkedin: Linkedin, instagram: Instagram,
  github: Github, facebook: Facebook, youtube: Youtube,
};

interface Props {
  props: SectionProp[];
}

export const FooterSection = ({ props }: Props) => {
  const linksProp = getProp(props, 'links');
  const socialProp = getProp(props, 'socialIcons');
  const contactProp = getProp(props, 'contactInfo');
  const copyrightProp = getProp(props, 'copyrights');

  const links = linksProp?.children || [];
  const socialIcons = socialProp?.children || [];
  const contactEmail = contactProp?.children?.[0]?.email || '';
  const copyrightText = copyrightProp?.children?.[0]?.text || '';

  return (
    <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <span className="font-display text-2xl font-bold tracking-tight text-foreground">Artisan</span>
            <p className="mt-4 max-w-xs text-muted-foreground">Crafting digital experiences that inspire and drive results.</p>
            {contactEmail && (
              <a href={`mailto:${contactEmail}`} className="mt-4 inline-block text-muted-foreground transition-colors hover:text-foreground">{contactEmail}</a>
            )}
          </div>

          {links.length > 0 && (
            <div className="lg:col-span-2">
              <h4 className="font-semibold text-foreground">Quick Links</h4>
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {links.map((link, i) => (
                  <li key={i}><a href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">{link.label}</a></li>
                ))}
              </ul>
            </div>
          )}

          {socialIcons.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground">Connect</h4>
              <div className="mt-4 flex gap-4">
                {socialIcons.map((social, i) => {
                  const Icon = socialIconMap[social.platform?.toLowerCase()];
                  if (!Icon) return null;
                  return (
                    <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground" aria-label={social.platform}>
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">{copyrightText}</p>
        </div>
      </div>
    </motion.footer>
  );
};
