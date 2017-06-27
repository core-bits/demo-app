import { Component, OnInit } from '@angular/core';
import { IPost } from '../shared/ipost';
import { PostService } from '../shared/post.service';
import { ISearchField, SearchFieldConfig, SearchFieldUtils } from '../../../shared/components/search-input/search-input.component';
import { SortConfig, ISort } from '../../../shared/components/sort/sort.component';
import { IParam, IParamKeyValuePair } from '../../../core/iparam';
import { IResponse } from '../../../core/user.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  pageSizeSelected: number = 10;
  pageSizeCollection: number[] = [10, 25, 50, 100];
  totalSize: number = 1000;
  currentPage: number = 1;
  max = 6;
  sorted: ISort;
  posts: IPost[];
  operation: string;
  searchFieldList: ISearchField[];
  fields: string[] = ['userId', 'title', 'body'];
  sortables: ISort[];
  searchables: ISearchField[];

  constructor(private postService: PostService, private searchUtil: SearchFieldUtils,
    private sortConfig: SortConfig, private searchConfig: SearchFieldConfig) {
    this.searchFieldList = new Array<ISearchField>();
  }

  ngOnInit() {
    this.getPostList();
    this.loadSortableFieldPayload();
    this.loadSearchFieldPayload();
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
    //console.log(`field=>${sorted.field}, direction=>${sorted.direction.description}`);
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
      this.getPostList();
    }
  }

  private doSearch() {
    var param: IParam = this.searchUtil.buildIParams(this.searchFieldList);
    this.postService.getPostListByParams(param, this.sorted, this.currentPage, this.pageSizeSelected).subscribe((response: IResponse<IPost[]>) => {
      this.posts = response.data;
      this.totalSize = response.total;
    });
  }

  private getPostList(): void {
    this.postService.getPostList().subscribe((response: IPost[]) => {
      this.posts = response;
    });
  }

  private loadSortableFieldPayload() {
    this.sortables = [
      { field: this.fields[0] },
      { field: this.fields[1], direction: this.sortConfig.DESC },
      { field: this.fields[2] }
    ];
  }

  private loadSearchFieldPayload() {
    this.searchables = [
      { id: this.fields[0], name: this.fields[0], inputType: this.searchConfig.TEXT, operationType: this.searchConfig.EQUAL },
      { id: this.fields[1], name: this.fields[1], inputType: this.searchConfig.TEXT, operationType: this.searchConfig.EQUAL },
      { id: this.fields[2], name: this.fields[1], inputType: this.searchConfig.TEXT, operationType: this.searchConfig.EQUAL }
    ];
  }

}
