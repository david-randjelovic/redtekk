import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { RedtekkMotionDirective } from '../../../directives/redtekk-motion.directive';

interface TechnologyItem {
  readonly name: string;
  readonly icon: string;
  readonly note: string;
}

interface TechnologyCategory {
  readonly title: string;
  readonly description: string;
  readonly items: ReadonlyArray<TechnologyItem>;
}

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
        { name: 'Codex', icon: 'assets/marquee-icons/openai.svg', note: 'Agentic coding workflows' },
        { name: 'GitHub Copilot', icon: 'assets/marquee-icons/github.svg', note: 'In-editor acceleration' },
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
        { name: 'Webflow', icon: 'assets/marquee-icons/webflow.svg', note: 'Marketing sites' },
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
        { name: 'Airtable', icon: 'assets/marquee-icons/airtable.svg', note: 'Ops databases' },
      ],
    },
    {
      title: 'Commerce',
      description: 'Checkout, subscriptions, storefronts, and payment operations.',
      items: [
        { name: 'Shopify', icon: 'assets/marquee-icons/shopify.svg', note: 'Commerce builds' },
        { name: 'Stripe', icon: 'assets/marquee-icons/stripe.svg', note: 'Payments and billing' },
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
  ];

  protected readonly featuredTechnologies = this.categories
    .flatMap((category) => category.items)
    .slice(0, 14);

  public ngOnInit(): void {
    this._title.setTitle('Technologies We Use | RedTekk');
  }
}
