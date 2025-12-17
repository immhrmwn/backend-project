#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "tasks.json");

// ---------- Utils ----------
function loadTasks() {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function saveTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

function getNextId(tasks) {
  return tasks.length === 0 ? 1 : Math.max(...tasks.map(t => t.id)) + 1;
}

function now() {
  return new Date().toISOString();
}

// ---------- Commands ----------
const args = process.argv.slice(2);
const command = args[0];

const tasks = loadTasks();

switch (command) {
  case "add": {
    const description = args.slice(1).join(" ");
    if (!description) {
      console.log("❌ Description is required");
      break;
    }

    const task = {
      id: getNextId(tasks),
      description,
      status: "todo",
      createdAt: now(),
      updatedAt: now()
    };

    tasks.push(task);
    saveTasks(tasks);

    console.log(`✅ Task added successfully (ID: ${task.id})`);
    break;
  }

  case "update": {
    const id = Number(args[1]);
    const newDescription = args.slice(2).join(" ");

    const task = tasks.find(t => t.id === id);
    if (!task) {
      console.log("❌ Task not found");
      break;
    }

    task.description = newDescription;
    task.updatedAt = now();
    saveTasks(tasks);

    console.log("✅ Task updated");
    break;
  }

  case "delete": {
    const id = Number(args[1]);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
      console.log("❌ Task not found");
      break;
    }

    tasks.splice(index, 1);
    saveTasks(tasks);

    console.log("🗑️ Task deleted");
    break;
  }

  case "mark-in-progress":
  case "mark-done": {
    const id = Number(args[1]);
    const task = tasks.find(t => t.id === id);

    if (!task) {
      console.log("❌ Task not found");
      break;
    }

    task.status = command === "mark-done" ? "done" : "in-progress";
    task.updatedAt = now();
    saveTasks(tasks);

    console.log(`✅ Task marked as ${task.status}`);
    break;
  }

  case "list": {
    const filter = args[1];
    const filteredTasks = filter
      ? tasks.filter(t => t.status === filter)
      : tasks;

    if (filteredTasks.length === 0) {
      console.log("📭 No tasks found");
      break;
    }

    filteredTasks.forEach(task => {
      console.log(
        `[${task.id}] ${task.description} (${task.status})`
      );
    });
    break;
  }

  default:
    console.log(`
Available commands:
  task-cli add "description"
  task-cli update <id> "new description"
  task-cli delete <id>
  task-cli mark-in-progress <id>
  task-cli mark-done <id>
  task-cli list
  task-cli list todo|in-progress|done
`);
}
