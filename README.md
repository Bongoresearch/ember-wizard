ember-wizard
============

### First create some steps with controllers:

```
    EmberWizard.StepDSL.map ->

      @controller 'timeline', ->
        @step 'timelime', {
          title: "Timline",
          content: ['timeline actions'],
          route: '/timeline', top: 145, left: 175
        }

        @step 'products', {
          title: "Products",
          content: ['First product',
                    'Second product'],
          route: '/timeline', top: 170, left: 130, pointerPosition: "left"
        }

        @step 'payments', {
          title: "Payments",
          content: ['phone payments <br>',
                    'TV payments'],
          route: '/timeline', top: 280, left: 130, pointerPosition: "left"
        }

        @step 'transactions', {
          title: "Transactions"
          content: ['transaction 1',
                    'transactions 2'],
          route: '/timeline', top: 390, left: 130, pointerPosition: "left"
        }

        @step 'settings', {
          title: "Settings",
          content: ['Change Login']
          route: '/timeline', top: 60, left: 140, class: "bottom"
        }
```

* Next extend your router from `Ember.Wizard.Route`
* Your controller must have `EmberWizard.StepMixin`
* For turn on wizard, you must set to Application Controller or your controller `isWizardState` to true
