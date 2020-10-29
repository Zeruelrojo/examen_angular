import { Component, OnDestroy } from '@angular/core';
import { AppComponent } from '../Principal/app.component';
import { Router } from "@angular/router";
declare var $: any;
declare var Noty: any;
declare var window: any;

@Component({
	selector: 'app-inicio',
	templateUrl: './inicio.component.html',
	styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnDestroy {
	isWindowActive = false;
	App: any;
	mdlRowsInicio: any;
	notificacion: any;
	constructor(App: AppComponent, private router: Router) {
		this.App = App;
	}
	ngOnDestroy(): void {

	}
	isWindow() {
		if (this.isWindowActive)
			return true;
		if (typeof window == 'undefined') {
			return false;
		}
		else {
			this.isWindowActive = true;
			this.afterWindow();
			return true;
		}
	}
	afterWindow() {

	}
} 
