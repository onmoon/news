'use strict';

app.factory('restCollection', ['Restangular',
	function (Restangular){


		var Model = function (options, collection) {
			this.id = options.id;
			this.collection = collection;
			this.name = this.collection.name;
			this.rest = Restangular.one(this.name, this.id);
			this.attributes = _.extend({}, options);
			this.get = function (name) {
				return this.attributes[name];
			};
			this.set = function (key, value) {
				if(_.isObject(key)) {
					_.extend(this.attributes, key);
				} else {
					this.attributes[key] = value;
				}
				return this;
			};
			this.update = function () {
				return this.rest.customPUT(this.attributes);
			};
			this.save = function () {
				if(this.id) {
					return this.update();
				}
				var self = this;
				return Restangular.all(this.name)
						.post(this.attributes)
						.then(function (res){
							return self.collection.add(res.plain());
						});
			};
			this.remove = function () {
				var self = this;
				return this.rest.remove()
					.then(function (){
						self.collection.remove(self, 1);
						return true;
					});
			};
		};
		var Collection = function (name) {
			this.name = name;
			this.models = [];
			this.rest = Restangular.all(name);

			this.fetch = function () {
				var self = this;
				return this.rest.getList()
					.then(function (res){
						self.add(res.plain());
						return self;
					});
			};
			this.add = function (arr) {
				arr = _.isArray(arr) ? arr : [arr];
				_.each(arr, function (obj){
					this.models.push(new Model(obj, this));
				}, this);
				return this;
			};
			this.get = function (id) {
				return _.findWhere(this.models, { id : id });
			};
			this.remove = function (model) {
				this.models = _.without(this.models, model);
			};
			this.new = function (options) {
				return new Model(options || {}, this);
			};
		};

		return function (name) {
			return new Collection(name);
		};
	
	}
]);