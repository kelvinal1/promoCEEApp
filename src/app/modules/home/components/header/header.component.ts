import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { NotificacionService } from 'src/app/core/notificacion.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SegmentoService } from '../../services/segmento.service';
import { EmpresaService } from '../../services/empresa.service';
import { DivisionPoliticaService } from '../../services/divisionPolitica.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { filter } from 'd3';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  validateForm!: UntypedFormGroup;
  isLoadingOne?: boolean;
  passwordVisible = false;
  password?: string;
  deviceInfo?: string;
  infoLogin: any;
  deviceDetector: any;
  login = false;
  isVisibleLogin: boolean = false;

  dataSegmentos: any[] = [];
  dataEmpresas: any[] = [];
  dataLugares: any[] = [];
  cluster: any = null;
  empresa: any = null;
  pais: any = null;
  opSelected: any = null;
  buscador: any = {
    cluster: this.cluster,
    empresa: this.empresa,
    pais: this.pais
  };





  constructor(private router: Router,
    private notificacionService: NotificacionService,
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private msgService: NzModalService,
    private segmentoService: SegmentoService,
    private empresasService: EmpresaService,
    private divisionPolService: DivisionPoliticaService,
    private msjService: NzMessageService,
    private route: Router,
    private activvatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.getSegmentos()
    this.getEmpresas()
    this.getDivisionPolitica()

    this.login = this.auth.isLogin();
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

    this.isLoadingOne = false;
    this.deviceInfo = this.deviceDetector?.getDeviceInfo().os_version || this.deviceDetector?.os;
    this.auth.getInfoLogin().subscribe(data => {
      this.infoLogin = data;
    })


  }



  ngAfterViewInit(): void {
  }


  logIn() {
    this.isVisibleLogin = true;
  }

  logout() {

    this.msgService.confirm({
      nzTitle: `<i>¿Está seguro/a de cerrar sesión?</i>`,
      nzOnOk: () => {
        this.login = false;
        this.notificacionService.success("Sesión cerrada", "")
        this.auth.logout();
        this.route.navigate(['home/load/list', this.dataSegmentos[0].codigo])
      }
    })



  }

  submitForm() {
    if (!this.validateForm.valid) {
      this.notificacionService.error('Credenciales', 'Ingrese datos validos');
      return;
    }

    const username = this.validateForm.get('userName')!.value;
    const password = this.validateForm.get('password')!.value;

    this.isLoadingOne = true;

    this.auth.login(username, password, this.deviceInfo).subscribe(
      (res) => {
        this.notificacionService.success('Bienvenido a Beneficios CEE', '');
        console.log(res)
        this.auth.setCredentials(res);
        this.isLoadingOne = false;
        this.isVisibleLogin = false
        this.validateForm.reset()
        this.login = true
        //this.router.navigate(['home/policeman'])
      }, (error) => {
        this.isLoadingOne = false;
        console.log(error);

      }
    )
  }


  getSegmentos() {
    this.segmentoService.getSegmentosByUsuario().subscribe(value => {
      this.dataSegmentos = value
      this.cluster = this.dataSegmentos[0].codigo
      console.log(this.cluster)
      let filtro:any= {
        cluster: this.cluster,
        empresa: this.empresa,
        pais: this.pais,
      }
      if(this.route.url=='/home'){
        this.router.navigate(['home/load/list/',this.cluster])
      }
    })
  }

  getEmpresas() {
    this.empresasService.getEmpresas().subscribe(value => {
      this.dataEmpresas = value;
    })
  }

  getDivisionPolitica() {
    this.divisionPolService.getPaises().subscribe(value => {
      this.dataLugares = value;
    })
  }


  goCluster(item: any) {
    this.cluster = item.codigo
    let filtro: any ={
      cluster: this.cluster,
      empresa: this.empresa,
      pais: this.pais
    }
    this.route.navigate(['home/load/list', this.cluster])
  }



  onChange() {
    let filtro:any= {
      cluster: this.cluster,
      empresa: this.empresa,
      pais: this.pais,
    }
    if(this.empresa!=null || this.pais!=null){
      this.route.navigate(['home/load/list',this.cluster]);
    }

   
  }


  goInformation() {
    this.route.navigate(['home/policeman'])
  }


}
