import { T } from "../utils/theme";

function SkeletonLine({ width = "100%", height = 12 }: { width?: string | number; height?: number }) {
  return (
    <div style={{
      width, height, borderRadius: 6,
      background: `linear-gradient(90deg, ${T.surface} 0%, ${T.surface2} 50%, ${T.surface} 100%)`,
      backgroundSize: "200% 100%",
      animation: "shimmer 1.4s ease-in-out infinite",
    }}/>
  );
}

export default function PageSkeleton() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>
      <div style={{ padding: "36px 24px", maxWidth: 880 }}>
        <div style={{ marginBottom: 32 }}>
          <SkeletonLine width={80} height={10}/>
          <div style={{ height: 12 }}/>
          <SkeletonLine width="55%" height={28}/>
          <div style={{ height: 10 }}/>
          <SkeletonLine width="38%" height={13}/>
        </div>
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            background: T.surface, border: `1px solid ${T.border}`,
            borderRadius: 13, padding: "18px 20px", marginBottom: 14,
          }}>
            <SkeletonLine width="28%" height={10}/>
            <div style={{ height: 14 }}/>
            <SkeletonLine width="100%" height={11}/>
            <div style={{ height: 7 }}/>
            <SkeletonLine width="82%" height={11}/>
            <div style={{ height: 7 }}/>
            <SkeletonLine width="91%" height={11}/>
          </div>
        ))}
      </div>
    </>
  );
}
