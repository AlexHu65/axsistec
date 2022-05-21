import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
 
})

export class RegisterComponent  {

  @Input() active: boolean = false;
  @Input() idUser:string = '';

  usuarioForm:any = null;

  constructor(private service: UsuariosService, public router: Router) { 

    

    this.usuarioForm  = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      usuario: new FormControl('', [Validators.required, Validators.minLength(7)]),
      genero: new FormControl('Masculino' , [Validators.required]),
      password: new FormControl('', 
                  [Validators.required, 
                    Validators.minLength(10), 
                    Validators.pattern(/\d/), 
                    Validators.pattern(/[A-Z]/), 
                    Validators.pattern(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(10) ,this.validatorMatch('password')])
    });

  }


  validatorMatch(controlName:string): ValidatorFn{
      return (control:AbstractControl): { [key:string]:boolean } | null => {
        if(this.usuarioForm){
          return this.usuarioForm.controls[controlName].value == control.value ? null : {'mustMatch':true}
        }

        return null;
      }
  }

  onSubmit(){

    //validar que el formulario no tenga errorres
    if(this.usuarioForm.invalid){
      if(this.usuarioForm.controls.confirmPassword.errors.mustMatch){
        Swal.fire(`Las contrasenas no coinciden`, '', 'error');
      }
      return;
    }

    let dataUser: Usuario = {
      user: this.usuarioForm.controls.usuario.value,
      email: this.usuarioForm.controls.email.value,
      gender: this.usuarioForm.controls.genero.value,
      password: this.usuarioForm.controls.confirmPassword.value,
    }

    this.service.addUser(dataUser).subscribe((data: any) => {
        if(data.status){
          Swal.fire(`${data.msg}`, '', 'success');
          this.active = false; 
          this.usuarioForm.reset();
          window.location.href= '/usuarios';
        }else{
          Swal.fire(`${data.msg}`, '', 'error');
        }
    })

    
  }

  get form(){
    return this.usuarioForm.controls;
  }

  loadUser(id:string){
  }

}
