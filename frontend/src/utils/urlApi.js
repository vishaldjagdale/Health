// frontend/src/utils/urlApi.js

// Environment detection
const isTestEnvironment =
  window.location.hostname === "localhost" && window.location.port === "8000";
const isDeployEnvironment = window.location.hostname !== "localhost";

// Environment-based URLs
const getUrls = () => {
  if (isDeployEnvironment) {
    // AWS/Production environment
    return {
      backendUrl: "http://your-aws-backend-url:3000", // Update with your AWS backend URL
      API_BASE_URL: "http://your-aws-ai-url:5000", // Update with your AWS AI service URL
    };
  } else if (isTestEnvironment) {
    // Jenkins test environment (localhost:8000)
    return {
      backendUrl: "http://localhost:3000",
      API_BASE_URL: "http://localhost:5000",
    };
  } else {
    // Local development environment (localhost:5173)
    return {
      backendUrl: "http://localhost:3000",
      API_BASE_URL: "http://localhost:5000",
    };
  }
};

const { backendUrl, API_BASE_URL } = getUrls();

export { backendUrl, API_BASE_URL };
