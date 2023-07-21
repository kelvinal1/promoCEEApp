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
import { delay, finalize } from 'rxjs';
import { state } from '@angular/animations';
import { MessageService } from 'primeng/api';


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
  visibleDraw: boolean = false;
  user: any;

  dataSegmentos: any[] = [];
  dataEmpresas: any[] = [];
  dataLugares: any[] = [];
  cluster: any = null;
  empresa: any = 0;
  pais: any = 0;
  nOptions: any = null;
  opSelected: any = null;
  buscador: any = {
    cluster: this.cluster,
    empresa: this.empresa,
    pais: this.pais
  };

  domain: any = null;
  filtro: any = null;

  textCluster = 'Cluster';
  textCompany = 'Empresa';
  textCountry = 'País';

  clientHeight!: number;
  openCluster = false;
  openCompany = false;
  openCountry = false;
  profile = false;


  constructor(private router: Router,
    private notificacionService: NotificacionService,
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private msgService: NzModalService,
    private msService: NzMessageService,
    private segmentoService: SegmentoService,
    private empresasService: EmpresaService,
    private divisionPolService: DivisionPoliticaService,
    private msjService: NzMessageService,
    private route: Router,
    private activvatedRoute: ActivatedRoute,
  ) {
    this.clientHeight = window.innerHeight;
  }

  ngOnInit(): void {


    this.getSegmentos();
    this.getEmpresas();
    this.getDivisionPolitica();


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
        this.router.navigate(['home/load/list/', this.domain, this.cluster, this.empresa, this.pais])
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
        this.notificacionService.success('Bienvenido a Beneficios CEE', 'Es un placer trabajar con usted');
        this.auth.setCredentials(res);
        this.isLoadingOne = false;
        this.isVisibleLogin = false
        this.validateForm.reset()
        this.login = true
        this.route.navigate(['home/search/', this.domain])

      }, eror => {
        console.log(eror)
        this.isLoadingOne = false;
        this.notificacionService.error('Credenciales incorrectos', 'Intentelo nuevament por favor');

      }
    )
  }


  getSegmentos() {
    this.segmentoService.getSegmentosByUsuario().subscribe((value) => {
      this.dataSegmentos = value
      this.cluster = this.dataSegmentos[0].codigo
      let codigos: any[] = this.router.url.split('/');
      if (this.route.url == '/home') {
        this.domain = 1;
        this.router.navigate(['home/load/list/', this.domain, this.cluster, this.empresa, this.pais])
        this.setMark(this.cluster)
        this.textCluster = this.dataSegmentos[0].nombre
      } else if (codigos.length == 8) {
        this.domain = codigos[4];
        this.cluster = codigos[5];
        this.setMark(this.cluster)
        this.changeText(this.cluster, this.empresa, this.pais)
      } else if (codigos.length == 6) {
        this.domain = codigos[3];
        this.setMark(this.cluster)
        this.changeText(this.cluster, this.empresa, this.pais)
      } else if (codigos.length == 4) {
        this.domain = codigos[3];
        this.setMark(this.cluster)
        this.changeText(this.cluster, this.empresa, this.pais)
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



  setMark(codigo: any) {
    for (let index = 0; index < this.dataSegmentos.length; index++) {
      if (this.dataSegmentos[index].codigo == codigo) {
        this.opSelected = index
      }
    }
  }

  goCluster(item: any) {
    this.cluster = item.codigo
    this.setMark(item.codigo)
    this.textCluster = item.nombre
    if (this.pais == 0 || this.pais == null) { this.pais = 0; }
    if (this.empresa || this.empresa == null) { this.empresa = 0 }
    this.route.navigate(['home/load/list/', this.domain, this.cluster, this.empresa, this.pais])
    this.changeText(this.cluster, this.empresa, this.pais);

  }





  onChange() {
    this.close()
    this.setMark(this.cluster);
    //when selection is null(country and company)
    if ((this.pais == null || this.pais == 0) && (this.empresa == null || this.empresa == 0) && this.cluster != 0) {
      this.empresa = 0
      this.pais = 0;
      this.route.navigate(['home/load/list/', this.domain, this.cluster, this.empresa, this.pais])
      this.changeText(this.cluster, this.empresa, this.pais)


    }

    if (this.pais == null) {
      this.pais = 0;
      this.route.navigate(['home/load/list/', this.domain, this.cluster, this.empresa, this.pais])
      this.changeText(this.cluster, this.empresa, this.pais)


    }

    if (this.empresa == null) {
      this.empresa = 0;
      this.route.navigate(['home/load/list/', this.domain, this.cluster, this.empresa, this.pais])
      this.changeText(this.cluster, this.empresa, this.pais)
    }


    if (this.cluster != 0 && this.pais != 0) {
      this.route.navigate(['home/load/list/', this.domain, this.cluster, this.empresa, this.pais])
      this.changeText(this.cluster, this.empresa, this.pais)


    }

    if (this.cluster != 0 && this.empresa != 0) {
      this.route.navigate(['home/load/list/', this.domain, this.cluster, this.empresa, this.pais])
      this.changeText(this.cluster, this.empresa, this.pais)

    }

  }




  goInformationE() {
    this.route.navigate(['home/search/', 1])
  }

  goInformationP() {
    this.route.navigate(['home/search/', 2])
  }

  close(): void {
    this.openCluster = false;
    this.openCompany = false;
    this.openCountry = false;
    this.visibleDraw = false;
  }



  clusterG() {
    this.visibleDraw = true;
    setTimeout(() => {
      this.openCluster = true;
    }, 200)

  }

  companyG() {
    this.visibleDraw = true;
    setTimeout(() => {
      this.openCompany = true;
    }, 200)
  }



  countryG() {
    this.visibleDraw = true;
    setTimeout(() => {
      this.openCountry = true;
    }, 200)
  }



  changeText(cluster: any, empresa: any, pais: any) {

    this.textCompany = 'Empresa';
    this.textCountry = 'País'

    if (cluster != null || cluster != 0) {
      this.dataSegmentos.forEach(val => {
        if (val.codigo == cluster)
          this.textCluster = val.nombre
      })
    }

    if (empresa != null || empresa != 0) {
      this.dataEmpresas.forEach(val => {
        if (val.codigo == empresa)
          this.textCompany = val.razonSocial
      })
    }

    if (pais != null || pais != 0) {
      this.dataLugares.forEach(val => {
        if (val.codigo == pais)
          this.textCountry = val.descripcion
      })
    }
  }

  clearFilter() {
    this.empresa = 0;
    this.pais = 0;
    this.cluster = this.dataSegmentos[0].codigo
    this.changeText(this.cluster, this.empresa, this.pais)
    this.setMark(this.cluster)
    this.router.navigate(['home/load/list/', this.domain, this.cluster, this.empresa, this.pais])
    this.msService.success("Filtros limpios")
  }


  viewProfile() {
    this.user = this.auth.getUserLog();
    this.profile = true;
  }

  promosP() {
    this.domain = 2
    this.router.navigate(['home/load/list/', this.domain, this.cluster, this.empresa, this.pais])
    this.notificacionService.info('CAMBIO DE PROMOCIONES', 'Usted esta trabajando con sección de policias')
  }

  promosE() {
    this.domain = 1
    this.router.navigate(['home/load/list/', this.domain, this.cluster, this.empresa, this.pais])
    this.notificacionService.info('CAMBIO DE PROMOCIONES', 'Usted esta trabajando con sección empleados')
  }

}
