EmberWizard.Route = Ember.Route.extend
  renderTemplate: (controller, model) ->
    if controller.get('wizardStep') && controller.get('isWizardState')
      @render("wizard_step",
        outlet: "wizard",
        controller: controller
      )