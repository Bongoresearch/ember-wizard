class @TestEnv
  constructor: ->
    env = {}
    TestController = Ember.Controller.extend(EmberWizard.StepMixin)
    env.container = container = new Ember.Container()
    container.register('controller:application', {})
    container.register('controller:test', {})
    env.testController = TestController.create({ container: container })
    env.testController._debugContainerKey = "controller:test"
    env.testController.transitionToRoute = (type) ->
      @_debugContainerKey = type
      @set('wizardStep', EmberWizard.StepDSL.wizard[type][0])
    env.baseStepView = EmberWizard.BaseStepView.create(controller: env.testController, container: env.container)
    @makeSteps()
    return env

  makeSteps: ->
    EmberWizard.StepDSL.map ->
      @controller 'test', ->
        @step 'wellcome', {route: '/', top: 10, left: 10, pointerPosition: "left"}
        @step 'wellcome2', {route: '/wellcome', top: 10, left: 10}

      @controller 'next', ->
        @step 'next_wellcome', {route: 'next', top: 10, left: 10}