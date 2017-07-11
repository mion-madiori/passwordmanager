class PasswordModel{
    constructor(){
        this.login = '';
        this.password = '';
        this.url = '';
    }

    get login(){return this.login;}
    get password(){return this.password;}
    get url(){return this.url;}

    set login(login){this.login = login;}
    set password(password){this.password = password;}
    set url(url){this.url = url;}
}

module.exports = PasswordModel