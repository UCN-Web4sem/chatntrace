var admin = require("firebase-admin");

var serviceAccount = require("../firebase-admin.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://chatntrace-3e373.firebaseio.com"
});

var db = admin.database();
module.exports = db.ref("chatntrace/");
