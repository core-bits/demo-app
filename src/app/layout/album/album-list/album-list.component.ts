import { Component, OnInit } from '@angular/core';
import { IAlbum } from '../shared/ialbum';
import { AlbumService } from "../shared/album.service";
import { ISearchField, SearchFieldConfig } from '../../../shared/components/search-input/search-input.component';
import { SortConfig, ISort } from '../../../shared/components/sort/sort.component';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  pageSizeSelected: number = 10;
  pageSizeCollection: number[] = [10, 25, 50, 100];
  totalSize: number = 1000;
  currentPage: number = 41;
  max = 10;
  sorted: ISort;
  albums: IAlbum[];
  operation: string;
  fields : string[] = ['userId', 'title'];
  sortables: ISort[];
  searchables : ISearchField[];

  constructor(private albumService: AlbumService, private sortConfig: SortConfig, 
  private searchConfig: SearchFieldConfig) { }

  ngOnInit() {
    this.getAlbumList();
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
