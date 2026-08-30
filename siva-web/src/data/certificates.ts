export interface Certificate {
  id: string;
  title: string;
  organization: string;
  date: string;
  image?: string | null;
  credentialUrl?: string | null;
  description?: string;
}

// Keep verified certificate details here until an authenticated CMS or API is connected.
export const certificates: Certificate[] = [
  // Add only verified certificates here.
  // {
  //   id: 'certificate-slug',
  //   title: 'Certificate Name',
  //   organization: 'Issuing Organization',
  //   date: '2026',
  //   image: '/certificates/certificate-slug.webp',
  //   credentialUrl: 'https://credential.example.com/verify',
  //   description: 'What this verified certificate represents.',
  // },
];
