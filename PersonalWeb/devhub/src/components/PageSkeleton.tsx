import { T } from "../utils/theme";

export default function PageSkeleton() {
  const bar = (w: string, h = 14, mb = 10) => (
    <div style={{
      width: w, height: h, borderRadius: 6, marginBottom: mb,
      background: `linear-gradient(90deg,${T.border} 25%,${T.border2} 50%,${T.border} 75%)`,
      backgroundSize: "200% 100%",
      animation: "cifSkeleton 1.4s ease infinite",
    }} />
  );

  return (
    <>
      <style>{`
        @keyframes cifSkeleton {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <div style={{ padding: "36px 24px", maxWidth: 760 }}>
        {bar("50%", 28, 12)}
        {bar("35%", 14, 24)}
        {bar("100%", 80, 16)}
        {bar("100%", 80, 16)}
        {bar("70%", 14, 0)}
      </div>
    </>
  );
}
