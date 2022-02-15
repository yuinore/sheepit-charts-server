import fs from 'fs';
import * as Colors from './colors.mjs';

if (!fs.existsSync('./visualizer/data/')) {
  fs.mkdirSync('./visualizer/data/');
}

if (true || !fs.existsSync('./visualizer/data/colors.js')) {
  let str = '';
  str += `FILL_COLORS_LINEAR = ${JSON.stringify(Colors.FILL_COLORS_LINEAR)};\n`;
  str += `FILL_COLORS_LOG_SCALE = ${JSON.stringify(
    Colors.FILL_COLORS_LOG_SCALE,
  )};\n`;

  fs.writeFileSync(`./visualizer/data/colors.js`, str);
}
