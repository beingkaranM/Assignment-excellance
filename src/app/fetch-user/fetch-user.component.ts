import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FetchUserService } from './fetch-user.service';
import { RequestQueryParams } from './query-params.interface';

@Component({
  selector: 'app-fetch-user',
  templateUrl: './fetch-user.component.html',
  styleUrls: ['./fetch-user.component.scss']
})
export class FetchUserComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false})
  dataSource = new MatTableDataSource<any>([])
  displayedColumns:any[]=['f_name','l_name', 'email', 'pic'];
  paginator!: MatPaginator;
  pageNo: number;
  pageSize: number;
  totalItems: number;
  public queryParams: Readonly<RequestQueryParams> = {page:1 };
  constructor( private fetchUserService : FetchUserService) {
    this.pageSize = 6;
    this.pageNo = 0
    this.totalItems= 0;
  }

  ngOnInit(): void {
    let page = 1
    this.fetchUserService.patchQueryParams({page});
    this.subscribeQueryParams()
    this.dataSource.paginator = this.paginator;
    this.fetchUserDetails()
  }

  private subscribeQueryParams(): void {
    this.fetchUserService.getQueryParams()
        .subscribe((queryParams: RequestQueryParams) => {
            this.queryParams = queryParams;
        });
  }

  public onChangeCurrentPage(pageObject: { pageIndex: number; }): void {
    let page = pageObject.pageIndex + 1;
    this.fetchUserService.patchQueryParams({page});
        this.fetchUserDetails();
  }

  fetchUserDetails():void{
    this.fetchUserService.getUsers()
    .subscribe(
        (results: any) => {
            // this.dataSource.filteredData = results.data;
            this.dataSource = new MatTableDataSource(results.data)
            this.totalItems = results.total;
        }, (error: any) => {
          alert('Error fetching user')
        },
    );
  }

}
