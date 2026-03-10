import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const Outro: React.FC = () => {
    const frame = useCurrentFrame();

    const opacity = interpolate(frame, [0, 30], [0, 1]);
    const scale = interpolate(frame, [0, 30], [0.9, 1]);

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: 'var(--naver-white)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    opacity,
                    transform: `scale(${scale})`,
                    textAlign: 'center',
                }}
            >
                <h1 style={{ fontSize: '100px', fontWeight: 900, color: 'var(--naver-green)', marginBottom: '40px' }}>
                    NAVER
                </h1>
                <div
                    style={{
                        backgroundColor: 'var(--naver-green)',
                        color: 'white',
                        padding: '24px 60px',
                        borderRadius: '60px',
                        fontSize: '48px',
                        fontWeight: 'bold',
                        boxShadow: '0 10px 30px rgba(3, 199, 90, 0.3)',
                    }}
                >
                    지금 바로 네이버
                </div>
            </div>
        </div>
    );
};
