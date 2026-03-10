import { createRoot } from "react-dom/client";
import { Player } from "@remotion/player";
import { MyComposition } from "./Composition";
import "./index.css";

const App = () => {
    return (
        <div style={{ width: "100%", height: "100%", backgroundColor: "black" }}>
            <Player
                component={MyComposition}
                durationInFrames={1200}
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
    );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
