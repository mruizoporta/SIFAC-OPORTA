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