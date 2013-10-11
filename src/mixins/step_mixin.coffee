EmberWizard.StepMixin = Ember.Mixin.create
  needs: ['application']

  isWizardState: Ember.computed.alias('controllers.application.isWizardState')

  actions:
    nextStep: ->
      @nextStepObject()

    exitWizard: ->
      @set('isWizardState', false)

  wizardStep: (->
    EmberWizard.StepDSL.wizard[@_controllerName()][0]
  ).property()

  _controllerName: ->
    @_debugContainerKey.replace('controller:', '')

  nextStepObject: ->
    index = EmberWizard.StepDSL.wizard[@_controllerName()].indexOf(@get('wizardStep'))
    if EmberWizard.StepDSL.wizard[@_controllerName()][index+1]
      @set('wizardStep', EmberWizard.StepDSL.wizard[@_controllerName()][index+1])
    else
      next = @_nextController()
      if next
        @transitionToRoute(next.route)
      else
        @set('isWizardState', false)

  isLastStep: ->
    index = EmberWizard.StepDSL.wizard[@_controllerName()].indexOf(@get('wizardStep'))
    return false if EmberWizard.StepDSL.wizard[@_controllerName()][index+1]

  _nextController: ->
    return false if EmberWizard.keys(EmberWizard.StepDSL.wizard).length == 1
    index = Ember.keys(EmberWizard.StepDSL.wizard).indexOf(@_controllerName())
    return Ember.keys(EmberWizard.StepDSL.wizard)[index + 1]