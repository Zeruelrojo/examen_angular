import { Component, OnDestroy } from '@angular/core';
import { AppComponent } from '../Principal/app.component';
import { Router } from "@angular/router";
import { ControllerAngularGetgrupo } from '../../Controllers/Getgrupo.service.controller';
import { ModelAngularStandar } from '../../Models/standar.service.model';
import { ControllerAngularGetgroupdetail } from '../../Controllers/Getgroupdetail.service.controller';
import { ModelAngularGetgroupdetail } from '../../Models/Getgroupdetail.service.model';

declare var $: any;
declare var Noty: any;
declare var window: any;
declare var document: any;

@Component({
	selector: 'app-getgrupo',
	templateUrl: './getgrupo.component.html',
	styleUrls: ['./getgrupo.component.css'],
	providers: [ControllerAngularGetgrupo, ModelAngularStandar, ControllerAngularGetgroupdetail,
		ModelAngularGetgroupdetail]
})
export class GetgrupoComponent implements OnDestroy {
	isWindowActive = false;
	ultimoDato = 0;
	primerDato = 0;
	activeElement: any;
	actualElement: any;
	idSelected: any;
	allComplete: boolean = false;
	groupName: string = undefined;
	mdlGroupSelected: string = undefined;
	mdlId: any = undefined;
	id: any;
	mdlBuscador: string;
	App: any;
	ControllerGetgrupo: ControllerAngularGetgrupo;
	ControllerGetgroupdetail: ControllerAngularGetgroupdetail;
	mdlRowsGetgrupo: any;
	mdlSuccess: string;
	mdlData: any;
	mdlDataDetail: any;

	mdlcheckboxObserver = [];

	mdlRowsGetgroupdetail: any;

	wasSelectedAll = true;

	notificacion: any;
	constructor(App: AppComponent, private router: Router, controllerGetgrupo: ControllerAngularGetgrupo,
		controllerGetgroupdetail: ControllerAngularGetgroupdetail) {
		this.App = App;
		this.ControllerGetgrupo = controllerGetgrupo;
		this.ControllerGetgroupdetail = controllerGetgroupdetail;
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
		this.sendGetgrupo();
	}
	async sendGetgrupo() {
		this.ControllerGetgrupo.getModelToSend().setService('Getgrupo');
		this.ControllerGetgrupo.getModelToSend().setVersion('V1.0');

		this.ControllerGetgrupo.updateView().then(() => { this.onResponseGetgrupo(null); });
	}
	async onResponseGetgrupo(event) {
		if (this.ControllerGetgrupo.checkResponseCode() === 201) {
			let data = this.ControllerGetgrupo.getRows();
			this.mdlData = data[0].data.groups;
			this.mdlRowsGetgrupo = this.mdlData;
		} else if (this.ControllerGetgrupo.checkResponseCode() === 204) {
			this.mdlRowsGetgrupo = undefined;
		} else if (this.ControllerGetgrupo.checkResponseCode() === 403) {
			this.mdlRowsGetgrupo = undefined;
		} else if (this.ControllerGetgrupo.checkResponseCode() === 401) {
			this.mdlRowsGetgrupo = undefined;
		} else {
			this.mdlRowsGetgrupo = undefined;
		}
	}

	Buscando() {
		if (this.mdlBuscador == "" || this.mdlBuscador == undefined) {
			this.mdlRowsGetgrupo = Object.assign([], this.mdlData);
			return;
		}
		let newData = [];
		for (let index = 0; index < this.mdlData.length; index++) {
			if (this.mdlData[index].name.includes(this.mdlBuscador)) {
				newData.push(this.mdlData[index]);
			}
		}
		this.mdlRowsGetgrupo = newData;
	}

	dragstart(event, selected, id, name) {
		this.idSelected = selected;
		this.activeElement = event;
		this.id = id;
		this.groupName = name;
	}

	dragenter(event) {
		if (event.target.className == "droptarget") {
		}
	}

	dragover(event) {
		event.preventDefault();
	}

	drop(event) {
		event.preventDefault();
		if (event.target.className == "droptarget dropGroup-box") {
			this.mdlGroupSelected = this.groupName;
			this.mdlId = this.id;
			this.sendGetgroupdetail();
		}
	}

	selectText(node) {
		node = node.target;
		if (document.body.createTextRange) {
			const range = document.body.createTextRange();
			range.moveToElementText(node);
			range.select();
		} else if (window.getSelection) {
			const selection = window.getSelection();
			const range = document.createRange();
			range.selectNodeContents(node);
			selection.removeAllRanges();
			selection.addRange(range);
		} else {
			console.warn("Could not select text in node: Unsupported browser.");
		}
	}

	async sendGetgroupdetail() {
		this.ControllerGetgroupdetail.getModelToSend().setService('Getgroupdetail');
		this.ControllerGetgroupdetail.getModelToSend().setVersion('V1.0');
		this.ControllerGetgroupdetail.getModelToSend().setId(this.mdlId);

		this.ControllerGetgroupdetail.updateView().then(() => { this.onResponseGetgroupdetail(null); });
	}
	async onResponseGetgroupdetail(event) {
		if (this.ControllerGetgroupdetail.checkResponseCode() === 201) {
			let data = this.ControllerGetgroupdetail.getRows();
			this.mdlDataDetail = data[0].data.employees;
			this.mdlRowsGetgroupdetail = this.mdlDataDetail;
			for (let index = 0; index < this.mdlDataDetail.length; index++) {
				this.mdlcheckboxObserver.push(true);
			}
		} else if (this.ControllerGetgroupdetail.checkResponseCode() === 204) {
			this.mdlRowsGetgroupdetail = undefined;
		} else if (this.ControllerGetgroupdetail.checkResponseCode() === 403) {
			this.mdlRowsGetgroupdetail = undefined;
		} else if (this.ControllerGetgroupdetail.checkResponseCode() === 401) {
			this.mdlRowsGetgroupdetail = undefined;
		} else {
			this.mdlRowsGetgroupdetail = undefined;
		}
	}

	selectRow(index) {
		this.mdlcheckboxObserver[index] = !this.mdlcheckboxObserver[index];
	}

	selectAll() {
		this.wasSelectedAll = !this.wasSelectedAll;
		for (let index = 0; index < this.mdlcheckboxObserver.length; index++) {
			this.mdlcheckboxObserver[index] = this.wasSelectedAll;
			$('#employee' + index).attr("checked", this.wasSelectedAll);
		}
	}

	deleteEmployee() {
		for (let index = 0; index < this.mdlcheckboxObserver.length; index++) {
			const element = this.mdlcheckboxObserver[index];
			if (element) {
				this.mdlRowsGetgroupdetail.splice(index, 1);
				this.mdlDataDetail.splice(index, 1);
				this.mdlcheckboxObserver.splice(index, 1);
				index--;
			}
		}
	}

	continuar() {
		for (let index = 0; index < this.mdlcheckboxObserver.length; index++) {
			const element = this.mdlcheckboxObserver[index];
			if (element) {
				console.log(this.mdlDataDetail[index].name);
			}
		}
	}

} 
