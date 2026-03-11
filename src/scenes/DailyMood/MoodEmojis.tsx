import React from 'react';
import {
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    Easing,
} from 'remotion';

const moods = [
    { emoji: '😊', label: '행복', color: '#FFD93D', angle: 0 },
    { emoji: '😌', label: '평온', color: '#82E0AA', angle: 60 },
    { emoji: '💕', label: '사랑', color: '#F5A5C8', angle: 120 },
    { emoji: '🤔', label: '생각', color: '#85C1E9', angle: 180 },
    { emoji: '😴', label: '피곤', color: '#C39BD3', angle: 240 },
    { emoji: '🔥', label: '열정', color: '#F5C49A', angle: 300 },
];

export const MoodEmojis: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Background
    const bgShift = interpolate(frame, [0, 120], [0, 40], {
        extrapolateRight: 'clamp',
        easing: Easing.inOut(Easing.sin),
    });

    // Title
    const titleScale = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 80 },
    });
    const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: 'clamp',
    });

    // Center circle
    const centerScale = spring({
        frame: frame - 5,
        fps,
        config: { damping: 10, stiffness: 60, mass: 1.5 },
    });

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(${150 + bgShift}deg, 
          #9b87f5 0%, 
          #c4a8e8 40%, 
          #f5a5c8 70%, 
          #f5c49a 100%)`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background blur circles */}
            <div
                style={{
                    position: 'absolute',
                    width: 600,
                    height: 600,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                    top: -100,
                    right: -100,
                    filter: 'blur(60px)',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    width: 400,
                    height: 400,
                    borderRadius: '50%',
                    background: 'rgba(155,135,245,0.15)',
                    bottom: -50,
                    left: -50,
                    filter: 'blur(40px)',
                }}
            />

            {/* Title */}
            <div
                style={{
                    opacity: titleOpacity,
                    transform: `scale(${titleScale})`,
                    textAlign: 'center',
                    marginBottom: 80,
                    zIndex: 2,
                }}
            >
                <h2
                    style={{
                        fontSize: 60,
                        fontWeight: 800,
                        color: '#ffffff',
                        textShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    }}
                >
                    오늘의 기분은?
                </h2>
            </div>

            {/* Emoji orbit */}
            <div
                style={{
                    position: 'relative',
                    width: 600,
                    height: 600,
                    zIndex: 2,
                }}
            >
                {/* Center pulse */}
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        width: 140,
                        height: 140,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.25)',
                        transform: `translate(-50%, -50%) scale(${centerScale})`,
                        boxShadow: '0 0 60px rgba(255,255,255,0.3)',
                    }}
                />

                {/* Mood emojis in orbit */}
                {moods.map((mood, i) => {
                    const delay = 15 + i * 8;
                    const radius = 240;

                    const emojiScale = spring({
                        frame: frame - delay,
                        fps,
                        config: { damping: 8, stiffness: 100 },
                    });

                    const emojiOpacity = interpolate(
                        frame - delay,
                        [0, 10],
                        [0, 1],
                        {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        }
                    );

                    // Slow rotation of the orbit
                    const orbitAngle =
                        (mood.angle * Math.PI) / 180 + frame * 0.006;
                    const x = Math.cos(orbitAngle) * radius;
                    const y = Math.sin(orbitAngle) * radius;

                    // Floating up-down
                    const float = Math.sin(frame * 0.08 + i * 1.2) * 8;

                    return (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                left: `calc(50% + ${x}px)`,
                                top: `calc(50% + ${y + float}px)`,
                                transform: `translate(-50%, -50%) scale(${emojiScale})`,
                                opacity: emojiOpacity,
                                textAlign: 'center',
                            }}
                        >
                            {/* Glow background */}
                            <div
                                style={{
                                    width: 110,
                                    height: 110,
                                    borderRadius: '50%',
                                    background: `radial-gradient(circle, ${mood.color}50, ${mood.color}10)`,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    boxShadow: `0 8px 24px ${mood.color}30`,
                                    border: `2px solid ${mood.color}40`,
                                }}
                            >
                                <span style={{ fontSize: 52 }}>{mood.emoji}</span>
                            </div>
                            {/* Label */}
                            <div
                                style={{
                                    marginTop: 12,
                                    fontSize: 24,
                                    fontWeight: 600,
                                    color: '#ffffff',
                                    textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                }}
                            >
                                {mood.label}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
