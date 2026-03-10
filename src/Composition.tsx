import React from 'react';
import { Series } from 'remotion';
import { Intro } from './scenes/Intro';
import { Search } from './scenes/Search';
import { Shopping } from './scenes/Shopping';
import { News } from './scenes/News';
import { Maps } from './scenes/Maps';
import { Outro } from './scenes/Outro';
import { Voiceover } from './components/Voiceover';

export const MyComposition: React.FC = () => {
  return (
    <>
      <Voiceover />
      <Series>
        <Series.Sequence durationInFrames={150}>
          <Intro />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240}>
          <Search />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240}>
          <Shopping />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240}>
          <News />
        </Series.Sequence>
        <Series.Sequence durationInFrames={210}>
          <Maps />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
          <Outro />
        </Series.Sequence>
      </Series>
    </>
  );
};
