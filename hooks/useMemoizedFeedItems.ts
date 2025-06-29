import { useMemo } from 'react';
import { FeedItem, TaskType } from '../types';

export function useMemoizedFeedItems(
  feedItems: FeedItem[],
  selectedTaskFilter: TaskType | null,
  searchTerm: string
) {
  return useMemo(() => {
    let filteredItems = feedItems;

    // Task filter
    if (selectedTaskFilter) {
      filteredItems = filteredItems.filter(item => item.type === selectedTaskFilter);
    }

    // Search filter
    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filteredItems = filteredItems.filter(item => {
        return item.userName.toLowerCase().includes(lowerSearchTerm) ||
               item.type.toLowerCase().includes(lowerSearchTerm);
      });
    }

    return filteredItems;
  }, [feedItems, selectedTaskFilter, searchTerm]);
}