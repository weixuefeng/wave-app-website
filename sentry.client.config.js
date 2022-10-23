// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const IS_DEBUG = process.env.NEXT_PUBLIC_IS_DEBUG == "true"
if(!IS_DEBUG) {
  console.log("init sentry");
  Sentry.init({
    dsn: SENTRY_DSN || 'https://82d96f2ae3cd40009ab1766a9e212848@o460544.ingest.sentry.io/4503970528231424',
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1.0,
    // ...
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
  });
}
