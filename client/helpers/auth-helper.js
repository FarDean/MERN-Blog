export function setCredentials(jwt,cb){
    if(typeof window !== 'undefined') sessionStorage.setItem('jwt',JSON.stringify(jwt))
    cb()
}

export function authenticated(){
    if(typeof window == 'undefined')return false

    if(sessionStorage.getItem('jwt'))return JSON.parse(sessionStorage.getItem('jwt'))
    else return false
}