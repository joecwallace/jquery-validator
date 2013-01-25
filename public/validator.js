(function ($) {
	"use strict";

	var namespace = '.validator',
		defaults = {
			events                  : null,
			selector                : null,
			preventDefault          : false,
			preventDefaultIfInvalid : false,
			callback                : function (elem, valid) {
				//
			},
			done                    : function (valid) {
				//
			}
		},
		validations = {

			parseRules : function (rules) {

				var validations = [],
					rule;

				$.each(rules.split("|"), function (idx, value) {

					rule = value.split(":");
					validations.push({
						method : "validate_" + rule[0],
						params : rule[1] ? rule[1].split(",") : []
					});

				});

				return validations;

			},

			validate : function (selector, callback) {

				var allValid = true;

				$(selector).each(function () {

					var validation_rules = $(this).data("validations"),
						name  = $(this).attr("name"),
						value = $(this).val(),
						rules = [],
						valid = true;

					if (!validation_rules) {
						return true;
					}

					rules = validations.parseRules(validation_rules);

					$.each(rules, function (idx, rule) {

						if (!validations.validatable(rule, name, value)) {
							return true;
						}

						valid = valid && (validations[rule.method] ?
								validations[rule.method](name, value, rule.params) :
								false);

					});

					callback(this, valid);

					allValid = allValid && valid;

				});

				return allValid;

			},

			validatable : function (rule, attribute, value) {

				return this.validate_required(attribute, value) ||
					this.implicit(rule);

			},

			implicit : function (rule) {

				return rule.method === "validate_required" ||
					rule.method === "validate_required_with" ||
					rule.method === "validate_accepted";

			},

			size : function (attribute, value) {

				if (this.validate_numeric(attribute, value)) {
					return parseFloat(value);
				}

				return value.length;
			},

			validate_match : function (attribute, value, parameters) {

				if (!(parameters instanceof Array)) {
					parameters = [ parameters ];
				}

				var re = parameters[0];

				if (!(re instanceof RegExp)) {
					re = re.replace(/\/?([^\/]*)\/?/, "$1");
					re = new RegExp(re);
				}

				return value.match(re) !== null;

			},

			validate_regex : function (attribute, value, parameters) {

				return this.validate_match(attribute, value, parameters);

			},

			validate_required : function (attribute, value) {

				return this.validate_match(attribute, value, /[^\s]+/);

			},

			validate_required_with : function (attribute, value, parameters) {

				if (this.validate_required(parameters[0], $("[name=" + parameters[0] + "]").val())) {
					return this.validate_required(attribute, value);
				}

				return true;

			},

			validate_confirmed : function (attribute, value) {

				return this.validate_same(attribute, value, [ attribute + "_confirmation" ]);

			},

			validate_accepted : function (attribute, value) {

				return this.validate_match(attribute, value, /^(yes|1)$/) ||
					$("[name=" + attribute + "]").is(":checked");

			},

			validate_same : function (attribute, value, parameters) {

				return value === $("[name=" + parameters[0] + "]").val();

			},

			validate_different : function (attribute, value, parameters) {

				return value !== $("[name=" + parameters[0] + "]").val();

			},

			validate_numeric : function (attribute, value) {

				return this.validate_match(attribute, value, /^\d+(\.\d*)?$/);

			},

			validate_integer : function (attribute, value) {

				return this.validate_match(attribute, value, /^\d+$/);

			},

			validate_size : function (attribute, value, parameters) {

				return this.size(attribute, value) === parseFloat(parameters[0]);

			},

			validate_between : function (attribute, value, parameters) {

				var size = this.size(attribute, value);

				return size >= parseFloat(parameters[0]) && size <= parseFloat(parameters[1]);

			},

			validate_min : function (attribute, value, parameters) {

				return this.size(attribute, value) >= parseFloat(parameters[0]);

			},

			validate_max : function (attribute, value, parameters) {

				return this.size(attribute, value) <= parseFloat(parameters[0]);

			},

			validate_in : function (attribute, value, parameters) {

				return $.inArray(value, parameters) >= 0;

			},

			validate_not_in : function (attribute, value, parameters) {

				return $.inArray(value, parameters) < 0;

			},

			validate_unique : function (attribute, value, parameters) {

				return true;

			},

			validate_exists : function (attribute, value, parameters) {

				return true;

			},

			validate_ip : function (attribute, value) {

				var segments = value.split(".");

				if (segments.length === 4 &&
						this.validate_between(attribute, segments[0], [ 1, 255 ]) &&
						this.validate_between(attribute, segments[1], [ 0, 255 ]) &&
						this.validate_between(attribute, segments[2], [ 0, 255 ]) &&
						this.validate_between(attribute, segments[3], [ 1, 255 ])) {
					return true;
				}

				return false;

			},

			validate_email : function (attribute, value) {

				return this.validate_match(attribute, value, /^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,4}$/i);

			},

			validate_url : function (attribute, value) {

				return this.validate_match(attribute, value, /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/i);

			},

			validate_active_url : function (attribute, value) {

				return this.validate_url(attribute, value);

			},

			validate_image : function (attribute, value, parameters) {

				return this.validate_mimes(attribute, value, [ 'jpg', 'png', 'gif', 'bmp' ]);

			},

			validate_alpha : function (attribute, value, parameters) {

				return this.validate_match(attribute, value, /^([a-z])+$/i);

			},

			validate_alpha_num : function (attribute, value, parameters) {

				return this.validate_match(attribute, value, /^([a-z0-9])+$/i);

			},

			validate_alpha_dash : function (attribute, value, parameters) {

				return this.validate_match(attribute, value, /^([a-z0-9_\-])+$/i);

			},

			validate_mimes : function (attribute, value, parameters) {

				var i, re;
				for (i = 0; i < parameters.length; i++) {
					re = new RegExp('\\.' + parameters[i] + '$');

					if (this.validate_match(attribute, value, re)) {
						return true;
					}
				}

				return false;

			},

			validate_before : function (attribute, value, parameters) {

				return (Date.parse(value) < Date.parse(parameters[0]));

			},

			validate_after : function (attribute, value, parameters) {

				return (Date.parse(value) > Date.parse(parameters[0]));

			}

		},
		methods = {
			make : function (options) {

				if (options === 'undefined') {
					$.error('jQuery' + namespace + ' may not be intialized without options.');
				}

				options.events = options.events.replace(/(\w+)/g, "$1" + namespace + " ");

				this.each(function () {

					$(this).on(options.events, function (evt) {

						var valid = validations.validate(options.selector || this, options.callback);
						if ((!valid && options.preventDefaultIfInvalid) || options.preventDefault) {
							evt.preventDefault();
						}

						if (options.done) {
							options.done(valid);
						}

					});

				});

				return this;

			},
			destroy : function () {

				this.each(function () {

					$(this).off(namespace);

				});

				return this;

			}

		};

	$.fn.validator = function (method) {

		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.make.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery' + namespace);
		}

		return this;
	};

}(jQuery));