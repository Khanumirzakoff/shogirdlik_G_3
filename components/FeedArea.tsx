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
        <div className="glass-modal rounded-2xl p-8">
          <LoadingSpinner text="Context yuklanmoqda..." />
        </div>
      </div>
    );
  }

  const { feedItems, selectedTaskFilter, searchTerm, isLoading } = context;

  const filteredFeedItems = useMemoizedFeedItems(feedItems, selectedTaskFilter, searchTerm);

  if (isLoading) {
    return (
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="glass-modal rounded-2xl p-8">
          <LoadingSpinner text="Ma'lumotlar yuklanmoqda..." />
        </div>
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
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="glass-card rounded-2xl p-8 text-center">
          <p className="text-white/80 text-lg">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-grow overflow-y-auto glass-scrollbar pb-24 px-2">
      <div className="space-y-4 pt-4">
        {filteredFeedItems.map((item: FeedItem) => (
          <FeedCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
};

export default FeedArea;