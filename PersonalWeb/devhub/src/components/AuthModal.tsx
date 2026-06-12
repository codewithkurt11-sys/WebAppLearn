import { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, X, Check } from "lucide-react";
import { T } from "../utils/theme";
import { useAuth } from "../contexts/AuthContext";

interface AuthModalProps {
  onClose: () => void;
}

const NOISE_BG = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.4'/></svg>")`;

export default function AuthModal({ onClose }: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [tab, setTab] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const [passErr, setPassErr] = useState<string | null>(null);
  const [globalErr, setGlobalErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const switchTab = (t: "in" | "up") => {
    setTab(t);
    setEmailErr(null); setPassErr(null); setGlobalErr(null);
    setSuccess(false);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailErr(null); setPassErr(null); setGlobalErr(null);
    let valid = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailErr("Enter a valid email"); valid = false; }
    if (password.length < 8) { setPassErr("At least 8 characters"); valid = false; }
    if (!valid) return;
    setBusy(true);
    if (tab === "in") {
      const { error } = await signIn(email, password);
      setBusy(false);
      if (error) { setGlobalErr(error); return; }
      onClose();
    } else {
      const { error } = await signUp(email, password);
      setBusy(false);
      if (error) { setGlobalErr(error); return; }
      setSuccess(true);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,.65)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
        animation: "cifFade .2s ease",
      }}
    >
      <style>{`
        @keyframes cifSpin { to { transform: rotate(360deg); } }
        @keyframes cifPop  { from { transform: scale(.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>

      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%", maxWidth: 400,
          background: T.surface,
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: `0 24px 80px rgba(0,0,0,.55), 0 0 0 1px ${T.border2}`,
          animation: "cifPop .25s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {/* noise overlay */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: NOISE_BG, opacity: 0.05,
          pointerEvents: "none", mixBlendMode: "overlay",
        }} />
        {/* top gradient line */}
        <div aria-hidden style={{
          height: 3, width: "100%",
          background: `linear-gradient(90deg, ${T.accent}, ${T.rose})`,
        }} />

        {/* close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute", top: 14, right: 14,
            width: 30, height: 30, borderRadius: 8,
            background: T.bg2, border: `1px solid ${T.border}`,
            color: T.muted2, cursor: "pointer", padding: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "color .15s",
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.rose}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.muted2}
        >
          <X size={14} />
        </button>

        <div style={{ padding: "28px 28px 24px", position: "relative" }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{
              fontFamily: "'Bricolage Grotesque',sans-serif",
              fontWeight: 800, fontSize: 22,
              display: "flex", justifyContent: "center", alignItems: "center", gap: 6,
              marginBottom: 4,
            }}>
              <span style={{ color: T.muted, fontFamily: "'Fira Code',monospace", fontSize: 14, fontWeight: 400 }}>{"</>"}</span>
              <span style={{
                background: `linear-gradient(120deg, ${T.accent}, ${T.rose})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                letterSpacing: "-0.5px",
              }}>codeisfun</span>
            </div>
            <div style={{
              fontFamily: "'Fira Code',monospace",
              fontSize: 10.5, color: T.muted, letterSpacing: "0.5px",
            }}>// sync your progress</div>
          </div>

          {success ? (
            <SuccessView email={email} onBack={() => switchTab("in")} />
          ) : (
            <>
              {/* Tab switcher */}
              <div style={{
                display: "flex", padding: 4, marginBottom: 18,
                background: T.bg2, borderRadius: 10,
                border: `1px solid ${T.border}`,
              }}>
                <TabBtn active={tab === "in"} onClick={() => switchTab("in")}>Sign in</TabBtn>
                <TabBtn active={tab === "up"} onClick={() => switchTab("up")}>Sign up</TabBtn>
              </div>

              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Field
                  icon={<Mail size={14} />}
                  type="email"
                  placeholder="email@address.com"
                  value={email}
                  onChange={setEmail}
                  err={emailErr}
                />
                <Field
                  icon={<Lock size={14} />}
                  type={showPass ? "text" : "password"}
                  placeholder="password (min 8 chars)"
                  value={password}
                  onChange={setPassword}
                  err={passErr}
                  trailing={
                    <button
                      type="button"
                      onClick={() => setShowPass(s => !s)}
                      aria-label={showPass ? "Hide password" : "Show password"}
                      style={{
                        background: "transparent", border: "none",
                        color: T.muted2, cursor: "pointer", padding: 0,
                        display: "flex", alignItems: "center",
                      }}
                    >
                      {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  }
                />

                {globalErr && (
                  <div style={{
                    fontSize: 11.5, color: T.rose, padding: "6px 10px",
                    background: `${T.rose}12`, border: `1px solid ${T.rose}33`,
                    borderRadius: 8,
                  }}>{globalErr}</div>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  style={{
                    marginTop: 4,
                    padding: "12px 16px",
                    background: `linear-gradient(135deg, ${T.accent}, ${T.rose})`,
                    border: "none", borderRadius: 12,
                    color: "#fff", fontSize: 13.5, fontWeight: 700,
                    fontFamily: "'Bricolage Grotesque',sans-serif",
                    cursor: busy ? "default" : "pointer",
                    opacity: busy ? 0.7 : 1,
                    transition: "filter .15s, opacity .15s",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}
                  onMouseEnter={e => !busy && ((e.currentTarget as HTMLElement).style.filter = "brightness(1.1)")}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter = ""}
                >
                  {busy && (
                    <span style={{
                      width: 14, height: 14,
                      border: "2px solid rgba(255,255,255,.35)",
                      borderTopColor: "#fff", borderRadius: "50%",
                      animation: "cifSpin .7s linear infinite",
                    }} />
                  )}
                  {tab === "in" ? "Sign in" : "Create account"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────── pieces ──────────── */

function TabBtn({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1, padding: "8px 0",
        border: "none", borderRadius: 8,
        background: active ? `linear-gradient(135deg, ${T.accent}, ${T.rose})` : "transparent",
        color: active ? "#fff" : T.muted2,
        fontSize: 12, fontWeight: 700, cursor: "pointer",
        fontFamily: "'Bricolage Grotesque',sans-serif",
        transition: "all .2s",
      }}
    >{children}</button>
  );
}

function Field({
  icon, type, placeholder, value, onChange, err, trailing,
}: {
  icon: React.ReactNode; type: string; placeholder: string;
  value: string; onChange: (v: string) => void; err?: string | null;
  trailing?: React.ReactNode;
}) {
  const [focus, setFocus] = useState(false);
  return (
    <div>
      <div style={{
        position: "relative",
        display: "flex", alignItems: "center", gap: 0,
        background: T.bg2,
        border: `1px solid ${err ? T.rose : focus ? T.accent : T.border}`,
        borderRadius: 10,
        padding: "0 12px",
        transition: "border-color .15s, box-shadow .15s",
        boxShadow: focus && !err ? `0 0 0 2px ${T.accent}40` : "none",
      }}>
        <span style={{ color: err ? T.rose : focus ? T.accent : T.muted2, display: "flex", marginRight: 10 }}>
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1, background: "transparent",
            border: "none", outline: "none",
            padding: "11px 0", color: T.text,
            fontSize: 13, fontFamily: "'Bricolage Grotesque',sans-serif",
          }}
        />
        {trailing && <span style={{ marginLeft: 8 }}>{trailing}</span>}
      </div>
      {err && (
        <div style={{
          fontSize: 11, color: T.rose, marginTop: 4, paddingLeft: 4,
        }}>{err}</div>
      )}
    </div>
  );
}

function SuccessView({ email, onBack }: { email: string; onBack: () => void }) {
  return (
    <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
      <div style={{
        width: 56, height: 56, borderRadius: "50%",
        background: `${T.green}1c`,
        border: `2px solid ${T.green}66`,
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 16px", color: T.green,
        animation: "cifPop .3s ease",
      }}>
        <Check size={26} strokeWidth={3} />
      </div>
      <div style={{
        fontFamily: "'Bricolage Grotesque',sans-serif",
        fontWeight: 700, fontSize: 16, marginBottom: 6,
      }}>Check your inbox</div>
      <div style={{ fontSize: 12, color: T.muted2, marginBottom: 18, lineHeight: 1.5 }}>
        We sent a verification link to <strong style={{ color: T.text }}>{email}</strong>
      </div>
      <button
        onClick={onBack}
        style={{
          fontSize: 12, color: T.accent, background: "transparent",
          border: "none", cursor: "pointer", fontWeight: 600,
          fontFamily: "'Bricolage Grotesque',sans-serif",
        }}
      >← Back to sign in</button>
    </div>
  );
}
