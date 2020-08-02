import path from 'path';
import fs from 'fs';

const readJsonFile = ({ fileName }) => {
  const route = path.join(__dirname, `data/${fileName}.json`);
  const rawdata = fs.readFileSync(route);
  return JSON.parse(rawdata);
};

const writeJsonFile = ({ fileName, data }) => {
  let fileRoute = path.join(__dirname, `data/${fileName}.json`);
  let fileExits = fs.existsSync(fileRoute);

  if (fileExits) fs.unlinkSync(fileRoute);

  fs.writeFileSync(fileRoute, JSON.stringify(data), 'utf8');
};

export { readJsonFile, writeJsonFile };
