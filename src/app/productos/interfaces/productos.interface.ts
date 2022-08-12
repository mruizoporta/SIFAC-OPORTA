export interface ProductosResponse {
    productsid: number;
    code: string;
    name: string;  
    model: string;
    category: string;
    brand: string;    
}

export interface Existencia{
    productid: number,
    storeid: number,
    storeproductsid: number,
    quantity: number
}

export interface ProductoEdit{
    productsid: number,
    code: string;
    name: string;
    categoryid: string;
    brandid: boolean;   
    minimumquantity: string;
    utilitymargin_credit: string;
    utilitymargin_cash: number;
    averagecost: number;
    cashprice: number;
    model: string;
    category: string;
    brand: string;
    creditprice: number;
    bsc_company_companyid: number; 
    createdon: Date,
    createdby: string,   
    modifiedon: Date;
    modifiedby: string;
    isactive: boolean; 
    storeproductsid: number,
    productid: number,
    storeid: number,
    quantity: string,
    psr:boolean  
}

export interface Productos {
    productsid: number,
    code: string;
    name: string;
    categoryid: string;
    brandid: boolean;   
    minimumquantity: string;
    utilitymargin_credit: string;
    utilitymargin_cash: number;
    averagecost: number;
    cashprice: number;
    model: string;
    category: string;
    brand: string;
    creditprice: number;
    bsc_company_companyid: number; 
    createdon: Date,
    createdby: string,   
    modifiedon: Date;
    modifiedby: string;
    isactive: boolean;   
    psr:boolean  ;
    
  }
