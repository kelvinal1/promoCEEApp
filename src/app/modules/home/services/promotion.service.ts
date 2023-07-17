import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PromotionService {

    private baseUrl: string;
    private api = "api/Promotion";
    private apiImagesPromotion = "api/EPromotionImage";
    constructor(private router: Router,
        @Inject('BASE_URL') baseUrl: string,
        private http: HttpClient) {
        this.baseUrl = baseUrl;
    }


    getPromotionsByCluster(prm_cluster_id: any):Observable<any>
    {
        return this.http.get(`${this.baseUrl}${this.api}/all/cluster?prm_cluster_id=${prm_cluster_id}`);
    }


    getPromotionsByFilter(domain: any, cluster_id: any,company_id: any,country_id: any):Observable<any>
    {


        let filterDomain: any = null;

        if(domain ==1){
            filterDomain = `${this.baseUrl}${this.api}/all/filter?domain=${domain}&cluster_id=${cluster_id}&company_id=${company_id}&country_id=${country_id}`
        }

        if(domain==2){
            filterDomain = `${this.baseUrl}${this.api}/all/filter?domain=${domain}&cluster_id=${cluster_id}&company_id=${company_id}&country_id=${country_id}`;
        }

        if(domain==null || domain>=3  || domain==0){
            domain=1
            // por defecto si mandamos nullo o no existe toma el valor de demominio de empleado 
            filterDomain = `${this.baseUrl}${this.api}/all/filter?domain=${domain}&cluster_id=${cluster_id}&company_id=${company_id}&country_id=${country_id}`;
        }

        return this.http.get(filterDomain);
    }


    getImagesToPromotion(epi_promotion: any):Observable<any>
    {
        return this.http.get(`${this.baseUrl}${this.apiImagesPromotion}/getAll/promotionImages?epi_promocion=${epi_promotion}`);
    }


    getOnlyProtionAndImages(prm_id: any):Observable<any>
    {
        return this.http.get(`${this.baseUrl}${this.api}/all/cluster/promotion?prm_id=${prm_id}`);
    }



}
