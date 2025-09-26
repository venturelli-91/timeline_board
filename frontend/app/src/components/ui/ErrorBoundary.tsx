import React, { Component, ErrorInfo } from "react";
import {
	ErrorBoundaryProps,
	ErrorBoundaryState,
} from "../../types/components/ui";

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	public state: ErrorBoundaryState = {
		hasError: false,
	};

	public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Timeline Error Boundary:", error, errorInfo);

		// Here you could send error to monitoring service
		// Example: Sentry.captureException(error);
	}

	public render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="min-h-screen flex items-center justify-center bg-gray-50">
					<div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
						<div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
							<svg
								className="w-8 h-8 text-red-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<h2 className="text-xl font-semibold text-gray-800 mb-2">
							Something went wrong
						</h2>
						<p className="text-gray-600 mb-4">
							We&apos;re sorry, but there was an error loading the timeline.
							Please refresh the page to try again.
						</p>
						<button
							onClick={() => window.location.reload()}
							className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
							Refresh Page
						</button>
						{process.env.NODE_ENV === "development" && this.state.error && (
							<details className="mt-4 text-left">
								<summary className="text-sm font-medium text-gray-500 cursor-pointer">
									Error Details
								</summary>
								<pre className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto">
									{this.state.error.stack}
								</pre>
							</details>
						)}
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
