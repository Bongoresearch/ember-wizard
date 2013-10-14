EmberWizard.StepMixin = Ember.Mixin.create
  needs: ['application']

  isWizardState: Ember.computed.alias('controllers.application.isWizardState')

  wizardNextLinkTitle: "next step"
  wizardExitLinkTitle: "exit from wizard"

  actions:
    nextStep: ->
      @nextStepObject()

    exitWizard: ->
      @set('isWizardState', false)

  wizardStep: (->
    EmberWizard.StepDSL.wizard[@_controllerName()][0]
  ).property()

  isLastStep: (->
    index = EmberWizard.StepDSL.wizard[@_controllerName()].indexOf(@get('wizardStep'))
    return false if EmberWizard.StepDSL.wizard[@_controllerName()][index+1]
    true
  ).property('wizardStep')

  isFirstStep:(->
    index = EmberWizard.StepDSL.wizard[@_controllerName()].indexOf(@get('wizardStep'))
    return true if !@prevController() && index == 0
    false
  ).property('wizardStep')

  isFinishedStep:(->
    return true unless @nextController()
    false
  ).property('wizardStep')

  nextController: ->
    return false if Ember.keys(EmberWizard.StepDSL.wizard).length == 1
    index = Ember.keys(EmberWizard.StepDSL.wizard).indexOf(@_controllerName())
    return Ember.keys(EmberWizard.StepDSL.wizard)[index + 1]

  prevController: ->
    return false if Ember.keys(EmberWizard.StepDSL.wizard).length == 1
    index = Ember.keys(EmberWizard.StepDSL.wizard).indexOf(@_controllerName())
    return Ember.keys(EmberWizard.StepDSL.wizard)[index - 1]

  prevControllerStepObject: ->
    controller = @prevController()
    return unless controller
    length = EmberWizard.StepDSL.wizard[controller].length
    EmberWizard.StepDSL.wizard[controller][length-1]

  nextControllerStepObject: ->
    controller = @nextController()
    return unless controller
    EmberWizard.StepDSL.wizard[controller][0]

  nextStepObject: ->
    index = EmberWizard.StepDSL.wizard[@_controllerName()].indexOf(@get('wizardStep'))
    if !@get('isLastStep')
      @set('wizardStep', EmberWizard.StepDSL.wizard[@_controllerName()][index+1])
    else
      next = @nextControllerStepObject()
      if next
        @transitionToRoute(next.options.route)
      else
        @set('isWizardState', false)

  prevStepObject: ->
    index = EmberWizard.StepDSL.wizard[@_controllerName()].indexOf(@get('wizardStep'))
    prev = EmberWizard.StepDSL.wizard[@_controllerName()][index-1]
    if prev
      @set('wizardStep', prev)
    else
      prev = @prevControllerStepObject()
      if prev
        @transitionToRoute(prev.options.route)


  _controllerName: ->
    @_debugContainerKey.replace('controller:', '')