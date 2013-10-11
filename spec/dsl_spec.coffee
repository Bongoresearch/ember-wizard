describe 'EmberWizard.StepDSL', ->
  it 'has 2 steps for test controller', ->
    wizard = EmberWizard.StepDSL.map ->
      @controller 'test', ->
        @step 'wellcome', {route: '/', top: 10, left: 10}
        @step 'wellcome2', {route: '/wellcome', top: 10, left: 10}
    expect(wizard['test'].length).toEqual(2)