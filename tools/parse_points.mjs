#!/usr/bin/env node

import fetch from 'node-fetch';
import jsdom from 'jsdom';
import fs from 'fs';

const { JSDOM } = jsdom;

(async () => {
  fs.readdir('./log/profile/', function (err, files) {
    var fileList = files.filter(function (file) {
      return (
        fs.statSync(`./log/profile/${file}`).isFile() && /.*\.html$/.test(file)
      );
    });

    for (const filename of fileList) {
      console.log(filename);
      const filebasename = filename.match(/(.*)\.html/)[1];

      if (fs.existsSync(`./log/profile/${filebasename}.json`)) {
        continue;
      }

      const data = fs.readFileSync(`./log/profile/${filebasename}.html`);

      {
        const html = data;
        const dom = new JSDOM(html);
        const document = dom.window.document;
        const node = document.querySelectorAll(
          'body section div.w-section.inverse div.container div.row div.col-md-4 dl dd span.label',
        );

        if (!node[0]) {
          console.log('**skip**');
          fs.writeFileSync(`./log/profile/${filebasename}.json`, '[]');
          continue;
        }

        const points = parseInt(node[0].textContent.trim().replace(/,/g, ''));
        const json = JSON.stringify([points]);
        console.log(json);
        fs.writeFileSync(`./log/profile/${filebasename}.json`, json);
      }
    }
  });
})();
