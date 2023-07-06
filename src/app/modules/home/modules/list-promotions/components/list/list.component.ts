import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PromotionService } from 'src/app/modules/home/services/promotion.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{


  

  isLoading?: boolean;
  dataPromotions: any[] = [];
  dataCards: any[] = [];
  imagesList: any[] = [];
  images?: any[];
  promClusterSelect: any = null;
  id: any;
  data: any;


  constructor(private activadedRoute: ActivatedRoute,
    private promotionService: PromotionService,
    private msgService: NzMessageService) { 

    
    }



  ngOnInit(): void {
    this.activadedRoute.params.subscribe(roueteParams => {
        this.data = roueteParams['cod'];
        console.log(this.data)
        this.getAllPromotionsCluster()
      
    })

  }

  getAllPromotionsCluster() {
    this.isLoading=true
    this.promotionService.getPromotionsByCluster(this.data).subscribe(res => {
      this.dataPromotions = res.data;
      this.isLoading=false
    })
  }


  goPromo(item: any){
    console.log(item)
    console.log(item.prm_id)
    window.open('home/load/promotion/'+item.prm_id)
   //(this.router.navigate(['home/load/promotion/',item.prm_id])
  }

}
