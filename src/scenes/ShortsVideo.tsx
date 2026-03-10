import React from 'react';
import {
    AbsoluteFill,
    Img,
    Audio,
    Sequence,
    Series,
    spring,
    useCurrentFrame,
    useVideoConfig,
    staticFile,
    interpolate,
} from 'remotion';
import { shortsNarrationScript } from '../ShortsNarration';

// ── 장면 컴포넌트 ──
const ShortsScene: React.FC<{
    text: string;
    imageSrc: string;
    sceneType: string;
}> = ({ text, imageSrc, sceneType }) => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    // 이미지 Ken Burns 효과 (줌 + 패닝)
    const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.15], {
        extrapolateRight: 'clamp',
    });

    // 텍스트 등장 애니메이션
    const textOpacity = spring({
        frame: frame - 10,
        fps,
        config: { damping: 20, stiffness: 80 },
    });

    const textY = interpolate(
        spring({ frame: frame - 10, fps, config: { damping: 15, stiffness: 100 } }),
        [0, 1],
        [60, 0]
    );

    // 페이드 인
    const fadeIn = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: 'clamp',
    });

    // 페이드 아웃
    const fadeOut = interpolate(
        frame,
        [durationInFrames - 15, durationInFrames],
        [1, 0],
        { extrapolateLeft: 'clamp' }
    );

    const opacity = Math.min(fadeIn, fadeOut);

    // Hook 씬에 눈에 띄는 효과 추가
    const isHook = sceneType === 'Hook';
    const isCTA = sceneType === 'CTA';

    const glowPulse = isHook
        ? interpolate(Math.sin(frame * 0.15), [-1, 1], [0.3, 0.8])
        : 0;

    return (
        <AbsoluteFill style={{ opacity }}>
            {/* 배경 이미지 (Ken Burns 줌) */}
            <AbsoluteFill>
                <Img
                    src={staticFile(imageSrc)}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: `scale(${scale})`,
                    }}
                />
            </AbsoluteFill>

            {/* 어둡게 오버레이 */}
            <AbsoluteFill
                style={{
                    background:
                        'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.5) 100%)',
                }}
            />

            {/* Hook 글로우 이펙트 */}
            {isHook && (
                <AbsoluteFill
                    style={{
                        background: `radial-gradient(ellipse at center, rgba(0, 200, 255, ${glowPulse}) 0%, transparent 70%)`,
                    }}
                />
            )}

            {/* CTA 하단 그라데이션 강조 */}
            {isCTA && (
                <AbsoluteFill
                    style={{
                        background:
                            'linear-gradient(to top, rgba(0, 200, 100, 0.3) 0%, transparent 50%)',
                    }}
                />
            )}

            {/* 자막 텍스트 */}
            <AbsoluteFill
                style={{
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingBottom: '200px',
                    paddingLeft: '60px',
                    paddingRight: '60px',
                }}
            >
                <div
                    style={{
                        opacity: textOpacity,
                        transform: `translateY(${textY}px)`,
                        textAlign: 'center',
                    }}
                >
                    <p
                        style={{
                            fontFamily: "'Noto Sans KR', sans-serif",
                            fontSize: isHook ? '56px' : '44px',
                            fontWeight: isHook ? 900 : 700,
                            color: 'white',
                            lineHeight: 1.5,
                            textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)',
                            letterSpacing: '-1px',
                        }}
                    >
                        {text}
                    </p>
                </div>
            </AbsoluteFill>

            {/* CTA 액션 버튼 텍스트 */}
            {isCTA && frame > 60 && (
                <AbsoluteFill
                    style={{
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        paddingBottom: '100px',
                    }}
                >
                    <div
                        style={{
                            opacity: spring({
                                frame: frame - 60,
                                fps,
                                config: { damping: 15 },
                            }),
                            background: 'linear-gradient(135deg, #00C9FF, #92FE9D)',
                            padding: '16px 48px',
                            borderRadius: '50px',
                            fontSize: '32px',
                            fontWeight: 800,
                            fontFamily: "'Noto Sans KR', sans-serif",
                            color: '#000',
                            boxShadow: '0 8px 30px rgba(0,200,255,0.4)',
                        }}
                    >
                        🚀 시작하기
                    </div>
                </AbsoluteFill>
            )}
        </AbsoluteFill>
    );
};

// ── 메인 숏츠 컴포지션 ──
export const ShortsComposition: React.FC = () => {
    return (
        <>
            {/* 오디오 나레이션 */}
            {shortsNarrationScript.map((item, index) => (
                <Sequence
                    key={`audio-${index}`}
                    from={item.startFrame}
                    durationInFrames={item.durationInFrames}
                >
                    <Audio src={staticFile(`audio/shorts/scene_${index + 1}.mp3`)} />
                </Sequence>
            ))}

            {/* 장면 시퀀스 */}
            <Series>
                {shortsNarrationScript.map((item, index) => (
                    <Series.Sequence
                        key={`scene-${index}`}
                        durationInFrames={item.durationInFrames}
                    >
                        <ShortsScene
                            text={item.text}
                            imageSrc={item.image}
                            sceneType={item.scene}
                        />
                    </Series.Sequence>
                ))}
            </Series>
        </>
    );
};
