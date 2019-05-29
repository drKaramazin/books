import { Component, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as moment from 'moment';

import { Book } from '../../models/book';
import { MONTHS } from '../../models/months';

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
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [] },
  ];

  private pBooks: Book[];
  @Input() set books(books: Book[]) {
    this.pBooks = books;
    if (this.pBooks) {
      this.aggregate();
    }
  }
  get books(): Book[] {
    return this.pBooks;
  }

  aggregate() {
    const aggregatedData = this.books.reduce((aggregate, book): { [month: string]: number[] } => {
      const month = moment(book.PublishDate).month();

      if (aggregate[month]) {
        aggregate[month].push(book.PageCount);
      } else {
        aggregate[month] = [book.PageCount];
      }

      return aggregate;
    }, {});

    const result = {};
    Object.keys(aggregatedData).forEach((month) =>
      result[month] = Math.round(aggregatedData[month].reduce((sum, count) => sum + count, 0) / aggregatedData[month].length)
    );

    this.barChartLabels = Object.keys(aggregatedData).map((num) => MONTHS[num]);

    this.barChartData[0].data = [];
    Object.keys(aggregatedData).forEach((month) => this.barChartData[0].data.push(result[month]));

    console.log(this.barChartData[0].data);
    console.log(this.barChartLabels);
  }

}
