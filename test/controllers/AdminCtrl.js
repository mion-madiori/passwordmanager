/**
 * use case:
 * #postAdd
 * should return error message if field is empty
 * should return error message if field is undefined (hacking)
 * should return error message if body is non-existent (hacking)
 * should return message of validation to adding password
 * should return error message if connexion to database is broken
 *
 * #putAdd
 *  Should return a message to confirm password has been updated with success
 *  Should return a message to confirm data has been updated with success for this entry
 *  Should return an error message when one field or more is empty
 *  Should return an error message when the database is inaccessible
 *
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
        let adminCtrl = new AdminCtrl();

        it('should return error message if field is empty', () => {

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
            const adminCtrl = new AdminCtrl({}, {
                postAdd: (login, password, url) => {
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
                    expect(view).toBe('registration');
                    expect(data.message).toBe('Unexpected error');
                }
            };

            adminCtrl.postAdd(req, res);
        });
    });


    describe("#putAdd", () => {
        let adminCtrl = new AdminCtrl();

        it('Should return a message to confirm password has been updated with success', () => {
            const req = {
                body:{
                    url: 'http://www.google.com',
                    login: 'm.telrom',
                    password: 'myPassword'
                }
            };

            const res = {
                render: (view, data) => {
                    expect(data.message).toBe("Password of this entry has been successfully updated");
                }
            };

            adminCtrl.putAdd(req, res)
        });

        it('Should return a message to confirm data has been updated with success for this entry', () => {
            const req = {
                body: {
                    url: 'http://www.google.fr',
                    login: 'm.telrom',
                    password: 'veryStrongPassword'
                }
            };

            const res = {
                render: (view, data) => {
                    expect(data.message).toBe("Data of this entry has been successfully updated");
                }
            };

            adminCtrl.putAdd(req, res)
        });

        it('Should return an error message when one field or more is empty', () => {
            const req = {
                body: {
                    url: 'http://www.google.fr',
                    login: '',
                    password: 'veryStrongPassword'
                }
            };

            const res = {
                render: (view, data) => {
                    expect(data.message).toBe("All fields are required");
                }
            };

            adminCtrl.putAdd(req, res)
        });

        it('Should return an error message when the database is inaccessible', () => {
            const adminCtrl = new AdminCtrl({}, {
                putAdd: (login, password, url) => {
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
                    expect(view).toBe('admin/listAdmin');
                    expect(data.message).toBe('Unexpected error');
                }
            };
            adminCtrl.putAdd(req, res);
        });
    });

});