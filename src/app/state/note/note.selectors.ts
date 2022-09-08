import { createSelector } from '@ngrx/store';

import { Note } from '../../note.model';

import { AppState } from '../app.state';

import { NoteState } from './note.reducers';

export const selectNotes = (state: AppState) => state.notes;

export const selectAllNotes = createSelector(
    selectNotes,
    (state: NoteState) => state.notes
);

// not used, but added for example
export const selectNoteById = (id: string) =>
    createSelector(selectNotes, (allNotes) => {
        if (allNotes) {
            return allNotes.notes.find((note: Note) => note.id === id);
        }

        return {};
    });
