import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
// import { AuthStorage } from '../helpers/auth-storage';

@Injectable()
export class HttpConfigService {
    private _httpOptions = {
        headers: {},
        params: null
    }
	
    constructor(
        private http: HttpClient,
        // private authStorage: AuthStorage,
    ) { }

    initHttpHeader() {
        // {headers: new HttpHeaders({
        //     'Content-Type':  'application/json',
        //     'Authorization': 'Basic ' + btoa('dunt14:dunt123')
        //   }), params: new HttpParams().append('offset', "1").append("limit", "10") }

        this._httpOptions.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('duntAdmin:dunt123'),
        });

        // Cần điều chỉnh lại theo Basic Auth
        // let currentUser = this.authStorage.getCurrentUser();
        // if (currentUser == null) {
        //     this._httpOptions.headers = new HttpHeaders({
        //         'Content-Type': 'application/json',
        //         'Authorization': '',
        //     });
        // }
        // else {
        //     this._httpOptions.headers = new HttpHeaders({
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Token ' + currentUser.token,
        //     });
        // }
    }

    httpGet(url) {
        this.initHttpHeader();
        return this.http.get(url, this._httpOptions);
    }

    httpGetWithParams(url, params) {
        this.initHttpHeader();
        this._httpOptions.params = new HttpParams();
        for (var param of params) {
            this._httpOptions.params = this._httpOptions.params.append(param.key, param.value);
        }

        return this.http.get(url, this._httpOptions);
    }

    httpPost(url, body) {
        this.initHttpHeader();
        return this.http.post(url, body, this._httpOptions);
    }

    httpPut(url, body) {
        this.initHttpHeader();
        return this.http.put(url, body, this._httpOptions);
    }

    httpOptions(url) {
        this.initHttpHeader();
        return this.http.options(url, this._httpOptions);
    }
	
	// httpPostFile(url, fileUpload) {
	// 	const formData = new FormData();
	// 	formData.append('path', fileUpload);
	// 	let currentUser = this.authStorage.getCurrentUser();
		
	// 	let httpOptionsUpload = {
	// 		headers: {},
	// 		params: null
	// 	};
		
	// 	httpOptionsUpload.headers = new HttpHeaders({
	// 		'Content-Type': 'multipart/form-data; boundary=------WebKitFormBoundarymcEWybNDOjjeRnuL',
	// 		'Authorization': 'Token ' + currentUser.token,
	// 	});
	// 	return this.http.post(url, formData, httpOptionsUpload);
	// }
}