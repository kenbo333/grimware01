const cron = require("node-cron");
const addDailyRecord = require("./addDailyRecord");
const addPaidLeave = require("./addPaidLeave");

const scheduler = () => {
  // 0:10にスケジューラ開始
  cron.schedule("0 10 0 * * *", () => {
    addDailyRecord();
    addPaidLeave();
  });
};

module.exports = scheduler;
