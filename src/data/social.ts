export type SocialId = 'tiktok' | 'instagram' | 'facebook';

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
};
