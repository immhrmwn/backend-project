# Task Tracker CLI

A simple **Command Line Interface (CLI)** application to manage tasks (to-do list) using **Node.js**, built as part of the [roadmap.sh Task Tracker project](https://roadmap.sh/projects/task-tracker).

This project focuses on:

* Working with command-line arguments
* Reading and writing data to a JSON file
* Implementing basic CRUD operations
* Managing task status

---

## 📦 Features

* Add new tasks
* Update existing tasks
* Delete tasks
* Mark tasks as `todo`, `in-progress`, or `done`
* List all tasks or filter by status
* Persistent storage using a local JSON file

---

## 🛠️ Requirements

* Node.js (v14 or newer recommended)

Check your Node version:

```bash
node -v
```

---

## 📂 Project Structure

```bash
task-tracker/
├── task-cli.js      # Main CLI script
├── tasks.json       # Task data (auto-generated)
└── README.md
```

---

## 🚀 How to Run

### Option 1: Run using Node.js (Recommended)

```bash
node task-cli.js <command>
```

Example:

```bash
node task-cli.js add "Learn Node.js"
node task-cli.js list
```

---

### Option 2: Run as a CLI command (Optional)

> This step is optional and not required for the roadmap.sh project.

1. Make the file executable:

```bash
chmod +x task-cli.js
```

2. Run directly:

```bash
./task-cli.js add "Learn CLI"
```

---

## 📌 Available Commands

### ➕ Add a Task

```bash
node task-cli.js add "Task description"
```

### ✏️ Update a Task

```bash
node task-cli.js update <id> "New description"
```

### 🗑️ Delete a Task

```bash
node task-cli.js delete <id>
```

### ⏳ Mark Task as In Progress

```bash
node task-cli.js mark-in-progress <id>
```

### ✅ Mark Task as Done

```bash
node task-cli.js mark-done <id>
```

### 📋 List Tasks

List all tasks:

```bash
node task-cli.js list
```

Filter by status:

```bash
node task-cli.js list todo
node task-cli.js list in-progress
node task-cli.js list done
```

---

## 🗂️ Task Data Format

Each task is stored in `tasks.json` with the following structure:

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

## ⚠️ Error Handling

* Displays an error message if a task ID is not found
* Prevents adding tasks without a description
* Handles empty task lists gracefully

---

## 🧪 Example Usage

```bash
node task-cli.js add "Build a task tracker"
node task-cli.js add "Test CLI app"
node task-cli.js list
node task-cli.js mark-done 1
node task-cli.js list done
```

---

## 📈 Possible Improvements

* Sort tasks by creation date
* Add command aliases
* Improve CLI output formatting
* Add unit tests

---

## 📝 License

This project is for learning purposes only.
