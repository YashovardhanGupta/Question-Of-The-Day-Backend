const Question = require('../models/Question');

// @desc    Get the Question of the Day
// @route   GET /api/qotd
exports.getTodayQuestion = async (req, res) => {
  try {
    const count = await Question.countDocuments();
    
    if (count === 0) {
      return res.status(404).json({ message: 'No questions available in the database.' });
    }

    // Deterministic selection: Uses Day of Year to rotate questions
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const index = dayOfYear % count;

    // Use skip() to pick the specific question for the day
    const question = await Question.findOne().skip(index);

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server Error retrieving question' });
  }
};