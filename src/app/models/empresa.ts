export class Empresa{
    codigo ?: number ;
    id ?: string ;
    razonSocial ?: string ;
    nombreComercial ?: string ;
    ruc ?: string ;
    ciudad ?: number ;
    callePrincipal ?: string ;
    calleSecundaria ?: string ;
    numero ?: string ;
    telefono ?: string ;
    telefono1 ?: string ;
    telefono2 ?: string ;
    mailEmpresa ?: string ;
    representanteLegal ?: string ;
    telefonoRepresentante ?: string ;
    logo ?: string ;
    subdominio ?: string ;
    configuracion ?: string ;
    estado ?: number ;
    paginaWeb ?: string ;
    division ?: any;
    emp_latitud ?: string ;
    emp_longitud ?: string ;
    emp_zoommap ?: number ;
    emp_inicial_pordefecto ?: number ;
    seleccionada ?: number = 0;
    emp_pais ?:number = 0;
    emp_moneda ?:number ;
}