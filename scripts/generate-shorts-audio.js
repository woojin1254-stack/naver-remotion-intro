const googleTTS = require('google-tts-api'); // CommonJS import
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const shortsNarration = [
    {
        scene: 'Scene1',
        text: '쿠버네티스랑 AI, 아직도 따로 놀고 계신가요?',
        fileName: 'scene_1.mp3'
    },
    {
        scene: 'Scene2',
        text: '요즘 실리콘밸리에선 쿠버네티스 클러스터 위에 LLM을 직접 올리는 쿠브AI 플랫폼이 대세입니다.',
        fileName: 'scene_2.mp3'
    },
    {
        scene: 'Scene3',
        text: '자원 할당부터 스케일링까지, AI가 알아서 트래픽을 예측하고 파드를 조절하죠.',
        fileName: 'scene_3.mp3'
    },
    {
        scene: 'Scene4',
        text: '데브옵스 팀은 이제 인프라 관리 대신, AI 모델의 최적화를 고민하는 진짜 ML 옵스 엔지니어가 됩니다.',
        fileName: 'scene_4.mp3'
    },
    {
        scene: 'Scene5',
        text: '미래의 인프라, 아직 늦지 않았습니다. 지금 바로 여러분만의 클러스터를 만들어보세요!',
        fileName: 'scene_5.mp3'
    }
];

async function generateAudio() {
    const audioDir = path.join(__dirname, '../public/audio/shorts');
    if (!fs.existsSync(audioDir)) {
        fs.mkdirSync(audioDir, { recursive: true });
    }

    for (const item of shortsNarration) {
        const filePath = path.join(audioDir, item.fileName);

        try {
            console.log(`Generating audio for ${item.scene}...`);
            const url = googleTTS.getAudioUrl(item.text, {
                lang: 'ko',
                slow: false,
                host: 'https://translate.google.com',
            });

            const response = await axios({
                url,
                method: 'GET',
                responseType: 'stream',
            });

            const writer = fs.createWriteStream(filePath);
            response.data.pipe(writer);

            await new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });

            console.log(`Saved ${item.fileName}`);

            // Wait to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(`Error generating audio for ${item.scene}:`, error.message);
        }
    }
    console.log('Audio generation complete!');
}

generateAudio();
