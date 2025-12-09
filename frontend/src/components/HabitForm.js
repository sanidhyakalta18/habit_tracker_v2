import React, { useState } from 'react';

const HabitForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequency: 'daily',
    color: '#3b82f6'
  });

  const colors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', 
    '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Create New Habit</h3>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Habit Name</label>
        <input
          type="text"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Morning Exercise"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Description (Optional)</label>
        <textarea
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Add details about your habit..."
          rows="3"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Frequency</label>
        <select
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.frequency}
          onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Color</label>
        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              className={`w-10 h-10 rounded-full border-2 transition ${
                formData.color === color ? 'border-gray-800 scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setFormData({ ...formData, color })}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Habit
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default HabitForm;