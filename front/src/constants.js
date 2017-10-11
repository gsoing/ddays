const paramsMapping = {
  children: (key, value) => { return `${value} children(s)`},
  price: (key, value) => { return `<= ${value} €`} ,
  use: (key, value) => { return `${value} use`},
  familygrow: (key, value) => { return `${value} km/year`},
  ecolo: (key, value) => { return value==='true' ? 'green car' : 'classic car' },
  hobby: (key, value) => { return value==='1' ? "big trunk" : "small trunk"},
  city: (key, value) => { return value==='city' ? "city" : "countryside"},
};

const currentServer = 'http://localhost';

//const urlapi = currentServer + ':3003/api/test';
const urlapi = 'http://10.187.247.15:8080/wrapper/chatBot';

export {paramsMapping, urlapi, currentServer};
