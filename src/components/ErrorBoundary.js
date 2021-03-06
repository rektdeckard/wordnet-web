import React from "react";
import { Analytics } from "aws-amplify";

class ErrorBoundary extends React.Component {
  state = {
    errorMessage: "",
  };

  static getDerivedStateFromError(error) {
    return { errorMessage: error.toString() };
  }

  componentDidCatch(error, info) {
    console.error(error);
    // Generate error report
    try {
      Analytics.record({
        name: "graph_error",
        attributes: { error: error.message },
      });
    } catch (e) {
      console.error(e.message);
    }
  }

  render() {
    if (this.state.errorMessage) {
      return this.props.fallback ?? <p>{this.state.errorMessage}</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
