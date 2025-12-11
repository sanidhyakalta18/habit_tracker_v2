const Habit = require('../models/habit');

exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createHabit = async (req, res) => {
  try {
    const { name, description, frequency, color } = req.body;

    const habit = await Habit.create({
      user: req.user._id,
      name,
      description,
      frequency,
      color
    });

    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedHabit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await habit.deleteOne();
    res.json({ message: 'Habit removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleCompletion = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { date } = req.body;
    const completionDate = new Date(date);
    completionDate.setHours(0, 0, 0, 0);

    const existingCompletion = habit.completions.find(
      c => new Date(c.date).toDateString() === completionDate.toDateString()
    );

    if (existingCompletion) {
      habit.completions = habit.completions.filter(
        c => new Date(c.date).toDateString() !== completionDate.toDateString()
      );
    } else {
      habit.completions.push({ date: completionDate, completed: true });
    }

    const sortedCompletions = habit.completions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedCompletions.length; i++) {
      const completionDate = new Date(sortedCompletions[i].date);
      completionDate.setHours(0, 0, 0, 0);
      
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      
      if (completionDate.toDateString() === expectedDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }

    habit.streak = streak;
    await habit.save();

    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};