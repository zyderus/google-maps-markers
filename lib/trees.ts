import { trees } from './constants/treesData';

export interface Tree {
  key: string;
  name: string;
  category: string;
  position: google.maps.LatLngLiteral;
}

for (let i = 0; i < trees.length; i++) {
  (trees[i] as Tree).key = `tree-${i}`;
}

export type CategoryData = {
  key: string;
  label: string;
  count: number;
};

export function getCategories(trees?: Tree[]): CategoryData[] {
  if (!trees) return [];

  const countByCategory: { [c: string]: number } = {};
  for (const t of trees) {
    if (!countByCategory[t.category]) countByCategory[t.category] = 0;
    countByCategory[t.category]++;
  }

  return Object.entries(countByCategory).map(([key, value]) => {
    const label = key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      key: key,
      label,
      count: value,
    };
  });
}

export default trees as Tree[];
