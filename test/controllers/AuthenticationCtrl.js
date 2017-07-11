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
            const authenticationCtrl = new AuthenticationCtrl({ }, {});

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

            const authenticationCtrl = new AuthenticationCtrl({
                email: 'test-email@gmail.com'
            });

            const req = { };

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
                    email: 'test-email@gmail.com'
                }
            };

            const res = {
                render: (view, data) => {
                    expect(data.message).toBe('Incorrect email address');
                }
            };

            authenticationCtrl.emailExistInBdd(req, res);
        });
    });
});
