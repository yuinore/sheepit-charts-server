#!/usr/bin/env node

import fetch from 'node-fetch';
import jsdom from 'jsdom';
import fs from 'fs';

const { JSDOM } = jsdom;

(async () => {
  fs.readdir('./log/projects/', function (err, files) {
    var fileList = files.filter(function (file) {
      return (
        fs.statSync(`./log/projects/${file}`).isFile() && /.*\.json$/.test(file)
      ); //絞り込み
    });

    const table = [];
    const table_progress = [];
    const table_remain = [];
    const labels = [];
    const xaxis = [];
    let i = 0;

    for (const filename of fileList) {
      console.log(filename);
      const filebasename = filename.match(/(.*)\.json/)[1];

      const data = fs.readFileSync(
        `./log/projects/${filebasename}.json`,
        'utf-8',
      );

      {
        const column = JSON.parse(data);

        for (const [title, frames, progress, remain] of column) {
          let labelIndex = labels.indexOf(title);
          if (labelIndex === -1) {
            labels.push(title);
            table.push([]);
            table_progress.push([]);
            table_remain.push([]);
            labelIndex = labels.length - 1;
          }
          table[labelIndex].push([i, frames]);
          table_progress[labelIndex].push([i, progress]);
          table_remain[labelIndex].push([i, remain]);
        }

        xaxis.push(i);
        i++;
      }
    }

    let str = '';
    str += `labels = ${JSON.stringify(labels)}; `;
    str += `xaxis = ${JSON.stringify(xaxis)}; `;
    str += `table = ${JSON.stringify(table)}; `;
    str += `table_progress = ${JSON.stringify(table_progress)}; `;
    str += `table_remain = ${JSON.stringify(table_remain)}; `;
    console.log(`labels = ${JSON.stringify(labels)}`);
    console.log(`xaxis = ${JSON.stringify(xaxis)}`);
    console.log(`table = ${JSON.stringify(table)}`);
    console.log(`table_progress = ${JSON.stringify(table_progress)}`);
    console.log(`table_remain = ${JSON.stringify(table_remain)}`);

    fs.writeFile(`./visualizer/data.js`, str, (err) => {});
  });
})();
