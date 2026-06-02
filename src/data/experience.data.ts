export interface ExperienceStat {
  value: string;
  label: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  isCurrent?: boolean;
  stats: ExperienceStat[];
  description: string;
  awards?: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Chubb',
    role: 'Software Engineer, Core AI Team',
    duration: 'Sept 2023 – Present',
    isCurrent: true,
    stats: [
      { value: '75%', label: 'Faster product onboarding' },
      { value: '80%', label: 'Code coverage achieved' },
      { value: '30%', label: 'Faster load times' },
      { value: '10+', label: 'Engineers mentored' },
      { value: '98%', label: 'Manual hiring effort eliminated' },
    ],
    description:
      'Accelerated insurance product onboarding via full-stack solutions (Angular, Java, Quarkus, Kubernetes). Built reusable components, raised code coverage to 80%, optimized performance with caching and NgRx, mentored 10+ juniors, and built RecruitMate — an automated L&D hiring solution reducing manual effort by 98%.',
    awards: ['Q3 Platinum Excellence Award 2024', 'Q1 Amazing Contributions Award 2025'],
  },
  {
    company: 'KCPL',
    role: 'Solutions Developer',
    duration: '2022 – 2023',
    stats: [
      { value: 'Full', label: 'Client solutions delivered' },
      { value: 'Cloud', label: 'Architecture designed' },
    ],
    description:
      'End-to-end solutions including portfolio websites, SEO optimization, and scalable cloud architecture. Automated sales, warehousing, purchase, and stock processes with Python and Excel VBA, streamlining business operations.',
  },
  {
    company: 'National Service Scheme, KIIT',
    role: 'Student Coordinator → Project Rep → Graphic Design Lead',
    duration: '2021 – 2024',
    stats: [
      { value: '600+', label: 'Volunteers coordinated' },
      { value: '40', label: 'People managed (project)' },
      { value: '15', label: 'Design team members led' },
    ],
    description:
      'Joined as a volunteer, promoted to Project Representative managing 40 people, then Student Coordinator for 600+ volunteers. Led a design team of 15. Organized blood donation drives, slum visits, orphanage visits. Won University Level Best Volunteer Award.',
    awards: ['University Level Best Volunteer Award 2023'],
  },
];
