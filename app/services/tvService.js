System.register(['angular2/core', 'rxjs/Rx', "angular2/http", "angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, core_2;
    var TvService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            TvService = (function () {
                function TvService(http) {
                    var _this = this;
                    this.http = http;
                    this.onNewPlaying = new core_2.EventEmitter();
                    this.onNewNext = new core_2.EventEmitter();
                    this.curNp = null;
                    this.curNext = null;
                    this.checkSchedule();
                    setInterval(function () { return _this.checkSchedule(); }, 10000);
                }
                TvService.prototype.entryEq = function (x, y) {
                    return (x.starts == y.starts);
                };
                TvService.prototype.checkSchedule = function () {
                    var _this = this;
                    console.log('check schedule');
                    this.http.get('data/schedule.json?ts=' + new Date().getTime()).map(function (res) { return res.json(); }).subscribe(function (xs) {
                        var now = new Date().getTime();
                        var key = localStorage.getItem("key");
                        if (key == null) {
                            key = prompt("Enter key:");
                            localStorage.setItem("key", key);
                        }
                        var np = xs.filter(function (x) { return now <= (x.starts + x.duration) && now >= x.starts; })[0];
                        if (np != null && (_this.curNp == null || !_this.entryEq(_this.curNp, np))) {
                            console.log('emit np');
                            np.title = CryptoJS.AES.decrypt(np.title, key).toString(CryptoJS.enc.Utf8);
                            if (np.title.length == 0) {
                                localStorage.removeItem("key");
                                return;
                            }
                            np.url = CryptoJS.AES.decrypt(np.url, key).toString(CryptoJS.enc.Utf8);
                            ;
                            if (np.url.length == 0) {
                                localStorage.removeItem("key");
                                return;
                            }
                            _this.curNp = np;
                            _this.onNewPlaying.emit(np);
                        }
                        var next = xs.filter(function (x) { return x.starts > now; }).sort(function (x, y) { return x.starts - y.starts; })[0];
                        if (next != null && (_this.curNext == null || !_this.entryEq(_this.curNext, next))) {
                            console.log('emit next');
                            next.title = CryptoJS.AES.decrypt(next.title, key).toString(CryptoJS.enc.Utf8);
                            if (next.title.length == 0) {
                                localStorage.removeItem("key");
                                return;
                            }
                            next.url = CryptoJS.AES.decrypt(next.url, key).toString(CryptoJS.enc.Utf8);
                            ;
                            if (next.url.length == 0) {
                                localStorage.removeItem("key");
                                return;
                            }
                            _this.curNext = next;
                            _this.onNewNext.emit(next);
                        }
                    });
                };
                TvService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], TvService);
                return TvService;
            })();
            exports_1("TvService", TvService);
        }
    }
});
//# sourceMappingURL=tvService.js.map