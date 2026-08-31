export type SocialId = 'tiktok' | 'instagram' | 'facebook' | 'whatsapp';

export interface SocialLink {
  id: SocialId;
  href: string;
}

export const SOCIAL: Record<SocialId, SocialLink> = {
  tiktok: {
    id: 'tiktok',
    href: 'https://www.tiktok.com/@kodi.cr',
  },
  instagram: {
    id: 'instagram',
    href: 'https://www.instagram.com/kodicostarica',
  },
  facebook: {
    id: 'facebook',
    href: 'https://www.facebook.com/profile.php?id=61592150840071',
  },
  // Canal de WhatsApp (difusión), no un chat: se sigue, no se responde.
  whatsapp: {
    id: 'whatsapp',
    href: 'https://whatsapp.com/channel/0029Vb8krTU002T8RIMfn431',
  },
};
