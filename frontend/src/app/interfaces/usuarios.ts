export interface Usuarios { 

	id: string,
	email: string,
	user: string,
	status: number,
	date: Date

}

export interface Usuario { 
	email: string,
	user: string,
	gender: string,
	password: string,
}

export interface UpdateUser{
	id: string,
	email:string,
	user: string,
	gender: string,
	password: string
}