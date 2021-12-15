import './index.css';

import React, { useEffect } from 'react';
import { Select } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import {
  chooseTag,
  selectCurrentPage,
  selectCurrentTag,
  TAG_NAME_LIST,
} from '../../store/remoteSlice';
import Pagination from './Pagination';
import Gallery from './Gallery';

const { Option } = Select;

const RemotePage = () => {
  const dispatch = useDispatch();
  const currentTag = useSelector(selectCurrentTag);

  const handleChange = (tag) => {
    dispatch(chooseTag(tag));
  };

  return (
    <section className="remote-page-container">
      <section className="search-container">
        <Select
          onChange={handleChange}
          defaultValue={currentTag}
          style={{ width: 200 }}
        >
          {TAG_NAME_LIST.map((tagName) => {
            return (
              <Option key={tagName} value={tagName}>
                {tagName}
              </Option>
            );
          })}
        </Select>
      </section>
      <Gallery />
      <Pagination />
    </section>
  );
};

export default RemotePage;
