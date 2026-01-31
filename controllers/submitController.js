const Question = require('../models/Question');
const Submission = require('../models/Submission');

// @desc    Submit a solution
// @route   POST /api/submit
exports.submitSolution = async (req, res) => {
  try {
    const { questionId, userOutput } = req.body;

    if (!questionId || !userOutput) {
      return res.status(400).json({ message: 'Please provide questionId and userOutput' });
    }

    // Explicitly select expectedOutput since it is hidden by default in the model
    const question = await Question.findById(questionId).select('+expectedOutput');

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Mock Evaluation Logic: Normalize strings (trim whitespace/newlines)
    const isCorrect = userOutput.trim() === question.expectedOutput.trim();
    const status = isCorrect ? 'Correct' : 'Incorrect';

    // Record the submission
    const submission = await Submission.create({
      questionId,
      userOutput,
      status
    });

    // Update Question Statistics (Mock Design Requirement)
    question.attempts += 1;
    await question.save();

    res.status(201).json({
      success: isCorrect,
      status: status,
      message: isCorrect ? 'Great job! Your output matches the expected result.' : 'Output mismatch. Try again.',
      submissionId: submission._id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error processing submission' });
  }
};