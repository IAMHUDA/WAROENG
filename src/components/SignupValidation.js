function Validation (values) {
    alert("")
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/  

    if(values.email === "") {
        error.email = "email tidak boleh kosong"
    }
    else if(!email_pattern.test(values.email)) {
        error.email = "email tidak sesuai"
    }else {
        error.email = ""
    }

    if(values.password === "") {
        error.password = "password tidak boleh kosong"
    }
    else if(!password_pattern.test(values.password)) {
        error.password = "password tidak sesuai"
    }else {
        error.password = ""
    }
    return error;
} 

export default Validation
