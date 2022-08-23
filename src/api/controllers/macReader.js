const child = require('child_process');

function getMacs(ip, mask) {
  var strMacs = child
    .execSync(`sudo -S nmap -sn ${ip}-${mask} | grep MAC`)
    .toString();
  var macsList = strMacs.split('\n');

  for (index in macsList) {
    macsList[index] = macsList[index].replace('MAC Address: ', '');
    macsList[index] = macsList[index].slice(0, 17);
  }
  macsList = macsList.slice(1, macsList.length - 1);
  return macsList;
}

module.exports = getMacs;
