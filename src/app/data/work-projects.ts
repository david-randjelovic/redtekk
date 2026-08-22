import { WorkProject } from '../interfaces/work-page.interfaces';

export const WORK_PROJECTS: ReadonlyArray<WorkProject> = [
  { slug: 'herdspace', name: 'HerdSpace', category: 'Marketplace', description: 'AI-powered horse marketplace', image: 'assets/work/herdspace.webp' },
  { slug: 'tangle', name: 'Tangle', category: 'Manufacturing', description: 'AI-powered ERP for manufacturing', image: 'assets/work/tangle.webp' },
  { slug: 'the-summit', name: 'The Summit', category: 'Real Estate', description: 'Landing page for a luxury villa development', image: 'assets/work/the-summit.webp' },
  { slug: 'solar-operations', name: 'Solar Operations Platform', category: 'Renewable', description: 'Real-time solar monitoring dashboard', nda: true },
  { slug: 'pv-design', name: 'PV Design Platform', category: 'Energy', description: 'Guided PV system design and reporting', nda: true },
  { slug: 'tim', name: 'TIM', category: 'SaaS', description: 'Restaurant table management', image: 'assets/work/tim.webp' },
  { slug: 'mcpr', name: 'MCPR', category: 'Music', description: 'Electronic music & PR site', image: 'assets/work/mcpr.webp' },
  { slug: 'befive', name: 'Befive', category: 'Esports', description: 'Esports organization website', image: 'assets/work/befive.webp' },
  { slug: 'prvenstvo', name: 'Prvenstvo', category: 'Education', description: 'Driving school website', image: 'assets/work/prvenstvo.webp' },
  { slug: 'xelpi', name: 'Xelpi', category: 'Web Studio', description: 'Web development company site', image: 'assets/work/xelpi.webp' },
  { slug: 'zvrk', name: 'ZVRK', category: 'E-commerce', description: 'Kids clothing store', image: 'assets/work/zvrk.webp' },
  { slug: 'solar-planning', name: 'Solar Planning App', category: 'Renewable', description: 'Planning tool for solar installers', nda: true },
  { slug: 'wine-b2b', name: 'Wine B2B Shop', category: 'B2B Commerce', description: 'Wholesale platform for the wine trade', nda: true },
  { slug: 'wine-b2c', name: 'Wine B2C Shop', category: 'E-commerce', description: 'Direct-to-consumer wine store', nda: true },
];
