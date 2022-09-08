import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import { Note } from '../../note.model';
import { NoteService } from '../../note.service';

import { AppState } from '../app.state';

import * as noteActions from './note.actions';
import { selectAllNotes } from './note.selectors';

@Injectable()
export class NoteEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private noteService: NoteService
    ) {}

    // when actionLoadNotes is dispatched
    loadNotes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(noteActions.actionLoadNotes),
            switchMap(() =>
                this.noteService.getNotes().pipe(
                    map((notes: Note[]) =>
                        noteActions.actionLoadNotesSuccess({ notes })
                    ),
                    catchError((error: string) =>
                        of(noteActions.actionLoadNotesFail({ error }))
                    )
                )
            )
        )
    );

    // when actionAddNote is dispatched
    saveNote$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(noteActions.actionAddNote),
                withLatestFrom(this.store.select(selectAllNotes)),
                switchMap(([action, notes]) => {
                    const lastNote: Note = notes[notes.length - 1];

                    if (action.content === lastNote.content) {
                        return this.noteService.saveNote(lastNote);
                    }

                    return EMPTY;
                })
            ),
        { dispatch: false }
    );

    // when actionDeleteNote is dispatched
    deleteNote$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(noteActions.actionDeleteNote),
                switchMap(({ id }) => this.noteService.deleteNote(id))
            ),
        { dispatch: false }
    );
}
