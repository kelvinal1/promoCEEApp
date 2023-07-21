import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { SegmentoService } from './modules/home/services/segmento.service';
import { EmpresaService } from './modules/home/services/empresa.service';
import { DivisionPoliticaService } from './modules/home/services/divisionPolitica.service';
import { PolicemanService } from './modules/home/services/policeman.service';
import { EmpleadoService } from './modules/home/services/empleado.service';


export const interceptorProviders = 
   [
    { provide: HTTP_INTERCEPTORS, useClass: PolicemanService, multi: true,  },
    { provide: HTTP_INTERCEPTORS, useClass: EmpleadoService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SegmentoService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: EmpresaService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DivisionPoliticaService, multi: true },
    
   
];