Ember.TEMPLATES["_default_step"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes;
  data.buffer.push("<p class=\"text-small\">");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  stack1 = helpers._triageMustache.call(depth0, "paragraph", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

  data.buffer.push("<div class=\"arrow\"></div><div class=\"content\"><div class=\"h4\">");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  stack1 = helpers._triageMustache.call(depth0, "view.title", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "paragraph", "in", "view.content", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("<div class=\"nav\"><a class=\"red-link\" href=\"#\" ");
  hashContexts = {'target': depth0,'on': depth0};
  hashTypes = {'target': "STRING",'on': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "nextStep", {hash:{
    'target': ("view"),
    'on': ("click")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.nextLinkTitle", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a><a class=\"grey-link\" href=\"#\" ");
  hashContexts = {'target': depth0,'on': depth0};
  hashTypes = {'target': "STRING",'on': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "exitWizard", {hash:{
    'target': ("view"),
    'on': ("click")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.exitLinkTitle", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a></div></div>");
  return buffer;
  
});

Ember.TEMPLATES["wizard_step"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var hashContexts, hashTypes;
  hashContexts = {'templateNameBinding': depth0};
  hashTypes = {'templateNameBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "EmberWizard.DefaultStepView", {hash:{
    'templateNameBinding': ("controller.wizardStep.options.templateName")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  }

function program3(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.isWizardState", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});