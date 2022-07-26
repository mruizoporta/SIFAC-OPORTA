export interface AuthResponse
{
            ok: boolean,
            accountid?: string,
            email?: string,
            token?:string,
            msg?: string
}

export interface Usuario{
    id:string,
    email: string
}

export interface CompanyAccountResponse {
    companyaccountid: number,
    sec_account_accountid: number,
    bsc_company_companyid: number ,
    bsc_company: {
        companyid: number,
        name: String,
        location: String,

        bsc_city: {
            name: string
        }
    }

}