import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import * as Sentry from "@sentry/react";
import { browserTracingIntegration} from "@sentry/react"; // ✅ Correct import

// Initialize Sentry with Session Replay
Sentry.init({
  dsn: "https://c478356a38bbda3ee237ecc6f29ac6b5@o4508960499105792.ingest.us.sentry.io/4508994586804224",
  integrations: [browserTracingIntegration], // ✅ Corrected usage
  tracesSampleRate: 1.0,
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
