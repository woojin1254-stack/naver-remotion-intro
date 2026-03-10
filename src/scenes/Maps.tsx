import React from 'react';
import { NaverCard } from '../components/NaverCard';
import { staticFile, Img } from 'remotion';

export const Maps: React.FC = () => {
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
                title="네이버 지도"
                description="가장 빠른 길을 찾아서"
            >
                <div style={{ position: 'relative' }}>
                    <Img
                        src={staticFile('assets/maps.png')}
                        style={{ width: '100%', borderRadius: '16px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '20px',
                            backgroundColor: 'white',
                            padding: '10px 20px',
                            borderRadius: '10px',
                            fontSize: '20px',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                            fontWeight: 'bold',
                        }}
                    >
                        목적지까지 15분
                    </div>
                </div>
            </NaverCard>
        </div>
    );
};
