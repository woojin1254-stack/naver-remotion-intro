import React from 'react';
import {
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    Easing,
} from 'remotion';

const features = [
    {
        emoji: '📝',
        title: '매일 기분 기록',
        desc: '하루의 감정을 간단하게 기록하세요',
        color: '#f5a5c8',
    },
    {
        emoji: '📊',
        title: '감정 분석 리포트',
        desc: '나만의 감정 패턴을 발견하세요',
        color: '#9b87f5',
    },
    {
        emoji: '🌸',
        title: '무드 가든',
        desc: '기록이 쌓이면 꽃이 피어납니다',
        color: '#f5c49a',
    },
];

export const MoodFeatures: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Background
    const bgGradient = interpolate(frame, [0, 150], [160, 200], {
        extrapolateRight: 'clamp',
        easing: Easing.inOut(Easing.sin),
    });

    // Title animation
    const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: 'clamp',
    });
    const titleY = interpolate(frame, [0, 20], [30, 0], {
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.quad),
    });

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(${bgGradient}deg, 
          #1a1035 0%, 
          #2a1f4e 40%, 
          #3d2a6b 100%)`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 60,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background decorative circles */}
            {[0, 1, 2].map((i) => {
                const circleDelay = i * 15;
                const circleScale = spring({
                    frame: frame - circleDelay,
                    fps,
                    config: { damping: 200 },
                });
                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            width: 400 + i * 200,
                            height: 400 + i * 200,
                            borderRadius: '50%',
                            border: '1px solid rgba(155,135,245,0.1)',
                            transform: `scale(${circleScale})`,
                            opacity: 0.3,
                        }}
                    />
                );
            })}

            {/* Section title */}
            <div
                style={{
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    marginBottom: 80,
                    textAlign: 'center',
                }}
            >
                <p
                    style={{
                        fontSize: 30,
                        color: '#f5a5c8',
                        fontWeight: 500,
                        letterSpacing: 6,
                        marginBottom: 16,
                    }}
                >
                    ✦ FEATURES ✦
                </p>
                <h2
                    style={{
                        fontSize: 64,
                        fontWeight: 800,
                        color: '#ffffff',
                        letterSpacing: -1,
                    }}
                >
                    이런 기능이 있어요
                </h2>
            </div>

            {/* Feature cards */}
            {features.map((feature, i) => {
                const cardDelay = 25 + i * 20;

                const cardScale = spring({
                    frame: frame - cardDelay,
                    fps,
                    config: { damping: 12, stiffness: 80 },
                });

                const cardOpacity = interpolate(
                    frame - cardDelay,
                    [0, 15],
                    [0, 1],
                    {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    }
                );

                const cardX = interpolate(
                    frame - cardDelay,
                    [0, 20],
                    [-60, 0],
                    {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                        easing: Easing.out(Easing.quad),
                    }
                );

                return (
                    <div
                        key={i}
                        style={{
                            opacity: cardOpacity,
                            transform: `scale(${cardScale}) translateX(${cardX}px)`,
                            width: '85%',
                            maxWidth: 900,
                            marginBottom: 28,
                            background: 'rgba(255,255,255,0.08)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: 28,
                            padding: '36px 44px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 36,
                            border: `1px solid rgba(155,135,245,0.15)`,
                            boxShadow: `0 8px 32px rgba(0,0,0,0.2), 
                          inset 0 1px 0 rgba(255,255,255,0.08)`,
                        }}
                    >
                        {/* Emoji icon */}
                        <div
                            style={{
                                fontSize: 56,
                                width: 90,
                                height: 90,
                                borderRadius: 24,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                background: `linear-gradient(135deg, ${feature.color}30, ${feature.color}10)`,
                                border: `1px solid ${feature.color}40`,
                                flexShrink: 0,
                            }}
                        >
                            {feature.emoji}
                        </div>

                        {/* Text content */}
                        <div>
                            <h3
                                style={{
                                    fontSize: 38,
                                    fontWeight: 700,
                                    color: '#ffffff',
                                    marginBottom: 8,
                                }}
                            >
                                {feature.title}
                            </h3>
                            <p
                                style={{
                                    fontSize: 26,
                                    color: 'rgba(255,255,255,0.6)',
                                    fontWeight: 300,
                                }}
                            >
                                {feature.desc}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
