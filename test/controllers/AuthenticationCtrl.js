const expect = require('expect');
const AuthenticationCtrl = require('../../app/controllers/AuthenticationCtrl.js');

describe("login", () => {
    describe("#constructor", () => {
        it("Should check all properties", () => {
            const authenticationCtrl = new AuthenticationCtrl(true, true);

            expect(authenticationCtrl._data).toBe(true);
            expect(authenticationCtrl._userService).toBe(true);
        });
    });

    describe("#authenticationAction", () => {
        it("Should return the value : 'authentication/login'", () => {
            const login = new AuthenticationCtrl();

            const req = {};

            const res = {
                render: view => {
                    expect(view).toBe('authentication/login');
                }
            };

            login.loginAction(req, res);
        });
    });

    describe("#login", () => {
        it("Should return an error message when the system crach", () => {
            const authenticationCtrl = new AuthenticationCtrl({}, {
                login: (email, password) => {
                    expect(email).toBe('john.doe@domain.tld');
                    expect(password).toBe('password');

                    return new Promise((resolve, reject) => reject({
                        message: 'error'
                    }));
                }
            });

            const req = {
                body: {
                    email: 'john.doe@domain.tld',
                    password: 'password'
                }
            };

            const res = {
                render: (view, data) => {
                    expect(view).toBe('authentication/login');
                    expect(data.message).toBe('Unexpected error');
                }
            };

            authenticationCtrl.login(req, res);
        });

        it("Should return an error message with empty post", () => {
            const authenticationCtrl = new AuthenticationCtrl({}, {});

            const req = {
                body: {}
            };

            const res = {
                render: (view, data) => {
                    expect(data.message).toBe('All fields required');
                }
            };

            authenticationCtrl.login(req, res);
        });

        it("Should return an error message with an empty password", () => {
            const authenticationCtrl = new AuthenticationCtrl({}, {});

            const req = {
                body: {
                    email: 'john.doe@domain.tld',
                    password: ''
                }
            };

            const res = {
                render: (view, data) => {
                    expect(data.message).toBe('All fields required');
                }
            };

            authenticationCtrl.login(req, res);
        });

        it("Should return an error 'bad credentials' with a bad password", () => {
            const authenticationCtrl = new AuthenticationCtrl({}, {
                login: (email, password) => {
                    return new Promise(resolve => resolve({
                        message: 'bad_credentials'
                    }))
                }
            });

            const req = {
                body: {
                    email: 'john.doe@domain.tld',
                    password: 'password'
                }
            };

            const res = {
                render: (view, data) => {
                    expect(data.message).toBe('Bad credentials');
                }
            };

            authenticationCtrl.login(req, res);
        });

        it("Should return a message when the user is logged", () => {
            const authenticationCtrl = new AuthenticationCtrl({}, {
                login: () => {
                    return new Promise(resolve => resolve({
                        message: 'success'
                    }))
                }
            });

            const req = {
                body: {
                    email: 'john.doe@domain.tld',
                    password: 'password'
                }
            };

            const res = {
                render: (view, data) => {
                    expect(data.message).toBe('You are logged')
                }
            };

            authenticationCtrl.login(req, res);
        });

        it("Should redirect user when the user is logged", () => {
            const authenticationCtrl = new AuthenticationCtrl({}, {
                login: () => {
                    return new Promise(resolve => resolve({
                        message: 'success'
                    }))
                }
            });

            const req = {
                body: {
                    email: 'john.doe@domain.tld',
                    password: 'password'
                }
            };

            const res = {
                redirect: slug => {
                    expect(slug).toBe('/admin');
                }
            };

            authenticationCtrl.login(req, res);
        });
    });
});