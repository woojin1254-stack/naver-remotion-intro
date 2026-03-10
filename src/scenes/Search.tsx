import React from 'react';
import { NaverCard } from '../components/NaverCard';
import { staticFile, Img } from 'remotion';

export const Search: React.FC = () => {
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
                title="빠른 검색"
                description="궁금한 무엇이든, 가장 정확하게"
            >
                <Img
                    src={staticFile('assets/search.png')}
                    style={{ width: '100%', borderRadius: '16px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                />
                <div style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                    {['날씨', '뉴스', '주식', '환율'].map((tag) => (
                        <span
                            key={tag}
                            style={{
                                backgroundColor: 'var(--naver-gray)',
                                padding: '10px 20px',
                                borderRadius: '20px',
                                fontSize: '24px',
                            }}
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </NaverCard>
        </div>
    );
};
