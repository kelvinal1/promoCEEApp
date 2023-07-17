import { Component, numberAttribute } from '@angular/core';
import { PolicemanService } from '../home/services/policeman.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { InvoicePolicemanService } from '../home/services/invoicePoliceman.service';
import { AuthService } from 'src/app/core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.domain = this.activatedRoute.snapshot.paramMap.get('domain');

    if (this.domain == 1) {
      this.titleForm = 'DE EMPLEADOS'
    } else if (this.domain == 2) {
      this.titleForm = 'DE OFICIALES DE POLICIA'
    }

    this.validateForm = this.fb.group({
      pip_num_invoice: [null, [Validators.required]],
      pip_amount: [null, [Validators.required]],
      pip_date_invoice: [null, [Validators.required]],
      pip_discount: [null, [Validators.required]],
      pip_policeman: [null],
    });

    if (!this.auth.isLogin()) {
      this.router.navigate(['']);
    }
  }


  searchPoliceman() {


    if (!this.searchText) {
      this.msgService.error("No ha ingresado una identificación, Verificar por favor!")
      this.cargarInfo = false
      this.isSearched = false
      this.isLoading = false
      return;
    } else {

      if (this.domain == 1) {

        console.log('NO BUSCAR CEDULAS DE POLICIA ES PARA SOLO EMPLEADOS')
        
      }

      if (this.domain == 2) {
        this.isLoading = true
        this.view = false
        this.policemanService.getPoliceman(this.searchText).subscribe(value => {
          if (value.data != null) {
            this.cargarInfo = true;
            this.msgService.success("¡Busqueda exitosa!")
            this.isSearched = true
            this.dataSearch = value.data;
            this.dataSearch.pol_phone= this.hidePhone(this.dataSearch.pol_phone)
            this.findAllInvoicePoliceman(this.dataSearch.pol_id);
            console.log(this.auth.getUserLog())
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


  findAllInvoicePoliceman(pol_id: any) {
    this.invoiceService.getAllPoliceman(pol_id).subscribe(value => {
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


  saveInvoice() {
    if (!this.validateForm.valid) {
      this.msgService.error("Existen campos que no estan ingresados, verificar por favor!")
      return;
    }

    let dataForm = this.validateForm.value;
    dataForm.pip_policeman = this.dataSearch.pol_id;

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
    }
  }

  deteleInvoice(item: any) {
    this.invoiceService.changueStatus(item.pip_cod, false).subscribe(value => {
      this.msgService.success("Factura retirada exitosamente")
      this.findAllInvoicePoliceman(this.dataSearch.pol_id);
    })
  }

  editInvoice(item: any) {
    this.mode = 2;
    this.validateForm.patchValue(item);
    this.itemSelected = item;
  }



  hidePhone(phone: any){

    let phoneN ='';
    let digists:any[] = phone.split('');
    let numAsteristic = digists.length-5;
    let asteristic = '';
    for (let index = 0; index < numAsteristic; index++) {
      asteristic+='*';
      
    }
    phoneN = digists[0]+''+digists[1]+''+digists[2]+''+asteristic+''+digists[digists.length-2]+''+digists[digists.length-1]
    return phoneN;
  }





}
