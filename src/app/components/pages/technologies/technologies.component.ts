import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { RedtekkMotionDirective } from '../../../directives/redtekk-motion.directive';
import { TechnologyCategory } from '../../../interfaces/technologies.interfaces';

@Component({
  standalone: true,
  selector: 'app-technologies',
  imports: [RedtekkMotionDirective, RouterLink],
  templateUrl: './technologies.component.html',
  styleUrl: './technologies.component.scss',
})
export class TechnologiesComponent implements OnInit {
  private readonly _title = inject(Title);

  protected readonly categories: ReadonlyArray<TechnologyCategory> = [
    {
      title: 'AI',
      description: 'Assistants, model APIs, and pair-programming tools we use to move faster.',
      items: [
        { name: 'Claude', icon: 'assets/marquee-icons/claude.svg', note: 'Research and reasoning' },
        { name: 'Codex', icon: 'assets/marquee-icons/openai.svg', note: 'Agentic coding' },
        { name: 'Copilot', icon: 'assets/marquee-icons/github.svg', note: 'In-editor acceleration' },
        { name: 'OpenAI', icon: 'assets/marquee-icons/openai.svg', note: 'AI features and APIs' },
      ],
    },
    {
      title: 'Frontend',
      description: 'Interfaces, design systems, and responsive web apps that feel polished.',
      items: [
        { name: 'React', icon: 'assets/marquee-icons/react.svg', note: 'Interactive products' },
        { name: 'Vue', icon: 'assets/marquee-icons/vuedotjs.svg', note: 'Fast web interfaces' },
        { name: 'Angular', icon: 'assets/marquee-icons/angular.svg', note: 'Structured applications' },
        { name: 'TypeScript', icon: 'assets/marquee-icons/typescript.svg', note: 'Typed product code' },
        { name: 'JavaScript', icon: 'assets/marquee-icons/javascript.svg', note: 'Web fundamentals' },
      ],
    },
    {
      title: 'Backend',
      description: 'APIs, business logic, and stable server-side foundations.',
      items: [
        { name: 'Node.js', icon: 'assets/marquee-icons/nodedotjs.svg', note: 'APIs and services' },
        { name: 'Laravel', icon: 'assets/marquee-icons/laravel.svg', note: 'Product backends' },
      ],
    },
    {
      title: 'Data',
      description: 'Storage, relational models, and operational data workflows.',
      items: [
        { name: 'PostgreSQL', icon: 'assets/marquee-icons/postgresql.svg', note: 'Primary databases' },
        { name: 'MySQL', icon: 'assets/marquee-icons/mysql.svg', note: 'Relational storage' },
        { name: 'MongoDB', icon: 'assets/marquee-icons/mongodb.svg', note: 'Document databases' },
        { name: 'Airtable', icon: 'assets/marquee-icons/airtable.svg', note: 'Ops databases' },
      ],
    },
    {
      title: 'Commerce',
      description: 'Checkout, subscriptions, storefronts, and payment operations.',
      items: [
        { name: 'Shopify', icon: 'assets/marquee-icons/shopify.svg', note: 'Commerce builds' },
        { name: 'Stripe', icon: 'assets/marquee-icons/stripe.svg', note: 'Payments and billing' },
        { name: 'Webflow', icon: 'assets/marquee-icons/webflow.svg', note: 'Marketing sites' },
      ],
    },
    {
      title: 'Infrastructure',
      description: 'Delivery, containers, repositories, and reliable release workflows.',
      items: [
        { name: 'Docker', icon: 'assets/marquee-icons/docker.svg', note: 'Portable environments' },
        { name: 'GitHub', icon: 'assets/marquee-icons/github.svg', note: 'Code and delivery' },
      ],
    },
    {
      title: 'Messaging',
      description: 'Transactional email, lifecycle messages, and client communication flows.',
      items: [
        { name: 'Brevo', icon: 'assets/marquee-icons/brevo.svg', note: 'Email campaigns' },
        { name: 'SendGrid', icon: 'assets/marquee-icons/sendgrid.svg', note: 'Transactional email' },
      ],
    },
    {
      title: 'Communication',
      description: 'Team coordination, client updates, and async project communication.',
      items: [
        { name: 'Slack', icon: 'assets/marquee-icons/slack.svg', note: 'Team channels' },
        { name: 'Teams', icon: 'assets/marquee-icons/teams.svg', note: 'Client calls' },
        { name: 'Mattermost', icon: 'assets/marquee-icons/mattermost.svg', note: 'Private collaboration' },
      ],
    },
    {
      title: 'Testing',
      description: 'End-to-end checks, browser automation, and release confidence.',
      items: [
        { name: 'Selenium', icon: 'assets/marquee-icons/selenium.svg', note: 'Browser automation' },
        { name: 'Cypress', icon: 'assets/marquee-icons/cypress.svg', note: 'E2E test flows' },
        { name: 'Playwright', icon: 'assets/marquee-icons/playwright.svg', note: 'Cross-browser testing' },
      ],
    },
  ];

  protected readonly featuredTechnologies = this.categories
    .flatMap((category) => category.items)
    .slice(0, 14);

  public ngOnInit(): void {
    this._title.setTitle('Technologies We Use | RedTekk');
  }
}
