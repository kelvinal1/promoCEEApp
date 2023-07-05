
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Empresa } from '../models/empresa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:Usuario = new Usuario();
  token:string="";
  empresa:Empresa= new Empresa();
  empresas: Empresa[]=[];
  private baseUrl :string;
  data:string="";

  private empresa$:BehaviorSubject<any>;


  constructor(private router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient) {
      this.empresa$ = new BehaviorSubject({});
    this.getCredentials();
    this.baseUrl = baseUrl;
    //console.log("authservice");
    
  }

  getEmpresaActive():Observable<any>{
    return this.empresa$.asObservable();
  }


  login(id:string,clave:string, device?:string):Observable<any> {
    let login = {
      id,
      clave,
      device,
      project:1 
    }
    return this.http.post(`${this.baseUrl}api/login`,login);

  }


  
  logout(){
    this.user = new Usuario;
    this.token = "";
    this.empresa = new Empresa;
    this.empresas= [];
    localStorage.removeItem("data");
    localStorage.removeItem("tk");
    localStorage.removeItem("emps");
    this.router.navigate([''])
  }

  setCredentials(credentials:any){
    localStorage.setItem("data",JSON.stringify(credentials.usuario));
    localStorage.setItem("tk",credentials.token);
    localStorage.setItem("emps",JSON.stringify(credentials.usuario.empresas));
    this.getCredentials();
  }

  getCredentials(){

    let usuario = localStorage.getItem("data");
    let token = localStorage.getItem("tk");
    let empresas:any = localStorage.getItem("emps");

    if(!usuario || !token){
      this.user = new Usuario;
    }else{
      this.empresas = JSON.parse(empresas);
      this.user = JSON.parse(usuario);
      this.token = token;
    }    
  }

  isLogin():boolean{
    return this.user && this.token?true:false;
  }

  ValidatePermisos(){
  }

  

  setDefaultToken(){
    this.token=environment.token;
  }

  
  correoRecoverPasswordMail(mail: string) {
    // return this.http.post(`${this.baseUrl}api/login/mailrecoverpassword?mail=${mail}`, {});
    return this.http.get(`${this.baseUrl}api/login/mailrecoverpassword/${mail}`);
  }

  changeUserPassword(password: string, user: any) {
    return this.http.put(`${this.baseUrl}api/login/newpassword/${password}`, user);
  }

  getDefaultEmpresa(){

    this.empresas.forEach(empresa =>{
      if(empresa.seleccionada == 1 )
      {
        this.seleccionarEmpresa(empresa);
      }
    })
    if(!this.empresa && this.empresas){
      this.empresas.forEach(empresa => {
      if(empresa.emp_inicial_pordefecto==1)
      {
        empresa.seleccionada = 1;
        this.seleccionarEmpresa(empresa);
      }
    })
    }

    if(!this.empresa && this.empresas)
    {
       this.seleccionarEmpresa(this.empresas[0]);
    }

  }

  seleccionarEmpresa(e:any){
    this.empresas.forEach(x => {
      x.seleccionada =0;
      if(x.id == e.id){
        this.empresa = x;
        x.seleccionada = 1;
        localStorage.setItem("emps",JSON.stringify(this.empresas));
        this.empresa$.next(this.empresa);
      }
    });
  }

  seleccionarEmpresaByID(id:number){
    let existe = this.empresas.find(x => x.codigo == id);
    if(existe){
      this.seleccionarEmpresa(existe);
    }
  }

  getInfoLogin():Observable<any> {
    return this.http.get(`${this.baseUrl}api/logindata/getvigent`);
  }
  
}
