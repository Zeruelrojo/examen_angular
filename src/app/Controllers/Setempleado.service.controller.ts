import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { request, getFile, getImage, getJSON, getString } from "tns-core-modules/http";  
import { map } from 'rxjs/operators';

import { ModelAngularSetempleado } from '../Models/Setempleado.service.model';
declare var window: any;
declare var io: any;

@Injectable()
export class ControllerAngularSetempleado {

	private socket: any;
	private registroEventos: any;
	private modelArray: ModelAngularSetempleado[];

	constructor(
		private model: ModelAngularSetempleado,
		private http: Http
	) { }

	public getModelToSend() {
		return this.model;
	}

	public updateView(): Promise<any> {
		return new Promise((resolve) => {
			this.getModelToSend().updateModel();
			this.requestAPI(this.getModelToSend().getModel()).subscribe(_data => {
				this.fillArrayModels(_data);
				resolve();
			});
			// const _data = await this.requestAPI(this.getModelToSend().getModel()); 
			// this.fillArrayModels(_data); 
			// resolve(); 
		});
	}

	private fillArrayModels(_data) {
		this.modelArray = [];
		console.log(_data);
		let index = 0;
		let element = _data;
		if (element.success == true) {
			element["INFORME_SISTEMA"] = 201;
		} else {
			element["INFORME_SISTEMA"] = 500;
		}
		this.modelArray[index] = new ModelAngularSetempleado();
		this.modelArray[index].setResponseCode(element.INFORME_SISTEMA);

		this.modelArray[index].updateModel();
	}

	requestAPI(parameters: any) {
		/*@@ANGULAR_GUI_TO_SERVER*/ let url = 'https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/angel_oswaldo_jimenez_perez';

		return this.http.post(url, parameters).pipe(map(res => res.json()));
	}

	public getResponseModel(index) {
		return this.modelArray[index];
	}

	public getCountRows() {
		return this.modelArray.length;
	}

	public getRows(): any {
		const dataArray = [];
		for (let index = 0; index < this.modelArray.length; index++) {
			const element = this.modelArray[index].getModel();
			dataArray[index] = element;
		}
		return dataArray;
	}

	public checkResponseCode() {
		return this.modelArray[0].getResponseCode();
	}


}

