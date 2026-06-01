import { Component, type ReactNode, type ErrorInfo } from "react";
import { T } from "../utils/theme";

interface Props { children: ReactNode; }
interface State { error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: "48px 24px", textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
          <div style={{ fontSize: 36, marginBottom: 16 }}>⚠</div>
          <div style={{
            fontFamily: "'Bricolage Grotesque',sans-serif",
            fontWeight: 800, fontSize: 18, marginBottom: 10,
            color: T.rose, letterSpacing: "-0.5px",
          }}>Something went wrong</div>
          <div style={{ fontSize: 12.5, color: T.muted2, marginBottom: 20, lineHeight: 1.6 }}>
            {this.state.error.message}
          </div>
          <button
            onClick={() => this.setState({ error: null })}
            style={{
              padding: "8px 20px", background: T.surface,
              border: `1px solid ${T.border2}`, borderRadius: 8,
              color: T.text, fontSize: 12.5, cursor: "pointer",
            }}
          >Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}
