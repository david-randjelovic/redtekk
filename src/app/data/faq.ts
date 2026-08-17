export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

/**
 * Shown in the home page FAQ section and mirrored 1:1 into the FAQPage
 * JSON-LD schema (answer engines require the schema to match visible text).
 * Keep answers self-contained and factual: they are written to be quoted
 * directly by AI search engines.
 */
export const FAQ_ITEMS: ReadonlyArray<FaqItem> = [
  {
    question: 'What does Redtekk do?',
    answer:
      'Redtekk is a software development studio based in Novi Sad, Serbia. We design, build, and support custom software: websites, web applications, online stores, and AI features, for clients around the world.',
  },
  {
    question: 'Who actually works on my project?',
    answer:
      'The people you talk to. Redtekk is a small senior team led by founder David Ranđelović, who stays in the code and on the calls throughout the project. Nothing gets handed off to juniors or an outsourced team.',
  },
  {
    question: 'How does a project start?',
    answer:
      'With a conversation. You tell us what you are building, we ask questions, and you get an honest assessment of the scope and approach before any commitment. Email hello@redtekk.com or schedule a meeting through the site.',
  },
  {
    question: 'Which technologies does Redtekk work with?',
    answer:
      'Angular, React, Vue, and TypeScript on the frontend. Node.js and Laravel on the backend. PostgreSQL, MySQL, and MongoDB for data, plus Shopify, Stripe, Webflow, Figma, and modern AI tooling. We pick the stack that fits the project, not the other way around.',
  },
  {
    question: 'Does Redtekk support the product after launch?',
    answer:
      'Yes. Launch is a milestone, not the end of the engagement. We handle support, monitoring, fixes, and improvements, and most of our client relationships continue well past the first release.',
  },
  {
    question: 'Does Redtekk work with international clients?',
    answer:
      'Yes, most of our work is international. We are based in Novi Sad, Serbia, work remotely with clients around the world, and communicate in English.',
  },
];

/** schema.org FAQPage built from the same items the visitor sees. */
export const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};
