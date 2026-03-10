import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { ShortsComposition } from "./scenes/ShortsVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NaverIntro"
        component={MyComposition}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AIDevOpsShorts"
        component={ShortsComposition}
        durationInFrames={1140}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
