import jwt from 'jsonwebtoken'

export const generateToken = (userInfo) => {

    return jwt.sign(
        {
            userInfo
        },
        process.env.JWTSECRET,
        {
            expiresIn: '1d'
        }
    )

}

export const isAuth = (req, res, next) => {

    //  if createUser, its will not be needed to check token
    if (req.body.createUser === true) {

        next()

    }
    else {

        const authorization = req.headers.authorization;

        if (!authorization) {

            return res.status(404).json({ message: 'Authorization not found' })

        }

        //gets token after BEARER ******
        const token = authorization.slice(7, authorization.length)

        jwt.verify(
            token, process.env.JWTSECRET, (err, decode) => {

                if (err) {
                    return res.status(401).json({ message: 'Invalid Token' })
                }
                else {
                    req.user = decode;
                    next();
                }

            }
        )
    }

}