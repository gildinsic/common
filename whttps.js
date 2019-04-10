const sroot = '/opt/tls'

const key = sroot+'/svr.key'
const pub = sroot+'/svr.crt'
const ca  = sroot+'/signing-ca-chain.pem'

module.exports = function(https,fs,app) {

  const ssloptions = {
   key:  fs.readFileSync(key,'utf8'),
   cert: fs.readFileSync(pub,'utf8'),
   ca:   fs.readFileSync(ca ,'utf8'),
   requestCert: true,
   rejectUnauthorized: true,
   ciphers: 'HIGH',
   honorCipherOrder: true
  };

  return https.Server(ssloptions,app)
}
