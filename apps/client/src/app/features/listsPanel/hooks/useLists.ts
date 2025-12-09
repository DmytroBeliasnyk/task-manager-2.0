import { listsApi } from '@api/lists/api';
import { useMemo } from 'react';

export const useLists = (searchValue: string) => {
  const { data } = listsApi.useGetListsQuery();
  const lists = data?.lists ?? [];

  const filteredLists = useMemo(() => {
    return searchValue
      ? lists.filter((list) => list.title.toLowerCase().includes(searchValue.toLowerCase()))
      : lists;
  }, [lists, searchValue]);

  return filteredLists;
};
