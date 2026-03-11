import React from 'react';
import {
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    Easing,
} from 'remotion';

export const MoodLogoReveal: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Logo scale bounce
    const logoScale = spring({
        frame,
        fps,
        config: { damping: 8, stiffness: 80, mass: 1.2 },
    });

    // Logo opacity
    const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: 'clamp',
    });

    // Glow ring
    const ringScale = spring({
        frame: frame - 10,
        fps,
        config: { damping: 12, stiffness: 50 },
    });

    const ringOpacity = interpolate(frame, [10, 25, 70, 90], [0, 0.5, 0.5, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Title text
    const titleY = spring({
        frame: frame - 30,
        fps,
        config: { damping: 200 },
    });

    const titleOpacity = interpolate(frame, [30, 50], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Subtitle text
    const subtitleOpacity = interpolate(frame, [50, 70], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Floating dots decoration
    const dots = Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 280;
        const dotDelay = 20 + i * 5;
        const dotProgress = spring({
            frame: frame - dotDelay,
            fps,
            config: { damping: 15, stiffness: 80 },
        });

        const dotX = Math.cos(angle + frame * 0.01) * radius * dotProgress;
        const dotY = Math.sin(angle + frame * 0.01) * radius * dotProgress;
        const dotOpacity = interpolate(
            frame - dotDelay,
            [0, 15],
            [0, 0.4 + (i % 3) * 0.2],
            {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
            }
        );

        return { x: dotX, y: dotY, opacity: dotOpacity, size: 8 + (i % 3) * 4, i };
    });

    // Background gradient shift
    const bgShift = interpolate(frame, [0, 120], [0, 30], {
        extrapolateRight: 'clamp',
        easing: Easing.inOut(Easing.sin),
    });

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(${140 + bgShift}deg, 
          #7c5cbf 0%, 
          #9b87f5 30%, 
          #c4a8e8 60%, 
          #f5a5c8 100%)`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Decorative dots */}
            {dots.map((d) => (
                <div
                    key={d.i}
                    style={{
                        position: 'absolute',
                        left: `calc(50% + ${d.x}px)`,
                        top: `calc(50% + ${d.y}px - 80px)`,
                        width: d.size,
                        height: d.size,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.5)',
                        opacity: d.opacity,
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            ))}

            {/* Glow ring behind logo */}
            <div
                style={{
                    position: 'absolute',
                    top: 'calc(50% - 200px)',
                    width: 320,
                    height: 320,
                    borderRadius: '50%',
                    border: '3px solid rgba(255,255,255,0.3)',
                    transform: `scale(${ringScale})`,
                    opacity: ringOpacity,
                    boxShadow: '0 0 60px rgba(155,135,245,0.4)',
                }}
            />

            {/* Cherry blossom logo */}
            <div
                style={{
                    transform: `scale(${logoScale})`,
                    opacity: logoOpacity,
                    marginBottom: 40,
                }}
            >
                <svg viewBox="0 0 120 120" width={180} height={180}>
                    {/* Outer petals */}
                    {[0, 72, 144, 216, 288].map((angle, idx) => (
                        <ellipse
                            key={idx}
                            cx="60"
                            cy="30"
                            rx="18"
                            ry="28"
                            fill={`rgba(245, 165, 200, ${0.7 + idx * 0.06})`}
                            transform={`rotate(${angle} 60 60)`}
                        />
                    ))}
                    {/* Inner petals */}
                    {[36, 108, 180, 252, 324].map((angle, idx) => (
                        <ellipse
                            key={`inner-${idx}`}
                            cx="60"
                            cy="38"
                            rx="12"
                            ry="20"
                            fill={`rgba(196, 168, 232, ${0.6 + idx * 0.08})`}
                            transform={`rotate(${angle} 60 60)`}
                        />
                    ))}
                    {/* Center */}
                    <circle cx="60" cy="60" r="14" fill="#f5c49a" />
                    <circle cx="60" cy="60" r="8" fill="#ffffff" opacity="0.7" />
                </svg>
            </div>

            {/* Title */}
            <div
                style={{
                    textAlign: 'center',
                    transform: `translateY(${interpolate(titleY, [0, 1], [30, 0])}px)`,
                    opacity: titleOpacity,
                }}
            >
                <h1
                    style={{
                        fontSize: 96,
                        fontWeight: 900,
                        color: '#ffffff',
                        letterSpacing: -2,
                        textShadow: '0 4px 30px rgba(124,92,191,0.4)',
                        margin: 0,
                        lineHeight: 1.1,
                    }}
                >
                    데일리 무드
                </h1>
            </div>

            {/* Subtitle */}
            <div
                style={{
                    opacity: subtitleOpacity,
                    marginTop: 20,
                }}
            >
                <p
                    style={{
                        fontSize: 38,
                        fontWeight: 300,
                        color: 'rgba(255,255,255,0.85)',
                        letterSpacing: 4,
                    }}
                >
                    Daily Mood
                </p>
            </div>
        </div>
    );
};
