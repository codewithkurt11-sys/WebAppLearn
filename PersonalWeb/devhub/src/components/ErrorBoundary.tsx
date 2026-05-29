import { Component, ReactNode, ErrorInfo } from "react";
import { T } from "../utils/theme";

interface Props  { children: ReactNode; }
interface State  { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "60px 24px", textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h2 style={{
            fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800,
            fontSize: 20, color: T.rose, marginBottom: 10,
          }}>
            Something went wrong
          </h2>
          <p style={{ fontSize: 12.5, color: T.muted2, lineHeight: 1.65, marginBottom: 20, fontFamily: "'Fira Code',monospace" }}>
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              padding: "8px 22px", background: "rgba(124,109,250,.1)",
              border: `1px solid rgba(124,109,250,.25)`, borderRadius: 8,
              color: T.accent, fontSize: 13, cursor: "pointer", fontWeight: 600,
            }}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
