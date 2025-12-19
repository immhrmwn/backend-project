const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

function color(text, colorCode) {
  return `${colors[colorCode] || ""}${text}${colors.reset}`;
}

module.exports = { color };
