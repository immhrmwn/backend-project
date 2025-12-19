const { pad } = require("./utils/string");
const { color } = require("./utils/color");

function coloredStatus(status) {
  if (status === "done") return color(status, "green");
  if (status === "in-progress") return color(status, "yellow");
  return color(status, "cyan");
}

function printTasks(tasks) {
  if (tasks.length === 0) {
    console.log("📭 No tasks found");
    return;
  }

  console.log(
    pad("ID", 4),
    pad("STATUS", 18),
    "DESCRIPTION",
  )

  tasks.forEach(task => {
    console.log(
      pad(task.id, 4),
      pad(coloredStatus(task.status), 27),
      task.description,
    );
  });
}

module.exports = {
  printTasks
}