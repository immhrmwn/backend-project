const { getNextId, now, isValidId, ask } = require("./formatter");
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

async function deleteTask(id) {
  if (!id) {
    throw new Error("ID_REQUIRED");
  }

  if (!isValidId(id)) {
    throw new Error("INVALID_ID");
  }

  const tasks = readTask();
  const index = tasks.findIndex(item => item.id === id);

  if (index === -1) {
    throw new Error("TASK_NOT_FOUND");
  }

  const answer = await ask(`Are you sure you want to delete task ID ${id}? (y/n): `);
  if (answer !== 'y') {
    throw new Error("DELETION_CANCELLED");
  }

  tasks.splice(index, 1);
  writeTask(tasks);
}

module.exports = {
  addTask,
  deleteTask
}