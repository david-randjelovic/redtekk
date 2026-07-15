export interface WorkProject {
  readonly slug: string;
  readonly name: string;
  readonly category: string;
  readonly description: string;
  /** Screenshot path. Omit for confidential (NDA) projects. */
  readonly image?: string;
  readonly nda?: boolean;
}

export interface WorkDetailFeature {
  readonly title: string;
  readonly text: string;
}

export interface WorkDetailStat {
  /** Numeric part only; animated by the count-up directive. */
  readonly value: number;
  readonly prefix?: string;
  readonly suffix: string;
  readonly label: string;
}

export interface WorkProjectDetail {
  readonly slug: string;
  /** Short headline for the hero, plain language. */
  readonly tagline: string;
  /** What the project is and what was done, 2-3 plain sentences. */
  readonly summary: string;
  /**
   * Honest one-liner about who did the work and in what setting
   * (freelance vs. agency employment). Redtekk as a company did not
   * deliver these projects; keep the attribution transparent.
   */
  readonly attribution: string;
  readonly problem: string;
  readonly solution: string;
  readonly features: ReadonlyArray<WorkDetailFeature>;
  readonly role: string;
  readonly stack: ReadonlyArray<string>;
  readonly stats: ReadonlyArray<WorkDetailStat>;
  readonly liveUrl?: string;
}
