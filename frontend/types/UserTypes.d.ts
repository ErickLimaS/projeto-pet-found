interface UserRegisterTypes {

    email: string,
    password: string,
    firstName: string,
    surname: string,
    address: {
        state: string,
        county: string,
        street: string | null // null is for the optional inputs
    },
    contacts: {
        tel1: {
            ddd: string | null,
            tel: string | null
        },
        tel2: {
            ddd: string | null,
            tel: string | null
        },
        facebook: string | null,
        instagram: string | null
    }
    
}

interface UserLoginTypes {

    email: string,
    password: string

}