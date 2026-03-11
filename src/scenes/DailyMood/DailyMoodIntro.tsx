import React from 'react';
import { Series } from 'remotion';
import { MoodSplash } from './MoodSplash';
import { MoodLogoReveal } from './MoodLogoReveal';
import { MoodFeatures } from './MoodFeatures';
import { MoodEmojis } from './MoodEmojis';
import { MoodOutro } from './MoodOutro';

export const DailyMoodIntro: React.FC = () => {
    return (
        <Series>
            <Series.Sequence durationInFrames={90}>
                <MoodSplash />
            </Series.Sequence>
            <Series.Sequence durationInFrames={120}>
                <MoodLogoReveal />
            </Series.Sequence>
            <Series.Sequence durationInFrames={150}>
                <MoodFeatures />
            </Series.Sequence>
            <Series.Sequence durationInFrames={120}>
                <MoodEmojis />
            </Series.Sequence>
            <Series.Sequence durationInFrames={120}>
                <MoodOutro />
            </Series.Sequence>
        </Series>
    );
};
