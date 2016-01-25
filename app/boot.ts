import {bootstrap}    from 'angular2/platform/browser'
import {ROUTER_PROVIDERS} from 'angular2/router';

import {AppComponent} from './components/app';
import {TvService} from "./services/tvService";
import {HTTP_PROVIDERS} from "angular2/http";

bootstrap(AppComponent, [
    TvService,
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS
]);
