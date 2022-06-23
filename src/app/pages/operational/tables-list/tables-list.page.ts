import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tables-list',
  templateUrl: './tables-list.page.html',
  styleUrls: ['./tables-list.page.scss'],
})
export class TablesListPage implements OnInit {

  arrTables: any[]= [
    {
        "id_table": 1,
        "name": "Mesa #1",
        "number_table": 5,
        "capacity": 5,
        "status": 1
    },
    {
        "id_table": 2,
        "name": "Mesa #2",
        "number_table": 6,
        "capacity": 8,
        "status": 2
    },
    {
      "id_table": 3,
      "name": "Mesa #3",
      "number_table": 3,
      "capacity": 4,
      "status": 1
    },
    {
      "id_table": 4,
      "name": "Mesa #4",
      "number_table": 4,
      "capacity": 7,
      "status": 2
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
