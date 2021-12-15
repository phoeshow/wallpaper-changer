import useSWR from 'swr';
const got = window.electron.got;

const fetcher = (url) =>
  got(url)
    .json()
    .then((res) => res);

export const useGalleryData = ({ tagName, page = 1 }) => {
  const { data, error } = useSWR(
    `https://wallhaven.cc/api/v1/search?q=${encodeURIComponent(
      tagName
    )}&page=${page}`,
    fetcher
  );

  return {
    galleryData: (data && data.data) || [],
    isLoading: !error && !data,
    isError: error,
  };
};

export const useGalleryTotalByTag = (tag) => {
  const { data, error } = useSWR(
    `https://wallhaven.cc/api/v1/search?q=${encodeURIComponent(tag)}&page=1`,
    fetcher
  );

  return {
    total: (data && data.meta.total) || 0,
    isLoading: !error && !data,
    isError: error,
  };
};
