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

    describe("#forgotPassword", () => {

        it("Should redirect user when the 'forgot my password' button is pressed", () => {
            const authenticationCtrl = new AuthenticationCtrl({}, {});

            const req = {
                body: {}
            };

            const res = {
                redirect: slug => {
                    expect(slug).toBe('/resetPassword');
                }
            };

            authenticationCtrl.forgotPassword(req, res);
        });
    });

    describe("#resetPassword", () => {

        it("Should return an error message with empty post", () => {
            const authenticationCtrl = new AuthenticationCtrl({}, {});

            const req = {
                body: {}
            };

            const res = {
                render: (view, data) => {
                    expect(data.message).toBe('Email address required');
                }
            };

            authenticationCtrl.resetPassword(req, res);
        });

        it("Should return the password : 'p@ssword'", () => {
            const authenticationCtrl = new AuthenticationCtrl({});

            const req = {
                body: {
                    email: 'test-email@gmail.com'
                }
            };

            const res = {
                render: (view, data) => {
                    expect(data.password).toBe('p@ssword');
                }
            };

            authenticationCtrl.resetPassword(req, res);
        });
    });

    describe("#emailExistInBdd", () => {
        it("Should return an error message 'Incorrect email address'", () => {
            const authenticationCtrl = new AuthenticationCtrl({}, {});

            const req = {
                body: {
                    email: 'incorrect-email@gmail.com'
                }
            };

            const res = {
                render: (view, data) => {
                    expect(data.message).toBe('Incorrect email address');
                }
            };

            authenticationCtrl.emailExistInBdd(req, res);
        });
        describe("#login", () => {
            it("Should return the value : 'authentication/login'", () => {
                const login = new AuthenticationCtrl();

                const req = {};

                const res = {
                    render: view => {
                        expect(view).toBe('authentication/login');
                    }
                };

                login.login(req, res);
            });
        });

        describe("#postlogin", () => {
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

                authenticationCtrl.postlogin(req, res);
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

                authenticationCtrl.postlogin(req, res);
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

                authenticationCtrl.postlogin(req, res);
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

                authenticationCtrl.postlogin(req, res);
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

                authenticationCtrl.postlogin(req, res);
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

                authenticationCtrl.postlogin(req, res);
            });
        });
    });
});