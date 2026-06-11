import { Component } from '@angular/core';

interface WorkProject {
  name: string;
  category: string;
  description: string;
  /** Screenshot path. Omit for confidential (NDA) projects. */
  image?: string;
  nda?: boolean;
}

@Component({
  standalone: true,
  selector: 'app-case-studies-section',
  imports: [],
  templateUrl: './case-studies-section.component.html',
  styleUrl: './case-studies-section.component.scss',
})
export class CaseStudiesSectionComponent {
  protected readonly projects: WorkProject[] = [
    { name: 'HerdSpace', category: 'Marketplace', description: 'AI-powered horse marketplace', image: 'assets/work/herdspace.webp' },
    { name: 'Tangle', category: 'Manufacturing', description: 'AI-powered ERP for manufacturing', image: 'assets/work/tangle.webp' },
    { name: 'Solar Planning App', category: 'Renewable', description: 'Planning tool for solar installers', nda: true },
    { name: 'Befive', category: 'Esports', description: 'Esports organization website', image: 'assets/work/befive.webp' },
    { name: 'Peakflow', category: 'Marketing', description: 'Marketing agency website', image: 'assets/work/peakflow.webp' },
    { name: 'Wine B2B Shop', category: 'B2B Commerce', description: 'Wholesale platform for the wine trade', nda: true },
    { name: 'Xelpi', category: 'Web Studio', description: 'Web development company site', image: 'assets/work/xelpi.webp' },
    { name: 'MCPR', category: 'Music', description: 'Electronic music & PR site', image: 'assets/work/mcpr.webp' },
    { name: 'Inverter App', category: 'Energy', description: 'Inverter monitoring application', nda: true },
    { name: 'Prvenstvo', category: 'Education', description: 'Driving school website', image: 'assets/work/prvenstvo.webp' },
    { name: 'ZVRK', category: 'E-commerce', description: 'Kids clothing store', image: 'assets/work/zvrk.webp' },
    { name: 'Solar Panel App', category: 'Renewable', description: 'Solar panel management application', nda: true },
    { name: 'TIM', category: 'SaaS', description: 'Restaurant table management', image: 'assets/work/tim.webp' },
    { name: 'Wine B2C Shop', category: 'E-commerce', description: 'Direct-to-consumer wine store', nda: true },
  ];
}
