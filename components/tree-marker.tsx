import type { Marker } from '@googlemaps/markerclusterer';
import React, { useCallback } from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import type { Tree } from '@/lib/trees';

export type TreeMarkerProps = {
  tree: Tree;
  onClick: (tree: Tree) => void;
  setMarkerRef: (marker: Marker | null, key: string) => void;
};

export const TreeMarker = ({
  tree,
  onClick,
  setMarkerRef,
}: TreeMarkerProps) => {
  const handleClick = useCallback(() => onClick(tree), [onClick, tree]);
  const ref = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement) =>
      setMarkerRef(marker, tree.key),
    [setMarkerRef, tree.key]
  );

  return (
    <AdvancedMarker position={tree.position} ref={ref} onClick={handleClick}>
      <span className='text-3xl'>🌳</span>
    </AdvancedMarker>
  );
};
