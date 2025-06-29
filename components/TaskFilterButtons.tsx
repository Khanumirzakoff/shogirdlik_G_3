import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { TASK_CATEGORIES } from '../constants';
import { TaskType } from '../types';
import { AllTasksIcon } from './icons/AllTasksIcon';

interface TaskFilterButtonsProps {
  currentFilterProp?: TaskType | null;
  onSetFilterProp?: (filter: TaskType | null) => void;
  isEmbedded?: boolean; // New prop
}

const TaskFilterButtons: React.FC<TaskFilterButtonsProps> = ({ currentFilterProp, onSetFilterProp, isEmbedded = false }) => { 
  const context = useContext(AppContext);

  const currentFilter = typeof currentFilterProp !== 'undefined' ? currentFilterProp : context?.selectedTaskFilter;
  const setFilter = typeof onSetFilterProp !== 'undefined' ? onSetFilterProp : context?.setSelectedTaskFilter;

  if (!context && (typeof currentFilterProp === 'undefined' || typeof onSetFilterProp === 'undefined')) {
    return null; 
  }
  
  if (!setFilter) return null; 

  const handleFilterClick = (taskType: TaskType | null) => {
    setFilter(taskType);
  };

  const commonButtonClass = "flex flex-col items-center justify-center min-w-[5rem] px-3 py-2.5 text-center flex-shrink-0 transition-all duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-white/50 focus:ring-offset-0 glass-button";
  const activeClass = "bg-white/30 text-white z-10 border-white/40 shadow-lg"; 
  const inactiveClass = "bg-white/10 text-white/70 hover:bg-white/20 border-white/20";
  
  const iconClass = "w-5 h-5"; 
  const textClass = "text-[10px] leading-tight font-medium mt-1";

  const outerContainerClass = isEmbedded 
    ? "py-2 px-0" // Removed horizontal padding for embedded case
    : "px-3 py-2 glass z-10 border-b border-white/20 rounded-none"; // No longer sticky, search bar will be above

  const segmentedControlContainerClass = "flex items-stretch overflow-x-auto no-scrollbar rounded-xl border border-white/20";

  return (
    <div className={outerContainerClass}>
      <div className={segmentedControlContainerClass}>
        <button
            onClick={() => handleFilterClick(null)}
            className={`${commonButtonClass} ${currentFilter === null ? activeClass : inactiveClass} border-r ${currentFilter === null ? 'border-r-white/40' : 'border-r-white/20'} rounded-l-xl`}
            aria-pressed={currentFilter === null}
        >
            <AllTasksIcon className={iconClass} />
            <span className={textClass}>Barchasi</span>
        </button>
        {TASK_CATEGORIES.map((category, index) => (
          <button
            key={category.name}
            onClick={() => handleFilterClick(category.name)}
            className={`${commonButtonClass} ${currentFilter === category.name ? activeClass : inactiveClass} 
                        ${index < TASK_CATEGORIES.length - 1 ? `border-r ${currentFilter === category.name || currentFilter === TASK_CATEGORIES[index+1]?.name ? 'border-r-white/40' : 'border-r-white/20'}` : 'rounded-r-xl'}`}
            aria-pressed={currentFilter === category.name}
          >
            <category.icon className={iconClass} />
            <span className={textClass}>{category.name}</span> 
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilterButtons;