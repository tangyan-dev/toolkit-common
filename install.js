'use strict';

const { spawn } = require('child_process');
const execScript = (script, args, options = {}) =>
  new Promise((resolve) => {
    const command = spawn(
      script,
      args,
      Object.assign(
        {
          cwd: process.cwd(),
          stdio: 'inherit',
          shell: true,
        },
        options
      )
    );
    command.on('close', (code) => {
      resolve(code);
    });
  });
execScript('cd example && npm install');
