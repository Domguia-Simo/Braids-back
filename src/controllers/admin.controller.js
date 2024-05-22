const adminModel = require('../models/AdminMS.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        let { email, password } = req.body
        adminModel.findByEmail(email, async (err, data) => {
            if (err) {
                if (err.type === "not_found") {
                    return res.status(401).json({ error: 'Invalid email or password.' });
                } else {
                    return res.status(400).json({ message: 'Some thing went wrong check you connection and try again.' })
                }
            } else {
                console.log(data);
                const validPassword = await bcrypt.compare(password, data.password);
                if (!validPassword) {
                    return res.status(401).json({ error: 'Invalid email or password.' });
                }
                let token = jwt.sign({
                    adminID: data.adminID,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    accountType: data.accountType
                }, 'mytoken')
                adminModel.changeToken(email, token, function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).send({ message: "some errors resulted in the process" })
                    } else {
                        return res.status(200).json({ message: 'login successful', token: token })
                    }
                })
            }
        });


    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'server error' })
    }

}
const isLogin = async (req, res) => {
    try {
        // console.log(req.headers)
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(200).json({ isLogin: false, message: "Access Denied" });
            // return res.status(200).json({ isLogin: false });
        }

        const decoded_user_payload = jwt.verify(token, 'mytoken');
        let { email } = decoded_user_payload
        adminModel.findByEmailAndToken(email, token, async (err, data) => {
            if (err) {
                if (err.type === "not_found") {
                    return res.status(200).json({ isLogin: false, message: "Access Denied" });
                } else {
                    return res.status(400).json({ message: 'Some thing went wrong check you connection and try again.' })
                }
            } else {
                return res.status(200).json({ isLogin: true });
            }
        });
    } catch (err) {
        console.log(err)
        return res.status(200).json({ isLogin: false, message: "Access Denied" });
        // return res.status(200).json({ isLogin: false });
    }

}

const logout = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        console.log(authHeader)
        const token = authHeader && authHeader.split(' ')[1];
        console.log(token)
        const decoded_user_payload = jwt.verify(token, 'mytoken');
        console.log("decoded_user_payload", decoded_user_payload);
        const email = decoded_user_payload.email;
        adminModel.changeToken(email, '', function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send({ message: "some errors resulted in the process" })
            } else {
                return res.status(210).json({ message: "Logout successfully" });
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(410).json({ message: "logout" });
    }
}

const register = async (req, res) => {
    try {
        let { name, email, password, phone, confirmPassword } = req.body
        console.log(req.body)
        // Password validation
        if (password.length < 8) {
            return res.status(400).send({ message: 'Password must be at least 8 characters.' });
        }
        if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            return res.status(400).send({ message: 'Password must contain at least one lowercase letter, one uppercase letter, and one digit.' });
        }
        if (password !== confirmPassword) {
            return res.status(400).send({ message: 'Passwords do not match.' });
        }
        const hash = await bcrypt.hash(password, 9);
        let admin = new adminModel({
            name: name,
            email: email,
            phone: phone,
            password: hash,
            accountType: "ADMIN"
        })
        adminModel.create(admin, function (err, result) {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    console.log(err.sqlMessage);
                    let quoteCount = 0;
                    let index = -1;
                    let index2 = -1;
                    let currentIndex = -1;
                    do {
                        currentIndex = err.sqlMessage.indexOf("'", currentIndex + 1);
                        if (currentIndex !== -1) {
                            quoteCount++;
                            if (quoteCount === 3) {
                                index = currentIndex + 1;
                            }
                            if (quoteCount === 4) {
                                index2 = currentIndex;
                                break;
                            }
                        }
                    } while (currentIndex !== -1);
                    let errorKey = err.sqlMessage.substring(index, index2);
                    if (errorKey === 'uk_phone') {
                        return res.status(400).json({ message: 'Please change the phone, it is already use' })
                    } else if (errorKey === 'uk_email') {
                        return res.status(400).json({ message: 'Please change the email, it is already use' })
                    } else {
                        res.status(500).send({ message: "some errors resulted in the process" })
                    }
                } else {
                    res.status(500).send({ message: "some errors resulted in the process" })
                }
            } else {
                res.status(200).send({ message: "admin created successfully" });
            }
        })
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'server error' })
    }

}


module.exports = { login, register, isLogin, logout }