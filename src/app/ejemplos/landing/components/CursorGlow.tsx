'use client';

import { useEffect, useState, useRef } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

export default function CursorGlow() {
  const { x, y, isWithin } = useMousePosition();
  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setIsDesktop(matchMedia('(hover: hover) and (pointer: fine)').matches);
    setReduced(matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (!isDesktop || reduced) return;
    setVisible(isWithin);
  }, [isWithin, isDesktop, reduced]);

  if (!isDesktop || reduced) return null;

  return (
    <div aria-hidden="true" />
  );
}
