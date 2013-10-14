describe "EmberWizard.StepMixin", ->
  beforeEach ->
    @subject = new TestEnv()

  it 'get step by name', ->
    expect(@subject.testController.get('wizardStep').stepName).toEqual('wellcome')

  it 'get next step', ->
    @subject.testController.nextStepObject()
    expect(@subject.testController.get('wizardStep').stepName).toEqual('wellcome2')

  it 'get prev step', ->
    @subject.testController.nextStepObject()
    @subject.testController.prevStepObject()
    expect(@subject.testController.get('wizardStep').stepName).toEqual('wellcome')

  it 'isFirstStep', ->
    expect(@subject.testController.get('isFirstStep')).toBe true
    @subject.testController.nextStepObject()
    expect(@subject.testController.get('isFirstStep')).toBe false

  it 'isLastStep', ->
    expect(@subject.testController.get('isLastStep')).toBe false
    @subject.testController.nextStepObject()
    expect(@subject.testController.get('isLastStep')).toBe true

  it 'nextController', ->
    expect(@subject.testController.nextController()).toEqual 'next'

  it 'prevController', ->
    @subject.testController.nextStepObject()
    @subject.testController.nextStepObject()
    expect(@subject.testController.prevController()).toEqual 'test'

  it 'isFinished', ->
    expect(@subject.testController.get('isFinishedStep')).toBe false
    @subject.testController.nextStepObject()
    expect(@subject.testController.get('isFinishedStep')).toBe false
    @subject.testController.nextStepObject()
    expect(@subject.testController.get('isFinishedStep')).toBe true