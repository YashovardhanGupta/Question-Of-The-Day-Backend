require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Question = require('./models/Question');

const seedQuestions = [
  {
    title: "Count Vowel Clusters",
    difficulty: "Easy",
    problemStatement: "Given a string, count the number of contiguous groups (clusters) of vowels. A cluster is a sequence of one or more consecutive vowels (a, e, i, o, u). Return the total count of such clusters.",
    sampleInput: "beautiful",
    sampleOutput: "3",
    expectedOutput: "3",
    hints: ["Iterate through the string and track when you enter/exit a vowel sequence.", "Consider using a boolean flag to track if you're inside a cluster."],
  },
  {
    title: "First Non-Repeating Character",
    difficulty: "Easy",
    problemStatement: "Given a string, find the index of the first character that does not repeat anywhere in the string. If no such character exists, return -1.",
    sampleInput: "leetcode",
    sampleOutput: "0",
    expectedOutput: "0",
    hints: ["Use a hash map to store character frequencies.", "Then iterate again to find the first character with frequency 1."],
  },
  {
    title: "Balanced Binary Check",
    difficulty: "Medium",
    problemStatement: "Given a binary string containing only '0' and '1', determine if the string can be split into two non-empty parts such that both parts have an equal number of '1's. Return 'true' if possible, 'false' otherwise.",
    sampleInput: "11010",
    sampleOutput: "true",
    expectedOutput: "true",
    hints: ["Count total number of 1s first.", "If odd, immediately return false.", "Use a running count to find a valid split point."],
  }
];

const seedDB = async () => {
  await connectDB();
  
  try {
    await Question.deleteMany(); // Clear existing data
    console.log('Data destroyed...');

    await Question.insertMany(seedQuestions);
    console.log('Data Imported!');
    
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();