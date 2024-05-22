const jwt = require('jsonwebtoken')

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
                // return res.status(200).json({ isLogin: true });
                next();
            }
        });
    } catch (err) {
        console.log(err)
        return res.status(200).json({ isLogin: false, message: "Access Denied" });
        // return res.status(200).json({ isLogin: false });
    }

}
module.exports = isLogin