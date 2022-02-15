const colorToArray = (color) => {
  return [
    parseInt(color.substr(1, 2), 16),
    parseInt(color.substr(3, 2), 16),
    parseInt(color.substr(5, 2), 16),
  ];
};

const arrayToColor = (array) => {
  return (
    '#' +
    array
      .map((x) =>
        Math.round(256 + x)
          .toString(16)
          .substr(1, 2),
      )
      .join('')
  );
};

const mixColors = (c1, c2, t) => {
  return c1.map((x, i) => (1 - t) * x + t * c2[i]);
};

const colorCodeList = [
  '#cccccc',
  '#ddddff',
  '#99ffff',
  '#88ff88',
  '#fffc6c',
  '#ff4c4c',
];

const colorList = colorCodeList.map((x) => colorToArray(x));

// **** NOTE: warp(0) == 0, warp(1) == 1 ****
// const warp = (x) => x;
const warp = (x) => Math.pow(x, 4);

const resolution = 1001;
const data_max = 1000;
const interpolated = [];

for (let i = 0; i <= resolution - 1; i++) {
  const pos = i / (resolution - 1);
  const log = warp(
    Math.log10(Math.max(pos * data_max * 10, 1)) / Math.log10(data_max * 10),
  );
  const idx = log * (colorList.length - 1);
  const j = Math.min(Math.floor(idx), colorList.length - 2);
  const c3 = mixColors(colorList[j], colorList[j + 1], idx - j);
  interpolated.push(c3);
}

// console.log(interpolated);
console.log(
  JSON.stringify([
    interpolated.map((x) => Math.round(x[0])),
    interpolated.map((x) => Math.round(x[1])),
    interpolated.map((x) => Math.round(x[2])),
  ]),
);
const colorCodeListLog = interpolated.map((x) => arrayToColor(x));

const FILL_COLORS_LINEAR = colorCodeList;
const FILL_COLORS_LOG_SCALE = colorCodeListLog;

export { FILL_COLORS_LINEAR, FILL_COLORS_LOG_SCALE };
