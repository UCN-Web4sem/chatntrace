const bll = require("../bll");
const model = require("../model");
describe("lobby", function() {
	describe("#create()", function() {
		it("should save without error", function(done) {
			bll.lobbyFacade.create("TestLobby", (err, lob) => {
				if (err) {
					done(err);
				}
				done();
			});
		});
	});
	describe("#JoinALobby", function() {
		it("should run without error", function(done) {
			bll.userFacade.create("TestJoinALobby", function(err, user) {
				if (err) {
					done(err);
				}
				bll.lobbyFacade.create("TestJoinALobby", function(err, lobby) {
					if (err) {
						done(err);
					}
					bll.lobbyFacade.addUserToLobby(lobby, user, function(err) {
						if (err) {
							done(err);
						}
						done();
					});
				});
			});
		});
	});
	describe("#leaveALobby", function() {
		it("should run without error", function(done) {
			bll.userFacade.create("TestLeaveALobby", function(err, user) {
				if (err) {
					done(err);
				}
				bll.lobbyFacade.create("TestLeaveALobby", function(err, lobby) {
					if (err) {
						done(err);
					}
					bll.lobbyFacade.addUserToLobby(lobby, user, function(err) {
						console.log(lobby.id);
						console.log(user.id);
						if (err) {
							done(err);
						}
						bll.lobbyFacade.removeUserFromLobby(lobby, user, function(err) {
							if (err) {
								done(err);
							}
							done();
						});
					});
				});
			});
		});
	});
});
