import { Component, OnInit } from '@angular/core';
import { IUser, IResponse } from '../../../core/user.model';
import { UserService } from '../../user/shared/user.service';
import { ISearchField, SearchFieldUtils, SearchFieldConfig } from '../../../shared/components/search-input/search-input.component';
import { SortConfig, ISort } from '../../../shared/components/sort/sort.component';

import { IParam, IParamKeyValuePair } from '../../../core/iparam';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  pageSizeSelected: number = 5;
  pageSizeCollection: number[] = [5, 10, 25, 50, 100];
  totalSize: number = 1000;
  currentPage: number = 1;
  max: number = 5;
  sorted: ISort;
  users: IUser[];
  operation: string;
  searchFieldList: ISearchField[];
  sortBy: string;
  sortOrder: string;
  fields: string[] = ['name', 'email', 'phone', 'website'];
  sortables: ISort[];
  searchables: ISearchField[];

  constructor(private userService: UserService, private searchUtil: SearchFieldUtils,
    private sortConfig: SortConfig, private searchConfig: SearchFieldConfig) {
    this.searchFieldList = new Array<ISearchField>();
  }

  ngOnInit() {
    this.loadSortableFieldPayload();
    this.loadSearchFieldPayload();
    this.doQuery();
  }

  onPageSizeChange(size: number) {
    this.pageSizeSelected = size;
    //Please review
    this.currentPage = 1;
    this.doQuery();
  }

  onPaginateChange(current: number) {
    this.currentPage = current;
    this.doQuery();
  }

  onSortChange(sorted: ISort) {
    this.sorted = sorted;
    this.doQuery();
  }

  onFilterChange(fields: ISearchField[]) {
    this.searchFieldList = fields;
    this.doQuery();
  }

  private doQuery() {
    if (this.sorted || (this.searchFieldList && this.searchFieldList.length > 0) || (this.currentPage > 0 && this.pageSizeSelected > 0)) {
      this.doSearch();
    } else {
      this.getUserList();
    }
  }

  private doSearch() {
    var param: IParam = this.searchUtil.buildIParams(this.searchFieldList);
    this.userService.getUserListByParams(param, this.sorted, this.currentPage, this.pageSizeSelected).subscribe((response: IResponse<IUser[]>) => {
      this.users = response.data;
      this.totalSize = response.total;
    });
  }

  private getUserList(): void {
    this.userService.getUserList()
      .subscribe((list: IUser[]) => {
        this.users = list;
      });
  }

  private loadSortableFieldPayload() {
    this.sortables = [
      { field: this.fields[0], direction: this.sortConfig.ASC },
      { field: this.fields[1] },
      { field: this.fields[2] },
      { field: this.fields[3] }
    ];
  }

  private loadSearchFieldPayload() {
    this.searchables = [
      { id: this.fields[0], name: this.fields[0], inputType: this.searchConfig.TEXT, operationType: this.searchConfig.EQUAL },
      { id: this.fields[0], name: this.fields[1], inputType: this.searchConfig.TEXT, operationType: this.searchConfig.EQUAL },
      { id: this.fields[0], name: this.fields[2], inputType: this.searchConfig.TEXT, operationType: this.searchConfig.EQUAL },
      { id: this.fields[0], name: this.fields[3], inputType: this.searchConfig.TEXT, operationType: this.searchConfig.EQUAL }
    ];
  }

  private index(index: number) : number{
    return ((this.currentPage - 1) * this.pageSizeSelected) + (index + 1);
  }

}
