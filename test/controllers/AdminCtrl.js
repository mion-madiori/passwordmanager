/**
 * use case:
 * should return error message if field is empty
 * should return error message if field is undefined (hacking)
 * should return error message if body is non-existent (hacking)
 * should return message of validation to adding password
 * should return error message if connexion to database is broken
 */

const expect = require("expect");
const AdminCtrl = require("../../app/controllers/AdminCtrl");

describe('AdminCtrl', () => {
    describe("#constructor", () => {
        it("Should check all properties", () => {
            const adminCtrl = new AdminCtrl(true, true);

            expect(adminCtrl._passwordService).toBe(true);
        });
    });
    describe('#postAdd', () => {
        

        it('should return error message if field is empty', () => {
            let adminCtrl = new AdminCtrl();
            const req = {
                body:{
                    url: 'http://www.draw.io',
                    login: 'admin',
                    password: ''
                }
            };

            const res = {
                render: (view, data) => {
                    expect(data.message).toBe("All fields required");
                }
            };

            adminCtrl.postAdd(req, res)
        });

        it('should return message of validation to adding password', () => {
            let adminCtrl = new AdminCtrl({
                save: password => {
                    return new Promise(resolve => {
                        message: 'Password added'
                    })
                }
            });

            const req = {
                body:{
                    url: 'http://www.draw.io',
                    login: 'admin',
                    password: 'mypass'
                }
            };

            const res = {
                render: (view, data) => {
                    expect(data.message).toBe('Password added')
                }
            };

            adminCtrl.postAdd(req, res)
        });

        it('should return error message if body is non-existent (hacking)', () => {
            let adminCtrl = new AdminCtrl();
            const req = {

            };

            const res = {
                render: (view, data) => {
                    expect(data.message).toBe('All fields required');
                }
            };

            adminCtrl.postAdd(req, res)
        });

        it('should return error message if field is undefined (hacking)', () => {
            let adminCtrl = new AdminCtrl();
            const req = {
                body: {
                    password: undefined
                }
            };

            const res = {
                render: (view, data) => {
                    expect(data.message).toBe("All fields required");
                }
            };

            adminCtrl.postAdd(req, res)
        });

        it('should return error message if connexion to database is broken', () => {
            const adminCtrl = new AdminCtrl({
                    save : (login, password, url) => {
                        expect(login).toBe('toto');
                        expect(password).toBe('titi');
                        expect(url).toBe('www.google.com');

                        return new Promise((resolve, reject) => reject({
                            message: 'error'
                    }));
                }
            });

            const req = {
                body: {
                    login: 'toto',
                    password: 'titi',
                    url: 'www.google.com'
                }
            };

            const res = {
                render: (view, data) => {
                    expect(view).toBe('/admin');
                    expect(data.message).toBe('Unexpected error');
                }
            };

            adminCtrl.postAdd(req, res);
        });
    });
});