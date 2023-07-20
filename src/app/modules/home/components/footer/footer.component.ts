import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  infoLogin: any
  networks?: any[];
  
  constructor(private auth: AuthService){
    this.auth.getInfoLogin().subscribe(data=>{
      this.infoLogin=data
      this.networks=this.infoLogin.networks;
    })
  }
  goF(){
    this.networks?.forEach(value=>{
      if(value.ers_codigo==1){
        window.open(value.ers_url);
      }
    })
  }

  goI(){
    this.networks?.forEach(value=>{
      if(value.ers_codigo==2){
        window.open(value.ers_url);
      }
    })
    
  }
  goL(){
    this.networks?.forEach(value=>{
      if(value.ers_codigo==4){
        window.open(value.ers_url);
      }
    })
    
  }

}
