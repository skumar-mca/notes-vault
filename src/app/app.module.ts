import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { HeaderComponent } from '@app/header/header.component';
import { FooterComponent } from '@app/footer/footer.component';
import { SharedModule } from '@app/shared/shared-module.module'
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpInterceptorService } from './core/http-interceptor.service';
import { DateDisplayPipe } from './core/date-display.pipe';
import { RegisterComponent } from './admin/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularEditorModule,
    NgbDropdownModule,
    SharedModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
