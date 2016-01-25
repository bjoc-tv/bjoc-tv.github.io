import {Pipe} from "angular2/core";
import {PipeTransform} from "angular2/core";

@Pipe({name: 'countdown'})
export class CountdownPipe implements PipeTransform {
    transform(value:number, args:string[]) : any {
        if (value <= 0) {
            return '0s';
        }

        let result = '';

        let hours = Math.floor(value / (60 * 60 * 1000));
        if (hours > 0) {
            result += hours + 'h';
        }
        value -= hours * 60 * 60 * 1000;

        let minutes = Math.floor(value / (60 * 1000));
        if (minutes > 0) {
            result += (minutes < 10 ? '0' + minutes : minutes) + 'm';
        }
        value -= minutes * 60 * 1000;

        let seconds = Math.floor(value / 1000);
        result += (seconds < 10 ? '0' + seconds : seconds) + 's';

        return result;
    }
}