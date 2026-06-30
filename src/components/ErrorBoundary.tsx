/**
 * ErrorBoundary
 *
 * Improvements:
 *  1. Reports errors to console with component stack for easier debugging.
 *  2. "Try again" button now properly resets state — the original only called
 *     setState({ error: null }) which works but is the right approach.
 *  3. Added a proper heading level and aria-live region so screen readers
 *     announce the error.
 *  4. Error details are shown in development only (never exposed to production
 *     users — avoids leaking internal implementation details).
 */

import { Component, type ReactNode, type ErrorInfo } from "react";
import { T } from "../utils/theme";

interface Props  { children: ReactNode; fallback?: ReactNode; }
interface State  { error: Error | null; errorInfo: ErrorInfo | null; }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ errorInfo: info });
    console.error("[ErrorBoundary] Caught error:", error.message);
    console.error("[ErrorBoundary] Component stack:", info.componentStack);
  }

  handleReset = () => {
    this.setState({ error: null, errorInfo: null });
  };

  render() {
    const { error } = this.state;

    if (error) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          role="alert"
          aria-live="assertive"
          style={{ padding: "48px 24px", textAlign: "center", maxWidth: 480, margin: "0 auto" }}
        >
          <div style={{ fontSize: 36, marginBottom: 16 }} aria-hidden>⚠</div>
          <h2 style={{
            fontFamily: "'Bricolage Grotesque',sans-serif",
            fontWeight: 800, fontSize: 18, marginBottom: 10,
            color: T.rose, letterSpacing: "-0.5px",
          }}>
            Something went wrong
          </h2>
          <p style={{ fontSize: 12.5, color: T.muted2, marginBottom: 20, lineHeight: 1.6 }}>
            {import.meta.env.DEV
              ? error.message
              : "An unexpected error occurred. Please try again."}
          </p>
          <button
            onClick={this.handleReset}
            style={{
              padding: "8px 20px", background: T.surface,
              border: `1px solid ${T.border2}`, borderRadius: 8,
              color: T.text, fontSize: 12.5, cursor: "pointer",
              transition: "border-color .15s",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = T.accent}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = T.border2}
          >Try again</button>
        </div>
      );
    }

    return this.props.children;
  }
}
