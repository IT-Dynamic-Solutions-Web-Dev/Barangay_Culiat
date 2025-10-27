const Logs = require("../models/Logs");
const { getRoleName } = require("./roleHelpers");

async function logAction(action, description, user) {
  try {
    await Logs.create({
      action,
      description,
      performedBy: user?._id,
      performedByRole: user ? getRoleName(user.role) : "Unknown",
    });
  } catch (logErr) {
    console.error("Failed to create log:", logErr);
  }
}

module.exports = {
  logAction
};
