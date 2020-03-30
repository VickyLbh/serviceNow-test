import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStorage } from 'src/app/common/session.storage';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  // isVisible = false;
  // placement = 'top';
  searchContent: string;
  baseApiUrl: string;
  active = '';
  show = 'active';
  showSearch = 'active';
  showNav = 'active';
  hover = '';
  searchHidden: number = 0;
  screen:number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sessionStorage: SessionStorage
  ) {
  }

  value = this.searchContent;

  onEnter(value: string) {
    value = this.searchContent;
    this.search();
    this.searchValue();
  }

  ngOnInit() {
    let searchType = window.location.href
    if (searchType.indexOf('/home/search') !== -1) {
      this.searchHidden = 1;
    } else {
      this.searchHidden = 0;
    }

    let params = this.sessionStorage.getObject("searchContent");
    if (!isNullOrUndefined(params)) {
      this.searchContent = params;
      console.log(this.searchContent);
      console.log(params);
    }
    if (window.location.href.includes('localhost')) {
      this.baseApiUrl = "http://localhost:4200";
    } else {
      this.baseApiUrl = window.location.protocol + '//' + window.location.host;
    }
  }
  ngDoCheck() {
    this.screen = document.body.clientWidth;
    if(this.screen >= 1024 && this.hover == 'hover'){
      this.hover = '';
    } else if(this.screen < 1024 && this.active == 'active'){
      this.hover = 'hover';
    }
    let searchType = window.location.href
    if (searchType.indexOf('/home/search') !== -1) {
      if (searchType.indexOf('/home/search/detail') !== -1) {
        this.searchHidden = 0;
      } else {
        this.searchHidden = 1;
      }
    } else {
      this.searchHidden = 0;
    }
  }
  menu(): void {
    this.active = 'active';
    this.show = '';
    this.showNav = '';
    this.hover = 'hover';
  }

  search(): void {
    this.active = 'active';
    this.show = '';
    this.showSearch = '';
    this.hover = 'hover';
  }

  close(): void {
    this.active = '';
    this.show = 'active';
    this.showNav = 'active';
    this.showSearch = 'active';
    this.hover = '';
    this.sessionStorage.setObject("searchContent", this.searchContent);
    this.searchContent = null;

  }

  searchValue(): void {
    if (!isNullOrUndefined(this.searchContent)) {
      const searchContents: string = this.searchContent
      this.sessionStorage.setObject("searchContent", searchContents);
      console.log(this.searchContent);
      this.router.navigate([`home/search`]);
    }
    this.close();
  }
}
