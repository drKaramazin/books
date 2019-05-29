import { Component, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as moment from 'moment';

import { Book } from '../../models/book';
import { MONTHS } from '../../models/months';
import { ChartType } from '../../models/chart-type';

@Component({
  selector: 'books-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {

  public barChartOptions: ChartOptions = {
    legend: {
      display: false
    },
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [] },
  ];

  private pBooks: Book[];
  @Input() set books(books: Book[]) {
    this.pBooks = books;
    this.aggregate();
  }
  get books(): Book[] {
    return this.pBooks;
  }

  private pType: ChartType;
  @Input() set type(type: ChartType) {
    this.pType = type;
    this.aggregate();
  }
  get type(): ChartType {
    return this.pType;
  }

  aggregate() {
    if (this.books && this.type !== undefined) {
      const aggregatedData = this.books.reduce((aggregate, book): { [aggregator: string]: number[] } => {

        const aggregator = this.type === ChartType.MONTHS
          ? moment(book.PublishDate).month() : moment(book.PublishDate).year();

        if (aggregate[aggregator]) {
          aggregate[aggregator].push(book.PageCount);
        } else {
          aggregate[aggregator] = [book.PageCount];
        }

        return aggregate;
      }, {});

      const result = {};
      Object.keys(aggregatedData).forEach((aggregator) =>
        result[aggregator]
          = Math.round(aggregatedData[aggregator].reduce((sum, count) => sum + count, 0) / aggregatedData[aggregator].length)
      );

      this.barChartLabels = this.type === ChartType.MONTHS
        ? Object.keys(aggregatedData).map((num) => MONTHS[num]) : Object.keys(aggregatedData);

      this.barChartData[0].data = [];
      Object.keys(aggregatedData).forEach((aggregator) => this.barChartData[0].data.push(result[aggregator]));
    }
  }

}
