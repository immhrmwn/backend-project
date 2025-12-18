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

function updateTask(description, id) {
  if (!id) {
    throw new Error("ID_REQUIRED");
  }

  if (!isValidId(id)) {
    throw new Error("INVALID_ID");
  }

  const tasks = readTask();
  const task = tasks.find(item => item.id === id);

  if (!task) {
    throw new Error("TASK_NOT_FOUND");
  }

  task.description = description;
  task.updatedAt = now();

  writeTask(tasks);
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

function listTasks(status) {
  const tasks = readTask()

  if (!status) {
    return tasks;
  }

  return tasks.filter(item => item.status === status);
}

module.exports = {
  addTask,
  updateTask,
  deleteTask,
  listTasks
}