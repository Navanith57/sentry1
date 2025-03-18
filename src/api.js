import axios from "axios";
import * as Sentry from "@sentry/react";

// Create Axios instance
const api = axios.create({
  baseURL: "https://api.example.com",
});

// Add an interceptor to capture API failures
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.config) {
      Sentry.captureException(error, {
        extra: {
          api_request: {
            method: error.config.method,
            url: error.config.url,
            request_data: error.config.data,
          },
          response_status: error.response?.status,
          response_data: error.response?.data,
        },
      });
    }
    return Promise.reject(error);
  }
);

export default api;
