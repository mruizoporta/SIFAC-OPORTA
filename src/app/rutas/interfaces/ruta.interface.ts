export interface RutasResponse {
    routeid: number;
    code: string;
    name: string;  
    Dia:string,
    city: string;
    collector: string;
    supervisorid: string;  
    secretaria: string;  
}

export interface ZonasResponse {
    zoneid: number;
    name: string;   
}


export interface CiudadesResponse {
    cityid: number;
    name: string;   
}

export interface Rutas {
    routeid: number;
    code: string;
    name: string;
    day: string;
    brandid: boolean;      
    model: string;
    supervisorid: number;
    bsc_city_cityid: number,
    brand: string;
    collectorid: number;
    bsc_company_companyid: number; 
    createdon: Date,
    createdby: string,   
    isactive: boolean;
    secretariaid: number;
    
  }