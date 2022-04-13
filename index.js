const axios = require('axios')
const url = 'https://api.app.shortcut.com/api/v3/projects';
const key = '6256c8a6-7715-4dc3-b6d9-2e5e3f11e7f4';
const fs = require('fs');
const args = require('minimist')(process.argv.slice(2))
const axiosConfig = {
  headers: {'Shortcut-Token': '6256c8a6-7715-4dc3-b6d9-2e5e3f11e7f4'},
}
console.log('run');
console.log('args', args)


async function get() {
  try {
    const res = await axios.get(url, axiosConfig)
    const data = await getProjects(res.data)
    await write(data)
  } catch (e) {
    console.log(e)
  }
}

function getProjects(arr) {
  let ids = getId()
  return arr.filter(el=> ids.includes(el.id))
}

function getId() {
  console.log(typeof args['p'])
  return typeof args['p'] === 'number'? [args['p']]: args['p'].split(',').map(el=>Number(el))
}

function write(data){
  const stringData = JSON.stringify(data,null, 4)
  fs.writeFile(args['o'], stringData, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
}

get();



