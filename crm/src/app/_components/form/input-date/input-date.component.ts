import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-input-date-component',
	templateUrl: './input-date.component.html',
})
export class InputDateComponent implements OnInit, OnChanges {
	@Input() label: string = '';
	@Input() name: string = '';
	@Input() value?: string = '';
	@Input() required: boolean = false;
	@Input() placeholder: string = '';
	@Input() errorMessage: string = '';

	@Output() onChange = new EventEmitter<Date>();

	formattedValue: null | Date = null;

	ngOnInit(): void {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && changes['value'].currentValue) {
			this.formattedValue = new Date(changes['value'].currentValue);

			this.onChange.emit(new Date(changes['value'].currentValue));
		}
	}

	_onChange(event: Date) {
		this.onChange.emit(event);
	}
}
