const paramsMapping = {
  children: "{children} children",
  price: "<= {price} €" ,
  use: "use",
  familygrow: "use",
  ecolo: "ecolo",
  hobby: "love {hobby}",
  city: "city",
};

const currentServer = 'http://localhost';

//const urlapi = currentServer + ':3003/api/test';
const urlapi = 'http://10.187.247.15:8080/wrapper/chatBot';

export {paramsMapping, urlapi, currentServer};
