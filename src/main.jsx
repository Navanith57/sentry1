import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as Sentry from "@sentry/react";
import "./sentry"; // Import Sentry configuration

const SentryApp = Sentry.withProfiler(App);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<p>Something went wrong.</p>}>
      <SentryApp />
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);
