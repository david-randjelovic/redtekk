export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export interface FooterLink {
  readonly label: string;
  /** Anchor/external target. Omit when the link opens a popup instead of navigating. */
  readonly href?: string;
  /** Internal router path (SPA navigation), e.g. "/privacy-policy". */
  readonly route?: string;
  /** When set, the link opens the matching service detail popup instead of navigating. */
  readonly serviceId?: string;
  /** When set, the link triggers a popup action instead of navigating. */
  readonly action?: 'calendar' | 'cookies';
}

export interface FooterColumn {
  readonly title: string;
  readonly links: ReadonlyArray<FooterLink>;
}

export interface FooterSocialLink extends NavLink {
  readonly icon: 'twitter' | 'linkedin' | 'dribbble' | 'github';
}
