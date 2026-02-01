# Question of the Day (QOTD) Backend API

A RESTful API backend for an EdTech platform's **Daily DSA Challenge** feature. Users receive a new coding problem each day and can submit their solutions for instant evaluation.

---

## Live Demo & Testing

**Live Base URL:**  
```
https://question-of-the-day-backend-production.up.railway.app
```

### Testing the API

> **Important:** Browsers cannot easily make POST requests. To test the full API functionality, use one of these tools:
> - **[ReqBin](https://reqbin.com/)** – Online REST client (no installation required)
> - **[Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)** – VS Code extension for API testing

| Endpoint | Method | Quick Test |
|----------|--------|------------|
| `/` | GET | [Health Check](https://question-of-the-day-backend-production.up.railway.app/) |
| `/api/qotd` | GET | [Get Today's Question](https://question-of-the-day-backend-production.up.railway.app/api/qotd) |
| `/api/submit` | POST | Use ReqBin or Thunder Client |

---

## API Documentation

### `GET /api/qotd`

Fetches the **Question of the Day**. The question rotates daily based on a deterministic algorithm using the current date.

**Response (200 OK):**
```json
{
  "_id": "679d8a3f2e1b4c5d6e7f8a9b",
  "title": "First Non-Repeating Character",
  "difficulty": "Easy",
  "problemStatement": "Given a string, find the index of the first character that does not repeat anywhere in the string. If no such character exists, return -1.",
  "sampleInput": "leetcode",
  "sampleOutput": "0",
  "hints": ["Use a hash map to store character frequencies.", "Then iterate again to find the first character with frequency 1."],
  "attempts": 42,
  "successRate": 0,
  "createdAt": "2026-02-01T04:00:00.000Z",
  "updatedAt": "2026-02-01T04:30:00.000Z"
}
```

> **Note:** The `expectedOutput` field is intentionally hidden from API responses to prevent cheating.

---

### `POST /api/submit`

Submit your solution for evaluation. Uses **Mock Evaluation Logic** (string comparison) as per the assignment scope.

**Request Body:**
```json
{
  "questionId": "679d8a3f2e1b4c5d6e7f8a9b",
  "userOutput": "0"
}
```

**Response (201 Created) – Correct Answer:**
```json
{
  "success": true,
  "status": "Correct",
  "message": "Great job! Your output matches the expected result.",
  "submissionId": "679d8b4f3e2c5d6f7a8b9c0d"
}
```

**Response (201 Created) – Incorrect Answer:**
```json
{
  "success": false,
  "status": "Incorrect",
  "message": "Output mismatch. Try again.",
  "submissionId": "679d8b4f3e2c5d6f7a8b9c0e"
}


```

## Testing Reference (Seed Data)

To assist with testing the `POST /submit` endpoint, here are the expected outputs for the seed questions currently in the database. Since the daily question rotates, use the answer corresponding to the `title` you receive from `GET /api/qotd`.

| Question Title | Sample Input | **Required Output for "Correct" Status** |
| :--- | :--- | :--- |
| **Count Vowel Clusters** | `"beautiful"` | `"3"` |
| **First Non-Repeating Character** | `"leetcode"` | `"0"` |
| **Balanced Binary Check** | `"11010"` | `"true"` |

> **Tip:** You can use **ReqBin** or **Postman** to send these values in the `userOutput` field.

**Error Responses:**

| Status Code | Scenario |
|-------------|----------|
| `400 Bad Request` | Missing `questionId` or `userOutput` |
| `404 Not Found` | Question ID doesn't exist |
| `500 Server Error` | Database or internal error |

---

## Local Setup Guide

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YashovardhanGupta/Question-Of-The-Day-Backend.git
cd Question-Of-The-Day-Backend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
# OR create .env manually with:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/qotd
# PORT=5000

# 4. Seed the database with sample questions
npm run seed

# 5. Start the development server
npm start
```

The server will start at `http://localhost:5000`.

---

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Hidden `expectedOutput`** | Uses Mongoose's `select: false` to prevent the expected output from being returned to the client, preventing cheating while allowing backend evaluation |
| **Deterministic Daily Selection** | Uses `dayOfYear % questionCount` algorithm to ensure all users see the same question each day, without requiring a separate scheduled job |
| **Mock String Evaluation** | Implements simple string comparison (`trim()` + `===`) as per assignment scope, simulating what would be a code execution engine in production |
| **Separation of Concerns** | Controllers contain business logic, routes handle HTTP mapping, models define data structure – following MVC pattern |

---

## Future Improvements

With more time, I would focus on the following enhancements:

- **Admin Management API** – Implement a secure `POST` endpoint to allow administrators to dynamically add new questions to the database without needing direct database access.

- **Rate Limiting & Security** – Add middleware (like `express-rate-limit`) to prevent API abuse by limiting the number of submissions a user can make in a minute.

- **Progressive Hint System** – Create a dedicated endpoint (`GET /api/qotd/hint`) that allows users to request hints one by one if they are stuck, rather than showing all hints at once.


## Project Structure

```
Question-Of-The-Day-Backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── qotdController.js  # Question fetching logic
│   └── submitController.js # Submission evaluation
├── models/
│   ├── Question.js        # Question schema
│   └── Submission.js      # Submission schema
├── routes/
│   ├── qotd.js            # GET /api/qotd
│   └── submit.js          # POST /api/submit
├── .env.example           # Environment template
├── package.json
├── seed.js                # Database seeding script
├── server.js              # Application entry point
└── README.md
```

---

## Author

**Yashovardhan Gupta**