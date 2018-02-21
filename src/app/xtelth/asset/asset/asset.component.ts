import { Component, OnInit, Inject } from '@angular/core';
import { AssetService } from "app/xtelth/asset/asset.service";
import { IAsset } from "app/xtelth/shared/services/xtelth-objects";
import { TOASTR_TOKEN } from "app/core/toastr.service";
import { UserProfileService } from "app/core/user-profile.service";

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {
  assets: IAsset[];
  selected: IAsset;

  constructor(private assetService: AssetService, @Inject(TOASTR_TOKEN) private toastr: any,
    private auth: UserProfileService) { }

  ngOnInit() {
    this.getAssetList();
  }

  onSelect(asset: IAsset): void {
    this.selected = asset;
  }

  private getAssetList(): void {
    this.assetService.getAssetList().subscribe((response) => {
      this.assets = response.data;
    }, err => {
      this.toastr.error("An unknown error was encountered. Please try again", "Unknown Error");
    }, () => {
      console.log('getAssetList call completed!');
    });
  }

}
