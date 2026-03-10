import React from 'react';
import { NaverCard } from '../components/NaverCard';
import { staticFile, Img } from 'remotion';

export const Shopping: React.FC = () => {
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
                title="네이버 쇼핑"
                description="트렌디한 상품을 최저가로"
            >
                <Img
                    src={staticFile('assets/shopping.png')}
                    style={{ width: '100%', borderRadius: '16px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                />
                <div
                    style={{
                        marginTop: '20px',
                        backgroundColor: '#FFEB00',
                        padding: '15px',
                        borderRadius: '12px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '24px',
                    }}
                >
                    멤버십 최대 5% 적립
                </div>
            </NaverCard>
        </div>
    );
};
