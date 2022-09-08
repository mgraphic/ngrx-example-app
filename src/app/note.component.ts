import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from './state/app.state';
import { Note } from './note.model';
import * as noteActions from './state/note/note.actions';
import { selectAllNotes } from './state/note/note.selectors';

@Component({
    selector: 'app-note',
    template: `
        <h1>My Notebook</h1>
        <div class="input-group">
            <span class="input-group-text">Add New Note</span>
            <textarea [(ngModel)]="newNote" class="form-control"></textarea>
            <button
                type="button"
                class="btn btn-primary btn-lg"
                (click)="addNote()"
            >
                Add Note
            </button>
        </div>

        <section class="note-list mt-5">
            <div
                class="card shadow w-100 mb-4"
                role="button"
                (click)="deleteNote(note)"
                *ngFor="let note of allNotes$ | async"
            >
                <div class="card-body">
                    <p class="card-text">
                        {{ note.content }}
                    </p>
                </div>
            </div>
        </section>
    `,
    styles: [],
})
export class NoteComponent implements OnInit {
    public allNotes$: Observable<Note[]> = this.store.select(selectAllNotes);
    public newNote: string = '';

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.store.dispatch(noteActions.actionLoadNotes());
    }

    addNote(): void {
        this.store.dispatch(
            noteActions.actionAddNote({ content: this.newNote })
        );
        this.newNote = '';
    }

    deleteNote(note: Note): void {
        this.store.dispatch(noteActions.actionDeleteNote({ id: note.id }));
    }
}
