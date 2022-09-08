import { createReducer, on } from '@ngrx/store';

import { Note } from '../../note.model';

import * as noteActions from './note.actions';

export interface NoteState {
    notes: Note[];
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
}

const initialState: NoteState = {
    notes: [],
    error: null,
    status: 'pending',
};

export const noteReducer = createReducer(
    // supply the initial onload state
    initialState,

    // add new note to notes array
    on(noteActions.actionAddNote, (state, { content }) => {
        console.log('add note from reducer');
        return {
            ...state,
            notes: [
                ...state.notes,
                {
                    id: Date.now().toString(),
                    content,
                },
            ],
        };
    }),

    // delete note from notes array
    on(noteActions.actionDeleteNote, (state, { id }) => ({
        ...state,
        notes: state.notes.filter((note: Note): boolean => note.id !== id),
    })),

    // trigger loading of notes
    on(
        noteActions.actionLoadNotes,
        (state: NoteState): NoteState => ({
            ...state,
            status: 'loading',
        })
    ),

    // sucessfully loaded notes
    on(noteActions.actionLoadNotesSuccess, (state, { notes }) => ({
        ...state,
        notes,
        error: null,
        status: 'success',
    })),

    // notes load failure
    on(noteActions.actionLoadNotesFail, (state, { error }) => ({
        ...state,
        error,
        status: 'error',
    }))
);
