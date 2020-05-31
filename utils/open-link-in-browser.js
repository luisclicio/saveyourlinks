const { platform } = require('process');
const { exec } = require('child_process');

module.exports = function (url) {
  const startCommand = platform === 'darwin'
    ? 'open'
    : platform === 'win32'
      ? 'start'
      : 'xdg-open';

  exec(`${startCommand} ${url}`);
}