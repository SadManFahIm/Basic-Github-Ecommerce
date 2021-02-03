import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable,throwError} from 'rxjs'
import {catchError} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  //https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json
  //https://disease.sh/v3/covid-19/countries 
  //https://api.github.com/users/example
  
  public _footballApiUrl="https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json"
  public _githubApiUrl="https://api.github.com/users/example"

  constructor(private http:HttpClient) { }

  getFootBallApiData() : Observable<any>{
    return this.http.get(this._footballApiUrl).pipe(catchError(this.errorHadler))
  }


  getGithubApiData() : Observable<any>{
    return this.http.get(this._githubApiUrl).pipe(catchError(this.errorHadler))
  }

  errorHadler(error:HttpErrorResponse){
    return throwError(error.message || 'Server Error')
  }
}
