const bll = require("../bll");
const model = require("../model");
describe("User", function() {
	describe("#create()", function() {
		it("should save without error", function(done) {
			bll.userFacade.create("NiklasTest", (err, usr) => {
				if (err) {
					done(err);
				}
				done();
			});
		});
	});
});
