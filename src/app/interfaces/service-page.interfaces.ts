export interface ServicePageCard {
  readonly eyebrow: string;
  readonly title: string;
  readonly text: string;
}

export interface ServicePageStep {
  readonly title: string;
  readonly text: string;
}

export interface ServicePageHighlight {
  readonly title: string;
  readonly text: string;
}

export interface ServicePageContent {
  readonly slug: string;
  readonly num: string;
  readonly label: string;
  readonly title: string;
  readonly tagline: string;
  readonly intro: string;
  readonly highlightOne: ServicePageHighlight;
  readonly highlightTwo: ServicePageHighlight;
  readonly deliverablesIntro: string;
  readonly deliverables: ReadonlyArray<ServicePageCard>;
  readonly processIntro: string;
  readonly processSteps: ReadonlyArray<ServicePageStep>;
  readonly whyEyebrow: string;
  readonly whyTitle: string;
  readonly whyText: string;
  readonly whyCards: ReadonlyArray<ServicePageCard>;
  readonly ctaTitle: string;
  readonly ctaText: string;
}
