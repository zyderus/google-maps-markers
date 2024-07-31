import { fitBounds } from '@/lib/fitBounds';
import type { Tree } from '@/lib/trees';
import { useMap } from '@vis.gl/react-google-maps';

interface ViewAllButtonProps {
  items: Tree[];
  className?: string;
}

export default function ViewAllButton({
  items,
  className = '',
}: ViewAllButtonProps) {
  const map = useMap();

  return (
    <button
      onClick={() => fitBounds(map, items)}
      className={`bg-green-400 hover:bg-green-600 rounded-lg px-4 py-2 ${className}`}
    >
      view all
    </button>
  );
}
