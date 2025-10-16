import React from 'react'
import { THEME, useTheme } from '../context/ThemeProvider';
import clsx from 'clsx';

export default function ThemeContent() {
  const { theme } = useTheme();
  
  const isLightMode = theme === THEME.LIGHT;
  
  return (
    <div
      className={clsx(
        'p-4 h-dvh w-full',
        isLightMode ? 'bg-white ' : 'bg-black text-white'
      )}
    >
      <h1
        className={clsx(
          'text-2xl font-bold',
          isLightMode ? 'text-black' : 'text-white'
        )}
      >
        ThemeContent
      </h1>
      <p className={clsx('mt-2', isLightMode ? 'text-gray-800' : 'text-gray-300') }>
        현재 테마는 <strong>{isLightMode ? '라이트 모드' : '다크 모드'}</strong>입니다.
      </p>
    </div>
  )
}
