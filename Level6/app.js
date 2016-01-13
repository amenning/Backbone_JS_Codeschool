var Appointment = Backbone.Model.extend({
	defaults: {
		cancelled : false
	},
	cancel: function(){
		this.set({'cancelled' : true});
	}	
});

var AppointmentView = Backbone.View.extend({
	tagName: 'li',
	className: 'appointment',
	template: _.template('<span class="<% if(cancelled) print("cancelled") %>">' +
                        '<%= title %></span>' + ' ' +
                        '<a href="#">x</a>'),
	events: { 
		"dblclick span": "alertTitle",
		"click a": "remove"
	},
	initialize: function(){
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
		this.model.on('hide', this.remove, this);
	},
	cancel: function(){
		this.model.cancel();
	},
	alertTitle: function(){
		alert(this.model.get('title'));
	},
	render: function(){
		var attributes = this.model.toJSON();
		this.$el.html(this.template(attributes));
		return this;
	},
	remove: function(){
		this.$el.remove();
	}
});

var AppointmentList = Backbone.Collection.extend({
	model: Appointment,
	initialize: function(){
		this.on('remove', this.hideModel);
	},
	hideModel: function(model){
		model.trigger('hide');
	}	
}); 

var appointments = new AppointmentList();
appointments.on('reset', function(){
	alert(this.length);
});
appointments.on('add', function(appointments){
	console.log(appointments.get('title'));
});

var json = [
  {title: 'Back pain'},
  {title: 'Dry mouth'},
  {title: 'Headache'} 
];
appointments.reset(json);

var AppointmentListView = Backbone.View.extend({
  initialize: function(){
	this.collection.on('add', this.addOne, this);
	this.collection.on('reset', this.render, this);
  },
  render: function(){
    this.collection.forEach(this.addOne, this);
	return this;
  },
  addOne: function(model){
    var appointmentView = new AppointmentView({model: model});
    appointmentView.render();
    this.$el.append(appointmentView.el);
  }
});

var appointmentsView = new AppointmentListView({collection: appointments}); 
$('#app').html(appointmentsView.render().el);


