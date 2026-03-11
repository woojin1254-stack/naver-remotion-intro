import React from 'react';
import {
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    Easing,
} from 'remotion';

export const MoodOutro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Background gradient
    const bgAngle = interpolate(frame, [0, 120], [130, 180], {
        extrapolateRight: 'clamp',
        easing: Easing.inOut(Easing.sin),
    });

    // Logo
    const logoScale = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 80 },
    });

    const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: 'clamp',
    });

    // Title
    const titleOpacity = interpolate(frame, [15, 35], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const titleY = spring({
        frame: frame - 15,
        fps,
        config: { damping: 200 },
    });

    // CTA button
    const ctaScale = spring({
        frame: frame - 40,
        fps,
        config: { damping: 10, stiffness: 100 },
    });
    const ctaOpacity = interpolate(frame, [40, 55], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Sparkle particles
    const sparkles = Array.from({ length: 12 }, (_, i) => {
        const sparkleDelay = 50 + i * 4;
        const angle = (i / 12) * Math.PI * 2;
        const distance = 350 + (i % 3) * 50;

        const sparkleProgress = interpolate(
            frame - sparkleDelay,
            [0, 30],
            [0, 1],
            {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.quad),
            }
        );

        const x = Math.cos(angle) * distance * sparkleProgress;
        const y = Math.sin(angle) * distance * sparkleProgress;
        const sparkleOpacity = interpolate(
            sparkleProgress,
            [0, 0.3, 0.7, 1],
            [0, 1, 1, 0]
        );

        return { x, y, opacity: sparkleOpacity, i };
    });

    // Subtle pulse on CTA
    const ctaPulse = interpolate(
        frame,
        [60, 75, 90, 105, 120],
        [1, 1.05, 1, 1.05, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        }
    );

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(${bgAngle}deg, 
          #7c5cbf 0%, 
          #9b87f5 35%, 
          #d4a0d0 65%, 
          #f5a5c8 100%)`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Sparkle particles */}
            {sparkles.map((s) => (
                <div
                    key={s.i}
                    style={{
                        position: 'absolute',
                        left: `calc(50% + ${s.x}px)`,
                        top: `calc(50% + ${s.y}px - 60px)`,
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                        opacity: s.opacity,
                        boxShadow: '0 0 12px rgba(255,255,255,0.8)',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            ))}

            {/* Logo mini */}
            <div
                style={{
                    transform: `scale(${logoScale})`,
                    opacity: logoOpacity,
                    marginBottom: 30,
                }}
            >
                <svg viewBox="0 0 120 120" width={120} height={120}>
                    {[0, 72, 144, 216, 288].map((angle, idx) => (
                        <ellipse
                            key={idx}
                            cx="60"
                            cy="30"
                            rx="18"
                            ry="28"
                            fill={`rgba(255, 255, 255, ${0.6 + idx * 0.08})`}
                            transform={`rotate(${angle} 60 60)`}
                        />
                    ))}
                    <circle cx="60" cy="60" r="14" fill="rgba(245,196,154,0.9)" />
                    <circle cx="60" cy="60" r="8" fill="rgba(255,255,255,0.8)" />
                </svg>
            </div>

            {/* Title */}
            <div
                style={{
                    opacity: titleOpacity,
                    transform: `translateY(${interpolate(titleY, [0, 1], [20, 0])}px)`,
                    textAlign: 'center',
                    marginBottom: 20,
                }}
            >
                <h1
                    style={{
                        fontSize: 80,
                        fontWeight: 900,
                        color: '#ffffff',
                        textShadow: '0 4px 30px rgba(0,0,0,0.15)',
                        margin: 0,
                        letterSpacing: -1,
                    }}
                >
                    데일리 무드
                </h1>
            </div>

            {/* Tagline */}
            <div
                style={{
                    opacity: interpolate(frame, [30, 50], [0, 1], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    }),
                    marginBottom: 50,
                }}
            >
                <p
                    style={{
                        fontSize: 34,
                        color: 'rgba(255,255,255,0.8)',
                        fontWeight: 300,
                        letterSpacing: 2,
                    }}
                >
                    당신의 하루를 꽃피우세요 🌸
                </p>
            </div>

            {/* CTA Button */}
            <div
                style={{
                    opacity: ctaOpacity,
                    transform: `scale(${ctaScale * ctaPulse})`,
                }}
            >
                <div
                    style={{
                        background: 'rgba(255,255,255,0.95)',
                        color: '#7c5cbf',
                        padding: '28px 72px',
                        borderRadius: 60,
                        fontSize: 42,
                        fontWeight: 800,
                        boxShadow:
                            '0 12px 40px rgba(124,92,191,0.4), 0 4px 12px rgba(0,0,0,0.1)',
                        letterSpacing: 1,
                    }}
                >
                    지금 시작하기
                </div>
            </div>

            {/* URL */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 80,
                    opacity: interpolate(frame, [60, 80], [0, 0.6], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    }),
                }}
            >
                <p
                    style={{
                        fontSize: 24,
                        color: 'rgba(255,255,255,0.5)',
                        fontWeight: 300,
                        letterSpacing: 3,
                    }}
                >
                    mood-blossom-ui.lovable.app
                </p>
            </div>
        </div>
    );
};
