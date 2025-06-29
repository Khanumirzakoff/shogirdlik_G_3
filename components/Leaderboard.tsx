import React, { useContext, useMemo, useRef } from 'react';
import { AppContext } from '../contexts/AppContext';
import { User, TaskType } from '../types'; 
import { useScrollAffordance } from '../hooks/useScrollAffordance'; // Import the hook
import LoadingSpinner from './LoadingSpinner';

const Leaderboard: React.FC = () => {
  const context = useContext(AppContext);
  const scrollableAreaRef = useRef<HTMLDivElement>(null);
  const { showTopShadow, showBottomShadow } = useScrollAffordance(scrollableAreaRef);

  if (!context) {
    return (
      <aside className="w-full h-full glass border-l border-white/20 p-3 rounded-r-2xl">
        <div className="glass-modal rounded-xl p-4">
          <LoadingSpinner text="Yuklanmoqda..." />
        </div>
      </aside>
    );
  }

  const { allUsers, getUserRating, selectedTaskFilter, setViewingUserProfileId, currentUser, isLoading } = context;

  const usersWithRatings = useMemo(() => {
    try {
      return allUsers
        .map(user => ({
          ...user,
          displayRating: getUserRating(user.id, selectedTaskFilter),
        }))
        .sort((a, b) => b.displayRating - a.displayRating);
    } catch (error) {
      console.error('Error calculating user ratings:', error);
      return [];
    }
  }, [allUsers, getUserRating, selectedTaskFilter]);

  const handleUserClick = (userId: string) => {
    try {
      if (setViewingUserProfileId) {
        setViewingUserProfileId(userId);
      }
    } catch (error) {
      console.error('Error setting viewing user profile:', error);
    }
  };

  if (isLoading) {
    return (
      <aside className="w-full h-full glass border-l border-white/20 p-3 rounded-r-2xl flex items-center justify-center">
        <div className="glass-modal rounded-xl p-4">
          <LoadingSpinner text="Reyting yuklanmoqda..." />
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-full h-full glass flex flex-col overflow-hidden border-l border-white/20 rounded-r-2xl">
      <h3 className="text-md font-semibold text-white sticky top-0 glass backdrop-blur-md p-3 z-10 border-b border-white/20 shadow-sm rounded-tr-2xl drop-shadow">
        Reyting {selectedTaskFilter ? `(${selectedTaskFilter})` : ''}
      </h3>
      <div 
        ref={scrollableAreaRef}
        className={`flex-grow overflow-y-auto glass-scrollbar p-2 space-y-1 scroll-shadow-container ${showTopShadow ? 'show-top-shadow' : ''} ${showBottomShadow ? 'show-bottom-shadow' : ''}`}
      >
        {usersWithRatings.map((user, index) => {
          const isCurrentUser = user.id === currentUser?.id;
          const shortSurname = user.surname ? `${user.surname.charAt(0)}.` : '';

          return (
            <button
              key={user.id}
              onClick={() => handleUserClick(user.id)}
              className={`flex items-center gap-2 p-2 rounded-xl transition-all duration-300 hover:bg-white/10 w-full text-left glass-button
                          ${isCurrentUser ? 'bg-white/20 ring-1 ring-white/30' : ''}`}
              aria-label={`${user.name} ${user.surname} profilini ko'rish`}
            >
              <span className={`text-sm font-mono w-6 text-right ${isCurrentUser ? 'text-white font-semibold drop-shadow' : 'text-white/60'}`}>
                {index + 1}.
              </span>
              <img 
                src={user.profilePictureUrl || `https://picsum.photos/seed/${user.id}/40/40`} 
                alt={user.name} 
                className="w-8 h-8 rounded-full object-cover flex-shrink-0 border-2 border-white/30 shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://picsum.photos/seed/${user.id}/40/40`;
                }}
              />
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-medium truncate ${isCurrentUser ? 'text-white font-semibold drop-shadow' : 'text-white/90'}`}>
                  <span className="md:hidden">{user.name} {shortSurname}</span>
                  <span className="hidden md:inline">{user.name} {user.surname}</span>
                </p>
                <p className={`text-xs ${isCurrentUser ? 'text-white/80 font-medium' : 'text-blue-300'}`}>
                  {user.displayRating} ball
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </aside>
  );
};

export default Leaderboard;