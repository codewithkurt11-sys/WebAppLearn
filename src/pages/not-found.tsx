import { AlertCircle } from "lucide-react";
import { T } from "../utils/theme";

/**
 * Bug fix: Previously used @/components/ui/card which depends on shadcn CSS
 * variables (--background, --card, etc.) that were all set to `red`.
 * Replaced with a native inline-styled component that uses the app's own
 * --t-* CSS custom properties via the T helper — same as the rest of the app.
 */
export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: T.bg,
      padding: "20px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: 420,
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 16,
        padding: "28px 24px",
        boxShadow: `0 8px 32px rgba(0,0,0,.2)`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <AlertCircle
            style={{ flexShrink: 0, color: T.rose }}
            size={28}
          />
          <h1 style={{
            fontFamily: "'Bricolage Grotesque',sans-serif",
            fontWeight: 800,
            fontSize: 22,
            color: T.text,
            margin: 0,
            letterSpacing: "-0.5px",
          }}>
            404 — Page Not Found
          </h1>
        </div>

        <p style={{
          fontSize: 13,
          color: T.muted2,
          lineHeight: 1.6,
          margin: 0,
          fontFamily: "'Bricolage Grotesque',sans-serif",
        }}>
          This page doesn't exist. If you were expecting content here,
          it may have been removed or the link may be incorrect.
        </p>

        <div style={{
          marginTop: 20,
          fontFamily: "'Fira Code',monospace",
          fontSize: 11.5,
          color: T.muted,
          borderTop: `1px solid ${T.border}`,
          paddingTop: 14,
        }}>
          // navigate using the sidebar to continue
        </div>
      </div>
    </div>
  );
}
