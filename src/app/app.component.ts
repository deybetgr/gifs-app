import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from './services/gifs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Gifs App';

  get results() {
    return this.gifsService.results;
  }

  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  search() {
    let value = this.txtSearch.nativeElement.value;

    if (value.trim().length === 0) return;

    this.gifsService.searchGifs(value);

    this.txtSearch.nativeElement.value = '';
  }
}
