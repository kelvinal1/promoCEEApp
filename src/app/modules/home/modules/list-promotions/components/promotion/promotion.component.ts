import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PromotionService } from 'src/app/modules/home/services/promotion.service';
import { Galleria } from 'primeng/galleria';


@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent {



  dataPromotion: any;
  cadenaWpp: string = "";
  isLoading = true;
  dataImagenes: any[] = [];
  send: string = "";
  cadena: any = "cadena";

  cod?: any;



  // animation gallery images promotion

  fullscreen: boolean = false;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];


  @ViewChild('galleria') galleria: Galleria | undefined;


  constructor(private router: Router,
    private nzImageService: NzImageService,
    private msgService: NzMessageService,
    private promotionService: PromotionService,
    private activadedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.cod = this.activadedRoute.snapshot.paramMap.get("cod")
    /* this.activadedRoute.params.subscribe(roueteParams => {
       this.cod = roueteParams;
       this.getInformation();
     })*/
    this.getInformation();
  }

  getInformation() {
    this.promotionService.getOnlyProtionAndImages(this.cod).subscribe(value => {
      this.dataPromotion = value.data
      this.dataImagenes = this.dataPromotion.prm_imagenes;
      this.cadenaWpp = "https://wa.me/" + this.dataPromotion.prm_phone + "?text=" + this.dataPromotion.prm_message_whatsapp;
      document.getElementById("cadenaWpp")?.setAttribute('href', this.cadenaWpp);
      this.isLoading = false;
    })
  }


  onClick(image: any) {
    this.nzImageService.preview(image.epi_url, { nzZoom: 1.5, nzRotate: 0 });
  }


  return() {
    this.msgService.info("SALIR DE PROMOCION")
    return "";
  }



  // for changes in gallery





}
