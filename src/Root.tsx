import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { ShortsComposition } from "./scenes/ShortsVideo";
import { DailyMoodIntro } from "./scenes/DailyMood/DailyMoodIntro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DailyMoodIntro"
        component={DailyMoodIntro}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="NaverIntro"
        component={MyComposition}
        durationInFrames={847}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AIDevOpsShorts"
        component={ShortsComposition}
        durationInFrames={1010}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
