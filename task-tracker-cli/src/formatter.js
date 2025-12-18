const readline = require("readline");

function getNextId(tasks) {
  return tasks.length === 0 ? 1 : Math.max(...tasks.map(t => t.id)) + 1;
}

function now() {
  return new Date().toISOString();
}

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

function isValidId(id) {
  return Number.isInteger(id) && id > 0;
}

function pad(str, length) {
  return String(str).padEnd(length);
}

function printTasks(tasks) {
  if (tasks.length === 0) {
    console.log("📭 No tasks found");
    return;
  }

  console.log(
    pad("ID", 4),
    pad("STATUS", 14),
    "DESCRIPTION",
  )

  tasks.forEach(task => {
    console.log(
      pad(task.id, 4),
      pad(task.status, 14),
      task.description,
    );
  });
}

module.exports = {
  getNextId,
  now,
  ask,
  isValidId,
  pad,
  printTasks
}