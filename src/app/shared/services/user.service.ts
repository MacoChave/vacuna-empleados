import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUser(id: number) {
    const queryParams: HttpParams = UtilsService.buildQueryParams({ id: id });

    return this.http.get<User[]>('http://localhost:3000/employee', {
      params: queryParams,
    });
  }

  public getAllUser() {
    return this.http.get<User[]>('http://localhost:3000/employee');
  }

  public postUser(user: User) {
    const queryParams: HttpParams = UtilsService.buildQueryParams(user);

    return this.http.get<User[]>('http://localhost:3000/employee', {
      params: queryParams,
    });
  }

  public putUser(user: User) {
    const queryParams: HttpParams = UtilsService.buildQueryParams(user);

    return this.http.get<User[]>('http://localhost:3000/employee', {
      params: queryParams,
    });
  }

  public deleteUser(user: User) {
    const queryParams: HttpParams = UtilsService.buildQueryParams(user);

    return this.http.get<User[]>('http://localhost:3000/employee', {
      params: queryParams,
    });
  }
}
function employeeId(employeeId: any, id: number) {
  throw new Error('Function not implemented.');
}
