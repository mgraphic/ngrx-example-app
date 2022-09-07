import { Component, OnInit } from '@angular/core';
// import { NoteService } from './note.service';

@Component({
    selector: 'app-note',
    template: ` <p>note works!</p> `,
    styles: [],
})
export class NoteComponent implements OnInit {
    // constructor(private noteService: NoteService) {}

    ngOnInit(): void {
        // this.noteService
        //     .saveNote({ content: 'This is a test', id: Date.now().toString() })
        //     .subscribe((data) => console.log('data:', data));
        // this.noteService
        //     .deleteNote('1662589580562')
        //     .subscribe((data) => console.log('del data:', data));
    }
}
