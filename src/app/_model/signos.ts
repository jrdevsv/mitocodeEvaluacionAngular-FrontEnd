import { Paciente } from './paciente';

export class Signos {
    idSigno: number;
    paciente: Paciente;
    pulso: string;
    ritmoResp: string;
    temperatura: string;
    fecha: string; //2020-09-05T11:30:05 ISODate || moment.js
}