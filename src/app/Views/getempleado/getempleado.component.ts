import { Component, OnDestroy } from '@angular/core';
import { AppComponent } from '../Principal/app.component';
import { Router } from "@angular/router";
import { ControllerAngularGetempleado } from '../../Controllers/Getempleado.service.controller';
import { ModelAngularStandar } from '../../Models/standar.service.model';
import { ControllerAngularSetempleado } from '../../Controllers/Setempleado.service.controller';
import { ModelAngularSetempleado } from '../../Models/Setempleado.service.model';

declare var $: any;
declare var Noty: any;
declare var window: any;

@Component({
	selector: 'app-getempleado',
	templateUrl: './getempleado.component.html',
	styleUrls: ['./getempleado.component.css'],
	providers: [ControllerAngularGetempleado, ModelAngularStandar, 
		ControllerAngularSetempleado, ModelAngularSetempleado]
})
export class GetempleadoComponent implements OnDestroy {
	primerDato = 0;
	ultimoDato = 0;
	isWindowActive = false;
	App: any;
	ControllerGetempleado: ControllerAngularGetempleado;
	mdlRowsGetempleado: any;
	mdlSuccess: string;
	mdlData: any;
	mdlBuscador: string;

	ControllerSetempleado: ControllerAngularSetempleado;
	mdlRowsSetempleado: any;
	mdlName: string;
	mdlLast_name: string;
	mdlBirthday: string;


	notificacion: any;
	constructor(App: AppComponent, private router: Router, 
		controllerGetempleado: ControllerAngularGetempleado,
		controllerSetempleado: ControllerAngularSetempleado) {
		this.App = App;
		this.ControllerGetempleado = controllerGetempleado;
		this.ControllerSetempleado = controllerSetempleado;
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
		this.sendGetempleado();
	}
	async sendGetempleado() {
		this.ControllerGetempleado.updateView().then(() => { this.onResponseGetempleado(null); });
	}
	async onResponseGetempleado(event) {
		if (this.ControllerGetempleado.checkResponseCode() === 201) {
			let data = this.ControllerGetempleado.getRows();
			this.mdlData = data[0].data.employees;
			let newData = [];
			for (let index = 0; index < (this.mdlData.length > 10 ? 10 : this.mdlData.length); index++) {
				newData.push(this.mdlData[index]);
			}
			this.primerDato = 0;
			this.ultimoDato = 10;
			this.mdlRowsGetempleado = newData;
		} else if (this.ControllerGetempleado.checkResponseCode() === 204) {
			this.mdlRowsGetempleado = undefined;
		} else if (this.ControllerGetempleado.checkResponseCode() === 403) {
			this.mdlRowsGetempleado = undefined;
		} else if (this.ControllerGetempleado.checkResponseCode() === 401) {
			this.mdlRowsGetempleado = undefined;
		} else {
			this.mdlRowsGetempleado = undefined;
		}
	}
	paginadoMas() {
		if (this.mdlData.length - (this.ultimoDato + 10) < 0) {
			return;
		}
		let newData = [];
		for (let index = this.ultimoDato; index < this.ultimoDato + 10; index++) {
			newData.push(this.mdlData[index]);
		}
		this.ultimoDato += 10;
		this.primerDato += 10;
		this.mdlRowsGetempleado = newData;
	}

	paginadoMenos() {
		if (this.primerDato - 10 < 0) {
			return;
		}
		let newData = [];
		for (let index = this.primerDato - 10; index < this.primerDato; index++) {
			newData.push(this.mdlData[index]);
		}
		this.primerDato -= 10;
		this.ultimoDato -= 10;
		this.mdlRowsGetempleado = newData;
	}

	restaurar() {
		let newData = [];
		for (let index = 0; index < (this.mdlData.length > 10 ? 10 : this.mdlData.length); index++) {
			newData.push(this.mdlData[index]);
		}
		this.mdlRowsGetempleado = newData;
	}

	Buscando() {
		if (this.mdlBuscador == "" || this.mdlBuscador == undefined) {
			this.restaurar();
			return;
		}
		let newData = [];
		for (let index = 0; index < this.mdlData.length; index++) {
			if (this.mdlData[index].name.includes(this.mdlBuscador)
				|| this.mdlData[index].last_name.includes(this.mdlBuscador)) {
				newData.push(this.mdlData[index]);
			}
		}
		this.mdlRowsGetempleado = newData;
	}


	async sendSetempleado() {
		this.ControllerSetempleado.getModelToSend().setService('Setempleado');
		this.ControllerSetempleado.getModelToSend().setVersion('V1.0');
		this.ControllerSetempleado.getModelToSend().setName(this.mdlName);
		this.ControllerSetempleado.getModelToSend().setLast_name(this.mdlLast_name);
		this.ControllerSetempleado.getModelToSend().setBirthday(this.mdlBirthday);

		this.ControllerSetempleado.updateView().then(() => { this.onResponseSetempleado(null); });
	}
	async onResponseSetempleado(event) {
		alert("FORMULARIO ENVIADO");
		if (this.ControllerSetempleado.checkResponseCode() === 201) {
			alert("FORMULARIO ENVIADO");
			this.sendGetempleado();
		} else if (this.ControllerSetempleado.checkResponseCode() === 204) {
			this.mdlRowsSetempleado = undefined;
		} else if (this.ControllerSetempleado.checkResponseCode() === 403) {
			this.mdlRowsSetempleado = undefined;
		} else if (this.ControllerSetempleado.checkResponseCode() === 401) {
			this.mdlRowsSetempleado = undefined;
		} else {
			this.mdlRowsSetempleado = undefined;
		}
	}
} 
