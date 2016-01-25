import {Injectable} from 'angular2/core';

import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

import {Http} from "angular2/http";
import {Response} from "angular2/http";
import {EventEmitter} from "angular2/core";

export interface ScheduleEntry {
    title: string;
    starts: number;
    url: string;
    duration: number;
}

@Injectable()
export class TvService {
    public onNewPlaying: EventEmitter<ScheduleEntry> = new EventEmitter();
    public onNewNext: EventEmitter<ScheduleEntry> = new EventEmitter();

    constructor(private http: Http) {
        this.checkSchedule();
        setInterval(() => this.checkSchedule(), 10000);
    }

    private curNp: ScheduleEntry = null;
    private curNext: ScheduleEntry = null;

    entryEq(x: ScheduleEntry, y: ScheduleEntry): boolean {
        return (x.url == y.url && x.starts == y.starts);
    }

    checkSchedule() {
        console.log('check schedule');
        this.http.get('data/schedule.json?ts=' + new Date().getTime()).map((res: Response) => res.json()).subscribe((xs: ScheduleEntry[]) => {
            let now = new Date().getTime();

            let np = xs.filter(x => now <= (x.starts + x.duration) && now >= x.starts)[0];
            if (np != null && (this.curNp == null || !this.entryEq(this.curNp, np))) {
                console.log('emit new np');
                this.curNp = np;
                this.onNewPlaying.emit(np);
            }

            let next = xs.filter(x => x.starts > now).sort((x, y) => x.starts - y.starts)[0];
            if (next != null && (this.curNext == null || !this.entryEq(this.curNext, next))) {
                console.log('emit new next');
                this.curNext = next;
                this.onNewNext.emit(next);
            }
        });
    }
}