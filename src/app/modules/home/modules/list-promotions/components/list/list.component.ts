import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PromotionService } from 'src/app/modules/home/services/promotion.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {




  isLoading?: boolean;
  dataPromotions: any[] = [];
  dataCards: any[] = [];
  imagesList: any[] = [];
  images?: any[];
  promClusterSelect: any = null;
  id: any;
  data: any = null;
  cluster: any;
  empresa: any;
  pais: any;
  domain: any;


  constructor(private activadedRoute: ActivatedRoute,
    private promotionService: PromotionService,
    private msgService: NzMessageService,
    private router: Router) {


  }



  ngOnInit(): void {
    this.activadedRoute.params.subscribe(roueteParams => {
      this.domain = roueteParams['domain']
      this.cluster = roueteParams['cluster'];
      this.empresa = roueteParams['company'];
      this.pais = roueteParams['country'];
      this.getAllPromotionsCluster()
    })
  }

  getAllPromotionsCluster() {
    this.isLoading = true
    this.promotionService.getPromotionsByFilter(this.domain, this.cluster, this.empresa, this.pais).subscribe(res => {
      this.dataPromotions = res.data;
      this.isLoading = false
    })
  }


  goPromo(item: any) {
    this.setDomain()
    window.open('home/load/' + this.domain + '/promotion/' + item.prm_id)
    //(this.router.navigate(['home/load/promotion/',item.prm_id])
  }

  setDomain(){
    this.domain = this.activadedRoute.snapshot.paramMap.get('domain')
  }

}
