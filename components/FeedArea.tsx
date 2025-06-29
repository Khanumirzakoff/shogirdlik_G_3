import React, { useContext, useMemo } from 'react';
import { AppContext } from '../contexts/AppContext';
import FeedCard from './FeedCard';
import LoadingSpinner from './LoadingSpinner';
import { FeedItem, TaskType, BookReadingFeedItem, DailyPlanFeedItem, WakeUpFeedItem, RunningFeedItem } from '../types';
import { UZBEK_STRINGS } from '../constants';
import { useMemoizedFeedItems } from '../hooks/useMemoizedFeedItems';

const FeedArea: React.FC = () => {
  const context = useContext(AppContext);

  if (!context) {
    return (
      <div className="flex-grow flex items-center justify-center p-6">
        <LoadingSpinner text="Context yuklanmoqda..." />
      </div>
    );
  }

  const { feedItems, selectedTaskFilter, searchTerm, isLoading } = context;

  const filteredFeedItems = useMemoizedFeedItems(feedItems, selectedTaskFilter, searchTerm);

  if (isLoading) {
    return (
      <div className="flex-grow flex items-center justify-center p-6">
        <LoadingSpinner text="Ma'lumotlar yuklanmoqda..." />
      </div>
    );
  }

  if (filteredFeedItems.length === 0) {
    let message = UZBEK_STRINGS.noTasksCompleted; // Default if no filter and no search
    if (searchTerm) {
        message = `"${searchTerm}" bo'yicha natijalar topilmadi.`;
    } else if (selectedTaskFilter) {
        message = `${selectedTaskFilter} bo'yicha xabarlar yo'q.`;
    }
    return (
      <div className="flex-grow flex items-center justify-center p-6 text-gray-500">
        <p>{message}</p>
      </div>
    );
  }

  return (
    <main className="flex-grow overflow-y-auto bg-white no-scrollbar pb-24">
      {filteredFeedItems.map((item: FeedItem) => (
        <FeedCard key={item.id} item={item} />
      ))}
    </main>
  );
};

export default FeedArea;