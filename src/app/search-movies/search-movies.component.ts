import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { GenresSelectionComponent } from './genres-selection/genres-selection.component';
import { sortBy } from 'lodash';

interface Genre {
  genre: string;
  netflixid: number;
}



@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss'],
  providers: [FormBuilder]
})
export class SearchMoviesComponent implements OnInit {
  // searchString = ''
  results = [];
  filmList = [];
  genres = [];
  selectedGenres = [];
  filteredGenres: Observable<Genre[]>;
  filterModel: any = {};
  destroySubject = new Subject<boolean>();
  form: FormGroup;
  genresCtrl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  loading = false;
  @ViewChild('genresInput') genresInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  currentYear = new Date().getFullYear();
  ranges = {
    year: [1900, 2020],
    rating: [8, 10]
  };

  selectedItems = [];
  constructor(private apiService: ApiService, private _fb: FormBuilder, public dialog: MatDialog) {}

  removeGenre(genre) {
    this.selectedGenres.splice(this.selectedGenres.indexOf(genre), 1);
    this.updateGenresFilter();
  }

  ngOnInit() {
    this.getGenres();
    this.initForm();
  }

  initForm() {
    this.form = this._fb.group(this.formModel);
  }

  get genrelistFCtrl() {
    return this.form.get('genrelist') as FormControl;
  }

  getControl(name) {
    return this.form.get(name) as FormControl;
  }


  get formModel() {
    return {
      genrelist: new FormControl([]),
      query: new FormControl(''),
      type: new FormControl(''),
      orderby: new FormControl(''),
      countrylist: this._fb.array([]),
      // range_year: new FormControl([1940, 2020]),
      start_year: new FormControl(1940),
      end_year: new FormControl(this.currentYear),
      start_rating: new FormControl(8),
      end_rating: new FormControl(10),
    };
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.filterModel.query = event.target.value;
      this.search();
    }
  }

  getGenres() {
    // TODO: Unescape UNICODE string
    const storedGenres = localStorage.getItem('nfGenres');
    let encodedGenres = [];
    if (storedGenres) {
      encodedGenres = JSON.parse(storedGenres);
      this.mapGenres(encodedGenres);
    } else {
      this.apiService.getGenres().pipe(takeUntil(this.destroySubject)).subscribe(res => {
        const sortedGenres = sortBy(res.results, ['genre']);
        localStorage.setItem('nfGenres', JSON.stringify(sortedGenres));
        this.mapGenres(sortedGenres);
      });
    }
  }

  mapGenres(genres) {
    this.genres = genres.map(result => {
      return {
        genre: decodeURI(result.genre),
        netflixid: result.netflixid
      };
    });
  }

  onChangeRange(type, event) {
    if (type === 'year') {
      this.getControl('start_year').setValue(event[0]);
      this.getControl('end_year').setValue(event[1]);
    } else if (type === 'rating') {
      this.getControl('start_rating').setValue(event[0]);
      this.getControl('end_rating').setValue(event[1]);
    }
  }

  search() {
    this.loading = true;
    const config: any = {...this.form.value };
    this.apiService.searchNf({ ...config })
      .pipe(takeUntil(this.destroySubject), finalize(() => this.loading = false))
      .subscribe(res => {
      this.results = res.results;
    });
  }
  filterGenres(ev) {
    return this.genres.filter(genre => genre.genre.includes(ev.target.value));
  }

  updateFilterModel(key, event) {
    this.filterModel[key] = event.value;
    console.log(event);
  }

  addToList(film) {
    this.filmList.push(film);
  }

  add(ev) {
    console.log(ev);
  }

  openDialog(e): void {
    e.stopPropagation();
    const dialogRef = this.dialog.open(GenresSelectionComponent, {
      width: '900px',
      data: {
        genres: this.genres,
        selectedGenres: this.selectedGenres
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedGenres = result;
        this.updateGenresFilter();
      }
    });
  }

  updateGenresFilter() {
    const genreList = this.selectedGenres.map((item: Genre) => item.netflixid).toString();
    this.getControl(genreList).setValue(genreList);
  }

  toggleItemSelection(netflixId) {
    if (this.selectedItems.includes(netflixId)) {
      this.selectedItems.splice(this.selectedItems.indexOf(netflixId), 1);
    } else {
      this.selectedItems.push(netflixId);
    }
  }

  onSubmit() {
    if (this.form.valid) {
       this.search();
    }
  }

  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.unsubscribe();
  }

}
