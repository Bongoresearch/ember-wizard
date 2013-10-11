EmberWizard.BaseStepView = Ember.View.extend

  title: Ember.computed.alias('controller.wizardStep.options.title')
  content: Ember.computed.alias('controller.wizardStep.options.content')
  htmlContext: Ember.computed.alias('controller.wizardStep.options.htmlContext')
  pointerPosition: Ember.computed.alias('controller.wizardStep.options.pointerPosition')

  nextLinkTitle: EmberWizard.StepDSL.nextLinkTitle
  exitLinkTitle: EmberWizard.StepDSL.exitLinkTitle

  attributeBindings: ['style', 'class']
  classNameBindings: ['positionClass', 'customClass']

  positionClass:(->
    return 'bottom-right' if @get('pointerPosition') == "left"
  ).property('pointerPosition')

  customClass:(->
    @get('controller.wizardStep.options.class')
  ).property('pointerPosition')

  didInsertElement: ->
    style = "top: %@; left: %@px;".fmt(@top(), @left())
    @set('style', style)

  actions:
    nextStep: ->
      @get('controller').send('nextStep')

    exitWizard: ->
      @get('controller').send('exitWizard')

  style: (->
    ""
  ).property('controller.wizardStep')

  changeStyle:(->
    style = "top: %@px; left: %@px;".fmt(@top(), @left())
    @set('style', style)
  ).observes('controller.wizardStep')

  top: ->
    if @get('htmlContext')
      $el = @_contextHTMLobject()
      $el.position().top + $el.outerHeight()/@_positionTop()
    else
      @get('controller.wizardStep.options.top') || 0

  left: ->
    if @get('htmlContext')
      $el = @_contextHTMLobject()
      $el.position().left + $el.outerWidth()/@_positionLeft()
    else
      @get('controller.wizardStep.options.left') || 0

  _contextHTMLobject: ->
    $(@get('htmlContext'))

  _positionLeft: ->
    return 1 if @get('pointerPosition') == "left"
    2

  _positionTop: ->
    return 1 if !@get('pointerPosition') ||  @get('pointerPosition') == "center"
    return 2