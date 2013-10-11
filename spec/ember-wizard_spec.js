(function() {
  describe('EmberWizard.StepDSL', function() {
    return it('has 2 steps for test controller', function() {
      var wizard;
      wizard = EmberWizard.StepDSL.map(function() {
        return this.controller('test', function() {
          this.step('wellcome', {
            route: '/',
            top: 10,
            left: 10
          });
          return this.step('wellcome2', {
            route: '/wellcome',
            top: 10,
            left: 10
          });
        });
      });
      return expect(wizard['test'].length).toEqual(2);
    });
  });

}).call(this);
