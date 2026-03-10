import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const opacity = spring({
        frame,
        fps,
        config: {
            damping: 15,
        },
    });

    const scale = spring({
        frame,
        fps,
        from: 0.8,
        to: 1,
        config: {
            damping: 12,
            stiffness: 100,
        },
    });

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: 'var(--naver-green)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
            }}
        >
            <div
                style={{
                    opacity,
                    transform: `scale(${scale})`,
                    textAlign: 'center',
                }}
            >
                <h1 style={{ fontSize: '140px', fontWeight: 900, marginBottom: '20px', letterSpacing: '-5px' }}>NAVER</h1>
                <p style={{ fontSize: '48px', fontWeight: 300, opacity: 0.9 }}>세상의 모든 시작</p>
            </div>
        </div>
    );
};
