import React from 'react';

import { useSelector } from 'react-redux';
import { useGalleryData } from '../../fetcher';
import { selectCurrentPage, selectCurrentTag } from '../../store/remoteSlice';

import WallpaperCard from './WallpaperCard';

export default function () {
  const currentTag = useSelector(selectCurrentTag);
  const currentPage = useSelector(selectCurrentPage);

  return (
    <div className="remote-gallery-wrap">
      <div style={{ display: 'none' }}>
        <GalleryList tag={currentTag} page={currentPage + 1} />
      </div>
      <GalleryList tag={currentTag} page={currentPage} />
    </div>
  );
}

function GalleryList({ tag, page }) {
  const { galleryData, isError, isLoading } = useGalleryData({
    tagName: tag,
    page: page,
  });

  if (isError) return <div>Error</div>;

  if (isLoading) return <div>加载中</div>;

  if (galleryData.length > 0) {
    return galleryData.map((wallpaper) => {
      return <WallpaperCard wallpaper={wallpaper} key={wallpaper.id} />;
    });
  }

  return null;
}
