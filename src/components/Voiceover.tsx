import { Audio, staticFile, Sequence } from 'remotion';
import { narrationScript } from '../Narration';

export const Voiceover: React.FC = () => {
    return (
        <>
            {narrationScript.map((item, index: number) => (
                <Sequence
                    key={index}
                    from={item.startFrame}
                    durationInFrames={item.durationInFrames}
                >
                    <Audio
                        src={staticFile(`audio/scene_${index + 1}.mp3`)}
                    />
                </Sequence>
            ))}
        </>
    );
};
