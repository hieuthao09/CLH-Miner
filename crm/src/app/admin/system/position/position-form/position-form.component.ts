import { DatePipe } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { AppFormService } from 'app/_components/form/app-form.service';
import { queryKey } from 'config/query-key';
import { ICategory } from 'data/requests/category/category.request';
import { IPosition } from 'data/requests/position/position.request';
import { PositionService } from 'domain/services/position/position.service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';
import { array, number, object, string } from 'yup';

@Component({
	selector: 'app-position-form',
	templateUrl: './position-form.component.html',
	styles: ``,
})
export class PositionFormComponent {
	id: WritableSignal<number> = signal(-1);

	formSchema = object({
		name: string().required(),
		internalCode: string().required(),
		describes: string(),
		roles: array().of(number()).required(),
	});

	detailQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: [queryKey.position.detail(this.id())],
		enabled: this.id() != 0,
		queryFn: (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			return lastValueFrom(this.positionService.detailPosition({ Id: this.id() }).pipe(takeUntil(abort$)));
		},
	}));

	roleColumns: {
		title: string;
		getter: (item: ICategory) => void;
		name?: string;
	}[] = [
		{ title: 'Tên vai trò', getter: (item: ICategory) => item['name'] },
		{
			title: '',
			getter: (item: ICategory) => {
				return item?.['isChecked'];
			},
		},
	];

	addMutate = injectMutation(() => ({
		mutationFn: (data: IPosition) => {
			return lastValueFrom(this.positionService.addPosition(data));
		},
		onSuccess: (data) => {
			this.toast.success('Thêm chức vụ thành công');

			this.router.navigate(['admin/system/position']);
		},
		onError: (error: any) => {
			this.toast.error(error.error.messages[0] || error.message);
		},
	}));

	updateMutate = injectMutation(() => ({
		mutationFn: (data: IPosition) => {
			return lastValueFrom(this.positionService.updatePosition(data));
		},
		onSuccess: (data) => {
			this.toast.success('Cập nhật chức vụ thành công');
			this.router.navigate(['admin/system/position']);
		},
		onError: (error: any) => {
			this.toast.error(error.error.messages[0] || error.message);
		},
	}));

	form = {} as IPosition;

	errors: WritableSignal<{ [key: string]: string }> = signal({});

	constructor(
		private positionService: PositionService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private formService: AppFormService,
		private toast: ToastrService,
	) {
		this.activatedRoute.queryParams.subscribe({
			next: (value) => {
				this.id.set(value['id']);
				this.form.id = value['id'];
			},
		});
	}

	ngOnInit(): void {}

	formatDate(date: string): string {
		const newDate = new Date(date);
		const datePipe = new DatePipe('en-US');
		return datePipe.transform(newDate, 'dd/MM/yyyy') || '';
	}

	async onSubmit() {
		const result = await this.formService.validate<IPosition>(this.formSchema, this.form);
		console.log('🚀 ~ PositionFormComponent ~ onSubmit ~ result:', result);

		if (result.message) {
			this.errors.set(result.message);
		}

		if (result.valid && result.data) {
			if (this.id() > 0) {
				this.updateMutate.mutate({
					...result.data,
				});

				return;
			}

			this.addMutate.mutate({
				...result.data,
			});
		}
	}
}
