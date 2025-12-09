import React from 'react';

const HabitCard = ({ habit, onToggle, onDelete }) => {
  const isCompletedToday = () => {
    const today = new Date().toDateString();
    return habit.completions.some(
      c => new Date(c.date).toDateString() === today
    );
  };

  const handleToggle = () => {
    const today = new Date().toISOString();
    onToggle(habit._id, today);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
      style={{ borderLeft: `4px solid ${habit.color}` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">{habit.name}</h3>
          {habit.description && (
            <p className="text-gray-600 text-sm mt-1">{habit.description}</p>
          )}
        </div>
        <button
          onClick={() => onDelete(habit._id)}
          className="text-red-500 hover:text-red-700 text-xl"
        >
          ×
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggle}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition ${
              isCompletedToday()
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
            }`}
          >
            {isCompletedToday() ? '✓' : '○'}
          </button>
          
          <div>
            <p className="text-sm text-gray-500">Streak</p>
            <p className="text-2xl font-bold" style={{ color: habit.color }}>
              {habit.streak} 🔥
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">Frequency</p>
          <p className="text-sm font-medium capitalize">{habit.frequency}</p>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;