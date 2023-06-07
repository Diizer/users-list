import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User } from '../models/user';
import { UsersService } from '../users.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  tableDataSource = new MatTableDataSource<User>([]);
  isUpdating$: Observable<boolean> = this.usersService.isUpdating$();

  constructor(public readonly usersService: UsersService) {
    this.usersService.loadUsers();
    this.usersService
      .getUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => this.tableDataSource.data = data);

    this.tableDataSource.filterPredicate = (data, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  onSearch(result: string): void {
    this.tableDataSource.filter = result;
  }
}
