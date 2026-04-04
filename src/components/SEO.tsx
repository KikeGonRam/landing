import { useEffect } from 'react';
import { siteConfig, siteMeta } from '../config';

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
}

export function SEO({ title, description, ogImage }: SEOProps) {
  useEffect(() => {
    const finalTitle = title ? `${title} | ${siteConfig.title}` : siteConfig.title;
    const finalDescription = description || siteConfig.description;
    const finalOgImage = ogImage || siteMeta.ogImage;

    // Update basic tags
    document.title = finalTitle;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', finalDescription);
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = finalDescription;
      document.head.appendChild(meta);
    }

    // Update Open Graph tags
    const updateOgTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    updateOgTag('og:title', finalTitle);
    updateOgTag('og:description', finalDescription);
    updateOgTag('og:image', finalOgImage);
    updateOgTag('og:type', 'website');

    // Update Twitter tags
    const updateTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    if (siteMeta.twitterSite) {
      updateTwitterTag('twitter:card', 'summary_large_image');
      updateTwitterTag('twitter:site', siteMeta.twitterSite);
      updateTwitterTag('twitter:title', finalTitle);
      updateTwitterTag('twitter:description', finalDescription);
      updateTwitterTag('twitter:image', finalOgImage);
    }
  }, [title, description, ogImage]);

  return null;
}
