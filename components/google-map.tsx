'use client';
import { useState } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import type { Tree } from '@/lib/trees';
import treeArray from '@/lib/trees';
import { ClusteredTreeMarkers } from './clustered-tree-markers';
import TreeList from './tree-list';
import ViewAllButton from './view-all-button';

export default function GoogleMap() {
  const [trees, setTrees] = useState<Tree[]>(treeArray.slice(0, 35));
  const [selectedTreeKey, setSelectedTreeKey] = useState<string | null>(null);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <div className='flex'>
        <div className='w-2/3 h-[600px]'>
          <Map
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
            defaultCenter={trees[0].position}
            defaultZoom={10}
            gestureHandling={'greedy'}
            onClick={() => setSelectedTreeKey(null)}
            disableDefaultUI
          >
            <ClusteredTreeMarkers
              trees={trees}
              selectedTreeKey={selectedTreeKey}
              setSelectedTreeKey={setSelectedTreeKey}
            />
            <ViewAllButton items={trees} className='absolute right-2 top-2' />
          </Map>
        </div>

        <div className='w-1/3 h-full bg-green-300'>
          <TreeList
            trees={trees}
            selectedTreeKey={selectedTreeKey}
            setSelectedTreeKey={setSelectedTreeKey}
          />
        </div>
      </div>
    </APIProvider>
  );
}
