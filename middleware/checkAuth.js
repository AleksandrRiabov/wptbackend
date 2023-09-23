import admin from "firebase-admin";

export const checkAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer ")) {
    const accessToken = authorization.slice(7); // Remove "Bearer " prefix

    // Verify the access token using the Firebase Admin SDK
    admin
      .auth()
      .verifyIdToken(accessToken)
      .then((decodedToken) => {
        req.user = decodedToken; // Store the decoded token in the request object
        console.log(decodedToken)
        next(); // Proceed to the next middleware or route handler
      })
      .catch((error) => {
        // Token verification failed
        res.status(401).json({ error: "Invalid access token" });
      });
  } else {
    // No access token provided in the request headers
    res.status(401).json({ error: "Access token missing or invalid" });
  }
};
