import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { NoteComponent } from './note.component';
import { noteReducer } from './state/note/note.reducers';
import { NoteEffects } from './state/note/note.effects';

@NgModule({
    declarations: [AppComponent, NoteComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        StoreModule.forRoot({
            notes: noteReducer,
        }),
        EffectsModule.forRoot([NoteEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
