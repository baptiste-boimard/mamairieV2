/* eslint-disable no-tabs */
const cron = require(`node-cron`);
const client = require(`../models/dbClient`);

/**
* object contains the method which allows
* to delete the ip addresses after 30 days
 * @type {object}
 * @export DeleteIp
 * @namespace DeleteIp
 */
const DeleteIp = {
  /** this method uses cron to schedule it calls the database every day to check the 30-day ips
   * @membersof deleteIp
   * @method deleteIp
   * @returns void
   */
  deleteIp() {
    cron.schedule(`59 23 * * *`, async () => {
      const query = {
        text: `UPDATE reporting
                SET ip= '$1'
                WHERE created_at < CAST(NOW() AS DATE) - 30 AND ip != '$2'`,
        values: [`null`, `null`],
      };
      await client.query(query);
    });
  },
};

module.exports = DeleteIp;
