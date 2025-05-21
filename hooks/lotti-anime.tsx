// app/components/LottieAnimation.tsx
'use client';

import Lottie from 'lottie-react';
import type { LottieOptions } from 'lottie-react';
import type { FC } from 'react';

interface LottieAnimationProps {
  animatedData: LottieOptions['animationData']; // or `any` if needed
  loop?: boolean;
  className? : string;
}

const LottieAnimation: FC<LottieAnimationProps> = ({ animatedData, loop = true,className }) => {
  return (
    <div className={className}>

      <Lottie  animationData={animatedData} loop={loop} />
    </div>
  );
};

export default LottieAnimation;
