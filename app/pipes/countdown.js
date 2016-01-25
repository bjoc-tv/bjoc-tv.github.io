System.register(["angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var CountdownPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            CountdownPipe = (function () {
                function CountdownPipe() {
                }
                CountdownPipe.prototype.transform = function (value, args) {
                    if (value <= 0) {
                        return '0s';
                    }
                    var result = '';
                    var hours = Math.floor(value / (60 * 60 * 1000));
                    if (hours > 0) {
                        result += hours + 'h';
                    }
                    value -= hours * 60 * 60 * 1000;
                    var minutes = Math.floor(value / (60 * 1000));
                    if (minutes > 0) {
                        result += (minutes < 10 ? '0' + minutes : minutes) + 'm';
                    }
                    value -= minutes * 60 * 1000;
                    var seconds = Math.floor(value / 1000);
                    result += (seconds < 10 ? '0' + seconds : seconds) + 's';
                    return result;
                };
                CountdownPipe = __decorate([
                    core_1.Pipe({ name: 'countdown' }), 
                    __metadata('design:paramtypes', [])
                ], CountdownPipe);
                return CountdownPipe;
            })();
            exports_1("CountdownPipe", CountdownPipe);
        }
    }
});
//# sourceMappingURL=countdown.js.map