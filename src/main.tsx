import { useState, useCallback, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@remotion/player";
import { MyComposition } from "./Composition";
import { ShortsComposition } from "./scenes/ShortsVideo";
import { DailyMoodIntro } from "./scenes/DailyMood/DailyMoodIntro";
import "./index.css";

type VideoType = "dailymood" | "naver" | "shorts";

interface VideoInfo {
    label: string;
    component: React.FC;
    frames: number;
    accent: string;
    accentGlow: string;
}

const videos: Record<VideoType, VideoInfo> = {
    dailymood: {
        label: "🌸 데일리 무드",
        component: DailyMoodIntro,
        frames: 600,
        accent: "#9b87f5",
        accentGlow: "rgba(155,135,245,0.3)",
    },
    naver: {
        label: "🟢 네이버 인트로",
        component: MyComposition,
        frames: 847,
        accent: "#03C75A",
        accentGlow: "rgba(3,199,90,0.3)",
    },
    shorts: {
        label: "🎬 AI/DevOps 숏츠",
        component: ShortsComposition,
        frames: 1010,
        accent: "#00c9ff",
        accentGlow: "rgba(0,200,255,0.3)",
    },
};

const App = () => {
    const [active, setActive] = useState<VideoType>("dailymood");
    const current = useMemo(() => videos[active], [active]);

    const handleSelect = useCallback((key: VideoType) => {
        setActive(key);
    }, []);

    return (
        <div
            style={{
                width: "100%",
                minHeight: "100vh",
                backgroundColor: "#08060f",
                background:
                    "radial-gradient(ellipse at 50% 0%, #1a1035 0%, #08060f 60%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px 16px",
                fontFamily: "'Noto Sans KR', sans-serif",
                overflow: "hidden",
                position: "relative",
            }}
        >
            {/* Ambient glow behind player */}
            <div
                style={{
                    position: "absolute",
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${current.accentGlow}, transparent 70%)`,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                    opacity: 0.5,
                }}
            />

            {/* Header */}
            <h1
                id="app-title"
                style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "#ffffff",
                    letterSpacing: -0.5,
                    marginBottom: 8,
                    opacity: 0.9,
                }}
            >
                Remotion Player
            </h1>

            {/* Toggle Buttons */}
            <div
                id="video-selector"
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "20px",
                    zIndex: 10,
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                {(Object.keys(videos) as VideoType[]).map((key) => {
                    const isActive = active === key;
                    const vid = videos[key];
                    return (
                        <button
                            key={key}
                            id={`btn-${key}`}
                            onClick={() => handleSelect(key)}
                            style={{
                                padding: "10px 22px",
                                borderRadius: "50px",
                                border: isActive
                                    ? `2px solid ${vid.accent}`
                                    : "2px solid rgba(255,255,255,0.08)",
                                background: isActive
                                    ? `linear-gradient(135deg, ${vid.accent}18, ${vid.accent}08)`
                                    : "rgba(255,255,255,0.04)",
                                backdropFilter: "blur(12px)",
                                color: isActive ? vid.accent : "#666",
                                fontFamily: "'Noto Sans KR', sans-serif",
                                fontWeight: 700,
                                fontSize: "13px",
                                cursor: "pointer",
                                letterSpacing: 0.3,
                                boxShadow: isActive
                                    ? `0 4px 20px ${vid.accent}20`
                                    : "none",
                            }}
                        >
                            {vid.label}
                        </button>
                    );
                })}
            </div>

            {/* Player Container */}
            <div
                id="player-container"
                style={{
                    width: "100%",
                    maxWidth: "380px",
                    height: "calc(100vh - 140px)",
                    maxHeight: "680px",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: `0 0 80px ${current.accentGlow}, 
                                0 20px 60px rgba(0,0,0,0.5),
                                inset 0 0 0 1px rgba(255,255,255,0.06)`,
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Player
                    key={active}
                    component={current.component}
                    durationInFrames={current.frames}
                    compositionWidth={1080}
                    compositionHeight={1920}
                    fps={30}
                    autoPlay
                    loop
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                    controls
                />
            </div>

            {/* Footer */}
            <p
                style={{
                    marginTop: 16,
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.2)",
                    letterSpacing: 2,
                    zIndex: 2,
                }}
            >
                POWERED BY REMOTION
            </p>
        </div>
    );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
