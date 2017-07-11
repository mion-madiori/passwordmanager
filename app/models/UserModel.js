class UserModel{
    constructor(){
        this.email = '';
        this.password = '';
        this.lstPassword = [];
    }

    get email(){return this.email;}
    get password(){return this.password;}
    get lstPassword(){return this.lstPassword;}

    set email(email){this.email = email;}
    set password(password){this.password = password;}
    set lstPassword(lstPassword){this.lstPassword = lstPassword;}
}

module.exports = UserModel