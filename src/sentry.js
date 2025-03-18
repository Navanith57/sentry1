import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://c478356a38bbda3ee237ecc6f29ac6b5@o4508960499105792.ingest.us.sentry.io/4508994586804224", // Replace with your actual DSN
integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration()
  ],
  tracesSampleRate: 1.0, // Adjust for performance monitoring
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  replaysSessionOptions: {
    maskAllText: false,  // Disable text masking
    blockAllMedia: false, // Capture media elements
  },
  beforeSend(event, hint) {
    const error = hint?.originalException;
    
    if (error?.config) { // Capture API errors
      event.extra = {
        ...event.extra,
        api_request: {
          method: error.config.method,
          url: error.config.url,
          request_data: error.config.data,
        },
      };
    }
    
    return event;
  },
});
