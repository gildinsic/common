
const fs = require('fs')
const sh = require('shelljs')

const root = '/data/log/'
sh.mkdir('-p',root)

var winston = require('winston');
require('winston-daily-rotate-file');

module.exports = function (name) {
  var transport = new (winston.transports.DailyRotateFile)({
    filename: root+'monitor-'+name+'-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '14d'
  });
  transport.on('rotate', function(oldfn, newfn) {
    console.log('monitor page',oldfn,newfn)
  });
  return winston.createLogger({
    transports: [ transport ]
  });
}
/*
exports.write = function () {
  transport = new (winston.transports.DailyRotateFile)({
    filename: 'logs/monitor-web-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '14d'
  });
  transport.on('rotate', function(oldfn, newfn) {
    console.log('monitor page',oldfn,newfn)
  });
}
*/
