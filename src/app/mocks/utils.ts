export function mapToQueryString(map: Object): string {
  return Object.entries(map).map(([key, val]) => {
    return `${key}=${val}`;
  }).join('&');
}
