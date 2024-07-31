import type { Tree } from './trees';

export const fitBounds = (map: google.maps.Map | null, items: Tree[]) => {
  if (!map || !items) return;

  const bounds = new google.maps.LatLngBounds();
  items.forEach(({ position }) => bounds.extend(position));
  map.fitBounds(bounds);
};
