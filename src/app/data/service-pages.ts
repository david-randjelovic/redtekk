import { ServicePageContent } from '../interfaces/service-page.interfaces';

export const SERVICE_PAGES: ReadonlyArray<ServicePageContent> = [
  {
    slug: 'design',
    num: '01',
    label: 'Identity',
    title: 'Design',
    tagline: 'Design that builds trust before a word is read.',
    intro:
      'We design brand identities, websites, and product interfaces that communicate clearly and look credible from the first screen. Every layout, color, and interaction choice is made on purpose.',
    highlightOne: {
      title: 'Every project starts with research, not guesswork.',
      text: 'We study your audience, competitors, and goals before opening a design tool, then design around what moves your business forward, not whatever is trending this year.',
    },
    highlightTwo: {
      title: 'Senior designers handle every project end to end.',
      text: 'The same designer who scopes your project stays on it through final delivery, so context and decisions never get lost in a handoff between people.',
    },
    deliverablesIntro:
      'Every design engagement is scoped around a clear set of deliverables you can point to, not an open-ended retainer.',
    deliverables: [
      { eyebrow: 'Brand', title: 'Visual identity systems', text: 'Logo, color, typography, and usage rules that stay consistent across every channel.' },
      { eyebrow: 'Web', title: 'Website & landing pages', text: 'Marketing sites and landing pages designed to explain the product and convert visitors.' },
      { eyebrow: 'Product', title: 'App & dashboard UI', text: 'Interfaces for web and mobile products, built around real user flows, not just screens.' },
      { eyebrow: 'Systems', title: 'Design systems', text: 'Reusable components and documentation so your team can design and build consistently.' },
    ],
    processIntro:
      'Design moves through a fixed set of steps so nothing gets skipped, and you always know what stage the work is at.',
    processSteps: [
      { title: 'Research & briefing', text: 'We learn your audience, competitors, and goals before opening any design tool.' },
      { title: 'Concepts & direction', text: 'We explore a small number of strong directions instead of many shallow ones.' },
      { title: 'Design & prototyping', text: 'Screens are built into clickable prototypes so flows can be tested before development starts.' },
      { title: 'Senior design review', text: 'Every screen is checked for hierarchy, accessibility, and brand consistency.' },
      { title: 'Handoff & specs', text: 'Developers receive organized files, specs, and assets ready for implementation.' },
    ],
    whyEyebrow: 'Why Redtekk',
    whyTitle: 'Design work that holds up after launch.',
    whyText: 'Good design is not just how it looks on day one. We design for real content, real edge cases, and real growth, so the product still works a year from now.',
    whyCards: [
      { eyebrow: 'Process', title: 'Reviewed at every stage', text: 'Concepts, prototypes, and final files all pass through senior review before moving forward.' },
      { eyebrow: 'Standards', title: 'Accessibility is not optional', text: 'Contrast, spacing, and interaction states are checked against WCAG guidelines.' },
      { eyebrow: 'Consistency', title: 'One team, one design language', text: 'The same senior designers stay on the project from concept to handoff.' },
    ],
    ctaTitle: 'Have a brand or product that needs a clearer look?',
    ctaText: 'Share what you have today. We will tell you honestly what needs design work and what does not.',
  },
  {
    slug: 'development',
    num: '02',
    label: 'Build',
    title: 'Development',
    tagline: 'Code built to scale with your business.',
    intro:
      'We build websites, web applications, and mobile apps with clean architecture and maintainable code. The goal is software your team can keep building on for years, not just a working demo.',
    highlightOne: {
      title: 'Clean architecture from day one.',
      text: 'We plan the technical foundation before writing feature code, so the product can grow without a costly rewrite twelve months in.',
    },
    highlightTwo: {
      title: 'Every pull request gets a senior review.',
      text: 'Code ships only after a senior engineer checks it for correctness, security, and long-term maintainability.',
    },
    deliverablesIntro:
      'Development engagements are scoped around concrete products and features, with a clear definition of what "done" looks like.',
    deliverables: [
      { eyebrow: 'Web', title: 'Websites & landing pages', text: 'Fast, responsive marketing sites built on modern frameworks.' },
      { eyebrow: 'Product', title: 'Web applications', text: 'Dashboards, portals, and internal tools with real business logic.' },
      { eyebrow: 'Mobile', title: 'Mobile applications', text: 'Native-feeling apps for iOS and Android from a shared codebase.' },
      { eyebrow: 'Backend', title: 'APIs & backends', text: 'Reliable backend services designed around your data and workflows.' },
    ],
    processIntro:
      'Development follows a clear loop of planning, building, and review, so quality does not depend on who happens to be available that week.',
    processSteps: [
      { title: 'Technical scoping', text: 'We break the product into a clear architecture and a realistic delivery plan.' },
      { title: 'Setup & foundations', text: 'Repositories, environments, and CI are configured before feature work starts.' },
      { title: 'Implementation', text: 'Features are built against the agreed architecture, with regular check-ins so there are no surprises at the end.' },
      { title: 'Code review', text: 'Every change is reviewed for correctness, performance, and security before merging.' },
      { title: 'Testing & release', text: 'Features are tested end to end and released through a controlled deployment process.' },
    ],
    whyEyebrow: 'Why Redtekk',
    whyTitle: 'Software that keeps working after launch.',
    whyText: 'We build for maintainability first, so adding a feature next year does not turn into a rebuild. You get code your next developer can actually read.',
    whyCards: [
      { eyebrow: 'Architecture', title: 'Built to scale, not just to ship', text: 'We choose patterns and infrastructure that fit your traffic and team size, not the trend of the week.' },
      { eyebrow: 'Security', title: 'Reviewed against real risks', text: 'Authentication, data handling, and dependencies are checked as part of every release.' },
      { eyebrow: 'Ownership', title: 'Senior engineers, start to finish', text: 'The same engineers who scope the project stay responsible for what gets shipped.' },
    ],
    ctaTitle: 'Have a product that needs to be built right the first time?',
    ctaText: 'Tell us what you are trying to build. We will give you a clear technical plan before any code is written.',
  },
  {
    slug: 'ai',
    num: '03',
    label: 'Innovate',
    title: 'AI Solutions',
    tagline: 'AI features that solve real problems.',
    intro:
      'We design and build AI features that fit naturally into your product: automation, smart search, and assistants that save real time for your team and your customers.',
    highlightOne: {
      title: 'We start with the workflow, not the model.',
      text: 'Every AI feature begins with a clear problem and a measurable goal. If a simpler solution solves it just as well, we will tell you.',
    },
    highlightTwo: {
      title: 'Built with guardrails and fallbacks.',
      text: 'Permissions, rate limits, and fallback behavior are part of the design from the start, so the feature behaves predictably once it is live.',
    },
    deliverablesIntro:
      'AI work is scoped as a product feature with a clear outcome, not an open-ended experiment.',
    deliverables: [
      { eyebrow: 'Features', title: 'AI feature integration', text: 'Chat, search, and automation built into your product, not bolted on.' },
      { eyebrow: 'Automation', title: 'Workflow automation', text: 'Repetitive manual tasks replaced with reliable automated steps.' },
      { eyebrow: 'Agents', title: 'Assistants & agents', text: 'Conversational tools that help your team or your customers get answers faster.' },
      { eyebrow: 'Models', title: 'Model & API integration', text: 'Custom model and API integration tailored to your data and use case.' },
    ],
    processIntro:
      'AI features follow the same rigor as any other feature: a clear problem, a working prototype, and a review before launch.',
    processSteps: [
      { title: 'Opportunity mapping', text: 'We identify workflows where a feature would save real time or improve real decisions.' },
      { title: 'Prototype first', text: 'A working prototype is built before any commitment to a full feature.' },
      { title: 'Guardrail design', text: 'We define permissions, limits, and fallback behavior before launch.' },
      { title: 'Senior review', text: 'Outputs and edge cases are tested by senior engineers before anything reaches a user.' },
      { title: 'Monitor & improve', text: 'We track usage and accuracy after launch and adjust based on real data.' },
    ],
    whyEyebrow: 'Why Redtekk',
    whyTitle: 'Built to be reliable, not just impressive in a demo.',
    whyText: 'We test for edge cases and failure modes, set clear data-access rules, and keep a person accountable for what the feature does in production.',
    whyCards: [
      { eyebrow: 'Reliability', title: 'Tested beyond the happy path', text: 'We test edge cases, bad inputs, and failure modes, not only the ideal scenario.' },
      { eyebrow: 'Data', title: 'Careful with what the system sees', text: 'Access control and data handling are designed in from the start, not added later.' },
      { eyebrow: 'Accountability', title: 'A person is always responsible', text: 'The feature assists the workflow. Redtekk engineers remain accountable for the outcome.' },
    ],
    ctaTitle: 'Curious where AI could actually help your business?',
    ctaText: 'We will help you separate the real opportunities from the hype, then build the smallest useful version first.',
  },
  {
    slug: 'integrations',
    num: '04',
    label: 'Connect',
    title: 'Integrations',
    tagline: 'Your tools, working as one system.',
    intro:
      'We connect the platforms your business already depends on, payments, CRMs, email, and internal tools, so data moves automatically instead of being copied by hand.',
    highlightOne: {
      title: 'We map your systems before writing a line of code.',
      text: 'We document what each platform sends, expects, and assumes, so the integration matches how your business actually operates.',
    },
    highlightTwo: {
      title: 'Every connection is built to handle failure.',
      text: 'Retries, logging, and clear error handling are part of every integration, not an afterthought added once something breaks.',
    },
    deliverablesIntro:
      'Integration work is scoped around the systems you already use, with a clear map of what will sync and how.',
    deliverables: [
      { eyebrow: 'Payments', title: 'Payments & billing', text: 'Stripe and other payment providers connected to your checkout and reporting.' },
      { eyebrow: 'CRM', title: 'CRM & marketing tools', text: 'Customer and lead data synced automatically between systems.' },
      { eyebrow: 'APIs', title: 'APIs & webhooks', text: 'Reliable connections between your product and third-party services.' },
      { eyebrow: 'Internal', title: 'Internal tooling', text: 'Internal systems and spreadsheets replaced with automated data sync.' },
    ],
    processIntro:
      'Integration work is treated as infrastructure, not a quick script, because the cost of a silent failure is higher than the cost of doing it properly.',
    processSteps: [
      { title: 'Map the systems', text: 'We document what each platform sends, receives, and assumes about the other side.' },
      { title: 'Design the data flow', text: 'We decide what syncs, how often, and what happens on conflicts or failures.' },
      { title: 'Build the connection', text: 'Integrations are built with retries, logging, and clear error handling.' },
      { title: 'Test failure cases', text: 'We deliberately test what happens when a service is slow, down, or returns bad data.' },
      { title: 'Monitor in production', text: 'Connections are monitored so issues are caught before they affect your business.' },
    ],
    whyEyebrow: 'Why Redtekk',
    whyTitle: 'Connections that keep working when something goes wrong.',
    whyText: 'Most integration failures happen quietly. We design for visibility, so problems get flagged before they cost you data or revenue.',
    whyCards: [
      { eyebrow: 'Resilience', title: 'Built to handle failure', text: 'Integrations are designed to fail safely and recover, not silently lose data.' },
      { eyebrow: 'Visibility', title: 'You can see what is happening', text: 'Logging and alerts mean issues get flagged instead of discovered weeks later.' },
      { eyebrow: 'Review', title: 'Checked by a senior engineer', text: 'Every data flow is reviewed for accuracy before it touches production data.' },
    ],
    ctaTitle: 'Tired of manually moving data between tools?',
    ctaText: 'Tell us which systems you use. We will show you what can be connected and what it would take.',
  },
  {
    slug: 'optimization',
    num: '05',
    label: 'Grow',
    title: 'Optimization',
    tagline: 'Small, measured improvements that compound.',
    intro:
      'Launch is the starting line. We continuously improve performance, SEO, accessibility, and conversion through small changes that are measured, not guessed.',
    highlightOne: {
      title: 'We measure first, then prioritize.',
      text: 'Every optimization round starts with a clear baseline, so we know exactly what improved, by how much, and what to tackle next.',
    },
    highlightTwo: {
      title: 'Senior engineers decide what is worth fixing.',
      text: 'Not every flagged issue matters. We prioritize by real impact on users and business metrics, not by the size of an audit report.',
    },
    deliverablesIntro:
      'Optimization work is scoped around the metrics that matter to your business, with a clear before-and-after for every round.',
    deliverables: [
      { eyebrow: 'Speed', title: 'Performance', text: 'Faster load times and better Core Web Vitals scores.' },
      { eyebrow: 'Visibility', title: 'SEO', text: 'Technical and on-page SEO improvements that help the right pages get found.' },
      { eyebrow: 'Access', title: 'Accessibility', text: 'WCAG-aligned fixes so more people can actually use your product.' },
      { eyebrow: 'Growth', title: 'Conversion', text: 'Funnel and UX improvements based on how users actually behave.' },
    ],
    processIntro:
      'Optimization runs as a repeating loop, not a one-time project, because the highest-impact fix changes as your product grows.',
    processSteps: [
      { title: 'Audit & baseline', text: 'We measure current performance, SEO, and accessibility before changing anything.' },
      { title: 'Prioritize by impact', text: 'Issues are ranked by expected effect on users and business metrics, not by volume.' },
      { title: 'Implement changes', text: 'Fixes are shipped in small, trackable batches instead of one large rewrite.' },
      { title: 'Senior review', text: 'Each change is checked against the baseline to confirm it actually helped.' },
      { title: 'Repeat the loop', text: 'We re-measure and find the next highest-impact improvement.' },
    ],
    whyEyebrow: 'Why Redtekk',
    whyTitle: 'Improvements you can actually measure.',
    whyText: 'Every change comes with a clear before-and-after comparison, so you see the real effect on speed, rankings, or conversions, not just a list of completed tasks.',
    whyCards: [
      { eyebrow: 'Evidence', title: 'Decisions backed by data', text: 'We change what the numbers say is worth changing, not what looks interesting.' },
      { eyebrow: 'Stability', title: 'Improvements without regressions', text: 'Changes are tested so a performance fix does not break a feature.' },
      { eyebrow: 'Transparency', title: 'You see the before and after', text: 'Every optimization round comes with a clear before-and-after comparison.' },
    ],
    ctaTitle: 'Is your product live but underperforming?',
    ctaText: 'We will run a quick audit and show you exactly where the easiest wins are.',
  },
  {
    slug: 'support',
    num: '06',
    label: 'Stay',
    title: 'Support',
    tagline: 'The same team, long after launch.',
    intro:
      'We provide ongoing maintenance, improvements, and technical guidance after launch, so your product keeps working and keeps improving as your business changes.',
    highlightOne: {
      title: 'Issues get caught before your users notice.',
      text: 'Monitoring and alerts are part of the package, so problems are flagged early instead of reported by a frustrated customer.',
    },
    highlightTwo: {
      title: 'A senior engineer is always accountable.',
      text: 'Support requests go directly to an engineer who knows your codebase, not into a generic ticket queue.',
    },
    deliverablesIntro:
      'Support is scoped around a clear, ongoing cadence, so you always know what is being maintained and what is being improved.',
    deliverables: [
      { eyebrow: 'Uptime', title: 'Maintenance & monitoring', text: 'Proactive checks that catch problems before your users do.' },
      { eyebrow: 'Fixes', title: 'Bug fixes & security updates', text: 'Issues and dependencies are kept current and resolved quickly.' },
      { eyebrow: 'Growth', title: 'Feature improvements', text: 'Your product keeps evolving as your business and users change.' },
      { eyebrow: 'Advice', title: 'Technical guidance', text: 'Direct access to senior engineers for planning and decisions.' },
    ],
    processIntro:
      'Support runs on a steady cadence, not a reactive scramble, so small issues get handled before they turn into urgent ones.',
    processSteps: [
      { title: 'Handover & documentation', text: 'We document the system so support starts with full context, not guesswork.' },
      { title: 'Monitoring setup', text: 'Alerts and dashboards are configured to catch issues early.' },
      { title: 'Ongoing maintenance', text: 'Updates, dependency upgrades, and small fixes happen on a regular cadence.' },
      { title: 'Direct communication', text: 'You reach the same engineers directly, with no account manager layer.' },
      { title: 'Planning ahead', text: 'We flag upcoming risks and opportunities before they become urgent.' },
    ],
    whyEyebrow: 'Why Redtekk',
    whyTitle: 'Support that feels like an extension of your team.',
    whyText: 'You get direct access to the engineers who built your product, not a rotating support desk that relearns it every time.',
    whyCards: [
      { eyebrow: 'Continuity', title: 'Same team, same Slack, for years', text: 'You keep working with engineers who already know your product.' },
      { eyebrow: 'Response', title: 'Issues do not sit in a queue', text: 'Support requests go directly to an engineer who can act on them.' },
      { eyebrow: 'Honesty', title: 'We tell you what is and is not urgent', text: 'Not every request needs to happen today. We help you prioritize realistically.' },
    ],
    ctaTitle: 'Need a team that sticks around after launch?',
    ctaText: 'Tell us about your product. We will explain how ongoing support would work for you.',
  },
];
