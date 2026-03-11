// 🌸 여성 음성(SunHiNeural) 기반 정밀 타이밍 (30fps, +12% 속도)
// scene_1.mp3: 4.08s → 138 frames (123 + 15 margin)
// scene_2.mp3: 6.74s → 218 frames (203 + 15 margin)
// scene_3.mp3: 6.12s → 199 frames (184 + 15 margin)
// scene_4.mp3: 7.34s → 236 frames (221 + 15 margin)
// scene_5.mp3: 6.77s → 219 frames (204 + 15 margin)
// TOTAL: 1010 frames (~33.7s)

export const shortsNarrationScript = [
    {
        scene: 'Hook',
        text: '쿠버네티스랑 AI, 아직도 따로 놀고 계신가요?',
        startFrame: 0,
        durationInFrames: 138,    // 4.08초 + 0.5초 여유
        image: 'assets/shorts/k8s_ai_1_1773145997005.png',
    },
    {
        scene: 'Main1',
        text: '요즘 실리콘밸리에선 쿠버네티스 클러스터 위에 LLM을 직접 올리는 쿠브AI 플랫폼이 대세입니다.',
        startFrame: 138,
        durationInFrames: 218,    // 6.74초 + 0.5초 여유
        image: 'assets/shorts/k8s_ai_2_1773146015517.png',
    },
    {
        scene: 'Main2',
        text: '자원 할당부터 스케일링까지, AI가 알아서 트래픽을 예측하고 파드를 조절하죠.',
        startFrame: 356,
        durationInFrames: 199,    // 6.12초 + 0.5초 여유
        image: 'assets/shorts/k8s_ai_3_1773146035176.png',
    },
    {
        scene: 'Main3',
        text: '데브옵스 팀은 이제 인프라 관리 대신, AI 모델의 최적화를 고민하는 진짜 ML 옵스 엔지니어가 됩니다.',
        startFrame: 555,
        durationInFrames: 236,    // 7.34초 + 0.5초 여유
        image: 'assets/shorts/k8s_ai_4_1773146065589.png',
    },
    {
        scene: 'CTA',
        text: '미래의 인프라, 아직 늦지 않았습니다. 지금 바로 여러분만의 클러스터를 만들어보세요!',
        startFrame: 791,
        durationInFrames: 219,    // 6.77초 + 0.5초 여유
        image: 'assets/shorts/k8s_ai_5_1773146083920.png',
    },
];

// 총 프레임: 1010 (약 33.7초)
