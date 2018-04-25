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
});
