import { useSearchParams } from 'react-router-dom';

type Props = {
  defaults: {
    pageSize: number;
  };
};

export const usePaginationParams = ({ defaults }: Props) => {
  const [search, setSearchParams] = useSearchParams();
  const pageQueryParams = search.get('page');
  const activePage = !!pageQueryParams ? parseInt(pageQueryParams) : 1;

  const pageSizeQueryParams = search.get('pageSize');
  const activePageSize = !!pageSizeQueryParams ? parseInt(pageSizeQueryParams) : defaults.pageSize;

  const onPageChange = (page: number) => {
    setSearchParams(prev => {
      prev.set('page', page.toString());
      return prev;
    });
  };

  const onPageSizeChange = (quantity: number) => {
    setSearchParams(prev => {
      prev.set('pageSize', quantity.toString());
      return prev;
    });
  };

  return {
    activePage,
    onPageChange,
    activePageSize,
    onPageSizeChange
  };
};
