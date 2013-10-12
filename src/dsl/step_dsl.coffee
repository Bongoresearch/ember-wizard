class EmberWizard.StepDSL

  @wizard: {}

  @nextLinkTitle: "next step"
  @exitLinkTitle: "exit from wizard"

  @map: (fun) ->
    @wizard = {}
    fun.call(new EmberWizard.StepDSL(@wizard))
    @wizard

  constructor: (@wizard) ->

  controller: (name, fun) ->
    @wizard[name] = []
    fun.call(new EmberWizard.StepDSL(@wizard[name]))

  step: (name, options) ->
    step =
      stepName: name
      options: @_defaults(options)
    @wizard.push(step)

  _defaults: (options) ->
    options.templateName ||= "_default_step"
    options

###
  Params:
    String route - for route to step controller
    String title - use in template as view.title for each step
    Array  content - all text in step wraps in 'p.text-small'
    String pointerPosition - 'left' or 'center', default: 'center'
    Number top - use for position wizard element on top
    Numbet left - use for position wizard element on left
    String htmlContext - valid jquery syntax selector for auto positions step element
    String templateName - path to template
###