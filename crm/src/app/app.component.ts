import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	options = {
		min: 0,
		max: 100,
		ease: 'linear',
		speed: 200,
		trickleSpeed: 300,
		meteor: true,
		spinner: false,
		color: 'green',
		thick: true,
	};

	constructor() {}

	ngOnInit() {}
}
