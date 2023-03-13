import styled, { keyframes } from 'styled-components/macro';

const spin = keyframes`
  0%,
  100% {
    box-shadow: .2em 0px 0 0px currentcolor;
  }
  12% {
    box-shadow: .2em .2em 0 0 currentcolor;
  }
  25% {
    box-shadow: 0 .2em 0 0px currentcolor;
  }
  37% {
    box-shadow: -.2em .2em 0 0 currentcolor;
  }
  50% {
    box-shadow: -.2em 0 0 0 currentcolor;
  }
  62% {
    box-shadow: -.2em -.2em 0 0 currentcolor;
  }
  75% {
    box-shadow: 0px -.2em 0 0 currentcolor;
  }
  87% {
    box-shadow: .2em -.2em 0 0 currentcolor;
  }
`;

export const PageLoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
`;

export const PageLoader = styled.div`
  transform: rotateZ(45deg);
  perspective: 1000px;
  border-radius: 50%;
  width: 130px;
  height: 130px;
  color: var(--primary);

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    transform: rotateX(70deg);
    animation: 1s ${spin} linear infinite;
  }
  &:after {
    color: var(--black);
    transform: rotateY(70deg);
    animation-delay: 0.4s;
  }
`;

export const ViewLoader = styled.div`
  text-align: center;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  span {
    display: block;
  }
`;

export const LinesHolder = styled.div`
  height: 25px;
`;

const opacity = keyframes`
  0% { 
    opacity: 1;
    height: 25px;
  }
  50% { 
    opacity: 0;
    height: 20px;
  }
  100% { 
    opacity: 1;
    height: 25px;
  }  
`;
export const Line = styled.div`
  width: 2px;
  height: 20px;
  background: var(--primary);
  margin: 0 5px;
  display: inline-block;
  animation: ${opacity} 1000ms infinite ease-in-out;
  &.line-1 {
    animation-delay: 800ms;
  }
  &.line-2 {
    animation-delay: 600ms;
  }
  &.line-3 {
    animation-delay: 400ms;
  }
  &.line-4 {
    animation-delay: 200ms;
  }
  &.line-6 {
    animation-delay: 200ms;
  }
  &.line-7 {
    animation-delay: 400ms;
  }
  &.line-8 {
    animation-delay: 600ms;
  }
  &.line-9 {
    animation-delay: 800ms;
  }
`;

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const BlurBackground = styled.div`
  position: absolute;
  inset: 0;
  backdrop-filter: blur(3px);
  background: rgba(255, 255, 255, 0.5);
  z-index: 1;
`;

export const ComponentLoaderHolder = styled.div`
  position: relative;
  z-index: 2;
`;

export const LoaderWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

export const ComponentLoader = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid var(--primary);
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;

export const Logo = styled.img`
  transform: rotateZ(-45deg) translateY(64px);
  width: 38px;
  height: 38px;
`;

const loadingCircle = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

export const BtnLoader = styled.span`
  margin-right: 12px;
  svg {
    animation: ${loadingCircle} 1s linear infinite;
  }
`;
