import Abstract from './abstract.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { makeItemsUniq, pointSumPriceByType, countPointsByType } from '../utils/statistics.js';
import {calculateDateDifference } from '../utils/point.js';

const renderMoneyChart = (moneyCtx, points) => {
  const pointTypes = points.map((point) => point.type);
  const uniqPointTypes = makeItemsUniq(pointTypes);
  const sumPriceByTypes = uniqPointTypes.map((type) => pointSumPriceByType(points, type));
  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: uniqPointTypes,
      datasets: [{
        data: sumPriceByTypes,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTypeChart = (typeCtx, points) => {
  const pointTypes = points.map((point) => point.type);
  const uniqPointTypes = makeItemsUniq(pointTypes);
  const pointCountsByType = uniqPointTypes.map((type) => countPointsByType(points, type));
  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: uniqPointTypes,
      datasets: [{
        data: pointCountsByType,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTymeSpendChart = (timeCtx, points) => {
  const pointTypes = points.map((point) => point.type);
  const uniqPointTypes = makeItemsUniq(pointTypes);
  const differencePointTypes = points.map((point) => calculateDateDifference(point.dateTo, point.dateFrom));
  console.log(differencePointTypes);
  const sumPriceByTypes = uniqPointTypes.map((type) => pointSumPriceByType(points, type));
  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: uniqPointTypes,
      datasets: [{
        data: sumPriceByTypes,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'TIME',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatisticsTemplate = () => `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
    </div>
</section>`;

export default class Statisctics extends Abstract {
  constructor(points) {
    super();
    this._points = points;

    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null  || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }
    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    const timeCtx = this.getElement().querySelector('#time-spend');

    const pointTypes = this._points.map((point) => point.type);
    const uniqPointTypesLength = makeItemsUniq(pointTypes).length - 1;

    const BAR_HEIGHT = 55;
    moneyCtx.height =BAR_HEIGHT * uniqPointTypesLength;
    typeCtx.height = BAR_HEIGHT * uniqPointTypesLength;
    timeCtx.height = BAR_HEIGHT * uniqPointTypesLength;

    this._moneyChart = renderMoneyChart(moneyCtx, this._points);
    this._typeChart = renderTypeChart(typeCtx, this._points);
    this._timeChart = renderTymeSpendChart(timeCtx, this._points);
  }
}
