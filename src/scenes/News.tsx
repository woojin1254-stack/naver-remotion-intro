import React from 'react';
import { NaverCard } from '../components/NaverCard';
import { staticFile, Img } from 'remotion';

export const News: React.FC = () => {
    return (
        <div
            style={{
                flex: 1,
                backgroundColor: 'var(--naver-green)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
            }}
        >
            <NaverCard
                title="뉴스 스탠드"
                description="오늘의 이슈를 한눈에"
            >
                <Img
                    src={staticFile('assets/news.png')}
                    style={{ width: '100%', borderRadius: '16px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                    {[
                        '전국 맑음, 낮 기온 15도 내외',
                        'AI 기술의 진화, 우리의 삶을 바꾸다',
                    ].map((text, i) => (
                        <div
                            key={i}
                            style={{
                                padding: '15px',
                                borderBottom: '1px solid #eee',
                                fontSize: '24px',
                                color: '#333',
                            }}
                        >
                            • {text}
                        </div>
                    ))}
                </div>
            </NaverCard>
        </div>
    );
};
