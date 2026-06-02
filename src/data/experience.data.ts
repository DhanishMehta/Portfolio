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
      { value: '85%+', label: 'Code coverage achieved' },
      { value: '30%', label: 'Faster load times' },
      { value: '10+', label: 'Engineers mentored' },
      { value: '98%', label: 'Manual hiring effort eliminated' },
    ],
    description:
      'Drive AI-assisted development with Claude Code and LLMs for faster delivery and reviews. Accelerated product onboarding 75% via Angular, Java, Quarkus, and Kubernetes. Raised code coverage from 0% to 85%+, optimized performance with NgRx caching (30% faster loads), mentored 10+ developers, and built RecruitMate — automated scheduling for 750+ interviews, eliminating 98% of manual effort.',
    awards: ['Q3 Platinum Excellence Award 2024', 'Q1 Amazing Contributions Award 2025'],
  },
  {
    company: 'KCPL',
    role: 'Software Engineering Intern',
    duration: 'May 2022 – Jan 2023',
    stats: [
      { value: 'React', label: 'Frontend stack' },
      { value: 'Python', label: 'Automation scripts' },
    ],
    description:
      'Delivered end-to-end web solutions on React.js, optimized SEO, and architected scalable cloud-based systems for data storage and maintainability. Automated business workflows — sales, warehousing, purchase, and stock — using Python and Excel VBA, eliminating single points of failure.',
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
