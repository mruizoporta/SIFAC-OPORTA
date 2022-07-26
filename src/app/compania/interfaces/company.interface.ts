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