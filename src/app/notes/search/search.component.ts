import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime  } from 'rxjs/operators';

@Component({ 
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
    
    debounce: Subject<string> = new Subject<string>();

    @Output() onTyping = new EventEmitter<String>();

    ngOnInit(): void {
      this.debounce
      .pipe(debounceTime(300)) // emmits the content after a time without source emisson 
      .subscribe(searchText => this.onTyping.emit(searchText));
    }    
    
    ngOnDestroy(): void {
        this.debounce.unsubscribe(); // avoid memory allocation problems
    }

}