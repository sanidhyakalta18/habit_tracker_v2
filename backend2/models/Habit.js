const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'Please add a habit name']
  },
  description: {
    type: String
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly'],
    default: 'daily'
  },
  color: {
    type: String,
    default: '#3b82f6'
  },
  completions: [{
    date: {
      type: Date,
      required: true
    },
    completed: {
      type: Boolean,
      default: true
    }
  }],
  streak: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Habit', habitSchema);