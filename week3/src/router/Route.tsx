import type { ComponentType } from 'react';

type RouteProps = { path: string; component: ComponentType<any> };

export const Route = ({ component: Component }: RouteProps) => <Component />;