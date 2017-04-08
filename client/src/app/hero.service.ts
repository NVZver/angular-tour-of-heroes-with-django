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
      .then(response => JSON.parse(response.json().heroes) as Hero[])
      .catch(this.handlerError)
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}hero/${id}/`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Hero)
      .catch(this.handlerError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}hero/${hero.id}/`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
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

  delete(id: number): Promise<number> {
    const url = `${this.heroesUrl}hero/${id}/`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(res => parseInt(res.json().deleted))
      .catch(this.handlerError)
  }
}
