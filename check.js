/**
 * @description:
 * @author: manble@live.com
 * @created:
 */
'use strict';

const execSync = require('child_process').execSync;
const { version, name } = require('./package.json');
try {
  let data = execSync(`npm --registry https://registry.npmjs.org view ${name} dist-tags --json`).toString();
  let remoteVersion = JSON.parse(data).latest;
  if (remoteVersion !== version) {
    console.log();
    console.log('\x1b[33m%s\x1b[0m', '============================================================================');
    console.log();
    console.log('\x1b[33m%s\x1b[0m', '   find new version:');
    console.log();
    console.log('\x1b[33m%s\x1b[0m', `   ${version} ==> ${remoteVersion}`);
    console.log();
    console.log('\x1b[33m%s\x1b[0m', `   please reinstall ${name} module to update.`);
    console.log();
    console.log('\x1b[33m%s\x1b[0m', '============================================================================');
    console.log();
  }
} catch (e) {
  console.error(e);
}
