import { WorkProjectDetail } from '../interfaces/work-page.interfaces';

export const WORK_PROJECT_DETAILS: ReadonlyArray<WorkProjectDetail> = [
  {
    slug: 'herdspace',
    tagline: 'A marketplace where AI helps you find the right horse.',
    summary:
      'HerdSpace is an online marketplace for the equestrian world. People use it to buy and sell horses, vehicles, and properties, and to find equestrian jobs. David built the platform and the AI search behind it.',
    attribution: 'Freelance project, built by David independently of Redtekk.',
    problem:
      'Horse marketplaces relied on rigid keyword filters. When a buyer described what they wanted in plain words, the results missed the point. HerdSpace wanted search that understands what the buyer actually means.',
    solution:
      'David built the full platform: the storefront, the listing system, and an AI search engine that knows equestrian terminology. Buyers describe what they need in their own words and get matching listings back.',
    features: [
      {
        title: 'AI search',
        text: 'Buyers type what they want in plain language. The search understands equestrian terms and returns the right listings.',
      },
      {
        title: 'Four marketplaces in one',
        text: 'Horses, vehicles, properties, and jobs, each with its own listing model and filters.',
      },
      {
        title: 'Smart recommendations',
        text: 'The platform learns what a user looks at and suggests similar listings.',
      },
      {
        title: 'Built for load',
        text: 'Fast APIs, caching, and a vector database handle thousands of searches at the same time.',
      },
    ],
    role: 'Full product: architecture, backend, frontend, and AI integration',
    stack: ['AI language models', 'Vector database', 'REST API', 'Cloud storage'],
    stats: [
      { value: 90, suffix: '%', label: 'search accuracy' },
      { value: 45, prefix: '+', suffix: '%', label: 'online inquiries' },
      { value: 50, prefix: '+', suffix: '%', label: 'user engagement' },
    ],
  },
  {
    slug: 'tangle',
    tagline: 'A website that sells an AI ERP to manufacturers.',
    summary:
      'Tangle makes an AI-powered ERP for manufacturing companies. David designed and built the website that explains the product and turns visitors into demo requests.',
    attribution: 'Freelance project, built by David independently of Redtekk.',
    problem:
      'The product is technical and the industry is skeptical. The site had to explain AI quoting in plain business terms and back it up with proof.',
    solution:
      'David gave the site a clear structure: what the product does, case studies as proof, and a demo request within reach on every page. New leads flow into their tools automatically through Zapier.',
    features: [
      {
        title: 'Clear product story',
        text: 'Technical capabilities translated into business benefits a manufacturing executive can act on.',
      },
      {
        title: 'Case study proof',
        text: 'Real customer stories, like YarlMetal and Clinton Machines, show the product working.',
      },
      {
        title: 'Lead automation',
        text: 'Demo and contact forms feed straight into their pipeline via Zapier. No manual copying.',
      },
      {
        title: 'Custom interactions',
        text: 'Micro-animations and a polished UI that match the quality of the product.',
      },
    ],
    role: 'Design and development',
    stack: ['Webflow', 'Figma', 'JavaScript', 'CSS', 'Zapier'],
    stats: [
      { value: 90, suffix: '%', label: 'faster quotes with Tangle' },
      { value: 20, prefix: '+', suffix: '%', label: 'production output' },
      { value: 27, prefix: '+', suffix: '%', label: 'on-time delivery' },
    ],
    liveUrl: 'https://www.tangle.io',
  },
  {
    slug: 'solar-planning',
    tagline: 'A planning tool that does the math for solar installers.',
    summary:
      'A web app for a solar company, built for the people who install the panels. It calculates system size, costs, and savings, measures roofs on a map, and generates client-ready reports.',
    attribution: 'Confidential client, built by David before Redtekk.',
    problem:
      'Installers did energy and cost calculations by hand. It was slow, easy to get wrong, and every client report had to be put together manually.',
    solution:
      'The team, with David as lead engineer, built a calculation engine behind a simple interface. Installers measure roofs by drawing on a map, see cost and savings projections instantly, and send out branded reports the app builds for them.',
    features: [
      {
        title: 'Calculation engine',
        text: 'Energy output, costs, and savings computed from location, energy needs, and panel specs.',
      },
      {
        title: 'Roof measurement on a map',
        text: 'Drawing tools on Google Maps measure the roof without a site visit.',
      },
      {
        title: 'Live projections',
        text: 'Cost and savings estimates update as the installer changes the inputs.',
      },
      {
        title: 'Automatic reports',
        text: 'Client reports generate themselves with the company branding and layout.',
      },
    ],
    role: 'Lead engineer in a team of 6 to 8 developers',
    stack: ['Angular', 'Laravel', 'Azure', 'Scrum'],
    stats: [
      { value: 60, prefix: '+', suffix: '%', label: 'installer productivity' },
      { value: 32, prefix: '+', suffix: '%', label: 'revenue growth' },
      { value: 20, prefix: '-', suffix: '%', label: 'operating costs' },
    ],
  },
  {
    slug: 'befive',
    tagline: 'A home base for an esports organization.',
    summary:
      'Befive is a professional esports organization. David rebuilt their website so teams, players, results, news, and events all live in one place.',
    attribution: 'Built by David through Xelpi-IT, the company he ran before Redtekk.',
    problem:
      'Content changed daily, traffic spiked during live events, and the old site could not keep up with either.',
    solution:
      'David built a fast site with a CMS the team updates themselves, an event calendar, and fan tools like polls and leaderboards that give people a reason to come back.',
    features: [
      {
        title: 'Teams and players',
        text: 'Rosters, player bios, and achievements, updated by the organization without a developer.',
      },
      {
        title: 'News and reports',
        text: 'A blog for tournament reports and esports news, managed through a headless CMS.',
      },
      {
        title: 'Event calendar',
        text: 'Tournaments and streams in one live calendar.',
      },
      {
        title: 'Fan tools',
        text: 'Polls, comments, and leaderboards keep fans involved between matches.',
      },
    ],
    role: 'Design and development',
    stack: ['Next.js', 'Tailwind CSS', 'Contentful', 'Webflow'],
    stats: [
      { value: 80, suffix: '%', label: 'faster page loads' },
      { value: 45, prefix: '+', suffix: '%', label: 'fan engagement' },
      { value: 60, prefix: '+', suffix: '%', label: 'capacity for event traffic' },
    ],
  },
  {
    slug: 'wine-b2b',
    tagline: 'A wholesale storefront for the wine trade.',
    summary:
      'An online shop where trade buyers order wine from a premium retailer. Big catalog, clear product data, and compliance handled properly.',
    attribution: 'Freelance project, built by David independently of Redtekk.',
    problem:
      'Selling wine online comes with rules: age checks and regional shipping restrictions. The catalog also had to stay easy to search as it grew.',
    solution:
      'David built the store with Webflow and Shopify: a full catalog with tasting notes, search and filtering, secure checkout, and the legal requirements built in from the start.',
    features: [
      {
        title: 'Catalog with tasting notes',
        text: 'Every wine has its origin story, tasting notes, and details a buyer needs.',
      },
      {
        title: 'Search and filters',
        text: 'Browse by grape variety, region, year, and price.',
      },
      {
        title: 'Secure checkout',
        text: 'Multiple payment options through Shopify.',
      },
      {
        title: 'Compliance built in',
        text: 'Age verification and regional shipping restrictions handled automatically.',
      },
    ],
    role: 'Design and development',
    stack: ['Webflow', 'Shopify', 'JavaScript', 'HTML', 'CSS'],
    stats: [
      { value: 65, prefix: '+', suffix: '%', label: 'online sales' },
      { value: 50, prefix: '+', suffix: '%', label: 'customer engagement' },
      { value: 85, suffix: '%', label: 'faster page speed' },
    ],
  },
  {
    slug: 'xelpi',
    tagline: 'A website for a company that builds websites.',
    summary:
      'Xelpi was a web development company that David founded and ran before Redtekk. Its own site had to prove the studio was good at this, so he built it to be fast, clean, and easy to find on Google.',
    attribution: 'The site of Xelpi-IT, the company David founded and ran before Redtekk.',
    problem:
      'A web studio with a slow or dated site loses the pitch before it starts. Xelpi needed its own site to be its best reference.',
    solution:
      'Modern design, portfolio and service pages, server-side rendering for speed, and SEO done properly.',
    features: [
      {
        title: 'Portfolio section',
        text: 'Past projects and case studies, presented simply.',
      },
      {
        title: 'Service pages',
        text: 'Each offering explained on its own structured page.',
      },
      {
        title: 'Server-side rendering',
        text: 'Pages render on the server, so they load fast and rank well.',
      },
      {
        title: 'Working contact flow',
        text: 'Inquiries arrive with automated notifications, nothing gets lost.',
      },
    ],
    role: 'Design and development',
    stack: ['Next.js', 'Webflow', 'JavaScript', 'HTML', 'CSS'],
    stats: [
      { value: 50, prefix: '+', suffix: '%', label: 'load speed' },
      { value: 45, prefix: '+', suffix: '%', label: 'conversion rate' },
      { value: 40, prefix: '+', suffix: '%', label: 'search rankings' },
    ],
  },
  {
    slug: 'mcpr',
    tagline: 'A website for a PR agency in electronic music.',
    summary:
      'MCPR does PR for electronic music artists and labels. Their site shows their work, plays their artists music, and brings in new clients.',
    attribution: 'Freelance project, built by David independently of Redtekk.',
    problem:
      'The site had to feel like the scene it serves and still load fast with players and media embedded everywhere.',
    solution:
      'A dark interface with neon accents, embedded SoundCloud, Spotify, and YouTube players, and a news section for the industry. Optimized so the media does not slow it down.',
    features: [
      {
        title: 'Music built in',
        text: 'SoundCloud, Spotify, and YouTube players embedded where the work is shown.',
      },
      {
        title: 'Artist collaborations',
        text: 'A portfolio of campaigns and success stories with artists and labels.',
      },
      {
        title: 'News and blog',
        text: 'Industry updates that keep the site alive and help it rank.',
      },
      {
        title: 'Fast despite media',
        text: 'Heavy embeds, optimized loading. The site stays quick.',
      },
    ],
    role: 'Design and development',
    stack: ['Webflow', 'JavaScript', 'HTML', 'CSS'],
    stats: [
      { value: 45, prefix: '+', suffix: '%', label: 'engagement' },
      { value: 35, prefix: '+', suffix: '%', label: 'client inquiries' },
      { value: 40, suffix: '%', label: 'faster load times' },
    ],
  },
  {
    slug: 'pv-design',
    tagline: 'Solar planning software for installers, end to end.',
    summary:
      'An enterprise solar client, a global manufacturer with international subsidiaries, needed one guided tool for planning a complete PV system. David worked on their web platform before Redtekk, including the planner installers use to go from location to a final report.',
    attribution: 'Confidential client, built by David before Redtekk.',
    problem:
      'Planning a PV system means juggling location data, consumption, panel layout, inverter sizing, and profitability. The company wanted installers to do all of it in one guided flow, in any market, in any language.',
    solution:
      'A step-by-step planner: pin the project on a map, pull solar irradiance for that exact spot, lay out the PV arrays, size the inverter, and finish with a report and profitability numbers the customer understands.',
    features: [
      {
        title: 'Location and irradiance',
        text: 'The installer pins the roof on a satellite map and gets yearly solar irradiance for that exact location.',
      },
      {
        title: 'Guided system design',
        text: 'Consumption, PV arrays, inverter, and sizing. Each step builds on the previous one, so nothing gets skipped.',
      },
      {
        title: 'Profitability up front',
        text: 'Costs, feed-in limits, and returns calculated before anything gets installed.',
      },
      {
        title: 'Built for every market',
        text: 'Regional content, country-specific grid parameters, and localized languages across subsidiaries.',
      },
    ],
    role: 'Development in a multi-team platform setup',
    stack: ['Angular', 'Java', 'Spring Boot', 'PostgreSQL', 'AWS'],
    stats: [
      { value: 37, suffix: '', label: 'markets supported' },
      { value: 6500, prefix: '', suffix: '+', label: 'employees on the platform' },
      { value: 28, prefix: '+', suffix: '%', label: 'product page engagement' },
    ],
  },
  {
    slug: 'prvenstvo',
    tagline: 'A website that fills driving classes.',
    summary:
      'Prvenstvo is a driving school. Their website shows courses, prices, and schedules, and makes it easy for new students to sign up.',
    attribution: 'Built by David through Xelpi-IT, the company he ran before Redtekk.',
    problem:
      'New students could not find the school online. Course information lived on paper and in phone calls.',
    solution:
      'A simple site with clear course pages, prices, a signup form, and local SEO so the school shows up when people search for driving lessons.',
    features: [
      {
        title: 'Course pages',
        text: 'Every course with its lesson packages, prices, and schedule.',
      },
      {
        title: 'Signup form',
        text: 'Students ask questions and register directly from the site.',
      },
      {
        title: 'Local SEO',
        text: 'The school appears in local search results where students look.',
      },
      {
        title: 'Works on any phone',
        text: 'Mobile-first design, since most students browse on their phones.',
      },
    ],
    role: 'Design and development',
    stack: ['Webflow', 'Figma', 'JavaScript', 'CSS'],
    stats: [
      { value: 45, prefix: '+', suffix: '%', label: 'student inquiries' },
      { value: 40, prefix: '+', suffix: '%', label: 'mobile traffic' },
      { value: 35, prefix: '+', suffix: '%', label: 'search visibility' },
    ],
  },
  {
    slug: 'zvrk',
    tagline: 'An online store for kids clothing.',
    summary:
      'ZVRK sells kids clothes. David built their online store: easy browsing for parents, quick checkout, and a look that fits the brand.',
    attribution: 'Built by David through Xelpi-IT, the company he ran before Redtekk.',
    problem:
      'Parents shop with one hand and no time. Browsing had to be quick, and checkout had to be short, or carts get abandoned.',
    solution:
      'Filters by age and size, one-click checkout, fast pages, and a playful design that still feels trustworthy.',
    features: [
      {
        title: 'Filters that make sense',
        text: 'Parents filter by age, size, and category and find things in seconds.',
      },
      {
        title: 'One-click checkout',
        text: 'The shortest possible path from cart to confirmation.',
      },
      {
        title: 'Fast pages',
        text: 'Optimized images and quick loading, also on slow connections.',
      },
      {
        title: 'Marketing tools',
        text: 'Email signups and promotions built into the store.',
      },
    ],
    role: 'Design and development',
    stack: ['Webflow', 'JavaScript', 'HTML', 'CSS'],
    stats: [
      { value: 50, prefix: '+', suffix: '%', label: 'sales' },
      { value: 60, prefix: '+', suffix: '%', label: 'mobile purchases' },
      { value: 35, suffix: '%', label: 'faster checkout' },
    ],
  },
  {
    slug: 'solar-operations',
    tagline: 'One screen for every solar plant.',
    summary:
      'A solar monitoring platform David worked on before Redtekk. Plant owners and operators watch their plants, live electrical values, weather, and savings in real time, in one place.',
    attribution: 'Confidential client, built by David before Redtekk.',
    problem:
      'Data about the plants and their inverters lived in separate tools. Operators jumped between systems to check electrical values, weather, and earnings, and problems surfaced late.',
    solution:
      'One dashboard for the whole operation: every plant with its live electrical values, local weather, energy generated by day, month, and year, and what that means in money saved and CO2 avoided.',
    features: [
      {
        title: 'Live electrical values',
        text: 'Real-time readings from every inverter in the plant, as they happen.',
      },
      {
        title: 'Plants in one place',
        text: 'Each plant with its devices, location, and local weather conditions.',
      },
      {
        title: 'Energy turned into money',
        text: 'Generated energy converted into savings at the current electricity price, plus the CO2 the plant avoided.',
      },
      {
        title: 'Users and roles',
        text: 'Operators, admins, and viewers each get the right level of access, with notes on any device.',
      },
    ],
    role: 'Full-stack development and architecture',
    stack: ['Angular', 'Node.js', 'MongoDB', 'Redis', 'AWS'],
    stats: [
      { value: 40, prefix: '+', suffix: '%', label: 'operational efficiency' },
      { value: 30, prefix: '+', suffix: '%', label: 'team productivity' },
      { value: 50, prefix: '+', suffix: '%', label: 'room to scale' },
    ],
  },
  {
    slug: 'tim',
    tagline: 'Software that seats guests and runs the floor.',
    summary:
      'TIM is a SaaS platform for restaurants. It handles reservations, table assignment, floor plans, and notifications, and charges through subscriptions.',
    attribution: 'Built by David during his time at the PaprikArt agency, before Redtekk.',
    problem:
      'Hosts juggled reservations on paper and by phone. Double bookings happened, and staff did not always know which table was free.',
    solution:
      'A floor plan editor, automatic table assignment, and live sync across devices. Guests get SMS and email confirmations. Restaurants subscribe through Stripe.',
    features: [
      {
        title: 'Floor plan designer',
        text: 'Each restaurant draws its own layout and the system works with it.',
      },
      {
        title: 'Automatic table assignment',
        text: 'Tables assigned by party size, timing, and availability. No thinking required.',
      },
      {
        title: 'Live sync',
        text: 'Reservations update on every device the moment they change.',
      },
      {
        title: 'Subscriptions via Stripe',
        text: 'Tiered plans and trials, billed automatically.',
      },
    ],
    role: 'Lead engineer: design and development',
    stack: ['Angular', 'Symfony', 'Stripe'],
    stats: [
      { value: 70, suffix: '%', label: 'faster seating' },
      { value: 35, prefix: '+', suffix: '%', label: 'subscription revenue' },
      { value: 25, prefix: '-', suffix: '%', label: 'operating costs' },
    ],
  },
  {
    slug: 'wine-b2c',
    tagline: 'An online boutique for fine wine.',
    summary:
      'An online store for a boutique wine retailer. Customers browse the collection, read tasting notes, and order to their door.',
    attribution: 'Freelance project, built by David independently of Redtekk.',
    problem:
      'The shop needed to look premium and still work like a modern store, with age checks and shipping rules handled properly.',
    solution:
      'A Webflow storefront with Shopify behind it: a catalog with tasting notes, filtering by region and grape, secure checkout, and a loyalty program.',
    features: [
      {
        title: 'Catalog that sells',
        text: 'High-quality imagery and tasting notes for every bottle.',
      },
      {
        title: 'Useful filters',
        text: 'Browse by region, grape, food pairing, and price.',
      },
      {
        title: 'Compliance built in',
        text: 'Age verification and location-based shipping restrictions.',
      },
      {
        title: 'Loyalty and email',
        text: 'A loyalty program and newsletter keep customers coming back.',
      },
    ],
    role: 'Design and development',
    stack: ['Webflow', 'Shopify', 'JavaScript', 'HTML', 'CSS'],
    stats: [
      { value: 70, prefix: '+', suffix: '%', label: 'online sales' },
      { value: 55, prefix: '+', suffix: '%', label: 'customer engagement' },
      { value: 90, suffix: '%', label: 'faster page loads' },
    ],
  },
];
