const connection = require('../config/db')

const adminModel = function (model) {
    this.adminID = model.adminID
    this.name = model.name
    this.email = model.email
    this.phone = model.phone
    this.token = model.token
    this.password = model.password
    this.accountType = model.accountType
};

adminModel.create = (newAdmin, result) => {
    connection.query("INSERT INTO Admin SET name = ? ,email = ? ,phone = ? ,token = '' ,password = ? ,accountType = ?",
        [
            newAdmin.name,
            newAdmin.email,
            newAdmin.phone,
            newAdmin.password,
            newAdmin.accountType,
        ]
        , (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created Admin: ", { ...newAdmin });
            result(null, { ...newAdmin });
        });
};
adminModel.findByEmail = (email, result) => {
    connection.query(`SELECT * FROM Admin WHERE email = '${email}' `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("found Admin: ", res);

        if (res.length) {
            // console.log("found Admin: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ type: "not_found" }, null);
    });
};
adminModel.findByEmailAndToken = (email, token, result) => {
    connection.query(`SELECT * FROM Admin WHERE email = '${email}'
    AND token ='${token}' `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("found Admin: ", res);

        if (res.length) {
            // console.log("found Admin: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ type: "not_found" }, null);
    });
};
adminModel.changeToken = (email, token, result) => {
    connection.query(`UPDATE Admin SET token = ? WHERE email = '${email}'`,
        [
            token
        ]
        , (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Admin with the id
                result({ type: "not_found" }, null);
                return;
            }

            // console.log("updated Book: ", { token });
            result(null, res);
        });
};
// adminModel.findByEmailOrPhone = (email,phone, result) => {
//     connection.query(`SELECT * FROM Admin WHERE email = '${email}' OR phone = '${phone}'`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }

//         if (res.length) {
//             console.log("found Admin: ", res[0]);
//             result(null, res[0]);
//             return;
//         }

//         // not found Admin with the id
//         result({ type: "not_found" }, null);
//     });
// };
module.exports = adminModel;
