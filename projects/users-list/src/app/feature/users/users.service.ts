import { Injectable } from '@angular/core';
import { delay, finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsersApi } from './users.api';
import { User } from './models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UsersService {
  users$ = new BehaviorSubject<User[]>([]);
  user$ = new BehaviorSubject<User | null>(null);
  updating$ = new BehaviorSubject<boolean>(false);
  constructor(private _usersApi: UsersApi, private _snackBar: MatSnackBar) { }

  isUpdating$(): Observable<boolean> {
    return this.updating$.asObservable();
  }

  setUpdating(isUpdating: boolean): void {
    this.updating$.next(isUpdating);
  }

  loadUsers(): void {
    this.setUpdating(true);

    this._usersApi
      .getAll()
      .pipe(
        delay(700),
        finalize(() => this.setUpdating(false))
      )
      .subscribe({
        next: (response) => this.users$.next(response),
        error: (response) => {
          this._snackBar.open(response.error.error.message, 'Close', {
            duration: 5000,
          });
          this.users$.next([]);
        },
      });
  }

  loadUser(id: number): void {
    this.user$.next(null);

    this._usersApi
      .getUserDetails(id)
      .subscribe({
        next: (response) => this.user$.next(response),
        error: (response) => {
          this._snackBar.open(response.error.error.message, 'Close', {
            duration: 5000,
          });
          this.user$.next(null);
        },
      });
  }

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

  getUsers(): Observable<User[]> {
    return this.users$.asObservable();
  }
}
