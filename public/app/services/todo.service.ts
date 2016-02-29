import {Injectable} from 'angular2/core';
import {HTTP_PROVIDERS, Http, Request, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Todo} from '../models/todo';
import 'rxjs/Rx';


@Injectable()
export class TodoService {
  constructor(private _http: Http) {}

  fetchAll() {
    return this._http
      .get('/api/todos')
      .map(r => r.json())
      .map(r => {
        let results: Array<Todo> = [];
        if(r.results) {
          results = r.results.map((v: any) => new Todo(v));
        }
        console.log(results);
        return { results: results };
      })
  }

}
