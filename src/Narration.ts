// 🌸 여성 음성(SunHiNeural) 기반 정밀 타이밍 (30fps, +12% 속도)
// scene_1.mp3: 3.48s → 120 frames (105 + 15 margin)
// scene_2.mp3: 4.42s → 148 frames (133 + 15 margin)
// scene_3.mp3: 4.92s → 163 frames (148 + 15 margin)
// scene_4.mp3: 4.63s → 154 frames (139 + 15 margin)
// scene_5.mp3: 3.96s → 134 frames (119 + 15 margin)
// scene_6.mp3: 3.74s → 128 frames (113 + 15 margin)
// TOTAL: 847 frames (~28.2s)

export const narrationScript = [
    {
        scene: 'Intro',
        text: '세상의 모든 시작, 네이버와 함께하세요.',
        startFrame: 0,
        durationInFrames: 120,
    },
    {
        scene: 'Search',
        text: '궁금한 무엇이든, 가장 빠르고 정확하게 찾아드립니다.',
        startFrame: 120,
        durationInFrames: 148,
    },
    {
        scene: 'Shopping',
        text: '트렌디한 쇼핑부터 똑똑한 멤버십까지, 한 곳에서 즐기세요.',
        startFrame: 268,
        durationInFrames: 163,
    },
    {
        scene: 'News',
        text: '오늘의 실시간 정보를 한눈에, 당신만의 뉴스를 만나보세요.',
        startFrame: 431,
        durationInFrames: 154,
    },
    {
        scene: 'Maps',
        text: '어디로 가든 정확하게, 네이버 지도가 함께합니다.',
        startFrame: 585,
        durationInFrames: 134,
    },
    {
        scene: 'Outro',
        text: '일상의 모든 연결, 지금 바로 네이버.',
        startFrame: 719,
        durationInFrames: 128,
    },
];
