import jwt from "jsonwebtoken"

const SECREY_KEY = "SECREY_KEY_HERe!"

function checkLogin () {
  return (req, res, next) => {
    let userToken = req.get("Authorization")
    userToken = userToken.split(" ")[1]

    let userData
    try {
      userData = jwt.verify(userToken, SECREY_KEY)
    } catch (e) {
      return res.status(500).send("UNATHORIZED")
    }

    req.user = { username: userData.username }
    next()
  }
}

export { checkLogin }