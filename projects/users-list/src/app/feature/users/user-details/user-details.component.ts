import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Address, User } from '../models/user';
import { UsersService } from '../users.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-user-details',
	templateUrl: './user-details.component.html',
	styleUrls: ['./user-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent implements OnDestroy {
	form = this.fb.group({
		id: this.fb.control<number | undefined>(undefined),
		name: this.fb.control<string | undefined>(undefined),
		username: this.fb.control<string | undefined>(undefined),
		phone: this.fb.control<string | undefined>(undefined),
		address: this.fb.group({
			street: this.fb.control<string | undefined>(undefined),
			suite: this.fb.control<string | undefined>(undefined),
			city: this.fb.control<string | undefined>(undefined),
			zipcode: this.fb.control<string | undefined>(undefined)
		}),
		email: this.fb.control<string | undefined>(undefined, Validators.email),
	});
	userId: number;
	private unsubscribe$: Subject<boolean> = new Subject<boolean>();

	public get address(): AbstractControl {
		return this.form.controls.address;
	}

	constructor(private fb: FormBuilder,
		private route: ActivatedRoute,
		private usersService: UsersService) {

		this.userId = Number(this.route.snapshot.params['userId']);

		this.usersService.loadUser(this.userId);
		this.usersService
			.getUser()
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((data) => data ? this.fillForm(data) : '');
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(true);
		this.unsubscribe$.complete();
	}

	private fillForm(ent: User): void {
		this.form.patchValue({
			id: ent.id,
			name: ent.name,
			username: ent.username,
			phone: ent.phone,
			address: ent.address,
			email: ent.email,
		});
	}
}
