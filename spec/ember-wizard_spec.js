(function() {
  describe("EmberWizard.BaseStepView", function() {
    beforeEach(function() {
      return this.subject = new TestEnv();
    });
    it('positionClass', function() {
      return expect(this.subject.baseStepView.get('positionClass')).toEqual('bottom-right');
    });
    it('customClass', function() {
      return expect(this.subject.baseStepView.get('customClass')).toEqual('custom');
    });
    it('style', function() {
      return expect(this.subject.baseStepView.get('style')).toEqual('top: 10px; left: 10px;');
    });
    return it('changeStyle', function() {
      this.subject.testController.nextStepObject();
      return expect(this.subject.baseStepView.get('style')).toEqual('top: 20px; left: 20px;');
    });
  });

}).call(this);

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

(function() {
  this.TestEnv = (function() {
    function TestEnv() {
      var TestController, container, env;
      env = {};
      TestController = Ember.Controller.extend(EmberWizard.StepMixin);
      env.container = container = new Ember.Container();
      container.register('controller:application', {});
      container.register('controller:test', {});
      env.testController = TestController.create({
        container: container
      });
      env.testController._debugContainerKey = "controller:test";
      env.testController.transitionToRoute = function(type) {
        this._debugContainerKey = type;
        return this.set('wizardStep', EmberWizard.StepDSL.wizard[type][0]);
      };
      env.baseStepView = EmberWizard.BaseStepView.create({
        controller: env.testController,
        container: env.container
      });
      this.makeSteps();
      return env;
    }

    TestEnv.prototype.makeSteps = function() {
      return EmberWizard.StepDSL.map(function() {
        this.controller('test', function() {
          this.step('wellcome', {
            route: '/',
            top: 10,
            left: 10,
            pointerPosition: "left",
            "class": 'custom'
          });
          return this.step('wellcome2', {
            route: '/wellcome',
            top: 20,
            left: 20
          });
        });
        return this.controller('next', function() {
          return this.step('next_wellcome', {
            route: 'next',
            top: 10,
            left: 10
          });
        });
      });
    };

    return TestEnv;

  })();

}).call(this);

(function() {
  describe("EmberWizard.StepMixin", function() {
    beforeEach(function() {
      return this.subject = new TestEnv();
    });
    it('get step by name', function() {
      return expect(this.subject.testController.get('wizardStep').stepName).toEqual('wellcome');
    });
    it('get next step', function() {
      this.subject.testController.nextStepObject();
      return expect(this.subject.testController.get('wizardStep').stepName).toEqual('wellcome2');
    });
    it('isLastStep', function() {
      expect(this.subject.testController.get('isLastStep')).toBe(false);
      this.subject.testController.nextStepObject();
      return expect(this.subject.testController.get('isLastStep')).toBe(true);
    });
    it('nextController', function() {
      return expect(this.subject.testController.nextController()).toEqual('next');
    });
    return it('isFinished', function() {
      expect(this.subject.testController.get('isFinishedStep')).toBe(false);
      this.subject.testController.nextStepObject();
      expect(this.subject.testController.get('isFinishedStep')).toBe(false);
      this.subject.testController.nextStepObject();
      return expect(this.subject.testController.get('isFinishedStep')).toBe(true);
    });
  });

}).call(this);
