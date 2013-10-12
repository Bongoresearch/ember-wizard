describe "EmberWizard.BaseStepView", ->
  beforeEach ->
    @subject = new TestEnv()

  it 'positionClass', ->
    expect(@subject.baseStepView.get('positionClass')).toEqual('bottom-right')