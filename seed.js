require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Question = require('./models/Question');

const seedQuestions = [
  {
    title: "Reverse a String",
    difficulty: "Easy",
    problemStatement: "Write a function that reverses a string. The input string is given as an array of characters.",
    sampleInput: "hello",
    sampleOutput: "olleh",
    expectedOutput: "olleh",
    hints: ["Try using two pointers.", "One pointer at the start, one at the end."],
  },
  {
    title: "Two Sum",
    difficulty: "Easy",
    problemStatement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    sampleInput: "[2,7,11,15], target = 9",
    sampleOutput: "[0,1]",
    expectedOutput: "[0,1]",
    hints: ["Use a hash map to store complements."],
  },
  {
    title: "Valid Parentheses",
    difficulty: "Medium",
    problemStatement: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    sampleInput: "()[]{}",
    sampleOutput: "true",
    expectedOutput: "true",
    hints: ["Use a stack data structure."],
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