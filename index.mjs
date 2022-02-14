#!/usr/bin/env node

import fetch from 'node-fetch';
import jsdom from 'jsdom';
import fs from 'fs';

const { JSDOM } = jsdom;

(async () => {
  fs.readdir('./log/projects/', function(err, files) {
    var fileList = files.filter(function(file){
        return fs.statSync(`./log/projects/${file}`).isFile() && /.*\.html$/.test(file); //絞り込み
    })

    for (const filename of fileList) {
      console.log(filename);
      const filebasename = filename.match(/(.*)\.html/)[1];

      if (fs.existsSync(`./log/projects/${filebasename}.json`)) {
        continue;
      }

      const data = fs.readFileSync(`./log/projects/${filebasename}.html`, 'utf-8');

      {
        const html = data;
        const dom = new JSDOM(html);
        const document = dom.window.document;
        const nodes_tables = document.querySelectorAll('table');

        if (!nodes_tables[0]) {
          console.log("**skip**");
          fs.writeFileSync(`./log/projects/${filebasename}.json`, "[]");
          continue;
        }
        const nodes_titles = nodes_tables[0].querySelectorAll('td.scene_link')
        const nodes_users = nodes_tables[0].querySelectorAll('td.table_avatar span')
        const nodes_status = nodes_tables[0].querySelectorAll('td.status')
        const nodes_progresses = nodes_tables[0].querySelectorAll('.progress .progress-bar .sr-only')
        const titles = Array.from(nodes_titles, td => td.textContent.trim());
        const users = Array.from(nodes_users, td => td.textContent.trim());
        const statuses = Array.from(nodes_status, td => parseInt(td.textContent.trim()) || 0);
        const progresses = Array.from(nodes_progresses, td => Math.round((1 - eval(td.textContent.trim())) * 10000) / 100 || 0);
        const numes = Array.from(nodes_progresses, td => parseInt(td.textContent.trim().split('/')[0]) || 0);
        const denos = Array.from(nodes_progresses, td => parseInt(td.textContent.trim().split('/')[1]) || 0);
        // const remain = statuses.map((x, i) => Math.round((denos[i] - x - numes[i]) / denos[i] * 10000) / 100);
        const remain = statuses.map((x, i) => denos[i] - x - numes[i]);
        const json = JSON.stringify(titles.map((x, i) => [`${x} (by ${users[i]})`, statuses[i], progresses[i], remain[i]]));
        console.log(json);
        fs.writeFileSync(`./log/projects/${filebasename}.json`, json);
      }
    }
  });
})();

