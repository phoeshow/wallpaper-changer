import React from 'react';
import { Pagination } from 'antd';
import {
  selectCurrentTag,
  selectCurrentPage,
  changePage,
} from '../../store/remoteSlice';
import { useGalleryTotalByTag } from '../../fetcher';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export default function () {
  const currentTag = useSelector(selectCurrentTag);
  const currentPage = useSelector(selectCurrentPage);
  const dispatch = useDispatch();
  const { total, isLoading, isError } = useGalleryTotalByTag(currentTag);
  const handlePageChange = (page) => {
    dispatch(changePage(page));
  };
  return (
    <div className="remote-pagination-wrap">
      <Pagination
        pageSize={24}
        total={total}
        onChange={handlePageChange}
        current={currentPage}
        showSizeChanger={false}
      />
    </div>
  );
}
