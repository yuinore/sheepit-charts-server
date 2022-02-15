var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

if (xaxis.length > 288) {
  table = table.map((x) =>
    x.map((y) => [y[0] - (xaxis.length - 288), y[1]]).filter((y) => y[0] >= 0),
  );
  xaxis = xaxis.slice(-288);

  for (let i = labels.length - 1; i >= 0; i--) {
    if (table[i].length == 0) {
      table.splice(i, 1);
      labels.splice(i, 1);
    }
  }
}

labels.reverse();
table.reverse();
table = table.map((x, i) => x.map((y) => [y[0], i, y[1]]));

const data = table;
const data_max = data
  .flat()
  .map(([i, j, y]) => y)
  .reduce((x, y) => Math.max(x, y));

option = {
  tooltip: {
    position: 'top',
  },
  grid: {
    height: '90%',
    width: ' 50%',
    left: '25%',
  },
  dataZoom: [
    {
      type: 'slider',
      left: '76%',
      width: '48px',
      yAxisIndex: 0,
      filterMode: 'none',
    },
    {
      type: 'inside',
      yAxisIndex: 0,
      filterMode: 'none',
    },
  ],
  xAxis: {
    type: 'category',
    splitArea: {
      show: true,
    },
    data: xaxis,
  },
  yAxis: {
    type: 'category',
    splitArea: {
      show: true,
    },
    data: labels,
  },
  visualMap: {
    show: false,
    calculable: true,
    orient: 'horizontal',
    inRange: {
      color: [
        '#cccccc',
        '#ccccff',
        '#99ffff',
        '#88ff88',
        '#fffc6c',
        '#ffac5c',
        '#ff4c4c',
      ],
    },
    max: data_max,
  },
  series: data.map((data_i, i) => ({
    name: labels[i],
    type: 'heatmap',
    data: data_i,
    label: {
      show: false,
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
      },
    },
    markArea:
      labels[i].indexOf('ikgirncfw') < 0 && labels[i].indexOf('kira96c') < 0
        ? {}
        : {
            itemStyle: {
              color: 'rgba(0, 255, 0, 0.75)',
            },
            data: [
              [
                {
                  name: '',
                  yAxis: i - 1,
                },
                {
                  yAxis: i + 1,
                },
              ],
            ],
          },
    large: true,
  })),
};

option && myChart.setOption(option);

window.onresize = function () {
  myChart.resize();
};
