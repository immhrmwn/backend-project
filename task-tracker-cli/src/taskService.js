const { getNextId } = require("./utils/id");
const { now } = require("./utils/time");
const { isValidId } = require("./utils/validator");

function createTaskService(store) {
  function addTask(description) {
    if (!description) {
      throw new Error("DESCRIPTION_REQUIRED");
    }

    const tasks = store.readTask();

    const task = {
      id: getNextId(tasks),
      description,
      status: "todo",
      createdAt: now(),
      updatedAt: now()
    };

    tasks.push(task);
    store.writeTask(tasks);

    return task;
  }

  function updateTask(description, id) {
    if (!id) {
      throw new Error("ID_REQUIRED");
    }

    if (!isValidId(id)) {
      throw new Error("INVALID_ID");
    }

    const tasks = store.readTask();
    const task = tasks.find(item => item.id === id);

    if (!task) {
      throw new Error("TASK_NOT_FOUND");
    }

    task.description = description;
    task.updatedAt = now();

    store.writeTask(tasks);
  }

  function updateStatus(status, id) {
    if (!id) {
      throw new Error("ID_REQUIRED");
    }

    if (!isValidId(id)) {
      throw new Error("INVALID_ID");
    }

    const tasks = store.readTask();
    const task = tasks.find(item => item.id === id);

    if (!task) {
      throw new Error("TASK_NOT_FOUND");
    }

    task.status = status
    task.updatedAt = now();

    store.writeTask(tasks);
  };


  async function deleteTask(id) {
    if (!id) {
      throw new Error("ID_REQUIRED");
    }

    if (!isValidId(id)) {
      throw new Error("INVALID_ID");
    }

    const tasks = store.readTask();
    const index = tasks.findIndex(item => item.id === id);

    if (index === -1) {
      throw new Error("TASK_NOT_FOUND");
    }

    tasks.splice(index, 1);
    store.writeTask(tasks);
  };

  function listTasks(status) {
    const tasks = store.readTask();

    if (!status) {
      return tasks;
    }

    return tasks.filter(item => item.status === status);
  };

  return {
    addTask,
    updateTask,
    updateStatus,
    deleteTask,
    listTasks
  };
};

module.exports = { createTaskService };