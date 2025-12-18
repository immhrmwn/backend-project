const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "../data/tasks.json");

function readTask() {
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, "[]")
  }

  return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"))
}

function writeTask(tasks) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(tasks, null, 2))
}

module.exports = {
  readTask,
  writeTask
}