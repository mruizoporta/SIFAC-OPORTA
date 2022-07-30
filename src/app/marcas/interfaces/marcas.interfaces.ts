export interface brandResponse {
    brandid: number,
    name: string,
    description: string 
}

export interface Brand {
    name: string;
    description: string;
    isactive: number;
    createdon: Date,
    createdby: string,
    modifiedon: Date,
    modifiedby: string;
  }