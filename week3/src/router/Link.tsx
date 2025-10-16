import type { MouseEvent, ReactNode } from 'react';
import { getCurrentPath, navigateTo } from './util';

type LinkProps = { to: string; children: ReactNode };

export const Link = ({ to, children }: LinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (getCurrentPath() === to) return;
    navigateTo(to);
  };
  return <a href={to} onClick={handleClick}>{children}</a>;
};