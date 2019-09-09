(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/auth-guard.service */ "./src/app/services/auth-guard.service.ts");
/* harmony import */ var _public_login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./public/login/login.component */ "./src/app/public/login/login.component.ts");
/* harmony import */ var _public_register_register_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./public/register/register.component */ "./src/app/public/register/register.component.ts");
/* harmony import */ var src_app_public_license_license_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/public/license/license.component */ "./src/app/public/license/license.component.ts");







var routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: _public_login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"] },
    { path: 'register', canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]], component: _public_register_register_component__WEBPACK_IMPORTED_MODULE_5__["RegisterComponent"] },
    { path: 'licenselist', canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]], component: src_app_public_license_license_component__WEBPACK_IMPORTED_MODULE_6__["LicenseComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'license';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _public_login_login_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./public/login/login.component */ "./src/app/public/login/login.component.ts");
/* harmony import */ var _public_register_register_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./public/register/register.component */ "./src/app/public/register/register.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _core_logicqInterceptor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./core/logicqInterceptor */ "./src/app/core/logicqInterceptor.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _core_material_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./core/material.module */ "./src/app/core/material.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _core_token_storage__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./core/token.storage */ "./src/app/core/token.storage.ts");
/* harmony import */ var _public_license_license_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./public/license/license.component */ "./src/app/public/license/license.component.ts");














var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _public_login_login_component__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"],
                _public_register_register_component__WEBPACK_IMPORTED_MODULE_6__["RegisterComponent"],
                _public_license_license_component__WEBPACK_IMPORTED_MODULE_13__["LicenseComponent"],
                _public_license_license_component__WEBPACK_IMPORTED_MODULE_13__["DateChangeDialog"]
            ],
            entryComponents: [_public_license_license_component__WEBPACK_IMPORTED_MODULE_13__["DateChangeDialog"]],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormsModule"],
                _core_material_module__WEBPACK_IMPORTED_MODULE_10__["CustomMaterialModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"]
            ],
            providers: [{
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HTTP_INTERCEPTORS"],
                    useClass: _core_logicqInterceptor__WEBPACK_IMPORTED_MODULE_8__["LogicQIntercept"],
                    multi: true
                }, _core_token_storage__WEBPACK_IMPORTED_MODULE_12__["TokenStorage"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/core/logicqInterceptor.ts":
/*!*******************************************!*\
  !*** ./src/app/core/logicqInterceptor.ts ***!
  \*******************************************/
/*! exports provided: LogicQIntercept */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogicQIntercept", function() { return LogicQIntercept; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _token_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./token.storage */ "./src/app/core/token.storage.ts");






var TOKEN_HEADER_KEY = "Authorization";
var LogicQIntercept = /** @class */ (function () {
    function LogicQIntercept(snackBar, tokenStorage) {
        this.snackBar = snackBar;
        this.tokenStorage = tokenStorage;
    }
    // intercept request and add token
    LogicQIntercept.prototype.intercept = function (request, next) {
        var _this = this;
        var authReq = request;
        if (this.tokenStorage.getToken() != null) {
            authReq = request.clone({
                headers: request.headers.set(TOKEN_HEADER_KEY, "Bearer " + this.tokenStorage.getToken())
            });
        }
        return next.handle(authReq).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (event) {
            if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]) {
                console.log("API return", event);
            }
        }, function (err) {
            console.log(event);
            _this.openErrorSnackBar(err.message, "CLOSE");
        }));
    };
    LogicQIntercept.prototype.openErrorSnackBar = function (message, action) {
        this.snackBar.open(message, action, {
            duration: 10000
        });
    };
    LogicQIntercept = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSnackBar"],
            _token_storage__WEBPACK_IMPORTED_MODULE_5__["TokenStorage"]])
    ], LogicQIntercept);
    return LogicQIntercept;
}());



/***/ }),

/***/ "./src/app/core/material.module.ts":
/*!*****************************************!*\
  !*** ./src/app/core/material.module.ts ***!
  \*****************************************/
/*! exports provided: CustomMaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomMaterialModule", function() { return CustomMaterialModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");





var CustomMaterialModule = /** @class */ (function () {
    function CustomMaterialModule() {
    }
    CustomMaterialModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatToolbarModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatRadioModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialogModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTabsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatExpansionModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__["MatIconModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatMenuModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatGridListModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatListModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonToggleModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatStepperModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSlideToggleModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatFormFieldModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSelectModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSliderModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDatepickerModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatProgressSpinnerModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatProgressBarModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatChipsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSidenavModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatBadgeModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTooltipModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSnackBarModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatAutocompleteModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatPaginatorModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSortModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDatepickerModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatNativeDateModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatBottomSheetModule"]],
            exports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatToolbarModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatRadioModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialogModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTabsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatExpansionModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__["MatIconModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatMenuModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatGridListModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatListModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonToggleModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatStepperModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSlideToggleModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatFormFieldModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSelectModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSliderModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDatepickerModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatProgressSpinnerModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatProgressBarModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatChipsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSidenavModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatBadgeModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTooltipModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSnackBarModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatAutocompleteModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatPaginatorModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSortModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDatepickerModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatNativeDateModule"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatBottomSheetModule"]],
        })
    ], CustomMaterialModule);
    return CustomMaterialModule;
}());



/***/ }),

/***/ "./src/app/core/token.storage.ts":
/*!***************************************!*\
  !*** ./src/app/core/token.storage.ts ***!
  \***************************************/
/*! exports provided: TokenStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenStorage", function() { return TokenStorage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var TOKEN_KEY = 'AuthToken';
var TokenStorage = /** @class */ (function () {
    function TokenStorage() {
    }
    TokenStorage.prototype.signOut = function () {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.clear();
    };
    TokenStorage.prototype.saveToken = function (token) {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    };
    TokenStorage.prototype.getToken = function () {
        return sessionStorage.getItem(TOKEN_KEY);
    };
    TokenStorage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TokenStorage);
    return TokenStorage;
}());



/***/ }),

/***/ "./src/app/public/license/change-date-dialog.html":
/*!********************************************************!*\
  !*** ./src/app/public/license/change-date-dialog.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wh-bg\">\r\n    <h2 class=\"modal-header\">Change License Expiry Date for {{license.hostName}}</h2>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6 col-sm-6\">\r\n            <mat-form-field appearance=\"outline\" class=\"example-full-width\">\r\n                <mat-label>License Extended Days</mat-label>\r\n                <input matInput placeholder=\" Extended Days\" [(ngModel)]=\"days\" name=\"days\" required>\r\n            </mat-form-field>\r\n        </div>\r\n        <div class=\"col-md-6 col-sm-6\">\r\n            <div class=\"col-md-10 col-sm-10\">\r\n                <mat-label>Current Days : <b>{{license.validityDay}}</b></mat-label>\r\n            </div>\r\n            <div class=\"col-md-11 col-sm-12\">\r\n                <mat-label>Activation Day : <b>{{license.activationDate | date }}</b></mat-label>\r\n            </div>\r\n            <div class=\"col-md-10 col-sm-12\">\r\n                <mat-label>Current Status : <b>{{license.status}}</b></mat-label>\r\n            </div>\r\n        </div>\r\n        <button mat-raised-button color=\"warn\" (click)='confirmDays()'>CONFIRM</button>\r\n        <button mat-raised-button (click)='onNoClick()'> NO THANKS</button>\r\n    </div>\r\n\r\n</div>"

/***/ }),

/***/ "./src/app/public/license/license.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/public/license/license.component.ts ***!
  \*****************************************************/
/*! exports provided: LicenseComponent, DateChangeDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LicenseComponent", function() { return LicenseComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateChangeDialog", function() { return DateChangeDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/authentication.service */ "./src/app/services/authentication.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _model_license__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../model/license */ "./src/app/public/model/license.ts");







var LicenseComponent = /** @class */ (function () {
    function LicenseComponent(authService, snackBar, router, dialog) {
        this.authService = authService;
        this.snackBar = snackBar;
        this.router = router;
        this.dialog = dialog;
        this.displayedColumns = ['hostName', 'activationDate', 'validityDay', 'download'];
        this.licenseList = [];
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](this.licenseList);
        this.today = new Date();
    }
    LicenseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource.paginator = this.paginator;
        if (this.authService.isAuthenticate) {
            this.authService.licensedList().subscribe(function (licList) {
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](licList);
                _this.licenseList = licList;
            });
        }
    };
    LicenseComponent.prototype.editLicense = function (license) {
        var _this = this;
        var dialogRef = this.dialog.open(DateChangeDialog, {
            width: "650px",
            data: license
        });
        dialogRef.componentInstance.numberofDays.subscribe(function (days) {
            _this.authService.updateLicense(license, days).subscribe(function (data) {
                _this.snackBar.open(license.hostName, "License Extended Sucessfully for more  " + days + "  days", {
                    duration: 5000
                });
            });
        });
    };
    LicenseComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    LicenseComponent.prototype.registerNewLicense = function () {
        this.router.navigate(['/register']);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"])
    ], LicenseComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"])
    ], LicenseComponent.prototype, "sort", void 0);
    LicenseComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./license.html */ "./src/app/public/license/license.html"),
            styles: [__webpack_require__(/*! ./license.scss */ "./src/app/public/license/license.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"]])
    ], LicenseComponent);
    return LicenseComponent;
}());

var DateChangeDialog = /** @class */ (function () {
    function DateChangeDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.numberofDays = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.license = data;
    }
    DateChangeDialog.prototype.confirmDays = function () {
        this.numberofDays.emit(this.days);
        this.onNoClick();
    };
    DateChangeDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DateChangeDialog = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'change-date-dialog',
            template: __webpack_require__(/*! ./change-date-dialog.html */ "./src/app/public/license/change-date-dialog.html"),
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"],
            _model_license__WEBPACK_IMPORTED_MODULE_5__["License"]])
    ], DateChangeDialog);
    return DateChangeDialog;
}());



/***/ }),

/***/ "./src/app/public/license/license.html":
/*!*********************************************!*\
  !*** ./src/app/public/license/license.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"container-fluid top-header d-flex align-items-center\">\r\n    <div class=\"w-100\">\r\n        <div class=\"row clearfix\">\r\n            <div class=\"col-lg-12\">\r\n                <a class=\"logo \" href=\"#\"><img src=\"assets/images/logo.png\" alt=\"\"></a>\r\n                <div class=\"search\">\r\n                    <i class=\"fas fa-search\"></i> <input type=\"text\" placeholder=\"Search...\" />\r\n                </div>\r\n                <ul class=\"login-info\">\r\n                    <li>Last login {{ today | date }}</li>\r\n                    <li><a class=\"user\" href=\"#\"><i class=\"material-icons\">account_circle</i></a></li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</header>\r\n<div class=\"body-content\">\r\n    <div class=\"content-area\">\r\n        <div class=\"primary-action mb-3\">\r\n            <div class=\"row clearfix\">\r\n                <div class=\"col-md-5 col-lg-6 text-right pull-right\">\r\n                    <button type=\"button\" class=\"btn btn-warning\" mat-raised-button (click)=\"registerNewLicense()\">\r\n                        Register License</button>\r\n                    <button type=\"button\" class=\"btn btn-warning\" mat-raised-button (click)=\"decativateLicense()\">Deactivate\r\n                        License</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <mat-card>\r\n            <mat-card-header>\r\n                <mat-card-title> License List</mat-card-title>\r\n            </mat-card-header>\r\n            <mat-form-field class=\"example-full-width\">\r\n                <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n            </mat-form-field>\r\n            <div class=\"mat-elevation-z8\">\r\n                <table mat-table [dataSource]=\"dataSource\" matSort matSortActive=\"activationDate\" matSortDisableClear\r\n                    matSortDirection=\"desc\">\r\n\r\n                    <!-- Position Column -->\r\n                    <ng-container matColumnDef=\"hostName\">\r\n                        <th mat-header-cell *matHeaderCellDef> Host Name </th>\r\n                        <td mat-cell *matCellDef=\"let element\"> {{element.hostName}} </td>\r\n                    </ng-container>\r\n\r\n                    <!-- Name Column -->\r\n                    <ng-container matColumnDef=\"activationDate\">\r\n                        <th mat-header-cell *matHeaderCellDef> Activated </th>\r\n                        <td mat-cell *matCellDef=\"let element\"> {{element.activationDate | date:'fullDate'}} </td>\r\n                    </ng-container>\r\n\r\n                    <!-- Weight Column -->\r\n                    <ng-container matColumnDef=\"validityDay\">\r\n                        <th mat-header-cell *matHeaderCellDef> Validity Days </th>\r\n                        <td mat-cell *matCellDef=\"let element\"> {{element.validityDay}} </td>\r\n                    </ng-container>\r\n                    <!-- Weight Column -->\r\n                    <ng-container matColumnDef=\"download\">\r\n                        <th mat-header-cell *matHeaderCellDef> Download </th>\r\n                        <td mat-cell *matCellDef=\"let element\">\r\n                            <mat-icon (click)=\"editLicense(element)\"><i class=\"material-icons\">edit</i></mat-icon>\r\n                        </td>\r\n                    </ng-container>\r\n\r\n                    <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n                    <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n                </table>\r\n\r\n                <mat-paginator [pageSizeOptions]=\"[5, 10, 20]\" showFirstLastButtons></mat-paginator>\r\n            </div>\r\n        </mat-card>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/public/license/license.scss":
/*!*********************************************!*\
  !*** ./src/app/public/license/license.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-container {\n  display: flex;\n  flex-direction: column; }\n\n.example-container > * {\n  width: 100%; }\n\ntable {\n  width: 100%; }\n\n.example-full-width {\n  width: 100%; }\n\n.example-form {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%; }\n\n.body-content {\n  margin-left: 30px;\n  margin-right: 30px;\n  margin-top: 20px; }\n\n.btn {\n  margin-left: 20px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHVibGljL2xpY2Vuc2UvRTpcXFdPUktfU1BBQ0VcXFNDSE9PTF9DT05URU5UXFxTQ0hPT0xcXExJQ0VOU0VfQlVJTERFUlxcV0VCL3NyY1xcYXBwXFxwdWJsaWNcXGxpY2Vuc2VcXGxpY2Vuc2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQWE7RUFDYixzQkFBc0IsRUFBQTs7QUFHeEI7RUFDRSxXQUFXLEVBQUE7O0FBRWI7RUFDRSxXQUFXLEVBQUE7O0FBR2Y7RUFDSSxXQUFXLEVBQUE7O0FBRWY7RUFDSSxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLFdBQVcsRUFBQTs7QUFFYjtFQUNFLGlCQUFnQjtFQUNoQixrQkFBaUI7RUFDakIsZ0JBQWUsRUFBQTs7QUFFakI7RUFDRSxpQkFBZ0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3B1YmxpYy9saWNlbnNlL2xpY2Vuc2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5leGFtcGxlLWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICB9XHJcbiAgXHJcbiAgLmV4YW1wbGUtY29udGFpbmVyID4gKiB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbiAgdGFibGUge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgfVxyXG5cclxuLmV4YW1wbGUtZnVsbC13aWR0aCB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIH1cclxuLmV4YW1wbGUtZm9ybSB7XHJcbiAgICBtaW4td2lkdGg6IDE1MHB4O1xyXG4gICAgbWF4LXdpZHRoOiA1MDBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxuICAuYm9keS1jb250ZW50e1xyXG4gICAgbWFyZ2luLWxlZnQ6MzBweDtcclxuICAgIG1hcmdpbi1yaWdodDozMHB4O1xyXG4gICAgbWFyZ2luLXRvcDoyMHB4O1xyXG4gIH1cclxuICAuYnRue1xyXG4gICAgbWFyZ2luLWxlZnQ6MjBweDtcclxuICB9Il19 */"

/***/ }),

/***/ "./src/app/public/login/login.component.html":
/*!***************************************************!*\
  !*** ./src/app/public/login/login.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"example-card\">\r\n  <mat-card-header>\r\n    <mat-card-title>Login</mat-card-title>\r\n  </mat-card-header>\r\n  <form class=\"example-form\">\r\n    <mat-form-field appearance=\"outline\" class=\"example-full-width\">\r\n      <mat-label>Username</mat-label>\r\n      <input matInput placeholder=\"Username\" [(ngModel)]=\"username\" name=\"username\" required>\r\n    </mat-form-field>\r\n    <mat-form-field appearance=\"outline\" class=\"example-full-width\">\r\n      <mat-label>Password</mat-label>\r\n      <input matInput placeholder=\"Password\" [(ngModel)]=\"password\" type=\"password\" name=\"password\" required>\r\n    </mat-form-field>\r\n    <mat-card-actions>\r\n      <button mat-raised-button (click)=\"login()\" color=\"primary\">Login</button>\r\n    </mat-card-actions>\r\n  </form>\r\n</mat-card>"

/***/ }),

/***/ "./src/app/public/login/login.component.scss":
/*!***************************************************!*\
  !*** ./src/app/public/login/login.component.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-icon {\n  padding: 0 14px; }\n\n.example-spacer {\n  flex: 1 1 auto; }\n\n.example-card {\n  width: 400px;\n  margin: 10% auto; }\n\n.example-full-width {\n  width: 100%; }\n\n.example-form {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHVibGljL2xvZ2luL0U6XFxXT1JLX1NQQUNFXFxTQ0hPT0xfQ09OVEVOVFxcU0NIT09MXFxMSUNFTlNFX0JVSUxERVJcXFdFQi9zcmNcXGFwcFxccHVibGljXFxsb2dpblxcbG9naW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxlQUFlLEVBQUE7O0FBR2pCO0VBQ0UsY0FBYyxFQUFBOztBQUVoQjtFQUNFLFlBQVk7RUFDWixnQkFBZ0IsRUFBQTs7QUFFcEI7RUFDSSxXQUFXLEVBQUE7O0FBRWY7RUFDSSxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLFdBQVcsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3B1YmxpYy9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5leGFtcGxlLWljb24ge1xyXG4gICAgcGFkZGluZzogMCAxNHB4O1xyXG4gIH1cclxuICBcclxuICAuZXhhbXBsZS1zcGFjZXIge1xyXG4gICAgZmxleDogMSAxIGF1dG87XHJcbiAgfVxyXG4gIC5leGFtcGxlLWNhcmQge1xyXG4gICAgd2lkdGg6IDQwMHB4O1xyXG4gICAgbWFyZ2luOiAxMCUgYXV0bztcclxuICB9XHJcbi5leGFtcGxlLWZ1bGwtd2lkdGgge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcbi5leGFtcGxlLWZvcm0ge1xyXG4gICAgbWluLXdpZHRoOiAxNTBweDtcclxuICAgIG1heC13aWR0aDogNTAwcHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9Il19 */"

/***/ }),

/***/ "./src/app/public/login/login.component.ts":
/*!*************************************************!*\
  !*** ./src/app/public/login/login.component.ts ***!
  \*************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/authentication.service */ "./src/app/services/authentication.service.ts");
/* harmony import */ var src_app_core_token_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/token.storage */ "./src/app/core/token.storage.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _model_login_detail__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../model/login-detail */ "./src/app/public/model/login-detail.ts");






var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, storage, router) {
        this.authService = authService;
        this.storage = storage;
        this.router = router;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        var loginDetail = new _model_login_detail__WEBPACK_IMPORTED_MODULE_5__["LoginDetail"]();
        loginDetail.userName = this.username;
        loginDetail.password = this.password;
        this.authService.login(loginDetail).subscribe(function (res) {
            _this.storage.saveToken(res.message);
            _this.authService.authenticationState.next(true);
            if (_this.authService.isAuthenticate) {
                _this.authService.loadUser().subscribe(function (user) {
                    _this.authService.changeUserDetail(user);
                    _this.router.navigate(['/licenselist']);
                });
            }
        });
    };
    LoginComponent.prototype.logout = function () {
        var loginDetail = new _model_login_detail__WEBPACK_IMPORTED_MODULE_5__["LoginDetail"]();
        this.authService.logout();
        this.storage.signOut();
        this.authService.authenticationState.next(false);
        if (this.authService.isAuthenticate) {
            this.router.navigate(['/login']);
        }
    };
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/public/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/public/login/login.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"], src_app_core_token_storage__WEBPACK_IMPORTED_MODULE_3__["TokenStorage"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/public/model/license.ts":
/*!*****************************************!*\
  !*** ./src/app/public/model/license.ts ***!
  \*****************************************/
/*! exports provided: License */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "License", function() { return License; });
var License = /** @class */ (function () {
    function License() {
    }
    return License;
}());



/***/ }),

/***/ "./src/app/public/model/login-detail.ts":
/*!**********************************************!*\
  !*** ./src/app/public/model/login-detail.ts ***!
  \**********************************************/
/*! exports provided: LoginDetail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginDetail", function() { return LoginDetail; });
var LoginDetail = /** @class */ (function () {
    function LoginDetail() {
    }
    return LoginDetail;
}());



/***/ }),

/***/ "./src/app/public/model/user-detail.ts":
/*!*********************************************!*\
  !*** ./src/app/public/model/user-detail.ts ***!
  \*********************************************/
/*! exports provided: UserDetail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserDetail", function() { return UserDetail; });
var UserDetail = /** @class */ (function () {
    function UserDetail() {
    }
    return UserDetail;
}());



/***/ }),

/***/ "./src/app/public/register/register.component.html":
/*!*********************************************************!*\
  !*** ./src/app/public/register/register.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"container-fluid top-header d-flex align-items-center\">\r\n    <div class=\"w-100\">\r\n        <div class=\"row clearfix\">\r\n            <div class=\"col-lg-12\">\r\n                <a class=\"logo \" href=\"#\"><img src=\"assets/images/logo.png\" alt=\"\"></a>\r\n                <div class=\"search\">\r\n                    <i class=\"fas fa-search\"></i> <input type=\"text\" placeholder=\"Search...\" />\r\n                </div>\r\n                <ul class=\"login-info\">\r\n                    <li>Last login {{ today | date }}</li>\r\n                    <li><a class=\"user\" href=\"#\"><i class=\"material-icons\">account_circle</i></a></li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</header>\r\n<div class=\"row\">\r\n    <mat-toolbar>Setup new License</mat-toolbar>\r\n    <div class=\"col-md-6\">\r\n        <mat-card class=\"example-card\">\r\n            <mat-card-header>\r\n                <mat-card-title>License Details</mat-card-title>\r\n            </mat-card-header>\r\n            <mat-card-content>\r\n                <form class=\"example-form\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field appearance=\"outline\" class=\"example-full-width\">\r\n                                <mat-label>Host Name</mat-label>\r\n                                <input matInput placeholder=\"HostName\" [(ngModel)]=\"licenseDetail.hostName\" name=\"hostName\"\r\n                                    required>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field appearance=\"outline\" class=\"example-full-width\">\r\n                                <mat-label>School Name</mat-label>\r\n                                <input matInput placeholder=\"School Name\" [(ngModel)]=\"licenseDetail.entityName\" name=\"entityName\"\r\n                                    required>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field appearance=\"outline\" class=\"example-full-width\">\r\n                                <input matInput [matDatepicker]=\"activation\" placeholder=\"Choose a date\" [(ngModel)]=\"licenseDetail.activationDate\"\r\n                                    name=\"activation\">\r\n                                <mat-datepicker-toggle matSuffix [for]=\"activation\"></mat-datepicker-toggle>\r\n                                <mat-datepicker #activation></mat-datepicker>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field appearance=\"outline\" class=\"example-full-width\">\r\n                                <mat-label>License Validity in Days</mat-label>\r\n                                <input matInput placeholder=\"License Validity in Days\" [(ngModel)]=\"licenseDetail.validityDay\"\r\n                                    name=\"validityDay\" required>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-10\">\r\n                            <mat-form-field appearance=\"outline\" class=\"example-full-width\">\r\n                                <mat-label>Product Name</mat-label>\r\n                                <input matInput placeholder=\"Product Name\" [(ngModel)]=\"licenseDetail.productName\" name=\"productName\"\r\n                                    required>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n            </mat-card-content>\r\n        </mat-card>\r\n\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n        <mat-card class=\"example-card\">\r\n            <mat-card-header>\r\n                <mat-card-title>Profile Details</mat-card-title>\r\n            </mat-card-header>\r\n            <mat-card-content>\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <mat-form-field appearance=\"outline\" class=\"example-full-width\">\r\n                            <mat-label>Contact Number</mat-label>\r\n                            <input matInput placeholder=\"Contact Number\" [(ngModel)]=\"licenseDetail.contactNumber\" name=\"contactNumber\"\r\n                                required>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <mat-form-field appearance=\"outline\" class=\"example-full-width\">\r\n                            <mat-label>Contact Email</mat-label>\r\n                            <input matInput placeholder=\"Contact Email\" [(ngModel)]=\"licenseDetail.contactEmail\" name=\"contactEmail\"\r\n                                required>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                            <textarea matInput placeholder=\"Address\" [(ngModel)]=\"licenseDetail.address\" name=\"address\"></textarea>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <mat-form-field appearance=\"outline\" class=\"example-full-width\">\r\n                            <mat-label>City</mat-label>\r\n                            <input matInput placeholder=\"City\" [(ngModel)]=\"licenseDetail.city\" name=\"city\" required>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div class=\"col-md-4\">\r\n                        <mat-form-field appearance=\"outline\" class=\"example-full-width\">\r\n                            <mat-label>State</mat-label>\r\n                            <input matInput placeholder=\"State\" [(ngModel)]=\"licenseDetail.state\" name=\"state\" required>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div class=\"col-md-4\">\r\n                        <mat-form-field appearance=\"outline\" class=\"example-full-width\">\r\n                            <mat-label>Country</mat-label>\r\n                            <input matInput placeholder=\"Country\" [(ngModel)]=\"licenseDetail.country\" name=\"country\"\r\n                                required>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div class=\"col-md-4\">\r\n                        <mat-form-field appearance=\"outline\" class=\"example-full-width\">\r\n                            <mat-label>Postal Code</mat-label>\r\n                            <input matInput placeholder=\"Postal Code\" [(ngModel)]=\"licenseDetail.postalCode\" name=\"postalCode\"\r\n                                required>\r\n                        </mat-form-field>\r\n                    </div>\r\n                </div>\r\n            </mat-card-content>\r\n        </mat-card>\r\n\r\n    </div>\r\n\r\n    <div class=\"col-md-5 col-lg-6 text-right pull-right\">\r\n        <mat-card-actions>\r\n            <button mat-raised-button (click)=\"registerNewLicense()\" color=\"primary\">Build New License</button>\r\n        </mat-card-actions>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/public/register/register.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/public/register/register.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-container {\n  display: flex;\n  flex-direction: column; }\n\n.example-container > * {\n  width: 100%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHVibGljL3JlZ2lzdGVyL0U6XFxXT1JLX1NQQUNFXFxTQ0hPT0xfQ09OVEVOVFxcU0NIT09MXFxMSUNFTlNFX0JVSUxERVJcXFdFQi9zcmNcXGFwcFxccHVibGljXFxyZWdpc3RlclxccmVnaXN0ZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFhO0VBQ2Isc0JBQXNCLEVBQUE7O0FBR3hCO0VBQ0UsV0FBVyxFQUFBIiwiZmlsZSI6InNyYy9hcHAvcHVibGljL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmV4YW1wbGUtY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIH1cclxuICBcclxuICAuZXhhbXBsZS1jb250YWluZXIgPiAqIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH0iXX0= */"

/***/ }),

/***/ "./src/app/public/register/register.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/public/register/register.component.ts ***!
  \*******************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/authentication.service */ "./src/app/services/authentication.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _model_user_detail__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../model/user-detail */ "./src/app/public/model/user-detail.ts");
/* harmony import */ var _model_login_detail__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../model/login-detail */ "./src/app/public/model/login-detail.ts");
/* harmony import */ var _model_license__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../model/license */ "./src/app/public/model/license.ts");








var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(authService, snackBar, router) {
        this.authService = authService;
        this.snackBar = snackBar;
        this.router = router;
        this.user = new _model_user_detail__WEBPACK_IMPORTED_MODULE_5__["UserDetail"]();
        this.login = new _model_login_detail__WEBPACK_IMPORTED_MODULE_6__["LoginDetail"]();
        this.licenseDetail = new _model_license__WEBPACK_IMPORTED_MODULE_7__["License"]();
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.registerNewLicense = function () {
        var _this = this;
        this.authService.buildNewLicense(this.licenseDetail).subscribe(function (data) {
            if (data.messageCode == 'SUCESS') {
                _this.router.navigate(['/licenselist']);
            }
            else {
                _this.openSnackBar(data.message, "ERROR");
            }
        });
    };
    RegisterComponent.prototype.openSnackBar = function (message, action) {
        this.snackBar.open(message, action, {
            duration: 10000
        });
    };
    RegisterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/public/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.scss */ "./src/app/public/register/register.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/services/auth-guard.service.ts":
/*!************************************************!*\
  !*** ./src/app/services/auth-guard.service.ts ***!
  \************************************************/
/*! exports provided: AuthGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuardService", function() { return AuthGuardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/authentication.service */ "./src/app/services/authentication.service.ts");



var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(authService) {
        this.authService = authService;
    }
    AuthGuardService.prototype.canActivate = function () {
        return this.authService.isAuthenticate();
    };
    AuthGuardService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"]])
    ], AuthGuardService);
    return AuthGuardService;
}());



/***/ }),

/***/ "./src/app/services/authentication.service.ts":
/*!****************************************************!*\
  !*** ./src/app/services/authentication.service.ts ***!
  \****************************************************/
/*! exports provided: AuthenticationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return AuthenticationService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");






var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.authenticationState = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](false);
        this.userDetail = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
    }
    AuthenticationService.prototype.getUserDetail = function () {
        return this.userDetail.asObservable();
    };
    AuthenticationService.prototype.changeUserDetail = function (userDetail) {
        this.userDetail.next(userDetail);
    };
    AuthenticationService.prototype.login = function (loginDetail) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        headers.set('Content-Type', 'application/json');
        headers.set('Access-Control-Allow-Origin', '*');
        var httpOptions = { headers: headers };
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].baseUrl + 'api/login', loginDetail, httpOptions);
    };
    AuthenticationService.prototype.logout = function () {
        this.authenticationState.next(false);
    };
    AuthenticationService.prototype.isAuthenticate = function () {
        return this.authenticationState.value;
    };
    AuthenticationService.prototype.buildNewLicense = function (licensDetail) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        headers.set('Content-Type', 'application/json');
        headers.set('Access-Control-Allow-Origin', '*');
        var httpOptions = { headers: headers };
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].baseUrl + 'api/school/license', licensDetail, httpOptions);
    };
    AuthenticationService.prototype.loadRole = function () {
        return this.http.get('assets/data/role.json');
    };
    AuthenticationService.prototype.loadUser = function () {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].baseUrl + 'api/load');
    };
    AuthenticationService.prototype.licensedList = function () {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].baseUrl + 'api/school/license');
    };
    AuthenticationService.prototype.updateLicense = function (license, day) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        headers.set('Content-Type', 'application/json');
        headers.set('Access-Control-Allow-Origin', '*');
        var httpOptions = { headers: headers };
        return this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].baseUrl + 'api/school/license/extend/' + day, license, httpOptions);
    };
    AuthenticationService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AuthenticationService);
    return AuthenticationService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    baseUrl: 'http://127.0.0.1:8080/',
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\WORK_SPACE\SCHOOL_CONTENT\SCHOOL\LICENSE_BUILDER\WEB\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map