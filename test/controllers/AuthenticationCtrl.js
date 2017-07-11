/**
 * Created by Marie on 10/07/2017.
 */
const expect = require('expect');
const AuthenticationCtrl = require('../../app/controllers/AuthenticationCtrl');

describe("AuthenticationCtrl", () => {

    describe("#constructor", () => {
        it("Should check all properties", () => {
            const authenticationCtrl = new AuthenticationCtrl(true, true);

            expect(authenticationCtrl._data).toBe(true);
            expect(authenticationCtrl._userService).toBe(true);
        });
    });

    describe("#registration", () => {
        it("Should return the value : 'registration'", () => {
            const authenticationCtrl = new AuthenticationCtrl({}, {});
            const req = {};
            const res = {
                render: view => {
                    expect(view).toBe('registration');
                }
            };
            authenticationCtrl.registration(req, res);
        });

    });

    describe("#postRegistration", () => {
        it("Should return a message to confirm registration", () => {
            const authenticationCtrl = new AuthenticationCtrl({}, {});

            const req = {
                body: {
                    email: 'chuck.norris@domain.tld',
                    password: 'password'
                }
            };

            const res = {
                render: (view, data) => {
                    expect(data.message).toBe("Your registration is confirmed");
                }
            };
            authenticationCtrl.postRegistration(req, res);
        });


        it("Should return an error message with an empty password", () => {
            const authenticationCtrl = new AuthenticationCtrl({}, {});

            const req = {
                body: {
                    email: 'chuck.norris@domain.tld',
                    password: ''
                }
            };

            const res = {
                render: (view, data) => {
                    expect(data.message).toBe('All fields required to register');
                }
            };
            authenticationCtrl.postRegistration(req, res);
        });

        it("Should return an error message if an account already exists with this email", () => {
            const authenticationCtrl = new AuthenticationCtrl({}, {});

            const req = {
                body: {
                    email: 'hubert.reeves@domain.tld'
                }
            };
            const res = {
                render: (view, data) => {
                    expect(data.message).toBe('An account already exist with this email address');
                }
            };
            authenticationCtrl.postRegistration(req, res);
        });

        it("Should return an error system that database is inaccessible", () => {
            const authenticationCtrl = new AuthenticationCtrl({}, {
                login: (email, password) => {
                    expect(email).toBe('chuck.norris@domain.tld');
                    expect(password).toBe('password');

                    return new Promise((resolve, reject) => reject({
                        message: 'error'
                    }));
                }
            });

            const req = {
                body: {
                    email: 'chuck.norris@domain.tld',
                    password: 'password'
                }
            };

            const res = {
                render: (view, data) => {
                    expect(view).toBe('registration');
                    expect(data.message).toBe('Unexpected error');
                }
            };

            authenticationCtrl.postRegistration(req, res);
        });
    });


});
