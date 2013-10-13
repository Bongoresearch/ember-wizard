(function() {
  this.EmberWizard = Ember.Namespace.create({
    VERSION: '1.0.0'
  });

}).call(this);

(function() {
  EmberWizard.StepDSL = (function() {
    StepDSL.wizard = {};

    StepDSL.map = function(fun) {
      this.wizard = {};
      fun.call(new EmberWizard.StepDSL(this.wizard));
      return this.wizard;
    };

    function StepDSL(wizard) {
      this.wizard = wizard;
    }

    StepDSL.prototype.controller = function(name, fun) {
      this.wizard[name] = [];
      return fun.call(new EmberWizard.StepDSL(this.wizard[name]));
    };

    StepDSL.prototype.step = function(name, options) {
      var step;
      step = {
        stepName: name,
        options: this._defaults(options)
      };
      return this.wizard.push(step);
    };

    StepDSL.prototype._defaults = function(options) {
      options.templateName || (options.templateName = "_default_step");
      return options;
    };

    return StepDSL;

  })();

  /*
    Params:
      String route - for route to step controller
      String title - use in template as view.title for each step
      Array  content - all text in step wraps in 'p.text-small'
      String pointerPosition - 'left' or 'center', default: 'center'
      Number top - use for position wizard element on top
      Numbet left - use for position wizard element on left
      String htmlContext - valid jquery syntax selector for auto positions step element
      String templateName - path to template
  */


}).call(this);

(function() {
  EmberWizard.StepMixin = Ember.Mixin.create({
    needs: ['application'],
    isWizardState: Ember.computed.alias('controllers.application.isWizardState'),
    wizardNextLinkTitle: "next step",
    wizardExitLinkTitle: "exit from wizard",
    actions: {
      nextStep: function() {
        return this.nextStepObject();
      },
      exitWizard: function() {
        return this.set('isWizardState', false);
      }
    },
    wizardStep: (function() {
      return EmberWizard.StepDSL.wizard[this._controllerName()][0];
    }).property(),
    isLastStep: (function() {
      var index;
      index = EmberWizard.StepDSL.wizard[this._controllerName()].indexOf(this.get('wizardStep'));
      if (EmberWizard.StepDSL.wizard[this._controllerName()][index + 1]) {
        return false;
      }
      return true;
    }).property('wizardStep'),
    isFinishedStep: (function() {
      if (!this.nextController()) {
        return true;
      }
      return false;
    }).property('wizardStep'),
    nextController: function() {
      var index;
      if (Ember.keys(EmberWizard.StepDSL.wizard).length === 1) {
        return false;
      }
      index = Ember.keys(EmberWizard.StepDSL.wizard).indexOf(this._controllerName());
      return Ember.keys(EmberWizard.StepDSL.wizard)[index + 1];
    },
    nextControllerStepObject: function() {
      var controller;
      controller = this.nextController();
      if (!controller) {
        return;
      }
      return EmberWizard.StepDSL.wizard[controller][0];
    },
    nextStepObject: function() {
      var index, next;
      index = EmberWizard.StepDSL.wizard[this._controllerName()].indexOf(this.get('wizardStep'));
      if (!this.get('isLastStep')) {
        return this.set('wizardStep', EmberWizard.StepDSL.wizard[this._controllerName()][index + 1]);
      } else {
        next = this.nextControllerStepObject();
        if (next) {
          return this.transitionToRoute(next.options.route);
        } else {
          return this.set('isWizardState', false);
        }
      }
    },
    _controllerName: function() {
      return this._debugContainerKey.replace('controller:', '');
    }
  });

}).call(this);

(function() {
  EmberWizard.Route = Ember.Route.extend({
    renderTemplate: function(controller, model) {
      if (controller.get('wizardStep') && controller.get('isWizardState')) {
        return this.render("wizard_step", {
          outlet: "wizard",
          controller: controller
        });
      }
    }
  });

}).call(this);

(function() {
  EmberWizard.BaseStepView = Ember.View.extend({
    title: Ember.computed.alias('controller.wizardStep.options.title'),
    content: Ember.computed.alias('controller.wizardStep.options.content'),
    htmlContext: Ember.computed.alias('controller.wizardStep.options.htmlContext'),
    pointerPosition: Ember.computed.alias('controller.wizardStep.options.pointerPosition'),
    nextLinkTitle: Ember.computed.alias('controller.wizardNextLinkTitle'),
    exitLinkTitle: Ember.computed.alias('controller.wizardExitLinkTitle'),
    attributeBindings: ['style', 'class'],
    classNameBindings: ['positionClass', 'customClass'],
    positionClass: (function() {
      if (this.get('pointerPosition') === "left") {
        return 'bottom-right';
      }
    }).property('pointerPosition'),
    customClass: (function() {
      return this.get('controller.wizardStep.options.class');
    }).property('pointerPosition'),
    didInsertElement: function() {
      var style;
      style = "top: %@px; left: %@px;".fmt(this.top(), this.left());
      return this.set('style', style);
    },
    actions: {
      nextStep: function() {
        return this.get('controller').send('nextStep');
      },
      exitWizard: function() {
        return this.get('controller').send('exitWizard');
      }
    },
    style: (function() {
      return "";
    }).property('controller.wizardStep'),
    changeStyle: (function() {
      var style;
      style = "top: %@px; left: %@px;".fmt(this.top(), this.left());
      return this.set('style', style);
    }).observes('controller.wizardStep'),
    top: function() {
      var $el;
      if (this.get('htmlContext')) {
        $el = this._contextHTMLobject();
        return $el.position().top + $el.outerHeight() / this._positionTop();
      } else {
        return this.get('controller.wizardStep.options.top') || 0;
      }
    },
    left: function() {
      var $el;
      if (this.get('htmlContext')) {
        $el = this._contextHTMLobject();
        return $el.position().left + $el.outerWidth() / this._positionLeft();
      } else {
        return this.get('controller.wizardStep.options.left') || 0;
      }
    },
    _contextHTMLobject: function() {
      return $(this.get('htmlContext'));
    },
    _positionLeft: function() {
      if (this.get('pointerPosition') === "left") {
        return 1;
      }
      return 2;
    },
    _positionTop: function() {
      if (!this.get('pointerPosition') || this.get('pointerPosition') === "center") {
        return 1;
      }
      return 2;
    }
  });

}).call(this);

(function() {
  EmberWizard.DefaultStepView = EmberWizard.BaseStepView.extend({
    classNames: ['intro']
  });

}).call(this);
