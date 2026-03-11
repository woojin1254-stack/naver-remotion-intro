import React from 'react';
import {
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    Easing,
} from 'remotion';

export const MoodSplash: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Background gradient rotation
    const gradientAngle = interpolate(frame, [0, 90], [120, 180], {
        extrapolateRight: 'clamp',
    });

    // Overall fade in
    const fadeIn = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: 'clamp',
    });

    // Particles (cherry blossom petals floating)
    const particles = Array.from({ length: 24 }, (_, i) => {
        const delay = i * 3;
        const startX = ((i * 137.5) % width);
        const startY = -50 - (i * 30);
        const drift = Math.sin(i * 0.7) * 80;

        const progress = interpolate(frame - delay, [0, 90], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.sin),
        });

        const y = interpolate(progress, [0, 1], [startY, height + 50]);
        const x = startX + drift * Math.sin(progress * Math.PI * 2);
        const rotation = interpolate(progress, [0, 1], [0, 360 + i * 45]);
        const particleOpacity = interpolate(
            progress,
            [0, 0.1, 0.8, 1],
            [0, 0.7, 0.7, 0]
        );
        const size = 12 + (i % 5) * 6;

        return { x, y, rotation, opacity: particleOpacity, size, i };
    });

    // Center glow pulse
    const glowScale = spring({
        frame: frame - 15,
        fps,
        config: { damping: 8, stiffness: 60 },
    });

    const glowOpacity = interpolate(frame, [15, 40], [0, 0.5], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                opacity: fadeIn,
                background: `linear-gradient(${gradientAngle}deg, 
          #7c5cbf 0%, 
          #9b87f5 25%, 
          #d4a0d0 50%, 
          #f5a5c8 75%, 
          #f5c49a 100%)`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* Floating cherry blossom petals */}
            {particles.map((p) => (
                <div
                    key={p.i}
                    style={{
                        position: 'absolute',
                        left: p.x,
                        top: p.y,
                        width: p.size,
                        height: p.size,
                        opacity: p.opacity,
                        transform: `rotate(${p.rotation}deg)`,
                    }}
                >
                    <svg
                        viewBox="0 0 24 24"
                        width={p.size}
                        height={p.size}
                        fill="none"
                    >
                        <path
                            d="M12 2C12 2 8 7 8 12C8 14 9.5 16 12 16C14.5 16 16 14 16 12C16 7 12 2 12 2Z"
                            fill="rgba(255, 255, 255, 0.6)"
                        />
                        <path
                            d="M12 2C12 2 17 7 17 12C17 14 15.5 16 12 16C8.5 16 8 14 8 12C8 7 12 2 12 2Z"
                            fill="rgba(255, 200, 220, 0.4)"
                        />
                    </svg>
                </div>
            ))}

            {/* Center radial glow */}
            <div
                style={{
                    position: 'absolute',
                    width: 500,
                    height: 500,
                    borderRadius: '50%',
                    background:
                        'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)',
                    transform: `scale(${glowScale})`,
                    opacity: glowOpacity,
                }}
            />

            {/* Subtle "Daily Mood" text reveal */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center',
                }}
            >
                <div
                    style={{
                        fontSize: 32,
                        color: 'rgba(255,255,255,0.6)',
                        fontWeight: 300,
                        letterSpacing: 12,
                        textTransform: 'uppercase',
                        opacity: interpolate(frame, [30, 50], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        }),
                        transform: `translateY(${interpolate(frame, [30, 50], [20, 0], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        })}px)`,
                    }}
                >
                    WELCOME TO
                </div>
            </div>
        </div>
    );
};
