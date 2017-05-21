import { Injectable } from '@angular/core'
import { Http, Request, Response} from '@angular/http'
import { ErrorObservable } from 'rxjs/observable/ErrorObservable'
import { Todo } from './todo'

@Injectable()
export class TodoService {

  constructor(private _http: Http) { }

  fetchAll() {
    return this._http.get('/api/todos')
      .map(r => {
        if (r.status === 200) {
          return r.json();
        } else {
          throw new Error('response status is bad: ${r.status}')
        }
      }).catch (err => this.handleError(err))
      // .map(r => {
      //   let results: Array<Todo> = []
      //   if (r.results) {
      //     results = r.results.map((v: any) => new Todo(v))
      //   }
      //   console.log(results)
      //   return { results: results }
      // })
  }

  private handleError(error: Response | any): ErrorObservable<string> {
    let errMsg: string;
  }
}
