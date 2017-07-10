const expect = require("expect")
const AdminCtrl = require("../../app/controllers/AdminCtrl")

describe('AdminCtrl', () => {
    describe('#postAdd', () => {
        let adminCtrl = new AdminCtrl()
        // beforeEach(() => {
        //     expect(adminCtrl._password).toBe(null)
        // });

        // afterEach(() => {
        //     expect(adminCtrl._password).toNotBe("");
        // });

        it('should return error message if field is empty', () => {
            adminCtrl._password = ""

            const req = {
                body:{
                    password: 'mypass'
                }
            }

            const res = {
                render: (view, data) => {
                    expect(data.pass).toBe('mypass');
                }
            }

            adminCtrl.postAdd(req, res)
        });
    });
});