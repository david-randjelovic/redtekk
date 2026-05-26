export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export interface FooterColumn {
  readonly title: string;
  readonly links: ReadonlyArray<NavLink>;
}

export interface FooterSocialLink extends NavLink {
  readonly icon: 'twitter' | 'linkedin' | 'dribbble' | 'github';
}
