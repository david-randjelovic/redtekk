export interface WorkProject {
  readonly name: string;
  readonly category: string;
  readonly description: string;
  /** Screenshot path. Omit for confidential (NDA) projects. */
  readonly image?: string;
  readonly nda?: boolean;
}
