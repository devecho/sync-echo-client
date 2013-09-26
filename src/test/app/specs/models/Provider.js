define([
	'models/Provider'
], function(Provider) {
	describe('models.Provder', function() {
		it('has a urlRoot', function() {
			expect(Provider.prototype.urlRoot.length).toBeGreaterThan(0);
		});
	});
});