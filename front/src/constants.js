const paramsMapping = {
  children: (key, value) => { return `${value} children(s)`},
  price: (key, value) => { return `<= ${value} €`} ,
  use: (key, value) => { return `${value} use`},
  familygrow: (key, value) => { return `${value} km/year`},
  ecolo: (key, value) => { return value==='true' ? 'green car' : 'classic car' },
  hobby: (key, value) => { return value==='1' ? "big trunk" : "small trunk"},
  city: (key, value) => { return value==='city' ? "city" : "countryside"},
};

// Serveur hébergeant le front (3000), le node (3001), le webrtc (8001)
const currentServer = 'http://'+window.location.hostname;

console.log(currentServer)

// Serveur hébergeant l'elastic search (8080)
//const urlapi = currentServer + ':3003/api/test';
const urlapi = 'http://10.187.247.15:8080/wrapper/chatBot';

export {paramsMapping, urlapi, currentServer};

// Lancer le front (3000)
// cd front/
// yarn install
// yarn start

// Lancer le webrtc (8001)
// cd SimpleWebRTC-server/
// npm i
// node server

// Lancer le node (3001)
// cd node/
// npm i
// node server

// Lancer le chrome du dealer (avec la bonne ip !!)
// /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --unsafely-treat-insecure-origin-as-secure="http://192.168.1.95:3000" --user-data-dir="/tmp/"
