import { Component } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  item$: Observable<any>;
  notes: Array<any>;
  newTitle: string = '';
  newText: string = '';

  constructor(private firestore: Firestore) {
    const coll = collection(firestore, 'notes');
    this.item$ = collectionData(coll);

    this.item$.subscribe((newNotes) => {
      alert('New notes Added');
      this.notes = newNotes;
    });
  }

  addTodo() {
    let newNote = {
      noteTitle: this.newTitle,
      noteText: this.newText,
    };
    const coll = collection(this.firestore, 'notes');
    setDoc(doc(coll), newNote);
  }
}
