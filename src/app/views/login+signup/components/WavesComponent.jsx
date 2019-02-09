// CREDITS: https://codepen.io/plavookac/pen/QMwObb
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { mediaSize } from '../../../../utils/siteTools';

import TopWave from '../../../../static/img/shapes/wave_top.png';
import MiddleWave from '../../../../static/img/shapes/wave_mid.png';
import BottomWave from '../../../../static/img/shapes/wave_bot.png';


const flow = keyframes`
  0% {
    transform: translateX(0) translateZ(0) scaleY(1)
  }
  40% {
    transform: translateX(-25%) translateZ(0) scaleY(0.55)
  }
  100% {
    transform: translateX(-50%) translateZ(0) scaleY(1)
  }
`;


const Container = styled.div`
  overflow: hidden;
  position: absolute;
  z-index: -1;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
`;


const WaveWrapper = styled.div`
  position: absolute;
  width: 100%;
  overflow: hidden;
  height: 100%;
  bottom: -5px;

  &.topWave {
    z-index: 15;
    opacity: 0.5;
  }

  &.midWave {
    z-index: 10;
    opacity: 0.75;
  }

  &.botWave {
    z-index: 5;
  }
`;


const Wave = styled.div`
  position: absolute;
  left: 0;
  width: 200%;
  height: 100%;

  background-repeat: repeat no-repeat;
  background-position: 0 bottom;
  transform-origin: center bottom;

  will-change: transform;

  &.topWave {
    background-image: url(${TopWave});
    background-size: 50% 100px;
    animation: ${flow} 14s linear infinite;
    animation-delay: 1s;
  }

  &.midWave {
    background-image: url(${MiddleWave});
    background-size: 50% 120px;
    animation: ${flow} 11s linear infinite;
  }

  &.botWave {
    background-image: url(${BottomWave});
    background-size: 50% 100px;
    animation: ${flow} 18s linear infinite;
  }


  ${mediaSize.phone`
    &.topWave {
      background-size: 50% 60px;
      animation: ${flow} 5s linear infinite;
    }

    &.midWave {
      background-size: 50% 65px;
      animation: ${flow} 4s linear infinite;
    }

    &.botWave {
      background-size: 50% 55px;
      animation: ${flow} 7s linear infinite;
    }
  `}
`;


const WavesComponent = () => (
  <Container>

    <WaveWrapper className="topWave">
      <Wave className="topWave" />
    </WaveWrapper>
    <WaveWrapper className="midWave">
      <Wave className="midWave" />
    </WaveWrapper>
    <WaveWrapper className="botWave">
      <Wave className="botWave" />
    </WaveWrapper>
    
  </Container>
);

export default WavesComponent;
