const { getNextId, now } = require("./formatter");
const {readTask, writeTask} = require("./taskStore");

function addTask(description) {
  if (!description) {
    throw new Error("DESCRIPTION_REQUIRED");
  }

  const tasks = readTask();

  const task = {
    id: getNextId(tasks),
    description,
    status: "todo",
    createdAt: now(),
    updatedAt: now()
  };

  tasks.push(task);
  writeTask(tasks);

  return task;
}

module.exports = {
  addTask
}