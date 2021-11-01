interface Error {
    [key: string]: string;
}

export const errors: Error = {
    "error401" : "You don't have permissions",
    "error403" : "You don't have permissions",
    "error422" : "Has ocurred an error please try again later",
    "error400" : "Bad Request"
}