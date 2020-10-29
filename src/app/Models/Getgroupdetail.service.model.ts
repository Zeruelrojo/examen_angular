import { Injectable } from '@angular/core';


@Injectable()
export class ModelAngularGetgroupdetail {
	private service: string = null;
	private version: string = null;
	private responseCode = null;
	private dataModel: any = {};
	private success: string = null;
	private id: string = null;
	private data: string = null;


	constructor() { }
	updateModel() {
		this.dataModel.service = this.service;
		this.dataModel.version = this.version;
		this.dataModel.responseCode = this.responseCode;
		this.dataModel.success = this.success;
		this.dataModel.data = this.data;
		this.dataModel.id = this.id;

	}
	getObject(): ModelAngularGetgroupdetail {
		return this;
	}
	getModel(): any {
		return Object.assign({}, this.dataModel);
	}
	getResponseCode() {
		return this.responseCode;
	}
	setResponseCode(_responseCode): void {
		this.responseCode = _responseCode;
	}
	getService(): string {
		return this.service;
	}
	setService(_service: string): void {
		this.service = _service;
	}
	getVersion(): string {
		return this.version;
	}
	setVersion(_version: string): void {
		this.version = _version;
	}
	getSuccess(): string {
		return this.success;
	}
	setSuccess(_success: string): void {
		this.success = _success;
	}
	getData(): any {
		return this.data;
	}
	setData(_data: any): void {
		this.data = _data;
	}
	getId(): any {
		return this.id;
	}
	setId(_id: any) {
		this.id = _id;
	}

}

