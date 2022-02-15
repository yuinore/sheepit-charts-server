#!/usr/bin/env node

import fetch from 'node-fetch';
import jsdom from 'jsdom';
import fs from 'fs';

const { JSDOM } = jsdom;

(async () => {
  if (!fs.existsSync('./visualizer/data/')) {
    fs.mkdirSync('./visualizer/data/');
  }

  fs.readdir('./log/profile/', function (err, files) {
    var fileList = files.filter(function (file) {
      return (
        fs.statSync(`./log/profile/${file}`).isFile() && /.*\.json$/.test(file)
      );
    });

    const labels = [];
    const points = [];

    for (const filename of fileList) {
      const filebasename = filename.match(/(.*)\.json/)[1];
      const dateStr = filebasename.split('_')[1];
      const timeStr = filebasename.split('_')[2];
      const datetime =
        `${dateStr.substr(0, 4)}-` +
        `${dateStr.substr(4, 2)}-` +
        `${dateStr.substr(6, 2)}T` +
        `${timeStr.substr(0, 2)}:` +
        `${timeStr.substr(2, 2)}:` +
        `${timeStr.substr(4, 2)}Z`;
      console.log(datetime);

      const data = fs.readFileSync(`./log/profile/${filebasename}.json`);
      const column = JSON.parse(data);
      if (column.length >= 1 && column[0] != -1) {
        labels.push(datetime);
        points.push(column[0]);
      }
    }

    let str = '';
    str += `labels = ${JSON.stringify(labels)}; `;
    str += `points = ${JSON.stringify(points)}; `;
    console.log(`labels = ${JSON.stringify(labels)}`);
    console.log(`points = ${JSON.stringify(points)}`);

    fs.writeFileSync(`./visualizer/data/profile.js`, str);
  });
})();
