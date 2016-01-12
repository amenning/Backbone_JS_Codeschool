var Appointment = Backbone.Model.extend({
	defaults: {
		cancelled : false
	},
	cancel: function(){
		this.set({'cancelled' : true});
		console.log(this.get('cancelled'));
	}	
});
var appointment = new Appointment();
appointment.set('title', 'My knee hurts');


var AppointmentView = Backbone.View.extend({
	tagName: 'li',
	className: 'appointment',
	template: _.template('<span class="<% if(cancelled) print("cancelled") %>">' +
                        '<%= title %></span>' + ' ' +
                        '<a href="#">x</a>'),
	events: { 
		"dblclick span": "alertTitle",
		"click a": "cancel"
	},
	initialize: function(){
		this.model.on('change', this.render, this);
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
	}
});

var appointmentView = new AppointmentView({model: appointment});

appointmentView.render(); 
$('#app').html(appointmentView.el);
