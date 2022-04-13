require('dotenv').config();
const axios = require('axios');
const url = 'https://api.app.shortcut.com/api/v3/projects';
const key = process.env.KEY ?? '6256c8a6-7715-4dc3-b6d9-2e5e3f11e7f4';
const fs = require('fs');
const args = require('minimist')(process.argv.slice(2))
const axiosConfig = {
  headers: {'Shortcut-Token': key},
}
console.log('run');
console.log('args', args)

async function get() {
  let res = [];
  try {
    res = await axios.get(url, axiosConfig)
  } catch (e) {
    console.log(e)
  }
  const data = getProjects(res.data)
  write(data)
}

function getProjects(arr) {
  let ids = getId()
  const filtered = arr.filter(el => ids.includes(el.id))
  return filtered.map(el => {
    const {id, name, description} = el;
    return {id,name, description};
  })
}

function getId() {
  return typeof args['p'] === 'number' ? [args['p']] : args['p'].split(',').map(el => Number(el))
}

function write(data) {
  const stringData = JSON.stringify(data, null, 4)
  fs.writeFile(args['o'], stringData, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
}

get();



