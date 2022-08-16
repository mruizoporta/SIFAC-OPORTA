export interface empleadoResponse {
    employeesid: number,
    personid: number,
    nameemployee: string,
    identification: string ,
    Posicion: string ,
    EstadoCivil: string,
    NGenero: string
}

export interface cityResponse{
    cityid: number,
    name: string
}
export interface Empleado {
    firstname: string;
    last_name: string;
    identification: string;
    address: string;
    birthdate: Date;
    islegal: boolean;   
    businessname: string;
    companyacronym: string;
    bsc_company_companyid: number;
    gender_i_d: number;
    bsc_city_cityid: number;
    maritalstatusid: number;
    identification_type: number;
    createdon: Date,
    createdby: string,
    email: string,
    telefono: string,
   
    isactive: boolean;
    datestarted: Date;
    dateended: Date;
    positionid: number,
    employeesid:number,
    personid: number;
  }