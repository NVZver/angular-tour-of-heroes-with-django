import {Injectable} from '@angular/core';
import {Hero} from "./hero";
import {Headers, Http, RequestOptions} from "@angular/http";

import 'rxjs/add/operator/toPromise';


@Injectable()
export class HeroService {

  private heroesUrl = '/api/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  private handlerError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getHeroes(): Promise<Hero[]> {
    const url = this.heroesUrl + 'heroes/';
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handlerError)
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handlerError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    const requestOptions = new RequestOptions({
      headers: this.headers,
      params: {
        name: name
      }
    });
    return this.http
      .put(url, JSON.stringify(hero), requestOptions)
      .toPromise()
      .then(() => hero)
      .catch(this.handlerError)
  }

  create(name: string): Promise<Hero> {
    const url = this.heroesUrl + 'hero/create/';
    return this.http
      .post(url, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Hero)
      .catch(this.handlerError)
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handlerError)
  }
}
