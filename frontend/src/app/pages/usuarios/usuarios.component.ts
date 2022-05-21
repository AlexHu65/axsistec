import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario, Usuarios, UpdateUser } from "../../interfaces/usuarios";
import { Delete } from 'src/app/interfaces/requests';
import Swal from 'sweetalert2';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit{

  usuarios:Usuarios[] = [];
  register:boolean = false;
  activeUpd:boolean = false;
  updateForm:any = null;
  idUserUpdate:string = '';
  userToUpdate:UpdateUser = {
    id: '',
    email: '',
    gender: '',
    user: '', 
    password: ''
  };



  constructor(private service: UsuariosService, public router: Router) {
    this.register = false;

    this.service.getUsers().subscribe((data:any) => {
      this.usuarios = data;
    });

    this.updateForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      usuario: new FormControl('', [Validators.required, Validators.minLength(7)]),
      genero: new FormControl('' , [Validators.required]),
      password: new FormControl('', 
                  [Validators.minLength(10), 
                    Validators.pattern(/\d/), 
                    Validators.pattern(/[A-Z]/), 
                    Validators.pattern(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)]),
      confirmPassword: new FormControl('', [Validators.minLength(10) ,this.validatorMatch('password')])
    });
  }



  deleteUser(id:string){
    Swal.fire({
      title: '¿Eliminar usuario?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.service.deleteUser(id).subscribe((data: any) => {
          Swal.fire(`${data.msg}`, '', 'success');
          this.service.getUsers().subscribe((data:any) => {
            this.usuarios = data;
          });

        })
      }
    })
  }

  cancelUpdate(){
    this.activeUpd = (!this.activeUpd || false);
    this.userToUpdate = {
      id: '',
      email: '',
      gender: '',
      user: '', 
      password: ''
    };
  }

  editUser(id:string){
    this.activeUpd = (!this.activeUpd || false);
    this.register = false;


    this.idUserUpdate = id;
    //mandar llamar el formulario y el usuario

    this.service.getUser(id).subscribe((data: any) =>{
      this.userToUpdate = data;
      this.updateForm.controls['email'].setValue(this.userToUpdate.email);  
      this.updateForm.controls['usuario'].setValue(this.userToUpdate.user);  
      this.updateForm.controls['genero'].setValue(this.userToUpdate.gender);  
      this.updateForm.controls['password'].setValue(this.userToUpdate.password);  
      this.updateForm.controls['confirmPassword'].setValue(this.userToUpdate.password);  
    });

    
  }

  registerUser(){
    this.activeUpd =  false;
    this.register = (!this.register || false);
  }

  ngOnInit(): void {
    
  }

  get form(){
    return this.updateForm.controls;
  }

  onSubmit(){

    //validar que el formulario no tenga errorres
    if(this.updateForm.invalid){
      if(this.updateForm.controls.confirmPassword.errors){
        Swal.fire(`Las contrasenas no coinciden`, '', 'error');
      }
      return;
    }

    let dataUser: UpdateUser = {
      id: this.idUserUpdate,
      user: this.updateForm.controls.usuario.value,
      email: this.updateForm.controls.email.value,
      gender: this.updateForm.controls.genero.value,
      password: this.updateForm.controls.confirmPassword.value,
    }

    this.service.updateUser(dataUser).subscribe((data: any) => {
        if(data.status){
          Swal.fire(`${data.msg}`, '', 'success');
            this.activeUpd = false; 
            this.updateForm.reset();
            window.location.href= '/usuarios';
        }else{
          Swal.fire(`${data.msg}`, '', 'error');
        }
    })

    
  }

  validatorMatch(controlName:string): ValidatorFn{
    return (control:AbstractControl): { [key:string]:boolean } | null => {
      if(this.updateForm){
        return this.updateForm.controls[controlName].value == control.value ? null : {'mustMatch':true}
      }

      return null;
    }
}

}
