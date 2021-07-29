import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { StripeService } from 'ngx-stripe';
import { DomSanitizer,SafeUrl} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  url = "http://localhost:2000/customer"
  url1 = "http://localhost:2000/charge"
  url2= "./assets/movies.json"
  url4=  "http://localhost:2000/charge/status"
  url6=[ 'AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BQ', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BA', 'BW', 'BV', 'BR', 'IO', 'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'CV', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM', 'CG', 'CD', 'CK', 'CR', 'CI', 'HR', 'CU', 'CW', 'CY', 'CZ', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'VA', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MK', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'RE', 'RO', 'RU', 'RW', 'SH', 'KN', 'LC', 'PM', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'SC', 'SL', 'SG', 'SK', 'SI', 'SB', 'SO', 'SS', 'SX', 'ZA', 'GS', 'ES', 'LK', 'SD', 'SR', 'SJ', 'SZ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UM', 'UY', 'UZ', 'VU', 'VE', 'VN', 'VG', 'VI', 'WF', 'EH', 'YE', 'ZM', 'ZW', 'RS', 'ME', 'XK']
  url3=["./assets/fightclub.jpg","./assets/goodfellas.jpg","./assets/pulpfiction.jpg","./assets/scareface.jpg","./assets/thebreakfastclub.jpg"]
  genuineUrl: any;

  constructor(private http: HttpClient, private stripeService: StripeService,private sanitizer: DomSanitizer) { }

/*If we use the chekout session to redirect to stripe
  /*getSessionId() {
    return this.http.post(this.url, {})
      .pipe(
        switchMap((session: any) => {
          return this.stripeService.redirectToCheckout({ sessionId: session.id })
        })
      )
  }
  */

  getToken(body: any) {
    ///when we submit customers information (body and card number) stripe will create a token then we post the token to server
    return this.stripeService.createToken(body.Kcard, body.name)
  }

 postToken(body:any){
  //  posting the token we got to the server
   return this.http.post(this.url1,body)
 }

 getmovies(){
   return this.http.get(this.url2)
 }
 getImage(){
  return  this.url3.map((item:any)=>{
    return this.http.get(item)
   })
   
 }
 geturl(movielists:any,Name:any,movie:any){
   let value:any= movielists.movies.map((movieobject:any,genuineUrl:SafeUrl)=>{
     let unTrustedUrl=movieobject.url
     if(movieobject.Title==movie.Title){
    //  this.genuineUrl=this.sanitizer.bypassSecurityTrustResourceUrl(unTrustedUrl);
    return unTrustedUrl
    
    }
    return genuineUrl
    
})
return value
}


getBillingInfo(body:any){
    return this.http.post(this.url,body)
}



webHookResponse(){
     return this.http.get(this.url4)   
}

getcountries(){
  console.log(this.url6)
  return this.url6
}


}
