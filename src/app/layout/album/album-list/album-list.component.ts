import { Component, OnInit } from '@angular/core';
import { IAlbum } from '../shared/ialbum';
import { AlbumService } from "../shared/album.service";
import { ISearchField, SearchFieldConfig, SearchFieldUtils } from '../../../shared/components/search-input/search-input.component';
import { SortConfig, ISort } from '../../../shared/components/sort/sort.component';
import { IParam, IParamKeyValuePair } from '../../../core/iparam';
import { IResponse } from '../../../core/user.model';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  pageSizeSelected: number = 10;
  pageSizeCollection: number[] = [10, 25, 50, 100];
  totalSize: number = 1000;
  currentPage: number = 1;
  max = 10;
  sorted: ISort;
  albums: IAlbum[];
  operation: string;
  searchFieldList: ISearchField[];
  fields: string[] = ['userId', 'title'];
  sortables: ISort[];
  searchables: ISearchField[];

  constructor(private albumService: AlbumService, private searchUtil: SearchFieldUtils,
    private sortConfig: SortConfig, private searchConfig: SearchFieldConfig) {
    this.searchFieldList = new Array<ISearchField>();
  }

  ngOnInit() {
    this.getAlbumList();
    this.loadSortableFieldPayload();
    this.loadSearchFieldPayload();
  }

  onPageSizeChange(event: number) {
    this.pageSizeSelected = event;
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
    console.log(`field=>${sorted.field}, direction=>${sorted.direction.description}`);
  }

  onFilterChange(fields: ISearchField[]) {
    this.searchFieldList = fields;
    this.doQuery();
  }

  private doQuery() {
    if (this.sorted || (this.searchFieldList && this.searchFieldList.length > 0) || (this.currentPage > 0 && this.pageSizeSelected > 0)) {
      this.doSearch();
    } else {
      this.getAlbumList();
    }
  }

  private doSearch() {
    var param: IParam = this.searchUtil.buildIParams(this.searchFieldList);
    this.albumService.getPostListByParams(param, this.sorted, this.currentPage, this.pageSizeSelected).subscribe((response: IResponse<IAlbum[]>) => {
      this.albums = response.data;
      this.totalSize = response.total;
    });
  }

  private getAlbumList(): void {
    this.albumService.getAlbumList().subscribe((response: IAlbum[]) => {
      this.albums = response;
    });
  }

  private loadSortableFieldPayload() {
    this.sortables = [
      { field: this.fields[0], direction: this.sortConfig.ASC },
      { field: this.fields[1] }
    ]
  }

  private loadSearchFieldPayload() {
    this.searchables = [
      { id: this.fields[0], name: this.fields[0], inputType: this.searchConfig.TEXT, operationType: this.searchConfig.EQUAL },
      { id: this.fields[1], name: this.fields[1], inputType: this.searchConfig.TEXT, operationType: this.searchConfig.EQUAL }
    ];
  }

}
