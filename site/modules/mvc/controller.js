
// 

var path = require('path');
var cs = require('../../framework/cornerstone.js');

var Controller = function(name) {
    // TODO(jwwishart) prefix the action information with the controller name!
    // TODO(jwwishart) error is no unique name given?
    this.name = name;
    this._routeRegistrations = [];
};



function CreateWrapperHandler(controller, handler) {
    return function(req, resp) {
        var context = {
            request: req,
            response: resp,
            controller: controller,
            jsonResponse: controller.jsonResponse,
            stringResponse: controller.stringResponse,
            view: controller.view
        };

        var handlerResponse = handler.call(context);

        if (cs.hasValue(handlerResponse)) {
            if (handlerResponse.type === 'string') {
                resp.send(handlerResponse.data);
                return;
            }

            if (handlerResponse.type === 'json') {
                resp.json(handlerResponse.data);
                return;
            }

            if (handlerResponse.type === 'view') {
                // TODO(jwwishart) template engines and data!
                // TODO(jwwishart) template engines and data!
                // TODO(jwwishart) template engines and data!
                // TODO(jwwishart) template engines and data!
                resp.send(controller._getView(controller.name, handlerResponse.name));
                return;
            }

            console.log("Unable to determine response type");
        }
    };
}

Controller.prototype._getView = function(controllerName, name) {
    var view = path.resolve(__dirname, 'views', controllerName, name);

    // TODO(jwwisart) auto resolve extension to template engin?
    // TODO(jwwisart) handle partials
    // TODO(jwwisart) handle layouts?

    return cs.file.loadFile(view);
};

Controller.prototype.get = function(route, handler) {
    this._register('GET', route, CreateWrapperHandler(this, handler));
};

Controller.prototype.post = function(route, handler) {
    this._register('POST', route, CreateWrapperHandler(this, handler));
};

Controller.prototype.jsonResponse = function(json) {
    return {
        type: 'json',
        data: json
    };
};

Controller.prototype.stringResponse = function(content) {
    return {
        type: 'string',
        data: content
    };
};

Controller.prototype.view = function(name, model) {
    // TODO(jwwishart) generate the view 
    // TODO(jwwishart) cache?
    return {
        type: 'view',
        name: name,
        data: model
    };
};

Controller.prototype._register = function(method, route, handler) {
    // TODO(jwwishart) add extra methods!
    // TODO(jwwishart) handle in a better way!
    this._routeRegistrations.push({
        method: method,
        route: route,
        handler: handler
    });
};

module.exports = Controller;