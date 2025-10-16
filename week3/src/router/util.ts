export const PUSHSTATE_EVENT = 'pushstate';
export function getCurrentPath() {
  return window.location.pathname;
}
export function navigateTo(to: string, replace = false) {
  if (replace) window.history.replaceState({}, '', to);
  else window.history.pushState({}, '', to);

  window.dispatchEvent(new Event(PUSHSTATE_EVENT));
}