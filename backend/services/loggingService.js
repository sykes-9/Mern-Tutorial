const client = require("../config/elasticsearch");

const log = async (logData) => {
  console.log(logData);

  try {
    await client.index({
      index: "application-logs",
      document: logData,
    });
  } catch (error) {
    console.error("Failed to send log to Elasticsearch:", error.message);
  }
};

module.exports = {
  log,
};
