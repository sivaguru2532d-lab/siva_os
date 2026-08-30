export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  ariaLabel: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/sivaguru2532d-lab/Siva',
    icon: 'github',
    ariaLabel: 'View GitHub profile',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/siva-guru-m-b84175370',
    icon: 'linkedin',
    ariaLabel: 'View LinkedIn profile',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/_s_i_v_a_g_u_r_u',
    icon: 'instagram',
    ariaLabel: 'View Instagram profile',
  },
  {
    name: 'Email',
    url: 'mailto:sivaguru2532d@gmail.com',
    icon: 'mail',
    ariaLabel: 'Send email',
  },
];

export const contactInfo = {
  email: 'sivaguru2532d@gmail.com',
  phone: '+91 9444074608',
};