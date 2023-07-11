import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PromotionService } from 'src/app/modules/home/services/promotion.service';
import { Galleria } from 'primeng/galleria';
import { MapaEmpresasService } from 'src/app/modules/home/services/mapaEmpresas.service';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Almacen } from 'src/app/models/Almacen';



@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;



  dataPromotion?: any;
  cadenaWpp: string = "";
  dirCompany: any[] = [];
  positions: any[] = []
  almacen: any = {};
  almacenes!: Array<Almacen>;

  center!: google.maps.LatLngLiteral;
  height!: number;
  width!: number;

  zoom!: number;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true
  };
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
    private activadedRoute: ActivatedRoute,
    private mapService: MapaEmpresasService
  ) {

  }

  ngOnInit(): void {
    this.cod = this.activadedRoute.snapshot.paramMap.get("cod")

    this.getInformationPromo();

  }

  getInformationPromo() {
    this.promotionService.getOnlyProtionAndImages(this.cod).subscribe(value => {
      this.dataPromotion = value.data
      console.log(this.dataPromotion)
      this.dataImagenes = this.dataPromotion.prm_imagenes;
      this.getUbiCompnay(this.dataPromotion.prm_company_id);
      this.cadenaWpp = "https://wa.me/" + this.dataPromotion.prm_phone + "?text=" + this.dataPromotion.prm_message_whatsapp;
      document.getElementById("cadenaWpp")?.setAttribute('href', this.cadenaWpp);
      this.isLoading = false;

    })
  }



  getUbiCompnay(cod_company: any) {
    this.mapService.getUbicaciones(0, 0, cod_company, 0).subscribe(direc => {
      this.dirCompany = direc;
      this.doMark()
    })
  }



  doMark() {

    let latitud = '0.2816738524975948';
    let longitud = '-76.70256190717976';
    let zoom =6;

    this.zoom = zoom;
    this.center = {
      lat: parseFloat(latitud),
      lng: parseFloat(longitud)
  };

    let positions = [];

    positions = this.dirCompany.map((x) => ({
      ...x,
      pos: {
        lat: parseFloat(x.alm_latitud),
        lng: parseFloat(x.alm_longitud)
      },
      info: x,
      options: {
        label: {
          text: this.getInicial(),
          color: 'white',
          fontFamily: 'Material Icons',
          fontSize: '14px'
        },
        icon: this.createPinMarker()
      }
    }))
    this.positions = positions;
    console.log(this.positions)
  }



  centerPais(pais: any) {
    this.zoom = pais.div_zoomap;
    this.center = {
      lat: parseFloat(pais.div_latitud),
      lng: parseFloat(pais.div_longitud)
    };
  }


  getInicial() {
    let inicial = this.dataPromotion?.prm_company_name.substring(0, 1);
    return inicial;

  }

  createPinMarker() {
    let color = '#E53E1C';
    const icon = {
      //url: "assets/Map_marker.svg",
      path: 'M7.5,0C5.0676,0,2.2297,1.4865,2.2297,5.2703      C2.2297,7.8378,6.2838,13.5135,7.5,15c1.0811-1.4865,5.2703-7.027,5.2703-9.7297C12.7703,1.4865,9.9324,0,7.5,0z',
      origin: new google.maps.Point(1, 1), // origin
      anchor: new google.maps.Point(8, 10),
      labelOrigin: new google.maps.Point(8, 5),
      fillColor: color,
      fillOpacity: 1,
      strokeWeight: 0,
      strokeColor: '#ffffff',
      scale: 2.5
    };
    return icon;

  }

  onClick(image: any) {
    this.nzImageService.preview(image.epi_url, { nzZoom: 1.5, nzRotate: 0 });
  }


  return() {
    this.msgService.info("SALIR DE PROMOCION")
    return "";
  }



  openInfoWindow(marker: MapMarker, info: any) {
    
    this.infoWindow.open();
  }


  // for changes in gallery





}
