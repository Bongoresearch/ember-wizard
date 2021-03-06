describe "EmberWizard.BaseStepView", ->
  beforeEach ->
    @subject = new TestEnv()

  it 'positionClass', ->
    expect(@subject.baseStepView.get('positionClass')).toEqual('bottom-right')

  it 'customClass', ->
    expect(@subject.baseStepView.get('customClass')).toEqual('custom')

  it 'changeStyle', ->
    @subject.testController.nextStepObject()
    expect(@subject.baseStepView.get('style')).toEqual('top: 20px; left: 20px;')

  it '_positionLeft', ->
    expect(@subject.baseStepView._positionLeft()).toEqual(1)

  it '_positionTop', ->
    expect(@subject.baseStepView._positionLeft()).toEqual(1)

  it 'next link title', ->
    expect(@subject.baseStepView.get('nextLinkTitle')).toEqual('next step')