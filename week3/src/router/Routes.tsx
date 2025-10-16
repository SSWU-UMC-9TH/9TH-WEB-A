import { Children, cloneElement, isValidElement, useMemo } from 'react';
import type { FC, ReactElement } from 'react';
import { useCurrentPath } from './hooks';

function isRouteElement(child: unknown): child is ReactElement<{ path: string }> {
  return isValidElement(child) && typeof (child as any).props?.path === 'string';
}

export const Routes: FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentPath = useCurrentPath();

  const activeRoute = useMemo(() => {
    const routes = Children
      .toArray(children)
      .filter(isRouteElement) as ReactElement<{ path: string }>[];
    return routes.find((route) => route.props.path === currentPath) ?? null;
  }, [children, currentPath]);

  if (!activeRoute) return null;
  return cloneElement(activeRoute);
};