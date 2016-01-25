System.register(['angular2/core', "../services/tvService", '../pipes/countdown', "angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, tvService_1, countdown_1, core_2;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (tvService_1_1) {
                tvService_1 = tvService_1_1;
            },
            function (countdown_1_1) {
                countdown_1 = countdown_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(elem, tvService) {
                    var _this = this;
                    this.elem = elem;
                    this.tvService = tvService;
                    this.np = null;
                    this.next = null;
                    this.ttn = 0;
                    setInterval(function () { return _this.ttn = ((_this.next && (_this.next.starts - new Date().getTime())) || 0); }, 1000);
                    tvService.onNewNext.subscribe(function (e) {
                        console.log('next: ' + e.title);
                        _this.next = e;
                    });
                    tvService.onNewPlaying.subscribe(function (e) {
                        console.log('np: ' + e.title);
                        _this.np = e;
                    });
                }
                AppComponent.prototype.onVideoLoad = function (e) {
                    console.log('video load');
                    var ct = Math.floor((new Date().getTime() - this.np.starts) / 1000);
                    e.target.currentTime = ct;
                };
                AppComponent.prototype.onVideoEnd = function (e) {
                    console.log('video end');
                    this.np = null;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'bjoctv-app',
                        templateUrl: 'app/components/app.html',
                        styleUrls: ['app/components/app.css'],
                        pipes: [countdown_1.CountdownPipe]
                    }), 
                    __metadata('design:paramtypes', [core_2.ElementRef, tvService_1.TvService])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.js.map