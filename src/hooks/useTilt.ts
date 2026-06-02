import { useState, useRef, useCallback } from 'react';
import type { CSSProperties } from 'react';

export interface TiltState {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
  isHovered: boolean;
}

export function useTilt(maxTilt = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<TiltState>({
    rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false,
  });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setState({
      rotateX: -y * maxTilt,
      rotateY: x * maxTilt,
      glareX: ((e.clientX - rect.left) / rect.width) * 100,
      glareY: ((e.clientY - rect.top) / rect.height) * 100,
      isHovered: true,
    });
  }, [maxTilt]);

  const onMouseLeave = useCallback(() => {
    setState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false });
  }, []);

  const tiltStyle: CSSProperties = {
    transform: `perspective(1000px) rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg)`,
    transition: state.isHovered
      ? 'transform 0.1s ease-out'
      : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    transformStyle: 'preserve-3d',
    willChange: 'transform',
  };

  return { ref, state, tiltStyle, onMouseMove, onMouseLeave };
}
