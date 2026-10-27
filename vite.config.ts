import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  css: {
    devSourcemap: false,
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        blog: 'blog.html',
        'blog-details': 'blog-details.html',
        'blog-list': 'blog-list.html',
        contact: 'contact.html',
        'dream-event-planners': 'dream-event-planners.html',
        'elite-event-management': 'elite-event-management.html',
        'event-details': 'event-details.html',
        event: 'event.html',
        'event-prodigy': 'event-prodigy.html',
        faq: 'faq.html',
        'gallery-details': 'gallery-details.html',
        gallery: 'gallery.html',
        'infinite-occasions': 'infinite-occasions.html',
        pricing: 'pricing.html',
        services: 'services.html',
        'stellar-events-co': 'stellar-events-co.html',
        'team-details': 'team-details.html',
        team: 'team.html',
        testimonials: 'testimonials.html',
      },
    },
  },
});
