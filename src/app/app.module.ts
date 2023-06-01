import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TitleComponent } from './title/title.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { NotDoneYetComponent } from './not-done-yet/not-done-yet.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TitleComponent,
    AboutMeComponent,
    NotDoneYetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
