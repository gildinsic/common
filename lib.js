
const fs = require('fs')
const sh = require('shelljs')

exports.tags = /^(FBX|SCW|MCC|ACI|SEE|MSS|RIE|AGR|SEP|EDD|SPM)$/
exports.rtrs = /^(XXX|PA2|PA3|LY2|MRS)$/

exports.ip24 = /^(?:(?:1?\d{1,2}|2[0-4]\d|25[0-5])\.){3}0/
exports.ip32 = /^(?:(?:1?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:1?\d{1,2}|2[0-4]\d|25[0-5])$/
exports.ttl  = /^([1-2]?[1-9]|10|20)$/

exports.writePing = function(raw) {
  const d = new Date()
  const Y = d.getFullYear()
  const M = ('0'+(d.getMonth()+1)).slice(-2)
  const D = ('0'+d.getDate()).slice(-2)
  const h = ('0'+d.getHours()).slice(-2)
  const m = ('0'+d.getMinutes()).slice(-2)
  const s = ('0'+d.getSeconds()).slice(-2)
  const dir = '/data/ping/'+raw.ip+'/'+Y+'/'+M+'/'+D
  const fname = dir+'/log-'+h+'-'+m+'-'+s
  sh.mkdir('-p',dir)
  fs.writeFile(fname,JSON.stringify(raw),function() {
    sh.ln('-sf',fname,dir+'/last')
  })
}

exports.writeNominal = function(name,last) {
  fs.writeFile('/opt/ping/nominal.'+name,JSON.stringify(last),function() {
  })
}


/*
function ltest(x) {
console.log('test'+x,x,ttl.test(x))
}

ltest(0)
ltest(1)
ltest(10)
ltest(20)
ltest(30)
ltest(11)
ltest(21)
*/
