import { Component, OnInit } from '@angular/core';
import { IPost } from '../shared/ipost';
import { PostService } from '../shared/post.service';
import { ISearchField, SearchFieldConfig } from '../../../shared/components/search-input/search-input.component';
import { SortConfig, ISort } from '../../../shared/components/sort/sort.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  pageSizeSelected: number = 10;
  pageSizeCollection: number[] = [10, 25, 50, 100];
  totalSize: number = 1000;
  currentPage: number;
  max = 6;
  sorted: ISort;
  posts: IPost[];
  operation: string;
  fields: string[] = ['userId', 'title', 'body'];
  sortables: ISort[];
  searchables: ISearchField[];

  constructor(private postService: PostService, private sortConfig: SortConfig, private searchConfig: SearchFieldConfig) { }

  ngOnInit() {
    this.getPostList();
    this.loadSortableFieldPayload();
    this.loadSearchFieldPayload();
  }

  onPageSizeChange(event: number) {
    this.pageSizeSelected = event;
  }

  onPaginateChange(current: number) {
    this.currentPage = current;
  }

  onSortChange(sorted: ISort) {
    this.sorted = sorted;
    console.log(`field=>${sorted.field}, direction=>${sorted.direction.description}`);
  }

  onFilterChange(event: ISearchField) {
    //To be implemented
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
