import { Injectable } from '@angular/core'; 
 
 
@Injectable() 
export class ModelAngularSetempleado { 
	private service: string = null; 
	private version: string = null; 
	private responseCode = null; 
	private name: string = null; 
	private last_name: string = null; 
	private birthday: string = null; 
	private data: any = {}; 
 
 
	constructor() { } 
	updateModel() { 
		this.data.service = this.service;
		this.data.version = this.version;
		this.data.responseCode = this.responseCode;
		this.data.name = this.name;
		this.data.last_name = this.last_name;
		this.data.birthday = this.birthday;
 
	} 
	getObject(): ModelAngularSetempleado { 
		return this; 
	} 
	getModel(): any { 
		return Object.assign({}, this.data); 
	} 
	getResponseCode()  { 
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
	getName(): string { 
		return this.name; 
	} 
	setName(_name: string): void { 
		this.name = _name; 
	} 
	getLast_name(): string { 
		return this.last_name; 
	} 
	setLast_name(_last_name: string): void { 
		this.last_name = _last_name; 
	} 
	getBirthday(): string { 
		return this.birthday; 
	} 
	setBirthday(_birthday: string): void { 
		this.birthday = _birthday; 
	} 
 
 
} 
 
