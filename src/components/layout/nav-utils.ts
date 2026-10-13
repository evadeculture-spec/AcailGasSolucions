/** True when `pathname` is `href` or one of its sub-routes. Hash fragments are ignored. */
export function isActivePath(pathname: string, href: string): boolean {
  const target = href.split("#")[0] ?? href;
  if (target === "/") return pathname === "/";
  return pathname === target || pathname.startsWith(`${target}/`);
}
