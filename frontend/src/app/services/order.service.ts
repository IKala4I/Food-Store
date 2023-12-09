import {Injectable} from '@angular/core';
import {Order} from '../shared/models/Order';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ORDER_CREATE_URL} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(ORDER_CREATE_URL, order);
  }
}
