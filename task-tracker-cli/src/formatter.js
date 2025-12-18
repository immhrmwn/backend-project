function getNextId(tasks) {
  return tasks.length === 0 ? 1 : Math.max(...tasks.map(t => t.id)) + 1;
}

function now() {
  return new Date().toISOString();
}

module.exports = {
  getNextId,
  now
}