// Structured log constants (clean separate file)
// Prefer importing this (`require('../config/logConstants')`) from controllers.

const LOGCONSTANTS = {
  actions: {
    user: {
      CREATE_USER: "CREATE USER",
      LOGIN: "LOGIN",
      LOGOUT: "LOGOUT",
      DELETE_USER: "DELETE USER",
    },
    achievements: {
      CREATE_ACHIEVEMENT: "CREATE ACHIEVEMENT",
      UPDATE_ACHIEVEMENT: "UPDATE ACHIEVEMENT",
      DELETE_ACHIEVEMENT: "DELETE ACHIEVEMENT",
    },
    news: {
      CREATE_NEWS: "CREATE NEWS",
      UPDATE_NEWS: "UPDATE NEWS",
      DELETE_NEWS: "DELETE NEWS",
    },
    // officials: { Hardcoded sya sa frontend kaya tinanggal ko muna dito
    //   CREATE_OFFICIAL: 'CREATE OFFICIAL',
    //   UPDATE_OFFICIAL: 'UPDATE OFFICIAL',
    //   DELETE_OFFICIAL: 'DELETE OFFICIAL',
    // },
    pageContents: {
      CREATE_PAGE_CONTENTS: "CREATE PAGE CONTENTS",
      UPDATE_PAGE_CONTENTS: "UPDATE PAGE CONTENTS",
    },

    announcements: {
      CREATE_ANNOUNCEMENT: "CREATE ANNOUNCEMENT",
      UPDATE_ANNOUNCEMENT: "UPDATE ANNOUNCEMENT",
      DELETE_ANNOUNCEMENT: "DELETE ANNOUNCEMENT",
      TOGGLE_PUBLISH_ANNOUNCEMENT: "TOGGLE PUBLISH ANNOUNCEMENT",
    },

    records: {
      CREATE_RECORD: "CREATE RECORD",
      UPDATE_RECORD: "UPDATE RECORD",
    },
    reports: {
      CREATE_REPORT: "CREATE REPORT",
      UPDATE_REPORT: "UPDATE REPORT",
      DELETE_REPORT: "DELETE REPORT",
      ADD_COMMENTS: "ADD COMMENTS",
      UPDATE_REPORT_STATUS: "UPDATE REPORT STATUS",
    },
  },
};

module.exports = { LOGCONSTANTS };
