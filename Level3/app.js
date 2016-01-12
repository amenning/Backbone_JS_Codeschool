	var Appointment = Backbone.Model.extend({});
	var appointment = new Appointment();
	appointment.set('title', 'My knee hurts');

	var AppointmentView = Backbone.View.extend({
		tagName: 'li',
		className: 'appointment',
		template: _.template('<span><%= title %></span>'),
		events: { "dblclick span": "alertTitle" },
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
