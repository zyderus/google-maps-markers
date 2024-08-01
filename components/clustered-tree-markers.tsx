import { InfoWindow, useMap } from '@vis.gl/react-google-maps';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { type Marker, MarkerClusterer } from '@googlemaps/markerclusterer';
import type { Tree } from '@/lib/trees';
import { TreeMarker } from './tree-marker';
import { fitBounds } from '@/lib/fitBounds';

export type ClusteredTreeMarkersProps = {
  trees: Tree[];
  selectedTreeKey: string | null;
  setSelectedTreeKey: (key: string | null) => void;
};

/**
 * The ClusteredTreeMarkers component is responsible for integrating the
 * markers with the markerclusterer.
 */
export const ClusteredTreeMarkers = ({
  trees,
  selectedTreeKey,
  setSelectedTreeKey,
}: ClusteredTreeMarkersProps) => {
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  // const [selectedTreeKey, setSelectedTreeKey] = useState<string | null>(null);

  const selectedTree = useMemo(
    () =>
      trees && selectedTreeKey
        ? trees.find((t) => t.key === selectedTreeKey)!
        : null,
    [trees, selectedTreeKey]
  );

  // create the markerClusterer once the map is available and update it when
  // the markers are changed
  const map = useMap();
  const clusterer = useMemo(() => {
    if (!map) return null;

    return new MarkerClusterer({ map });
  }, [map]);

  useEffect(() => {
    if (!clusterer) return;

    clusterer.clearMarkers();
    clusterer.addMarkers(Object.values(markers));
  }, [clusterer, markers]);

  // this callback will effectively get passsed as ref to the markers to keep
  // tracks of markers currently on the map
  const setMarkerRef = useCallback((marker: Marker | null, key: string) => {
    setMarkers((markers) => {
      if ((marker && markers[key]) || (!marker && !markers[key]))
        return markers;

      if (marker) {
        return { ...markers, [key]: marker };
      } else {
        const { [key]: _, ...newMarkers } = markers;

        return newMarkers;
      }
    });
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedTreeKey(null);
  }, [setSelectedTreeKey]);

  const handleMarkerClick = useCallback(
    (tree: Tree) => {
      setSelectedTreeKey(tree.key);
    },
    [setSelectedTreeKey]
  );

  // const handleFitBounds = useCallback(() => {
  //   if (!map || !trees) return;

  //   const bounds = new google.maps.LatLngBounds();
  //   trees.forEach(({ position }) => bounds.extend(position));
  //   map.fitBounds(bounds);
  // }, [map, trees]);

  // Zoom out to fit all trees
  useEffect(() => {
    fitBounds(map, trees);
  }, [map, trees]);

  return (
    <>
      {trees.map((tree) => (
        <TreeMarker
          key={tree.key}
          tree={tree}
          onClick={handleMarkerClick}
          setMarkerRef={setMarkerRef}
        />
      ))}

      {selectedTreeKey && (
        <InfoWindow
          anchor={markers[selectedTreeKey]}
          onCloseClick={handleInfoWindowClose}
        >
          {selectedTree?.name}
        </InfoWindow>
      )}
    </>
  );
};
