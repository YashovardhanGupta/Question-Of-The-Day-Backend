const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  },
  problemStatement: {
    type: String,
    required: true,
  },
  sampleInput: {
    type: String,
    required: true,
  },
  sampleOutput: {
    type: String,
    required: true,
  },
  //! Hidden field used for backend evaluation
  expectedOutput: {
    type: String,
    required: true,
    select: false, //? By default, don't return this to the client
  },

  hints: [String],
  attempts: {
    type: Number,
    default: 0
  },
  successRate: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);