import admin from "firebase-admin";

export const checkAuth = (req, res, next) => {
  const { cookie } = req.headers;

  // Get the access token from the secure cookie named "accessToken"
  const accessToken =
    cookie &&
    cookie
      .split(";")
      .find((c) => c.trim().startsWith("accessToken="))
      ?.split("=")[1];

  if (accessToken) {
    verifyIdToken(accessToken);
  } else {
    // No access token provided in the request cookies
    res.status(401).json({ error: "Access token cookie missing or invalid" });
  }

  function verifyIdToken(token) {
    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        req.user = decodedToken; // Store the decoded token in the request object
        next(); // Proceed to the next middleware or route handler
      })
      .catch((error) => {
        // Token verification failed
        res.status(401).json({ error: "Invalid access token" });
      });
  }
};
