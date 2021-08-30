import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


import {CheckboxModule} from 'primeng-lts/checkbox';
import {SidebarModule} from 'primeng-lts/sidebar';
import {OverlayPanelModule} from 'primeng-lts/overlaypanel';
import {BlockUIModule} from 'primeng-lts/blockui';
import {MessagesModule} from 'primeng-lts/messages';
import {MessageModule} from 'primeng-lts/message';
import {ProgressSpinnerModule} from 'primeng-lts/progressspinner';
import {TooltipModule} from 'primeng-lts/tooltip';
import {ToastModule} from 'primeng-lts/toast';

import { HeaderComponent } from './shell/header/header.component';
import { FooterComponent } from './shell/footer/footer.component';
import { BodyComponent } from './shell/body/body.component';
import { AuthenticationService } from './services/authentication.service';
import { RegistrationService } from './services/registration.service';
import { MessageService } from 'primeng-lts/api';
import {TabMenuModule} from 'primeng-lts/tabmenu';
import { DashboardComponent } from './dashboard/dashboard.component';

import {ChartModule} from 'primeng-lts/chart';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SharedService } from './services/shared.service';
import {MultiSelectModule} from 'primeng-lts/multiselect';
import {FileUploadModule} from 'primeng-lts/fileupload';
import {DialogModule} from 'primeng-lts/dialog';
import {CalendarModule} from 'primeng-lts/calendar';
import {RadioButtonModule} from 'primeng-lts/radiobutton';
import { DatePipe } from '@angular/common';
import {ChipsModule} from 'primeng-lts/chips';

import { NgxBarcodeModule } from 'ngx-barcode';
import {SliderModule} from 'primeng-lts/slider';
import {InputNumberModule} from 'primeng-lts/inputnumber';
import {InputMaskModule} from 'primeng-lts/inputmask';
import {ColorPickerModule} from 'primeng-lts/colorpicker';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    DashboardComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CheckboxModule,
    SidebarModule,
    OverlayPanelModule,
    BlockUIModule,
    MessagesModule,
    MessageModule,
    ProgressSpinnerModule,
    TooltipModule,
    ToastModule,
    TabMenuModule,
    ChartModule,
    MultiSelectModule,
    FileUploadModule,
    DialogModule,
    CalendarModule,
    RadioButtonModule,
    NgxBarcodeModule,
    ChipsModule,
    SliderModule,
    InputNumberModule,
    InputMaskModule,
    ColorPickerModule
  ],
  providers: [AuthenticationService, RegistrationService,
     FormBuilder, MessageService, SharedService, DatePipe,
     {

      provide: HTTP_INTERCEPTORS,
 
      useClass: HttpErrorInterceptor,
 
      multi: true
 
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
