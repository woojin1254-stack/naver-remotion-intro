import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const NaverCard: React.FC<{
    title: string;
    description: string;
    children: React.ReactNode;
}> = ({ title, description, children }) => {
    const frame = useCurrentFrame();
    useVideoConfig();

    const opacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: 'clamp',
    });

    const translateY = interpolate(frame, [0, 20], [50, 0], {
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                width: '90%',
                backgroundColor: 'var(--naver-white)',
                borderRadius: '24px',
                padding: '40px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                opacity,
                transform: `translateY(${translateY}px)`,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
            }}
        >
            <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--naver-green)' }}>{title}</h2>
            <p style={{ fontSize: '28px', color: '#666' }}>{description}</p>
            <div style={{ marginTop: '20px' }}>{children}</div>
        </div>
    );
};
