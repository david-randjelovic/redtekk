import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export const SITE_URL = 'https://redtekk.com';

const SITE_NAME = 'Redtekk';
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/general/og-image.png`;

/** Trims longer copy to a meta-description-friendly length on a word boundary. */
export function toMetaDescription(text: string, maxLength = 158): string {
  if (text.length <= maxLength) {
    return text;
  }

  const cut = text.slice(0, maxLength);

  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

export interface PageSeo {
  /** Full document title, including the brand suffix. */
  title: string;
  /** Meta description, ideally 120-160 characters. */
  description: string;
  /** Route path starting with '/'; becomes the canonical URL and og:url. */
  path: string;
  /** Absolute URL or app-relative asset path; falls back to the site-wide og image. */
  image?: string;
}

/**
 * Central place for per-page SEO tags. Every routed page calls `apply()`
 * once (or on every param change for dynamic routes), so titles, meta
 * descriptions, canonical links, and social cards stay consistent and
 * are present in the prerendered HTML.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly _title = inject(Title);
  private readonly _meta = inject(Meta);
  private readonly _document = inject(DOCUMENT);

  public apply(seo: PageSeo): void {
    const url = `${SITE_URL}${seo.path}`;
    const image = this._absoluteImage(seo.image);

    this._title.setTitle(seo.title);

    this._meta.updateTag({ name: 'description', content: seo.description });

    this._meta.updateTag({ property: 'og:title', content: seo.title });
    this._meta.updateTag({ property: 'og:description', content: seo.description });
    this._meta.updateTag({ property: 'og:url', content: url });
    this._meta.updateTag({ property: 'og:image', content: image });
    this._meta.updateTag({ property: 'og:type', content: 'website' });
    this._meta.updateTag({ property: 'og:site_name', content: SITE_NAME });

    this._meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this._meta.updateTag({ name: 'twitter:title', content: seo.title });
    this._meta.updateTag({ name: 'twitter:description', content: seo.description });
    this._meta.updateTag({ name: 'twitter:image', content: image });

    this._setCanonical(url);
  }

  private _absoluteImage(image: string | undefined): string {
    if (!image) {
      return DEFAULT_OG_IMAGE;
    }

    return image.startsWith('http') ? image : `${SITE_URL}/${image.replace(/^\//, '')}`;
  }

  private _setCanonical(url: string): void {
    let link = this._document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!link) {
      link = this._document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this._document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }
}
