import { useState } from "react";
import { T } from "../utils/theme";
import { useAuth } from "../contexts/AuthContext";
import { Card, CardTitle, PageHeader } from "../shared";

export default function Settings() {
  const { user, signOut } = useAuth();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    if (!user?.email) return;
    navigator.clipboard.writeText(user.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <div>
      <PageHeader
        eyebrow="// preferences"
        title="Settings"
        sub="Account info, app preferences, and about."
        color={T.muted2}
      />

      <div style={{ padding: "0 24px 48px", display: "flex", flexDirection: "column", gap: 0 }}>

        {/* ── Account ── */}
        <Card>
          <CardTitle color={T.accent}>Account</CardTitle>
          {user ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
                  background: `linear-gradient(135deg,${T.accent},${T.rose})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 15, fontWeight: 800, color: "#fff",
                }}>
                  {user.email?.slice(0, 2).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</div>
                  <div style={{ fontSize: 9.5, color: T.green, fontFamily: "'Fira Code',monospace", marginTop: 2 }}>● connected</div>
                </div>
                <button
                  onClick={copyEmail}
                  style={{
                    padding: "5px 12px", background: "transparent", border: `1px solid ${T.border2}`,
                    borderRadius: 6, color: copied ? T.green : T.muted2, fontSize: 11,
                    cursor: "pointer", fontFamily: "'Fira Code',monospace", transition: "all .15s", flexShrink: 0,
                  }}
                >
                  {copied ? "✓ copied" : "copy email"}
                </button>
              </div>
              <button
                onClick={signOut}
                style={{
                  padding: "7px 18px", background: "rgba(251,113,133,.07)",
                  border: `1px solid rgba(251,113,133,.22)`, borderRadius: 7,
                  color: T.rose, fontSize: 12, cursor: "pointer", fontWeight: 500, transition: "all .15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(251,113,133,.14)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(251,113,133,.07)")}
              >
                Sign out
              </button>
            </>
          ) : (
            <div style={{ fontSize: 13, color: T.muted2, lineHeight: 1.6 }}>
              Not signed in. Use the sidebar button to sign in and sync your progress across devices.
            </div>
          )}
        </Card>

        {/* ── Preferences ── */}
        <Card>
          <CardTitle color={T.sky}>Preferences</CardTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <SettingRow label="Theme" value="Toggle dark / light mode via the sidebar or mobile top bar." />
            <SettingRow label="Code Runner" value="Python (Pyodide 0.25) and JavaScript run directly in your browser — no install needed." />
            <SettingRow label="Progress tracking" value="Quiz scores and progress are stored locally. Sign in to persist across devices." />
            <SettingRow label="Offline" value="Once loaded, most pages work offline. The Python runtime requires an initial download." />
          </div>
        </Card>

        {/* ── About ── */}
        <Card>
          <CardTitle color={T.green}>About</CardTitle>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              ["App",             "WebAppLearn"],
              ["Version",         "1.0.0"],
              ["Stack",           "React · Vite · TypeScript"],
              ["Python runtime",  "Pyodide 0.25.0"],
              ["Auth",            "Supabase"],
              ["Deployment",      "Vercel"],
            ].map(([label, value]) => (
              <div key={label} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 0", borderBottom: `1px solid ${T.border}`,
              }}>
                <span style={{ fontSize: 12, color: T.muted2 }}>{label}</span>
                <span style={{ fontSize: 12, fontFamily: "'Fira Code',monospace", color: T.text }}>{value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Footer ── */}
        <div style={{ textAlign: "center", padding: "24px 0 0", fontSize: 10.5, color: T.muted, fontFamily: "'Fira Code',monospace" }}>
          // WebAppLearn — built for learners, by a learner ♥
        </div>
      </div>
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      padding: "10px 13px", background: T.bg2, borderRadius: 8, border: `1px solid ${T.border}`,
    }}>
      <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 11.5, color: T.muted2, lineHeight: 1.55 }}>{value}</div>
    </div>
  );
}
