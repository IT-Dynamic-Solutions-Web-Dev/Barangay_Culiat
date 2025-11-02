const ROLES = require('../config/roles');

/**
 * Get role name from role code
 * @param {number} roleCode - The numeric role code
 * @returns {string} - The role name (e.g., 'Admin', 'Resident') or 'Unknown'
 */
const getRoleName = (roleCode) => {
  const roleEntry = Object.entries(ROLES).find(([name, code]) => code === roleCode);
  return roleEntry ? roleEntry[0] : 'Unknown';
};

module.exports = {
  getRoleName,
};
