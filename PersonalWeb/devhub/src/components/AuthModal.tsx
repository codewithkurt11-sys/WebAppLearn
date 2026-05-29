import { useState, useEffect } from "react";
import { T } from "../shared";
import { useAuth } from "../contexts/AuthContext";

interface Props { onClose: () => void; }

function Spinner() {
  return (
    <span style={{ display:"inline-block", width:14, height:14, border:"2px solid rgba(255,255,255,.3)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin .7s linear infinite", verticalAlign:"middle", marginRight:8 }}/>
  );
}

export default function AuthModal({ onClose }: Props) {
  const { signIn, signUp } = useAuth();
  const [tab, setTab]             = useState<"in" | "up">("in");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [emailErr, setEmailErr]   = useState<string | null>(null);
  const [passErr, setPassErr]     = useState<string | null>(null);
  const [globalErr, setGlobalErr] = useState<string | null>(null);
  const [busy, setBusy]           = useState(false);
  const [success, setSuccess]     = useState(false);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const switchTab = (t: "in" | "up") => {
    setTab(t);
    setEmailErr(null);
    setPassErr(null);
    setGlobalErr(null);
  };

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailErr(null);
    setPassErr(null);
    setGlobalErr(null);

    let valid = true;
    if (!validateEmail(email)) { setEmailErr("Enter a valid email address"); valid = false; }
    if (password.length < 8)   { setPassErr("Password must be at least 8 characters"); valid = false; }
    if (!valid) return;

    setBusy(true);
    if (tab === "in") {
      const { error } = await signIn(email, password);
      if (error) { setGlobalErr(error); setBusy(false); }
      else onClose();
    } else {
      const { error } = await signUp(email, password);
      setBusy(false);
      if (error) setGlobalErr(error);
      else setSuccess(true);
    }
  };

  const inputStyle = (hasErr: boolean): React.CSSProperties => ({
    background: T.bg2,
    border: `1px solid ${hasErr ? T.rose : T.border2}`,
    borderRadius: 10,
    padding: "10px 14px",
    color: T.text,
    fontSize: 13,
    outline: "none",
    width: "100%",
    transition: "border-color .15s",
  });

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes modalIn { from { opacity:0; transform:scale(.95) translateY(12px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes tabLine { from { transform:scaleX(0); } to { transform:scaleX(1); } }
      `}</style>

      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position:"fixed", inset:0, zIndex:200,
          background:"rgba(0,0,0,.6)",
          backdropFilter:"blur(8px)",
          WebkitBackdropFilter:"blur(8px)",
          display:"flex", alignItems:"center", justifyContent:"center",
          padding:16,
        }}
      >
        {/* Card */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: 16,
            padding: "32px 28px",
            width: "100%",
            maxWidth: 420,
            boxShadow: "0 32px 80px rgba(0,0,0,.55)",
            position: "relative",
            animation: "modalIn .22s ease-out",
          }}
        >
          {/* × close */}
          <button
            onClick={onClose}
            style={{
              position:"absolute", top:14, right:14,
              width:30, height:30, border:`1px solid ${T.border2}`,
              background:"transparent", borderRadius:8,
              color:T.muted2, fontSize:16, lineHeight:1,
              display:"flex", alignItems:"center", justifyContent:"center",
              cursor:"pointer", transition:"all .15s",
            }}
            onMouseEnter={e => { const el=e.currentTarget; el.style.borderColor=T.rose; el.style.color=T.rose; }}
            onMouseLeave={e => { const el=e.currentTarget; el.style.borderColor=T.border2; el.style.color=T.muted2; }}
          >×</button>

          {/* Header */}
          <div style={{ marginBottom:24 }}>
            <div style={{
              fontFamily:"'Bricolage Grotesque',sans-serif",
              fontWeight:800, fontSize:22, letterSpacing:"-0.5px",
              background:`linear-gradient(120deg,${T.accent},${T.rose})`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              marginBottom:6,
            }}>
              WebAppLearn
            </div>
            <div style={{ fontSize:12.5, color:T.muted2, fontFamily:"'Fira Code',monospace" }}>
              // sync your progress across devices
            </div>
          </div>

          {/* Tab switcher */}
          <div style={{ display:"flex", marginBottom:28, borderBottom:`1px solid ${T.border}` }}>
            {(["in","up"] as const).map(t => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                style={{
                  flex:1, padding:"10px 0", border:"none", background:"transparent",
                  color: tab===t ? T.accent : T.muted2,
                  fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:700, fontSize:13,
                  cursor:"pointer", position:"relative", transition:"color .15s",
                }}
              >
                {t === "in" ? "Sign In" : "Sign Up"}
                {tab===t && (
                  <span style={{
                    position:"absolute", bottom:-1, left:"10%", right:"10%", height:2,
                    background:`linear-gradient(90deg,${T.accent},${T.rose})`,
                    borderRadius:2, display:"block",
                    animation:"tabLine .18s ease-out",
                  }}/>
                )}
              </button>
            ))}
          </div>

          {/* Success state */}
          {success ? (
            <div style={{ textAlign:"center", padding:"16px 0 8px" }}>
              <div style={{
                width:52, height:52, borderRadius:"50%",
                background:"rgba(52,211,153,.12)", border:`2px solid ${T.green}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                margin:"0 auto 16px", fontSize:22,
              }}>✓</div>
              <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:700, fontSize:16, marginBottom:8 }}>Check your email</div>
              <div style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:20 }}>
                We sent a confirmation link to <strong style={{ color:T.text }}>{email}</strong>. Click it to activate your account, then sign in.
              </div>
              <button
                onClick={() => { setSuccess(false); switchTab("in"); }}
                style={{ fontSize:12.5, color:T.accent, background:"transparent", border:"none", cursor:"pointer", textDecoration:"underline" }}
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {/* Email */}
              <div style={{ marginBottom:16 }}>
                <label style={{ display:"block", fontSize:11.5, fontWeight:600, color:T.muted2, marginBottom:6 }}>Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); if (emailErr) setEmailErr(null); if (globalErr) setGlobalErr(null); }}
                  style={inputStyle(!!emailErr)}
                  onFocus={e => { if (!emailErr) e.target.style.borderColor = T.accent; }}
                  onBlur={e => { if (!emailErr) e.target.style.borderColor = T.border2; }}
                />
                {emailErr && (
                  <div style={{ fontSize:11.5, color:T.rose, marginTop:5, display:"flex", alignItems:"center", gap:4 }}>
                    <span>⚠</span> {emailErr}
                  </div>
                )}
              </div>

              {/* Password */}
              <div style={{ marginBottom:20 }}>
                <label style={{ display:"block", fontSize:11.5, fontWeight:600, color:T.muted2, marginBottom:6 }}>Password</label>
                <div style={{ position:"relative" }}>
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder={tab === "up" ? "Min 8 characters" : "Your password"}
                    value={password}
                    onChange={e => { setPassword(e.target.value); if (passErr) setPassErr(null); if (globalErr) setGlobalErr(null); }}
                    style={{ ...inputStyle(!!passErr), paddingRight:42 }}
                    onFocus={e => { if (!passErr) e.target.style.borderColor = T.accent; }}
                    onBlur={e => { if (!passErr) e.target.style.borderColor = passErr ? T.rose : T.border2; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    style={{
                      position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",
                      background:"transparent", border:"none",
                      color:T.muted2, cursor:"pointer", fontSize:14, lineHeight:1,
                      padding:2,
                    }}
                  >
                    {showPass ? "🙈" : "👁"}
                  </button>
                </div>
                {passErr && (
                  <div style={{ fontSize:11.5, color:T.rose, marginTop:5, display:"flex", alignItems:"center", gap:4 }}>
                    <span>⚠</span> {passErr}
                  </div>
                )}
              </div>

              {/* Global error */}
              {globalErr && (
                <div style={{
                  fontSize:12, color:T.rose,
                  background:"rgba(251,113,133,.08)",
                  border:`1px solid rgba(251,113,133,.25)`,
                  borderRadius:9, padding:"9px 13px",
                  marginBottom:16, display:"flex", gap:7, alignItems:"flex-start",
                }}>
                  <span style={{ flexShrink:0 }}>⚠</span>
                  <span>{globalErr}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={busy}
                style={{
                  background: busy
                    ? T.border2
                    : `linear-gradient(135deg,${T.accent},${T.rose})`,
                  color:"#fff", border:"none",
                  padding:"12px 0", borderRadius:10,
                  fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:700, fontSize:13.5,
                  cursor: busy ? "not-allowed" : "pointer",
                  opacity: busy ? 0.75 : 1,
                  transition:"opacity .2s",
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}
              >
                {busy && <Spinner/>}
                {busy ? "Please wait…" : tab === "in" ? "Sign In" : "Create Account"}
              </button>

              <button
                type="button"
                onClick={onClose}
                style={{
                  marginTop:14, background:"transparent", border:"none",
                  color:T.muted, fontSize:12, cursor:"pointer", padding:4,
                  width:"100%", textAlign:"center",
                }}
              >
                Continue without signing in
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
