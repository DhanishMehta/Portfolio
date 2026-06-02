export interface Award {
  title: string;
  issuer: string;
  year?: number;
  type: 'award' | 'certification';
  highlight?: boolean;
}

export const AWARDS: Award[] = [
  {
    title: 'Q3 Platinum Excellence Award',
    issuer: 'Chubb',
    year: 2024,
    type: 'award',
    highlight: true,
  },
  {
    title: 'Q1 Amazing Contributions Award',
    issuer: 'Chubb',
    year: 2025,
    type: 'award',
    highlight: true,
  },
  {
    title: 'University Level Best Volunteer Award',
    issuer: 'National Service Scheme',
    year: 2023,
    type: 'award',
    highlight: true,
  },
  {
    title: 'Certified Angular Developer',
    issuer: 'Certificates.dev',
    type: 'certification',
    highlight: true,
  },
  {
    title: 'Prompt Engineering',
    issuer: 'PluralSight',
    type: 'certification',
  },
  {
    title: 'AI for Software Developers',
    issuer: 'PluralSight',
    type: 'certification',
  },
  {
    title: 'IBM AI Series',
    issuer: 'IBM',
    type: 'certification',
  },
  {
    title: 'AWS Cloud Foundations',
    issuer: 'AWS Academy',
    year: 2023,
    type: 'certification',
  },
  {
    title: 'Azure AZ-204',
    issuer: 'Microsoft',
    type: 'certification',
  },
];
