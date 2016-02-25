System.register(['angular2/src/facade/collection', 'angular2/src/facade/async', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/core/reflection/reflection', 'angular2/core', './route_config_impl', './route_recognizer', './component_recognizer', './instruction', './route_config_nomalizer', './url_parser'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var collection_1, async_1, lang_1, exceptions_1, reflection_1, core_1, route_config_impl_1, route_recognizer_1, component_recognizer_1, instruction_1, route_config_nomalizer_1, url_parser_1;
    var _resolveToNull, ROUTER_PRIMARY_COMPONENT, RouteRegistry;
    /*
     * Given: ['/a/b', {c: 2}]
     * Returns: ['', 'a', 'b', {c: 2}]
     */
    function splitAndFlattenLinkParams(linkParams) {
        return linkParams.reduce(function (accumulation, item) {
            if (lang_1.isString(item)) {
                var strItem = item;
                return accumulation.concat(strItem.split('/'));
            }
            accumulation.push(item);
            return accumulation;
        }, []);
    }
    /*
     * Given a list of instructions, returns the most specific instruction
     */
    function mostSpecific(instructions) {
        instructions = instructions.filter(function (instruction) { return lang_1.isPresent(instruction); });
        if (instructions.length == 0) {
            return null;
        }
        if (instructions.length == 1) {
            return instructions[0];
        }
        var first = instructions[0];
        var rest = instructions.slice(1);
        return rest.reduce(function (instruction, contender) {
            if (compareSpecificityStrings(contender.specificity, instruction.specificity) == -1) {
                return contender;
            }
            return instruction;
        }, first);
    }
    /*
     * Expects strings to be in the form of "[0-2]+"
     * Returns -1 if string A should be sorted above string B, 1 if it should be sorted after,
     * or 0 if they are the same.
     */
    function compareSpecificityStrings(a, b) {
        var l = lang_1.Math.min(a.length, b.length);
        for (var i = 0; i < l; i += 1) {
            var ai = lang_1.StringWrapper.charCodeAt(a, i);
            var bi = lang_1.StringWrapper.charCodeAt(b, i);
            var difference = bi - ai;
            if (difference != 0) {
                return difference;
            }
        }
        return a.length - b.length;
    }
    function assertTerminalComponent(component, path) {
        if (!lang_1.isType(component)) {
            return;
        }
        var annotations = reflection_1.reflector.annotations(component);
        if (lang_1.isPresent(annotations)) {
            for (var i = 0; i < annotations.length; i++) {
                var annotation = annotations[i];
                if (annotation instanceof route_config_impl_1.RouteConfig) {
                    throw new exceptions_1.BaseException("Child routes are not allowed for \"" + path + "\". Use \"...\" on the parent's route path.");
                }
            }
        }
    }
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (reflection_1_1) {
                reflection_1 = reflection_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (route_config_impl_1_1) {
                route_config_impl_1 = route_config_impl_1_1;
            },
            function (route_recognizer_1_1) {
                route_recognizer_1 = route_recognizer_1_1;
            },
            function (component_recognizer_1_1) {
                component_recognizer_1 = component_recognizer_1_1;
            },
            function (instruction_1_1) {
                instruction_1 = instruction_1_1;
            },
            function (route_config_nomalizer_1_1) {
                route_config_nomalizer_1 = route_config_nomalizer_1_1;
            },
            function (url_parser_1_1) {
                url_parser_1 = url_parser_1_1;
            }],
        execute: function() {
            _resolveToNull = async_1.PromiseWrapper.resolve(null);
            /**
             * Token used to bind the component with the top-level {@link RouteConfig}s for the
             * application.
             *
             * ### Example ([live demo](http://plnkr.co/edit/iRUP8B5OUbxCWQ3AcIDm))
             *
             * ```
             * import {Component} from 'angular2/core';
             * import {
             *   ROUTER_DIRECTIVES,
             *   ROUTER_PROVIDERS,
             *   RouteConfig
             * } from 'angular2/router';
             *
             * @Component({directives: [ROUTER_DIRECTIVES]})
             * @RouteConfig([
             *  {...},
             * ])
             * class AppCmp {
             *   // ...
             * }
             *
             * bootstrap(AppCmp, [ROUTER_PROVIDERS]);
             * ```
             */
            exports_1("ROUTER_PRIMARY_COMPONENT", ROUTER_PRIMARY_COMPONENT = lang_1.CONST_EXPR(new core_1.OpaqueToken('RouterPrimaryComponent')));
            /**
             * The RouteRegistry holds route configurations for each component in an Angular app.
             * It is responsible for creating Instructions from URLs, and generating URLs based on route and
             * parameters.
             */
            RouteRegistry = (function () {
                function RouteRegistry(_rootComponent) {
                    this._rootComponent = _rootComponent;
                    this._rules = new collection_1.Map();
                }
                /**
                 * Given a component and a configuration object, add the route to this registry
                 */
                RouteRegistry.prototype.config = function (parentComponent, config) {
                    config = route_config_nomalizer_1.normalizeRouteConfig(config, this);
                    // this is here because Dart type guard reasons
                    if (config instanceof route_config_impl_1.Route) {
                        route_config_nomalizer_1.assertComponentExists(config.component, config.path);
                    }
                    else if (config instanceof route_config_impl_1.AuxRoute) {
                        route_config_nomalizer_1.assertComponentExists(config.component, config.path);
                    }
                    var recognizer = this._rules.get(parentComponent);
                    if (lang_1.isBlank(recognizer)) {
                        recognizer = new component_recognizer_1.ComponentRecognizer();
                        this._rules.set(parentComponent, recognizer);
                    }
                    var terminal = recognizer.config(config);
                    if (config instanceof route_config_impl_1.Route) {
                        if (terminal) {
                            assertTerminalComponent(config.component, config.path);
                        }
                        else {
                            this.configFromComponent(config.component);
                        }
                    }
                };
                /**
                 * Reads the annotations of a component and configures the registry based on them
                 */
                RouteRegistry.prototype.configFromComponent = function (component) {
                    var _this = this;
                    if (!lang_1.isType(component)) {
                        return;
                    }
                    // Don't read the annotations from a type more than once –
                    // this prevents an infinite loop if a component routes recursively.
                    if (this._rules.has(component)) {
                        return;
                    }
                    var annotations = reflection_1.reflector.annotations(component);
                    if (lang_1.isPresent(annotations)) {
                        for (var i = 0; i < annotations.length; i++) {
                            var annotation = annotations[i];
                            if (annotation instanceof route_config_impl_1.RouteConfig) {
                                var routeCfgs = annotation.configs;
                                routeCfgs.forEach(function (config) { return _this.config(component, config); });
                            }
                        }
                    }
                };
                /**
                 * Given a URL and a parent component, return the most specific instruction for navigating
                 * the application into the state specified by the url
                 */
                RouteRegistry.prototype.recognize = function (url, ancestorInstructions) {
                    var parsedUrl = url_parser_1.parser.parse(url);
                    return this._recognize(parsedUrl, []);
                };
                /**
                 * Recognizes all parent-child routes, but creates unresolved auxiliary routes
                 */
                RouteRegistry.prototype._recognize = function (parsedUrl, ancestorInstructions, _aux) {
                    var _this = this;
                    if (_aux === void 0) { _aux = false; }
                    var parentInstruction = collection_1.ListWrapper.last(ancestorInstructions);
                    var parentComponent = lang_1.isPresent(parentInstruction) ? parentInstruction.component.componentType :
                        this._rootComponent;
                    var componentRecognizer = this._rules.get(parentComponent);
                    if (lang_1.isBlank(componentRecognizer)) {
                        return _resolveToNull;
                    }
                    // Matches some beginning part of the given URL
                    var possibleMatches = _aux ? componentRecognizer.recognizeAuxiliary(parsedUrl) :
                        componentRecognizer.recognize(parsedUrl);
                    var matchPromises = possibleMatches.map(function (candidate) { return candidate.then(function (candidate) {
                        if (candidate instanceof route_recognizer_1.PathMatch) {
                            var auxParentInstructions = ancestorInstructions.length > 0 ? [collection_1.ListWrapper.last(ancestorInstructions)] : [];
                            var auxInstructions = _this._auxRoutesToUnresolved(candidate.remainingAux, auxParentInstructions);
                            var instruction = new instruction_1.ResolvedInstruction(candidate.instruction, null, auxInstructions);
                            if (lang_1.isBlank(candidate.instruction) || candidate.instruction.terminal) {
                                return instruction;
                            }
                            var newAncestorComponents = ancestorInstructions.concat([instruction]);
                            return _this._recognize(candidate.remaining, newAncestorComponents)
                                .then(function (childInstruction) {
                                if (lang_1.isBlank(childInstruction)) {
                                    return null;
                                }
                                // redirect instructions are already absolute
                                if (childInstruction instanceof instruction_1.RedirectInstruction) {
                                    return childInstruction;
                                }
                                instruction.child = childInstruction;
                                return instruction;
                            });
                        }
                        if (candidate instanceof route_recognizer_1.RedirectMatch) {
                            var instruction = _this.generate(candidate.redirectTo, ancestorInstructions.concat([null]));
                            return new instruction_1.RedirectInstruction(instruction.component, instruction.child, instruction.auxInstruction, candidate.specificity);
                        }
                    }); });
                    if ((lang_1.isBlank(parsedUrl) || parsedUrl.path == '') && possibleMatches.length == 0) {
                        return async_1.PromiseWrapper.resolve(this.generateDefault(parentComponent));
                    }
                    return async_1.PromiseWrapper.all(matchPromises).then(mostSpecific);
                };
                RouteRegistry.prototype._auxRoutesToUnresolved = function (auxRoutes, parentInstructions) {
                    var _this = this;
                    var unresolvedAuxInstructions = {};
                    auxRoutes.forEach(function (auxUrl) {
                        unresolvedAuxInstructions[auxUrl.path] = new instruction_1.UnresolvedInstruction(function () { return _this._recognize(auxUrl, parentInstructions, true); });
                    });
                    return unresolvedAuxInstructions;
                };
                /**
                 * Given a normalized list with component names and params like: `['user', {id: 3 }]`
                 * generates a url with a leading slash relative to the provided `parentComponent`.
                 *
                 * If the optional param `_aux` is `true`, then we generate starting at an auxiliary
                 * route boundary.
                 */
                RouteRegistry.prototype.generate = function (linkParams, ancestorInstructions, _aux) {
                    if (_aux === void 0) { _aux = false; }
                    var params = splitAndFlattenLinkParams(linkParams);
                    var prevInstruction;
                    // The first segment should be either '.' (generate from parent) or '' (generate from root).
                    // When we normalize above, we strip all the slashes, './' becomes '.' and '/' becomes ''.
                    if (collection_1.ListWrapper.first(params) == '') {
                        params.shift();
                        prevInstruction = collection_1.ListWrapper.first(ancestorInstructions);
                        ancestorInstructions = [];
                    }
                    else {
                        prevInstruction = ancestorInstructions.length > 0 ? ancestorInstructions.pop() : null;
                        if (collection_1.ListWrapper.first(params) == '.') {
                            params.shift();
                        }
                        else if (collection_1.ListWrapper.first(params) == '..') {
                            while (collection_1.ListWrapper.first(params) == '..') {
                                if (ancestorInstructions.length <= 0) {
                                    throw new exceptions_1.BaseException("Link \"" + collection_1.ListWrapper.toJSON(linkParams) + "\" has too many \"../\" segments.");
                                }
                                prevInstruction = ancestorInstructions.pop();
                                params = collection_1.ListWrapper.slice(params, 1);
                            }
                        }
                        else {
                            // we must only peak at the link param, and not consume it
                            var routeName = collection_1.ListWrapper.first(params);
                            var parentComponentType = this._rootComponent;
                            var grandparentComponentType = null;
                            if (ancestorInstructions.length > 1) {
                                var parentComponentInstruction = ancestorInstructions[ancestorInstructions.length - 1];
                                var grandComponentInstruction = ancestorInstructions[ancestorInstructions.length - 2];
                                parentComponentType = parentComponentInstruction.component.componentType;
                                grandparentComponentType = grandComponentInstruction.component.componentType;
                            }
                            else if (ancestorInstructions.length == 1) {
                                parentComponentType = ancestorInstructions[0].component.componentType;
                                grandparentComponentType = this._rootComponent;
                            }
                            // For a link with no leading `./`, `/`, or `../`, we look for a sibling and child.
                            // If both exist, we throw. Otherwise, we prefer whichever exists.
                            var childRouteExists = this.hasRoute(routeName, parentComponentType);
                            var parentRouteExists = lang_1.isPresent(grandparentComponentType) &&
                                this.hasRoute(routeName, grandparentComponentType);
                            if (parentRouteExists && childRouteExists) {
                                var msg = "Link \"" + collection_1.ListWrapper.toJSON(linkParams) + "\" is ambiguous, use \"./\" or \"../\" to disambiguate.";
                                throw new exceptions_1.BaseException(msg);
                            }
                            if (parentRouteExists) {
                                prevInstruction = ancestorInstructions.pop();
                            }
                        }
                    }
                    if (params[params.length - 1] == '') {
                        params.pop();
                    }
                    if (params.length > 0 && params[0] == '') {
                        params.shift();
                    }
                    if (params.length < 1) {
                        var msg = "Link \"" + collection_1.ListWrapper.toJSON(linkParams) + "\" must include a route name.";
                        throw new exceptions_1.BaseException(msg);
                    }
                    var generatedInstruction = this._generate(params, ancestorInstructions, prevInstruction, _aux, linkParams);
                    // we don't clone the first (root) element
                    for (var i = ancestorInstructions.length - 1; i >= 0; i--) {
                        var ancestorInstruction = ancestorInstructions[i];
                        if (lang_1.isBlank(ancestorInstruction)) {
                            break;
                        }
                        generatedInstruction = ancestorInstruction.replaceChild(generatedInstruction);
                    }
                    return generatedInstruction;
                };
                /*
                 * Internal helper that does not make any assertions about the beginning of the link DSL.
                 * `ancestorInstructions` are parents that will be cloned.
                 * `prevInstruction` is the existing instruction that would be replaced, but which might have
                 * aux routes that need to be cloned.
                 */
                RouteRegistry.prototype._generate = function (linkParams, ancestorInstructions, prevInstruction, _aux, _originalLink) {
                    var _this = this;
                    if (_aux === void 0) { _aux = false; }
                    var parentComponentType = this._rootComponent;
                    var componentInstruction = null;
                    var auxInstructions = {};
                    var parentInstruction = collection_1.ListWrapper.last(ancestorInstructions);
                    if (lang_1.isPresent(parentInstruction) && lang_1.isPresent(parentInstruction.component)) {
                        parentComponentType = parentInstruction.component.componentType;
                    }
                    if (linkParams.length == 0) {
                        var defaultInstruction = this.generateDefault(parentComponentType);
                        if (lang_1.isBlank(defaultInstruction)) {
                            throw new exceptions_1.BaseException("Link \"" + collection_1.ListWrapper.toJSON(_originalLink) + "\" does not resolve to a terminal instruction.");
                        }
                        return defaultInstruction;
                    }
                    // for non-aux routes, we want to reuse the predecessor's existing primary and aux routes
                    // and only override routes for which the given link DSL provides
                    if (lang_1.isPresent(prevInstruction) && !_aux) {
                        auxInstructions = collection_1.StringMapWrapper.merge(prevInstruction.auxInstruction, auxInstructions);
                        componentInstruction = prevInstruction.component;
                    }
                    var componentRecognizer = this._rules.get(parentComponentType);
                    if (lang_1.isBlank(componentRecognizer)) {
                        throw new exceptions_1.BaseException("Component \"" + lang_1.getTypeNameForDebugging(parentComponentType) + "\" has no route config.");
                    }
                    var linkParamIndex = 0;
                    var routeParams = {};
                    // first, recognize the primary route if one is provided
                    if (linkParamIndex < linkParams.length && lang_1.isString(linkParams[linkParamIndex])) {
                        var routeName = linkParams[linkParamIndex];
                        if (routeName == '' || routeName == '.' || routeName == '..') {
                            throw new exceptions_1.BaseException("\"" + routeName + "/\" is only allowed at the beginning of a link DSL.");
                        }
                        linkParamIndex += 1;
                        if (linkParamIndex < linkParams.length) {
                            var linkParam = linkParams[linkParamIndex];
                            if (lang_1.isStringMap(linkParam) && !lang_1.isArray(linkParam)) {
                                routeParams = linkParam;
                                linkParamIndex += 1;
                            }
                        }
                        var routeRecognizer = (_aux ? componentRecognizer.auxNames : componentRecognizer.names).get(routeName);
                        if (lang_1.isBlank(routeRecognizer)) {
                            throw new exceptions_1.BaseException("Component \"" + lang_1.getTypeNameForDebugging(parentComponentType) + "\" has no route named \"" + routeName + "\".");
                        }
                        // Create an "unresolved instruction" for async routes
                        // we'll figure out the rest of the route when we resolve the instruction and
                        // perform a navigation
                        if (lang_1.isBlank(routeRecognizer.handler.componentType)) {
                            var compInstruction = routeRecognizer.generateComponentPathValues(routeParams);
                            return new instruction_1.UnresolvedInstruction(function () {
                                return routeRecognizer.handler.resolveComponentType().then(function (_) {
                                    return _this._generate(linkParams, ancestorInstructions, prevInstruction, _aux, _originalLink);
                                });
                            }, compInstruction['urlPath'], compInstruction['urlParams']);
                        }
                        componentInstruction = _aux ? componentRecognizer.generateAuxiliary(routeName, routeParams) :
                            componentRecognizer.generate(routeName, routeParams);
                    }
                    // Next, recognize auxiliary instructions.
                    // If we have an ancestor instruction, we preserve whatever aux routes are active from it.
                    while (linkParamIndex < linkParams.length && lang_1.isArray(linkParams[linkParamIndex])) {
                        var auxParentInstruction = [parentInstruction];
                        var auxInstruction = this._generate(linkParams[linkParamIndex], auxParentInstruction, null, true, _originalLink);
                        // TODO: this will not work for aux routes with parameters or multiple segments
                        auxInstructions[auxInstruction.component.urlPath] = auxInstruction;
                        linkParamIndex += 1;
                    }
                    var instruction = new instruction_1.ResolvedInstruction(componentInstruction, null, auxInstructions);
                    // If the component is sync, we can generate resolved child route instructions
                    // If not, we'll resolve the instructions at navigation time
                    if (lang_1.isPresent(componentInstruction) && lang_1.isPresent(componentInstruction.componentType)) {
                        var childInstruction = null;
                        if (componentInstruction.terminal) {
                            if (linkParamIndex >= linkParams.length) {
                            }
                        }
                        else {
                            var childAncestorComponents = ancestorInstructions.concat([instruction]);
                            var remainingLinkParams = linkParams.slice(linkParamIndex);
                            childInstruction = this._generate(remainingLinkParams, childAncestorComponents, null, false, _originalLink);
                        }
                        instruction.child = childInstruction;
                    }
                    return instruction;
                };
                RouteRegistry.prototype.hasRoute = function (name, parentComponent) {
                    var componentRecognizer = this._rules.get(parentComponent);
                    if (lang_1.isBlank(componentRecognizer)) {
                        return false;
                    }
                    return componentRecognizer.hasRoute(name);
                };
                RouteRegistry.prototype.generateDefault = function (componentCursor) {
                    var _this = this;
                    if (lang_1.isBlank(componentCursor)) {
                        return null;
                    }
                    var componentRecognizer = this._rules.get(componentCursor);
                    if (lang_1.isBlank(componentRecognizer) || lang_1.isBlank(componentRecognizer.defaultRoute)) {
                        return null;
                    }
                    var defaultChild = null;
                    if (lang_1.isPresent(componentRecognizer.defaultRoute.handler.componentType)) {
                        var componentInstruction = componentRecognizer.defaultRoute.generate({});
                        if (!componentRecognizer.defaultRoute.terminal) {
                            defaultChild = this.generateDefault(componentRecognizer.defaultRoute.handler.componentType);
                        }
                        return new instruction_1.DefaultInstruction(componentInstruction, defaultChild);
                    }
                    return new instruction_1.UnresolvedInstruction(function () {
                        return componentRecognizer.defaultRoute.handler.resolveComponentType().then(function (_) { return _this.generateDefault(componentCursor); });
                    });
                };
                RouteRegistry = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(ROUTER_PRIMARY_COMPONENT)), 
                    __metadata('design:paramtypes', [lang_1.Type])
                ], RouteRegistry);
                return RouteRegistry;
            })();
            exports_1("RouteRegistry", RouteRegistry);
        }
    }
});
//# sourceMappingURL=route_registry.js.map