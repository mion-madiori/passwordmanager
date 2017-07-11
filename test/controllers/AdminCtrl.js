/**
 * use case:
 * should return error message if field is empty
 * should return error message if field is undefined (hacking)
 * should return error message if body is empty (hacking)
 * should return message of validation to adding password
 */

const expect = require("expect")
const AdminCtrl = require("../../app/controllers/AdminCtrl")

describe('AdminCtrl', () => {
    describe('#postAdd', () => {
        let adminCtrl = new AdminCtrl()

        it('should return error message if field is empty', () => {

            const req = {
                body:{
                    password: ''
                }
            }

            const res = {
                render: (view, data) => {
                    expect(view).toBe('error')
                    expect(data.message).toBe("Password field required");
                }
            }

            adminCtrl.postAdd(req, res)
        });

        it('should return message of validation to adding password', () => {
            const req = {
                body:{
                    password: 'mypass'
                }
            }

            const res = {
                render: (view, data) => {
                    expect(view).toBe("ok")
                    expect(data.message).toBe('password added')
                }
            }

            adminCtrl.postAdd(req, res)
        });

        it('should return error message if body is non-existent (hacking)', () => {
            const req = {

            }

            const res = {
                render: (view, data) => {
                    expect(view).toBe("error")
                    expect(data.message).toBe('Body is undefined');
                }
            }

            adminCtrl.postAdd(req, res)
        })

        it('should return error message if field is undefined (hacking)', () => {
            const req = {
                body: {
                    password: undefined
                }
            }

            const res = {
                render: (view, data) => {
                    expect(view).toBe("error")
                    expect(data.message).toBe("Password is undefined");
                }
            }

            adminCtrl.postAdd(req, res)
        });
    });
});