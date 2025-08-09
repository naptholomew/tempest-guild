export type WowheadType = 'item' | 'spell';

export function getWowheadUrl(id: number, type: WowheadType = 'item') {
  return `https://www.wowhead.com/classic/${type}=${id}`;
}
