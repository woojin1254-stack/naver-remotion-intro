const googleTTS = require('google-tts-api');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const narrationScript = [
    { text: '세상의 모든 시작, 네이버와 함께하세요.', filename: 'scene_1.mp3' },
    { text: '궁금한 무엇이든, 가장 빠르고 정확하게 찾아드립니다.', filename: 'scene_2.mp3' },
    { text: '트렌디한 쇼핑부터 똑똑한 멤버십까지, 한 곳에서 즐기세요.', filename: 'scene_3.mp3' },
    { text: '오늘의 실시간 정보를 한눈에, 당신만의 뉴스를 만나보세요.', filename: 'scene_4.mp3' },
    { text: '어디로 가든 정확하게, 네이버 지도가 함께합니다.', filename: 'scene_5.mp3' },
    { text: '일상의 모든 연결, 지금 바로 네이버.', filename: 'scene_6.mp3' },
];

const audioDir = path.join(__dirname, '..', 'public', 'audio');

if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
}

async function downloadAudio(text, filename) {
    console.log(`Generating audio for: "${text}"`);
    const url = googleTTS.getAudioUrl(text, {
        lang: 'ko',
        slow: false,
        host: 'https://translate.google.com',
    });

    const response = await axios({
        method: 'get',
        url: url,
        responseType: 'stream',
    });

    const writer = fs.createWriteStream(path.join(audioDir, filename));
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

async function main() {
    for (const item of narrationScript) {
        await downloadAudio(item.text, item.filename);
        console.log(`Saved ${item.filename}`);
    }
    console.log('All audio files generated successfully!');
}

main().catch(console.error);
