const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  userOutput: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Correct', 'Incorrect', 'Partially Correct'],
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Submission', SubmissionSchema);