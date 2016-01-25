import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {TvService} from "../services/tvService";
import {ScheduleEntry} from "../services/tvService";
import {CountdownPipe} from '../pipes/countdown';
import {ElementRef} from "angular2/core";

@Component({
    selector: 'bjoctv-app',
    templateUrl: 'app/components/app.html',
    styleUrls: ['app/components/app.css'],
    pipes: [CountdownPipe]
})
export class AppComponent{
    private np: ScheduleEntry = null;
    private next: ScheduleEntry = null;
    private ttn = 0;

    constructor(private elem: ElementRef, private tvService: TvService) {
        setInterval(() => this.ttn = ((this.next && (this.next.starts - new Date().getTime())) || 0), 1000);
        tvService.onNewNext.subscribe((e: ScheduleEntry) => {
            console.log('next: ' + e.title);
            this.next = e
        });
        tvService.onNewPlaying.subscribe((e: ScheduleEntry) => {
            console.log('np: ' + e.title);
            this.np = e;
        });
    }

    onVideoLoad(e: any) {
        console.log('video load');
        let ct = Math.floor((new Date().getTime() - this.np.starts)/1000);
        e.target.currentTime = ct;
    }

    onVideoEnd(e: any) {
        console.log('video end');
        this.np = null;
    }
}