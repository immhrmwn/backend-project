# Task Tracker CLI

A simple **Command Line Interface (CLI)** application to manage tasks (to-do list) using **Node.js**. This project is built as part of the [roadmap.sh Task Tracker project](https://roadmap.sh/projects/task-tracker).

The goal of this project is to practice:

* Working with command-line arguments
* Reading and writing data to a JSON file
* Implementing basic CRUD operations
* Applying clean code structure and unit testing

---

## 📦 Features

* Add new tasks
* Update task status (`todo`, `in-progress`, `done`)
* Delete tasks with confirmation
* List all tasks or filter by status
* Persistent storage using a local JSON file
* Clear error handling with exit codes
* Unit-tested service layer

---

## 🛠️ Requirements

* Node.js **v14+** (v18+ recommended)

Check your Node version:

```bash
node -v
```

---

## 📂 Project Structure

```bash
task-tracker-cli/
├── src/
│   ├── cli.js                 # CLI entry point
│   ├── taskService.js         # Business logic
│   ├── taskStore.js           # File-based storage
│   ├── formatter/
│   │   └── taskFormatter.js   # CLI output formatter
│   └── utils/
│       ├── id.js              # ID helper
│       ├── time.js            # Time helper
│       ├── validator.js       # Input validation
│       └── string.js          # String utilities
├── tests/
│   ├── taskService.add.test.js
│   ├── taskService.delete.test.js
│   └── taskService.update.test.js
├── data/
│   └── tasks.json             # Task data (auto-created)
├── package.json
└── README.md
```

---

## 🚀 How to Run

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Link the CLI globally

```bash
npm link
```

### 3️⃣ Use the CLI

```bash
task-cli add "Learn Node.js"
task-cli list
task-cli list done
```

> You can also run it directly without linking:

```bash
node src/cli.js list
```

---

## 📌 Available Commands

### ➕ Add a Task

```bash
task-cli add "Task description"
```

### 🗑️ Delete a Task

```bash
task-cli delete <id>
```

You will be asked for confirmation before deletion.

### ⏳ Mark Task as In Progress

```bash
task-cli mark-in-progress <id>
```

### ✅ Mark Task as Done

```bash
task-cli mark-done <id>
```

### 📋 List Tasks

List all tasks:

```bash
task-cli list
```

Filter by status:

```bash
task-cli list todo
task-cli list in-progress
task-cli list done
```

---

## 🗂️ Task Data Format

Tasks are stored in `data/tasks.json` using the following structure:

```json
{
  "id": 1,
  "description": "Learn Node.js",
  "status": "todo",
  "createdAt": "2025-01-01T10:00:00.000Z",
  "updatedAt": "2025-01-01T10:00:00.000Z"
}
```

---

## ⚠️ Error Codes

| Code                 | Description                        |
| -------------------- | ---------------------------------- |
| ID_REQUIRED          | Task ID is required                |
| INVALID_ID           | Task ID must be a positive integer |
| TASK_NOT_FOUND       | Task does not exist                |
| DESCRIPTION_REQUIRED | Task description is required       |
| DELETION_CANCELLED   | Task deletion was cancelled        |

---

## 🔚 Exit Codes

| Code | Meaning                        |
| ---- | ------------------------------ |
| 0    | Success                        |
| 1    | User input or validation error |
| 2    | System or unexpected error     |

---

## 🧪 Testing

Run unit tests:

```bash
npm test
```

Tests focus on:

* Task service logic
* Error handling scenarios
* Mocked storage layer

---

## 📈 Possible Improvements

* JSON output mode (`--json`)
* Task sorting and searching
* Colored CLI output
* Configuration for custom data file path

---

## 📝 License

This project is created for learning purposes as part of the roadmap.sh curriculum.
