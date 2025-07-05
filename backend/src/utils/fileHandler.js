// utils/fileHandler.js
const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(__dirname, "../logs.json");

const ensureLogFile = () => {
  if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, JSON.stringify([]));
  }
};

const readLogs = () => {
  ensureLogFile();
  const data = fs.readFileSync(LOG_FILE);
  return JSON.parse(data);
};

const writeLogs = (logs) => {
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
};

  
const getLogsByLevel = (level) => {
    const logs = readLogs();
    if (!level) return logs;
    console.log(logs,"logg")
  
    return logs.filter(log => log.level.toLowerCase().includes(level.toLowerCase()));
  };
module.exports = {
  ensureLogFile,
  readLogs,
  writeLogs,
  getLogsByLevel
};
