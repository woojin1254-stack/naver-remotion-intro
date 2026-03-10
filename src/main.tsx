import { useState } from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@remotion/player";
import { MyComposition } from "./Composition";
import { ShortsComposition } from "./scenes/ShortsVideo";
import "./index.css";

type VideoType = "naver" | "shorts";

const videos: Record<VideoType, { label: string; component: React.FC; frames: number }> = {
    naver: { label: "🟢 네이버 인트로", component: MyComposition, frames: 1200 },
    shorts: { label: "🎬 AI/DevOps 숏츠", component: ShortsComposition, frames: 1140 },
};

const App = () => {
    const [active, setActive] = useState<VideoType>("shorts");
    const current = videos[active];

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                backgroundColor: "#0a0a0a",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            {/* 상단 토글 */}
            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "16px",
                    zIndex: 10,
                }}
            >
                {(Object.keys(videos) as VideoType[]).map((key) => (
                    <button
                        key={key}
                        onClick={() => setActive(key)}
                        style={{
                            padding: "10px 24px",
                            borderRadius: "50px",
                            border: active === key ? "2px solid #00c9ff" : "2px solid #333",
                            background: active === key
                                ? "linear-gradient(135deg, #00c9ff22, #92fe9d22)"
                                : "#1a1a1a",
                            color: active === key ? "#00c9ff" : "#888",
                            fontFamily: "'Noto Sans KR', sans-serif",
                            fontWeight: 700,
                            fontSize: "14px",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                        }}
                    >
                        {videos[key].label}
                    </button>
                ))}
            </div>

            {/* 플레이어 */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    height: "calc(100vh - 80px)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 0 60px rgba(0,200,255,0.15)",
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
        </div>
    );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
