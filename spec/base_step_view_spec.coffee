describe "EmberWizard.BaseStepView", ->
  beforeEach ->
    @subject = new TestEnv()

  it 'positionClass', ->
    expect(@subject.baseStepView.get('positionClass')).toEqual('bottom-right')

  it 'customClass', ->
    expect(@subject.baseStepView.get('customClass')).toEqual('custom')

  # it 'style', ->
  #   expect(@subject.baseStepView.get('style')).toEqual('top: 10px; left: 10px;')

  it 'changeStyle', ->
    @subject.testController.nextStepObject()
    expect(@subject.baseStepView.get('style')).toEqual('top: 20px; left: 20px;')