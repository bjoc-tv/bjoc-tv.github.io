import {Injectable} from 'angular2/core';

import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

import {Http} from "angular2/http";
import {Response} from "angular2/http";
import {EventEmitter} from "angular2/core";

declare var CryptoJS: any;

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
        return (x.starts == y.starts);
    }

    checkSchedule() {
        console.log('check schedule');

        this.http.get('data/schedule.json?ts=' + new Date().getTime()).map((res: Response) => res.json()).subscribe((xs: ScheduleEntry[]) => {
            let now = new Date().getTime();
            let key = localStorage.getItem("key");


            if (key == null) {
                key = prompt("Enter key:");
                localStorage.setItem("key", key);
            }

            let np = xs.filter(x => now <= (x.starts + x.duration) && now >= x.starts)[0];
            if (np != null && (this.curNp == null || !this.entryEq(this.curNp, np))) {
                console.log('emit np');

                np.title = CryptoJS.AES.decrypt(np.title, key).toString(CryptoJS.enc.Utf8);
                if (np.title.length == 0) {
                    localStorage.removeItem("key");
                    return;
                }
                np.url = CryptoJS.AES.decrypt(np.url, key).toString(CryptoJS.enc.Utf8);;
                if (np.url.length == 0) {
                    localStorage.removeItem("key");
                    return;
                }

                this.curNp = np;
                this.onNewPlaying.emit(np);
            }

            let next = xs.filter(x => x.starts > now).sort((x, y) => x.starts - y.starts)[0];
            if (next != null && (this.curNext == null || !this.entryEq(this.curNext, next))) {
                console.log('emit next');
                next.title = CryptoJS.AES.decrypt(next.title, key).toString(CryptoJS.enc.Utf8);
                if (next.title.length == 0) {
                    localStorage.removeItem("key");
                    return;
                }
                next.url = CryptoJS.AES.decrypt(next.url, key).toString(CryptoJS.enc.Utf8);;
                if (next.url.length == 0) {
                    localStorage.removeItem("key");
                    return;
                }

                this.curNext = next;
                this.onNewNext.emit(next);
            }
        });
    }
}