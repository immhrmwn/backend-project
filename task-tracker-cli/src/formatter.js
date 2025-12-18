const { pad } = require("./utils/string");

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
  printTasks
}