import { Tree } from '@/lib/trees';
import { useEffect, useRef, useState } from 'react';

interface TreeListProps {
  trees: Tree[];
  selectedTreeKey: string | null;
  setSelectedTreeKey: (key: string | null) => void;
}

export default function TreeList({
  trees,
  selectedTreeKey,
  setSelectedTreeKey,
}: TreeListProps) {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const handleClick = (key: string | null) => {
    if (selectedTreeKey === key) {
      setSelectedTreeKey(null);
    } else {
      setSelectedTreeKey(key);
    }
  };

  useEffect(() => {
    if (selectedTreeKey !== null) {
      const index = trees.findIndex((tree) => tree.key === selectedTreeKey);
      if (index !== -1 && itemRefs.current[index]) {
        itemRefs.current[index]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [selectedTreeKey, trees]);

  return (
    <ul className='h-[600px] overflow-y-auto'>
      {trees.map((tree, index) => (
        <li key={tree.key} ref={(el: any) => (itemRefs.current[index] = el)}>
          <button
            onClick={() => handleClick(tree.key)}
            className={`w-full h-full p-2 bg-green-400  ${
              selectedTreeKey === tree.key ? 'bg-red-400' : 'hover:bg-green-600'
            }`}
          >
            {tree.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
