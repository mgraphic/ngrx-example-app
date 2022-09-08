import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Note } from './note.model';

@Injectable({
    providedIn: 'root',
})
export class NoteService {
    private baseUrl: string = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    getNotes(): Observable<Note[]> {
        return this.http.get<Note[]>(`${this.baseUrl}/notes`);
    }

    saveNote(note: Note): Observable<Note> {
        return this.http.post<Note>(`${this.baseUrl}/notes`, note);
    }

    deleteNote(id: string): Observable<{}> {
        return this.http.delete(`${this.baseUrl}/notes/${id}`);
    }
}
