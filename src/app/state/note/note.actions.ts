import { createAction, props } from '@ngrx/store';

import { Note } from '../../note.model';

export const actionAddNote = createAction(
    '[Note] Add Note',
    props<{ content: string }>()
);

export const actionDeleteNote = createAction(
    '[Note] Delete Note',
    props<{ id: string }>()
);

export const actionLoadNotes = createAction('[Note] Load Notes');

export const actionLoadNotesSuccess = createAction(
    '[Note API] Load Notes Success',
    props<{ notes: Note[] }>()
);

export const actionLoadNotesFail = createAction(
    '[Note API] Load Notes Fail',
    props<{ error: string }>()
);
