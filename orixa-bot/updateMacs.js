const child = require('child_process')
var axios = require('axios')
var envs = require('dotenv')

envs.load();

function getMacs() {
  var strMacs = child.execSync('bash nmapExec.sh 192.168.0.0 254').toString();
  var macsList = strMacs.split('\n');

  for (index in macsList) {
    macsList[index] = macsList[index].replace('MAC Address: ', '');
    macsList[index] = macsList[index].slice(0, 17);
  }
  macsList = macsList.slice(1, macsList.length - 1);
  axios.post(`${process.env.URL}`, { macs: macsList })
    .then(
      (data) => console.log(data)
    )
    .catch(
      (error) => console.log(error)
    );
  return;
}

setInterval(getMacs, 200);
