import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// http module
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// http interceptor
import { UniversalInterceptor } from './service/interceptors/universal-interceptor';
// service worker module
import { ServiceWorkerModule } from '@angular/service-worker';
// browser animation
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// reactive form module
import { ReactiveFormsModule } from '@angular/forms';
// material ui module
import { MaterialModule } from '@/material/material.module';

// 路由和页面
import { AppRoutingModule } from './route/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './route/login/login.component';
import { HelpComponent } from './route/help/help.component';
// 环境变量
import { environment } from '../environments/environment';

// 服务
// import { HttpService } from '@/service/http.service';

@NgModule({
  declarations: [AppComponent, LoginComponent, HelpComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
