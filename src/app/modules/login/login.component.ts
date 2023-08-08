import { Component, numberAttribute } from '@angular/core';
import { PolicemanService } from '../home/services/policeman.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { InvoicePolicemanService } from '../home/services/invoicePoliceman.service';
import { AuthService } from 'src/app/core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { EmpleadoService } from '../home/services/empleado.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NotificacionService } from 'src/app/core/notificacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  visible = false;
  dataSearch: any;
  searchText: string = "";
  isSearched: boolean = false;
  dataInvoice: any[] = [];
  validateForm!: UntypedFormGroup;
  mode: number = 1;
  itemSelected: any;
  isLoading = false;
  view = false
  cargarInfo = false;
  domain?: any;
  titleForm?: any;
  companys: any[] = [];
  dateEmpleado: any[] = [];

  isPhoto?: boolean = false;
  photoEmployee = null;

  companySentence: any = '';
  table: any = {
    columns: [
      {
        id: 'pip_num_invoice',
        title: 'Nº Factura',
        compare: (a: any, b: any) => a.pip_num_invoice ? a.pip_num_invoice.localeCompare(b.pip_num_invoice) : 0,
        priority: 2,
        show: true
      },
      {
        id: 'pip_date_invoice',
        title: 'Fecha factura',
        compare: (a: any, b: any) => a.pip_date_invoice ? a.pip_date_invoice.localeCompare(b.pip_date_invoice) : 0,
        priority: 2,
        show: true
      },
      {
        id: 'pip_amount',
        title: 'Monto',
        compare: (a: any, b: any) => a.pip_amount ? a.pip_amount.localeCompare(b.pip_amount) : 0,
        priority: 2,
        show: true
      },
      {
        id: 'pip_discount',
        title: 'Descuento',
        compare: (a: any, b: any) => a.pip_discount ? a.pip_discount.localeCompare(b.pip_discount) : 0,
        priority: 2,
        show: true
      }
    ],
    actions: [
      { icon: 'delete', tooltip: 'Eliminar', function: 'showRemoveItem', type: 'button' },
    ]
  }


  constructor(private policemanService: PolicemanService,
    private msgService: NzMessageService,
    private invoiceService: InvoicePolicemanService,
    private auth: AuthService,
    private router: Router,
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private empleadoService: EmpleadoService,
    private notificacionService: NotificacionService) {

  }

  ngOnInit(): void {


    this.activatedRoute.params.subscribe(roueteParams => {
      this.domain = roueteParams['domain']
      this.companys = this.auth.empresas;


      if (this.auth.isLogin()) {
        this.cargarInfo = false
      this.isSearched = false
      this.isLoading = false
      this.isPhoto = false

      this.searchText="";
      this.photoEmployee = null
        if (this.domain == 1) {
          this.notificacionService.info('CAMBIO DE BENEFICIOS', 'Usted esta trabajando con sección empleados')
          this.titleForm = 'DE EMPLEADOS'
        } else if (this.domain == 2) {
          this.notificacionService.info('CAMBIO DE BENEFICIOS', 'Usted esta trabajando con sección de policias')
          this.titleForm = 'DE OFICIALES DE POLICIA'
        }
        this.validateForm = this.fb.group({
          pip_num_invoice: [null, [Validators.required, Validators.pattern('^[0-9]{3}[0-9]{3}[0-9]{3,9}$')]],
          pip_amount: [null, [Validators.required]],
          pip_date_invoice: [null, [Validators.required]],
          pip_discount: [null, [Validators.required]],
          pip_policeman: [null],
          pip_identifier_emp: [null],
          pip_comp_emp: [null],
        });
        this.visible = true;

      } else {
        this.visible = false
        this.msgService.error("Usted no ha iniciado sesiòn, VERIFICAR POR FAVOR !")
      }

    })



  }


  searchPoliceman() {
    if (!this.searchText) {
      this.msgService.error("No ha ingresado una identificación, Verificar por favor!")
      this.cargarInfo = false
      this.isSearched = false
      this.isLoading = false
      this.isPhoto = false
      this.photoEmployee = null



      return;
    } else {
      this.photoEmployee = null
      this.isPhoto = false
      if (this.domain == 1) {
        this.isLoading = true
        this.view = false
        let model = {
          pis_type: 'empleado',
          pis_domain: this.domain
        }
        this.empleadoService.findEmpleadoCedula(this.searchText, model).subscribe(value => {
          if (value.length >= 1) {
            this.dateEmpleado = value;
            this.companySentence = '';
            this.getCompanys()
            this.cargarInfo = true;
            this.isSearched = true
            this.isPhoto = true
            this.msgService.success("¡Busqueda exitosa!")
            this.findAllInvoicePoliceman(this.dateEmpleado[0].emp_cedula);
            if (this.dateEmpleado[0].emp_foto != null) {
              this.photoEmployee = this.dateEmpleado[0].emp_foto;
            } else {
              this.isPhoto = false
            }
            this.dateEmpleado[0].emp_celular = this.hidePhone(this.dateEmpleado[0].emp_celular)
          } else {
            this.cargarInfo = false;
            this.isSearched = false
            this.isLoading = false
            this.msgService.warning('El número de identificación no fue encontrado, Verificar por favor!')
          }
        }, err => {
          this.msgService.warning("El número de identificación no fue encontrado, Verificar por favor!")
        })
      }
      if (this.domain == 2) {
        this.isLoading = true
        this.view = false
        let model = {
          pis_type: 'policia',
          pis_domain: this.domain
        }
        this.policemanService.getPoliceman2(this.searchText, model).subscribe(value => {
          if (value.data != null) {
            this.cargarInfo = true;
            this.msgService.success("¡Busqueda exitosa!")
            this.isSearched = true
            this.dataSearch = value.data;
            this.dataSearch.pol_phone = this.hidePhone(this.dataSearch.pol_phone)
            this.findAllInvoicePoliceman(this.dataSearch.pol_id);
          } else {
            this.cargarInfo = false;
            this.isSearched = false
            this.isLoading = false
            this.msgService.warning("El número de identificación no fue encontrado, Verificar por favor!")
          }
        }, err => {
          this.msgService.warning("El número de identificación no fue encontrado, Verificar por favor!")
        })
      }



    }
  }


  findAllInvoicePoliceman(code: any) {
    if (this.domain == 1) {
      this.invoiceService.getAllEmployee(code).subscribe(value => {
        if (value.data != null) {
          this.isLoading = false
          this.view = true
          this.dataInvoice = value.data
        } else {
          this.isLoading = false
          this.isSearched = true
        }
      })
    } else if (this.domain == 2) {
      this.invoiceService.getAllPoliceman(code).subscribe(value => {
        if (value.data != null) {
          this.isLoading = false
          this.view = true
          this.dataInvoice = value.data
        } else {
          this.isLoading = false
          this.isSearched = true
        }
      })
    }
  }


  saveInvoice() {
    if (!this.validateForm.valid) {

      if(this.validateForm.get('pip_num_invoice')?.invalid){
        this.msgService.error("Número de factura ingresado es incorrecto, verificar por favor!")
        this.validateForm.get('pip_num_invoice')?.markAsPending
      }

      if(this.validateForm.get('pip_date_invoice')?.invalid){
        this.msgService.error("Fecha ingresada esta incorrecta, verificar por favor!")
      }

      if(this.validateForm.get('pip_amount')?.invalid){
        this.msgService.error("Monto ingresado es incorrecto, verificar por favor!")
      }

      if(this.validateForm.get('pip_discount')?.invalid){
        this.msgService.error("Descuento ingresado es incorrecto, verificar por favor!")
      }
      return;

    }

    let dataForm = this.validateForm.value;

    if (this.domain == 1) {

      dataForm.pip_identifier_emp = this.dateEmpleado[0].emp_cedula;
      dataForm.pip_comp_emp = this.dateEmpleado[0].emp_empresa;
      dataForm = {
        pip_num_invoice: dataForm.pip_num_invoice,
        pip_amount: dataForm.pip_amount,
        pip_date_invoice: dataForm.pip_date_invoice,
        pip_discount: dataForm.pip_discount,
        pip_identifier_emp: dataForm.pip_identifier_emp,
        pip_comp_emp: dataForm.pip_comp_emp
      }

      if (this.mode == 1) {
        this.invoiceService.addInvoiceEmployee(dataForm).subscribe(value => {
          this.validateForm.reset();
          this.findAllInvoicePoliceman(this.dateEmpleado[0].emp_cedula);
          this.msgService.success("Factura ingresada correctamente");
        })
      }

      if (this.mode == 2) {
        this.invoiceService.editInvoiceEmployee(this.itemSelected.pip_cod, dataForm).subscribe(value => {
          this.msgService.success("Factura editada correctamente");
          this.findAllInvoicePoliceman(this.dateEmpleado[0].emp_cedula);
          this.validateForm.reset()
          this.itemSelected = null;
        })
        this.mode = 1;
      }



    }

    if (this.domain == 2) {

      //dataForm.pip_policeman = this.dataSearch.pol_id;
      dataForm = {
        pip_policeman: this.dataSearch.pol_id,
        pip_num_invoice: dataForm.pip_num_invoice,
        pip_amount: dataForm.pip_amount,
        pip_date_invoice: dataForm.pip_date_invoice,
        pip_discount: dataForm.pip_discount,
      }

      if (this.mode == 1) {
        this.invoiceService.addInvoice(dataForm).subscribe(value => {
          this.validateForm.reset();
          this.findAllInvoicePoliceman(this.dataSearch.pol_id);
          this.msgService.success("Factura ingresada correctamente");
        })
      }
      if (this.mode == 2) {
        this.invoiceService.editInvoice(this.itemSelected.pip_cod, dataForm).subscribe(value => {
          this.msgService.success("Factura editada correctamente");
          this.findAllInvoicePoliceman(this.dataSearch.pol_id);
          this.validateForm.reset()
          this.itemSelected = null;

        })
        this.mode = 1;
      }



    }
  }

  deteleInvoice(item: any) {

    if (this.domain == 1) {
      this.invoiceService.changueStatus(item.pip_cod, false).subscribe(value => {
        this.msgService.success("Factura retirada exitosamente")
        this.findAllInvoicePoliceman(this.dateEmpleado[0].emp_cedula);
      })
    }

    if (this.domain == 2) {
      this.invoiceService.changueStatus(item.pip_cod, false).subscribe(value => {
        this.msgService.success("Factura retirada exitosamente")
        this.findAllInvoicePoliceman(this.dataSearch.pol_id);
      })

    }

  }

  editInvoice(item: any) {
    this.mode = 2;
    this.validateForm.patchValue(item);
    this.itemSelected = item;
  }



  hidePhone(phone: any) {

    let phoneN = '';
    let digists: any[] = phone.split('');
    let numAsteristic = digists.length - 5;
    let asteristic = '';
    for (let index = 0; index < numAsteristic; index++) {
      asteristic += '*';

    }
    phoneN = digists[0] + '' + digists[1] + '' + digists[2] + '' + asteristic + '' + digists[digists.length - 2] + '' + digists[digists.length - 1]
    return phoneN;
  }



  getCompanys() {

    for (let index = 0; index < this.dateEmpleado.length; index++) {

      if (index == this.dateEmpleado.length - 1) {
        this.companySentence += this.dateEmpleado[index].emp_razon_social;
        break;
      }

      if (index <= this.dateEmpleado.length) {
        this.companySentence += this.dateEmpleado[index].emp_razon_social + ' - ';
      }
    }
  }





}
