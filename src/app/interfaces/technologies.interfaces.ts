export interface TechnologyItem {
  readonly name: string;
  readonly icon: string;
  readonly note: string;
}

export interface TechnologyCategory {
  readonly title: string;
  readonly description: string;
  readonly items: ReadonlyArray<TechnologyItem>;
}
