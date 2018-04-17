var admin = require("firebase-admin");

var serviceAccount = require("../chatntrace-3e373-firebase-adminsdk-52qn0-fd1b722866.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://chatntrace-3e373.firebaseio.com"
});

var db = admin.database();
module.exports = db.ref("chatntrace/");
