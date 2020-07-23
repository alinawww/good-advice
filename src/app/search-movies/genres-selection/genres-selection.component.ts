import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    genres: Array<{genre: string, netflixid: string}>;
    selectedGenres: Array<{genre: string, netflixid: string}>;
  }

@Component({
  selector: 'app-genres-selection',
  templateUrl: './genres-selection.component.html',
  styleUrls: ['./genres-selection.component.scss']
})
export class GenresSelectionComponent implements OnInit {
  genreFilter = '';
  selection = [];
  displayedGenres = this.data.genres;
  constructor( public dialogRef: MatDialogRef<GenresSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData ) {}
  ngOnInit(): void {
    this.selection = [...this.data.selectedGenres]; 
  }

  selectGenre(event) {
    if (event.checked) {
      this.selection.push(event.source.value);
    } else {
      this.selection.splice(this.data.selectedGenres.indexOf(event.source.value), 1);
    }
  }

  removeGenre(item) {
    this.selection.splice(this.data.selectedGenres.indexOf(item), 1);
  }

  onKeydown(event) {
    this.filterGenres();
  }

  filterGenres() {
    this.displayedGenres = this.data.genres.filter(genre => genre.genre.toLowerCase().includes(this.genreFilter.toLowerCase()));
    return this.displayedGenres;
  }
}
