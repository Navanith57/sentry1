import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import * as Sentry from "@sentry/react";
https://c478356a38bbda3ee237ecc6f29ac6b5@o4508960499105792.ingest.us.sentry.io/4508994586804224

Sentry.init({
  dsn: "https://c478356a38bbda3ee237ecc6f29ac6b5@o4508960499105792.ingest.us.sentry.io/4508994586804224",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration()
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  replaysSessionOptions: {
    maskAllText: false,  // Disable text masking
    blockAllMedia: false, // Capture media elements
  }
});


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<p>An error occurred.</p>}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Sentry.ErrorBoundary>
  </StrictMode>
);
