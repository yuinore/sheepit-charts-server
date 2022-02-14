var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

labels.reverse();
table.reverse();

const data = table.map((x, i) =>
  x.map((y, j) => [j, i, y]).filter(([i, j, y]) => y != -1)
);
const data_max = data
  .flat()
  .map(([i, j, y]) => y)
  .reduce((x, y) => Math.max(x, y));

option = {
  tooltip: {
    position: 'top'
  },
  grid: {
    height: '90%',
    width: ' 50%',
    left: '25%'
  },
  dataZoom: [
    {
      type: 'slider',
      left: '76%',
      width: '48px',
      yAxisIndex: 0,
      filterMode: 'none'
    },
    {
      type: 'inside',
      yAxisIndex: 0,
      filterMode: 'none'
    }
  ],
  xAxis: {
    type: 'category',
    splitArea: {
      show: true
    },
    data: xaxis
  },
  yAxis: {
    type: 'category',
    splitArea: {
      show: true
    },
    data: labels
  },
  visualMap: {
    show: false,
    calculable: true,
    orient: 'horizontal',
    inRange: {
      color: ['#cccccc', '#ccccff', '#99ffff', '#88ff88', '#fffc6c', '#ffac5c', '#ff4c4c']
    },
    max: data_max
  },
  series: data.map((data_i, i) => ({
    name: labels[i],
    type: 'heatmap',
    data: data_i,
    label: {
      show: false
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }))
};

option && myChart.setOption(option);

window.onresize = function() {
  myChart.resize();
};
