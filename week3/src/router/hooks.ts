import { useEffect, useState } from 'react';
import { getCurrentPath, PUSHSTATE_EVENT } from './util';
export function useCurrentPath() {
  const [path, setPath] = useState(() => getCurrentPath());

  useEffect(() => {
    const onChange = () => setPath(getCurrentPath());
    window.addEventListener(PUSHSTATE_EVENT, onChange);
    window.addEventListener('popstate', onChange);

    return () => {
      window.removeEventListener(PUSHSTATE_EVENT, onChange);
      window.removeEventListener('popstate', onChange);
    };
  }, []);

  return path;
}