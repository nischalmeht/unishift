const { getLogsByLevel } = require("../utils/fileHandler.js");
const { readLogs, writeLogs } = require("../utils/fileHandler.js");

const validateLog = (log) => {
  const requiredFields = [
    "level",
    "message",
    "resourceId",
    "timestamp",
    "traceId",
    "spanId",
    "commit",
    "metadata",
  ];
  return requiredFields.every((key) => key in log);
};

const postLog = (req, res) => {
  const log = req.body;
  if (!validateLog(log)) {
    return res.status(400).json({ error: "Invalid log format" });
  }

  try {
    const logs = readLogs();
    logs.push(log);
    writeLogs(logs);
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: "Failed to save log" });
  }
};

const getLogs = (req, res) => {
  try {
    let logs = readLogs();
    const {
      level,
      message,
      resourceId,
      timestamp_start,
      timestamp_end,
      traceId,
      spanId,
      commit,
    } = req.query;

    logs = logs.filter((log) => {
      if (level && log.level !== level) return false;
      if (message && !log.message.toLowerCase().includes(message.toLowerCase())) return false;
      if (resourceId && log.resourceId !== resourceId) return false;
      if (traceId && log.traceId !== traceId) return false;
      if (spanId && log.spanId !== spanId) return false;
      if (commit && log.commit !== commit) return false;
      if (timestamp_start && new Date(log.timestamp) < new Date(timestamp_start)) return false;
      if (timestamp_end && new Date(log.timestamp) > new Date(timestamp_end)) return false;
      return true;
    });

    logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.status(200).json(logs);
  } catch (err) {
    console.log(err,'err')
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};

const getLogsLevel = (req, res) => {
    try {
      const { level } = req.query;
      const logs = getLogsByLevel(level);
      res.status(200).json(logs);
    } catch (err) {
      console.error("Error fetching logs:", err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
// Export both functions
module.exports = {
  postLog,
  getLogs,
  getLogsLevel
};
