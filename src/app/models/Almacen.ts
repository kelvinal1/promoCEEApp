import { DivisionPolitica } from "./DivisionPolitica";

export class Almacen {

    empresa?: number;
    id?: string;
    nombre?: string;
    ciudad?: number;
    callePrincipal?: string;
    calleSecundaria?: string;
    numero?: string;
    telefono?: string;
    telefono1?: string;
    matriz?: number;
    horarioLunVie?: string;
    horarioSab?: string;
    horarioDom?: string;
    latitud?: string;
    longitud?: string;
    empleado?: number;
    estado?: number;
    zona?: number;
    codigo?: number;
    metros?: number;
    tipoLocal?: number;
    foto?: string;

    division?: DivisionPolitica;

    constructor(){
    }

}
