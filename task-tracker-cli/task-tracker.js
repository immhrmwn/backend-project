#!/usr/bin/env node

const {readTask, writeTask} = require('./src/taskStore')
const {addTask, deleteTask} = require('./src/taskService');

const { version } = require("./package.json");
const { isValidId, now } = require('./src/formatter');

// ---------- Utils ----------
function pad(str, length) {
  return String(str).padEnd(length);
}

function showHelp() {
  console.log(`
Task Tracker CLI

Usage:
  task-cli add "description"
  task-cli update <id> "description"
  task-cli delete <id>
  task-cli mark-in-progress <id>
  task-cli mark-done <id>
  task-cli list
  task-cli list done
  task-cli list todo
  task-cli list in-progress

Options:
  -h, --help       Show help
  -v, --version    Show version
`);
}
// ---------- Commands ----------
const args = process.argv.slice(2);

const flags = args.filter(a => a.startsWith("-"));

if (flags.includes("--help") || flags.includes("-h")) {
  showHelp();
  process.exit(0);
}

if (flags.includes("--version") || flags.includes("-v")) {
  console.log(version);
  process.exit(0);
}

const aliases = {
  ls: "list",
  rm: "delete"
};

const command = aliases[args[0]] ?? args[0];

const tasks = readTask();

// tasks.sort(
//   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
// );

function handleError(err) {
  switch (err.message) {
    case "DESCRIPTION_REQUIRED":
      console.error("❌ Description is required");
      process.exit(1);

    case "ID_REQUIRED":
      console.error("❌ Task ID is required");
      process.exit(1);

    case "INVALID_ID":
      console.error("❌ Invalid task ID");
      process.exit(1);

    case "TASK_NOT_FOUND":
      console.error("❌ Task not found");
      process.exit(1);
    
    case "DELETION_CANCELLED":
      console.log("❌ Deletion cancelled");
      process.exit(0);

    default:
      console.error("❌ Error:", err.message);
      process.exit(1);
  }
}


(async () => {
  try {
    switch (command) {
      case "add": {
        const description = args.slice(1).join(" ");
        const task = addTask(description);

        console.log(`✅ Task added successfully (ID: ${task.id})`);
        process.exit(0);
      }

      case "update": {
        const id = Number(args[1]);

        if (!isValidId(id)) {
          console.log("❌ Invalid task ID");
          process.exit(1);
        }

        const newDescription = args.slice(2).join(" ");

        const task = tasks.find(t => t.id === id);
        if (!task) {
          console.log("❌ Task not found");
          process.exit(1);
        }

        task.description = newDescription;
        task.updatedAt = now();
        writeTask(tasks);

        console.log("✅ Task updated");
        process.exit(0);
      }

      case "delete": {
        const id = Number(args[1]);

        await deleteTask(id);

        console.log("🗑️ Task deleted");
        process.exit(0);
      }

      case "mark-in-progress":
      case "mark-done": {
        const id = Number(args[1]);

        if (!isValidId(id)) {
          console.log("❌ Invalid task ID");
          process.exit(1);
        }
        const task = tasks.find(t => t.id === id);

        if (!task) {
          console.log("❌ Task not found");
          process.exit(1);
        }

        task.status = command === "mark-done" ? "done" : "in-progress";
        task.updatedAt = now();
        writeTask(tasks);

        console.log(`✅ Task marked as ${task.status}`);
        process.exit(0);
      }

      case "list": {
        const filter = args[1];
        const filteredTasks = filter
          ? tasks.filter(t => t.status === filter)
          : tasks;

        if (filteredTasks.length === 0) {
          console.log("📭 No tasks found");
          process.exit(0);
        }

        console.log(
          pad("ID", 4),
          pad("STATUS", 14),
          "DESCRIPTION",
        )

        filteredTasks.forEach(task => {
          console.log(
            pad(task.id, 4),
            pad(task.status, 14),
            task.description,
          );
        });

        process.exit(0);
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
  } catch (error) {
    handleError(error);
  };
})();