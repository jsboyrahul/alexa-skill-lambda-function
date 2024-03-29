"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var services;
(function (services) {
    /**
     * Class to be used as the base class for the generated service clients.
     */
    var BaseServiceClient = /** @class */ (function () {
        /**
         * Creates new instance of the BaseServiceClient
         * @param {ApiConfiguration} apiConfiguration configuration parameter to provide dependencies to service client instance
         */
        function BaseServiceClient(apiConfiguration) {
            this.apiConfiguration = apiConfiguration;
        }
        BaseServiceClient.isCodeSuccessful = function (responseCode) {
            return responseCode >= 200 && responseCode < 300;
        };
        BaseServiceClient.buildUrl = function (endpoint, path, queryParameters, pathParameters) {
            var processedEndpoint = endpoint.endsWith('/') ? endpoint.substr(0, endpoint.length - 1) : endpoint;
            var pathWithParams = this.interpolateParams(path, pathParameters);
            var isConstantQueryPresent = pathWithParams.includes('?');
            var queryString = this.buildQueryString(queryParameters, isConstantQueryPresent);
            return processedEndpoint + pathWithParams + queryString;
        };
        BaseServiceClient.interpolateParams = function (path, params) {
            if (!params) {
                return path;
            }
            var result = path;
            params.forEach(function (paramValue, paramName) {
                result = result.replace('{' + paramName + '}', encodeURIComponent(paramValue));
            });
            return result;
        };
        BaseServiceClient.buildQueryString = function (params, isQueryStart) {
            if (!params) {
                return '';
            }
            var sb = [];
            if (isQueryStart) {
                sb.push('&');
            }
            else {
                sb.push('?');
            }
            params.forEach(function (paramValue, paramName) {
                sb.push(encodeURIComponent(paramName));
                sb.push('=');
                sb.push(encodeURIComponent(paramValue));
                sb.push('&');
            });
            sb.pop();
            return sb.join('');
        };
        /**
         * Invocation wrapper to implement service operations in generated classes
         * @param method HTTP method, such as 'POST', 'GET', 'DELETE', etc.
         * @param endpoint base API url
         * @param path the path pattern with possible placeholders for path parameters in form {paramName}
         * @param pathParams path parameters collection
         * @param queryParams query parameters collection
         * @param headerParams headers collection
         * @param bodyParam if body parameter is present it is provided here, otherwise null or undefined
         * @param errors maps recognized status codes to messages
         */
        BaseServiceClient.prototype.invoke = function (method, endpoint, path, pathParams, queryParams, headerParams, bodyParam, errors) {
            return __awaiter(this, void 0, void 0, function () {
                var method1, request, apiClient, response, e_1, serviceError, e;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            method1 = method;
                            request = {
                                url: BaseServiceClient.buildUrl(endpoint, path, queryParams, pathParams),
                                method: method1,
                                headers: headerParams,
                            };
                            if (bodyParam != null) {
                                request.body = JSON.stringify(bodyParam);
                            }
                            apiClient = this.apiConfiguration.apiClient;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, apiClient.invoke(request)];
                        case 2:
                            response = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            serviceError = new Error("Call to service failed: " + e_1.message);
                            serviceError['statusCode'] = e_1.statusCode; // tslint:disable-line:no-string-literal
                            serviceError['response'] = e_1.response; // tslint:disable-line:no-string-literal
                            throw serviceError;
                        case 4:
                            if (BaseServiceClient.isCodeSuccessful(response.statusCode)) {
                                try {
                                    return [2 /*return*/, JSON.parse(response.body)];
                                }
                                catch (err) {
                                    throw new SyntaxError("Failed trying to parse the response body: " + response.body);
                                }
                            }
                            e = new Error('Unknown error');
                            e.name = 'ServiceError';
                            e['statusCode'] = response.statusCode; // tslint:disable-line:no-string-literal
                            e['response'] = response.body; // tslint:disable-line:no-string-literal
                            if (errors && errors.has(response.statusCode)) {
                                e.message = errors.get(response.statusCode);
                            }
                            throw e;
                    }
                });
            });
        };
        return BaseServiceClient;
    }());
    services.BaseServiceClient = BaseServiceClient;
})(services = exports.services || (exports.services = {}));
(function (services) {
    var deviceAddress;
    (function (deviceAddress) {
        /**
         *
         */
        var DeviceAddressServiceClient = /** @class */ (function (_super) {
            __extends(DeviceAddressServiceClient, _super);
            function DeviceAddressServiceClient(apiConfiguration) {
                return _super.call(this, apiConfiguration) || this;
            }
            /**
             *
             * @param {string} deviceId The device Id for which to get the country and postal code
             */
            DeviceAddressServiceClient.prototype.getCountryAndPostalCode = function (deviceId) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'getCountryAndPostalCode';
                        // verify required parameter 'deviceId' is not null or undefined
                        if (deviceId == null) {
                            throw new Error("Required parameter deviceId was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = new Map();
                        headerParams = [];
                        headerParams.push({ key: 'Content-type', value: 'application/json' });
                        pathParams = new Map();
                        pathParams.set('deviceId', deviceId);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Successfully get the country and postal code of the deviceId");
                        errorDefinitions.set(204, "No content could be queried out");
                        errorDefinitions.set(403, "The authentication token is invalid or doesn&#39;t have access to the resource");
                        errorDefinitions.set(405, "The method is not supported");
                        errorDefinitions.set(429, "The request is throttled");
                        errorDefinitions.set(0, "Unexpected error");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, "/v1/devices/{deviceId}/settings/address/countryAndPostalCode", pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             *
             * @param {string} deviceId The device Id for which to get the address
             */
            DeviceAddressServiceClient.prototype.getFullAddress = function (deviceId) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'getFullAddress';
                        // verify required parameter 'deviceId' is not null or undefined
                        if (deviceId == null) {
                            throw new Error("Required parameter deviceId was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = new Map();
                        headerParams = [];
                        headerParams.push({ key: 'Content-type', value: 'application/json' });
                        pathParams = new Map();
                        pathParams.set('deviceId', deviceId);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Successfully get the address of the device");
                        errorDefinitions.set(204, "No content could be queried out");
                        errorDefinitions.set(403, "The authentication token is invalid or doesn&#39;t have access to the resource");
                        errorDefinitions.set(405, "The method is not supported");
                        errorDefinitions.set(429, "The request is throttled");
                        errorDefinitions.set(0, "Unexpected error");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, "/v1/devices/{deviceId}/settings/address", pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            return DeviceAddressServiceClient;
        }(services.BaseServiceClient));
        deviceAddress.DeviceAddressServiceClient = DeviceAddressServiceClient;
    })(deviceAddress = services.deviceAddress || (services.deviceAddress = {}));
})(services = exports.services || (exports.services = {}));
(function (services) {
    var directive;
    (function (directive) {
        /**
         *
         */
        var DirectiveServiceClient = /** @class */ (function (_super) {
            __extends(DirectiveServiceClient, _super);
            function DirectiveServiceClient(apiConfiguration) {
                return _super.call(this, apiConfiguration) || this;
            }
            /**
             *
             * @param {services.directive.SendDirectiveRequest} sendDirectiveRequest Represents the request object to send in the payload.
             */
            DirectiveServiceClient.prototype.enqueue = function (sendDirectiveRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'enqueue';
                        // verify required parameter 'sendDirectiveRequest' is not null or undefined
                        if (sendDirectiveRequest == null) {
                            throw new Error("Required parameter sendDirectiveRequest was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = new Map();
                        headerParams = [];
                        headerParams.push({ key: 'Content-type', value: 'application/json' });
                        pathParams = new Map();
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        errorDefinitions = new Map();
                        errorDefinitions.set(204, "Directive sent successfully.");
                        errorDefinitions.set(400, "Directive not valid.");
                        errorDefinitions.set(401, "Not Authorized.");
                        errorDefinitions.set(403, "The skill is not allowed to send directives at the moment.");
                        errorDefinitions.set(0, "Unexpected error.");
                        this.invoke("POST", this.apiConfiguration.apiEndpoint, "/v1/directives", pathParams, queryParams, headerParams, sendDirectiveRequest, errorDefinitions);
                        return [2 /*return*/];
                    });
                });
            };
            return DirectiveServiceClient;
        }(services.BaseServiceClient));
        directive.DirectiveServiceClient = DirectiveServiceClient;
    })(directive = services.directive || (services.directive = {}));
})(services = exports.services || (exports.services = {}));
(function (services) {
    var listManagement;
    (function (listManagement) {
        /**
         *
         */
        var ListManagementServiceClient = /** @class */ (function (_super) {
            __extends(ListManagementServiceClient, _super);
            function ListManagementServiceClient(apiConfiguration) {
                return _super.call(this, apiConfiguration) || this;
            }
            /**
             *
             */
            ListManagementServiceClient.prototype.getListsMetadata = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'getListsMetadata';
                        queryParams = new Map();
                        headerParams = [];
                        headerParams.push({ key: 'Content-type', value: 'application/json' });
                        pathParams = new Map();
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(403, "Forbidden");
                        errorDefinitions.set(500, "Internal Server Error");
                        return [2 /*return*/, this.invoke("GET", "https://api.amazonalexa.com/", "/v2/householdlists/", pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             *
             * @param {string} listId Value of the customer’s listId retrieved from a getListsMetadata call
             */
            ListManagementServiceClient.prototype.deleteList = function (listId) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'deleteList';
                        // verify required parameter 'listId' is not null or undefined
                        if (listId == null) {
                            throw new Error("Required parameter listId was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = new Map();
                        headerParams = [];
                        headerParams.push({ key: 'Content-type', value: 'application/json' });
                        pathParams = new Map();
                        pathParams.set('listId', listId);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(403, "Forbidden");
                        errorDefinitions.set(404, "Not Found");
                        errorDefinitions.set(500, "Internal Server Error");
                        errorDefinitions.set(0, "Internal Server Error");
                        this.invoke("DELETE", "https://api.amazonalexa.com/", "/v2/householdlists/{listId}/", pathParams, queryParams, headerParams, null, errorDefinitions);
                        return [2 /*return*/];
                    });
                });
            };
            /**
             *
             * @param {string} listId The customer’s listId is retrieved from a getListsMetadata call.
             * @param {string} itemId The customer’s itemId is retrieved from a GetList call.
             */
            ListManagementServiceClient.prototype.deleteListItem = function (listId, itemId) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'deleteListItem';
                        // verify required parameter 'listId' is not null or undefined
                        if (listId == null) {
                            throw new Error("Required parameter listId was null or undefined when calling " + __operationId__ + ".");
                        }
                        // verify required parameter 'itemId' is not null or undefined
                        if (itemId == null) {
                            throw new Error("Required parameter itemId was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = new Map();
                        headerParams = [];
                        headerParams.push({ key: 'Content-type', value: 'application/json' });
                        pathParams = new Map();
                        pathParams.set('listId', listId);
                        pathParams.set('itemId', itemId);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(403, "Forbidden");
                        errorDefinitions.set(404, "Not Found");
                        errorDefinitions.set(500, "Internal Server Error");
                        errorDefinitions.set(0, "Internal Server Error");
                        this.invoke("DELETE", "https://api.amazonalexa.com/", "/v2/householdlists/{listId}/items/{itemId}/", pathParams, queryParams, headerParams, null, errorDefinitions);
                        return [2 /*return*/];
                    });
                });
            };
            /**
             *
             * @param {string} listId Retrieved from a call to getListsMetadata
             * @param {string} itemId itemId within a list is retrieved from a getList call
             */
            ListManagementServiceClient.prototype.getListItem = function (listId, itemId) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'getListItem';
                        // verify required parameter 'listId' is not null or undefined
                        if (listId == null) {
                            throw new Error("Required parameter listId was null or undefined when calling " + __operationId__ + ".");
                        }
                        // verify required parameter 'itemId' is not null or undefined
                        if (itemId == null) {
                            throw new Error("Required parameter itemId was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = new Map();
                        headerParams = [];
                        headerParams.push({ key: 'Content-type', value: 'application/json' });
                        pathParams = new Map();
                        pathParams.set('listId', listId);
                        pathParams.set('itemId', itemId);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(403, "Forbidden");
                        errorDefinitions.set(404, "Not Found");
                        errorDefinitions.set(500, "Internal Server Error");
                        errorDefinitions.set(0, "Internal Server Error");
                        return [2 /*return*/, this.invoke("GET", "https://api.amazonalexa.com/", "/v2/householdlists/{listId}/items/{itemId}/", pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             *
             * @param {string} listId Customer’s listId
             * @param {string} itemId itemId to be updated in the list
             * @param {services.listManagement.UpdateListItemRequest} updateListItemRequest
             */
            ListManagementServiceClient.prototype.updateListItem = function (listId, itemId, updateListItemRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'updateListItem';
                        // verify required parameter 'listId' is not null or undefined
                        if (listId == null) {
                            throw new Error("Required parameter listId was null or undefined when calling " + __operationId__ + ".");
                        }
                        // verify required parameter 'itemId' is not null or undefined
                        if (itemId == null) {
                            throw new Error("Required parameter itemId was null or undefined when calling " + __operationId__ + ".");
                        }
                        // verify required parameter 'updateListItemRequest' is not null or undefined
                        if (updateListItemRequest == null) {
                            throw new Error("Required parameter updateListItemRequest was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = new Map();
                        headerParams = [];
                        headerParams.push({ key: 'Content-type', value: 'application/json' });
                        pathParams = new Map();
                        pathParams.set('listId', listId);
                        pathParams.set('itemId', itemId);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(403, "Forbidden");
                        errorDefinitions.set(404, "Not Found");
                        errorDefinitions.set(409, "Conflict");
                        errorDefinitions.set(500, "Internal Server Error");
                        errorDefinitions.set(0, "Internal Server Error");
                        return [2 /*return*/, this.invoke("PUT", "https://api.amazonalexa.com/", "/v2/householdlists/{listId}/items/{itemId}/", pathParams, queryParams, headerParams, updateListItemRequest, errorDefinitions)];
                    });
                });
            };
            /**
             *
             * @param {string} listId The customer’s listId retrieved from a getListsMetadata call.
             * @param {services.listManagement.CreateListItemRequest} createListItemRequest
             */
            ListManagementServiceClient.prototype.createListItem = function (listId, createListItemRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'createListItem';
                        // verify required parameter 'listId' is not null or undefined
                        if (listId == null) {
                            throw new Error("Required parameter listId was null or undefined when calling " + __operationId__ + ".");
                        }
                        // verify required parameter 'createListItemRequest' is not null or undefined
                        if (createListItemRequest == null) {
                            throw new Error("Required parameter createListItemRequest was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = new Map();
                        headerParams = [];
                        headerParams.push({ key: 'Content-type', value: 'application/json' });
                        pathParams = new Map();
                        pathParams.set('listId', listId);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        errorDefinitions = new Map();
                        errorDefinitions.set(201, "Success");
                        errorDefinitions.set(400, "Bad Request");
                        errorDefinitions.set(403, "Forbidden");
                        errorDefinitions.set(404, "Not found");
                        errorDefinitions.set(500, "Internal Server Error");
                        errorDefinitions.set(0, "Internal Server Error");
                        return [2 /*return*/, this.invoke("POST", "https://api.amazonalexa.com/", "/v2/householdlists/{listId}/items/", pathParams, queryParams, headerParams, createListItemRequest, errorDefinitions)];
                    });
                });
            };
            /**
             *
             * @param {string} listId Value of the customer’s listId retrieved from a getListsMetadata call.
             * @param {services.listManagement.UpdateListRequest} updateListRequest
             */
            ListManagementServiceClient.prototype.updateList = function (listId, updateListRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'updateList';
                        // verify required parameter 'listId' is not null or undefined
                        if (listId == null) {
                            throw new Error("Required parameter listId was null or undefined when calling " + __operationId__ + ".");
                        }
                        // verify required parameter 'updateListRequest' is not null or undefined
                        if (updateListRequest == null) {
                            throw new Error("Required parameter updateListRequest was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = new Map();
                        headerParams = [];
                        headerParams.push({ key: 'Content-type', value: 'application/json' });
                        pathParams = new Map();
                        pathParams.set('listId', listId);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(400, "Bad Request");
                        errorDefinitions.set(403, "Forbidden");
                        errorDefinitions.set(404, "List not found");
                        errorDefinitions.set(409, "Conflict");
                        errorDefinitions.set(500, "Internal Server Error");
                        errorDefinitions.set(0, "Internal Server Error");
                        return [2 /*return*/, this.invoke("PUT", "https://api.amazonalexa.com/", "/v2/householdlists/{listId}/", pathParams, queryParams, headerParams, updateListRequest, errorDefinitions)];
                    });
                });
            };
            /**
             *
             * @param {string} listId Retrieved from a call to GetListsMetadata to specify the listId in the request path.
             * @param {string} status Specify the status of the list.
             */
            ListManagementServiceClient.prototype.getList = function (listId, status) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'getList';
                        // verify required parameter 'listId' is not null or undefined
                        if (listId == null) {
                            throw new Error("Required parameter listId was null or undefined when calling " + __operationId__ + ".");
                        }
                        // verify required parameter 'status' is not null or undefined
                        if (status == null) {
                            throw new Error("Required parameter status was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = new Map();
                        headerParams = [];
                        headerParams.push({ key: 'Content-type', value: 'application/json' });
                        pathParams = new Map();
                        pathParams.set('listId', listId);
                        pathParams.set('status', status);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(400, "Bad Request");
                        errorDefinitions.set(403, "Forbidden");
                        errorDefinitions.set(404, "Not Found");
                        errorDefinitions.set(500, "Internal Server Error");
                        errorDefinitions.set(0, "Internal Server Error");
                        return [2 /*return*/, this.invoke("GET", "https://api.amazonalexa.com/", "/v2/householdlists/{listId}/{status}/", pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             *
             * @param {services.listManagement.CreateListRequest} createListRequest
             */
            ListManagementServiceClient.prototype.createList = function (createListRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'createList';
                        // verify required parameter 'createListRequest' is not null or undefined
                        if (createListRequest == null) {
                            throw new Error("Required parameter createListRequest was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = new Map();
                        headerParams = [];
                        headerParams.push({ key: 'Content-type', value: 'application/json' });
                        pathParams = new Map();
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        errorDefinitions = new Map();
                        errorDefinitions.set(201, "Success");
                        errorDefinitions.set(400, "Bad Request");
                        errorDefinitions.set(403, "Forbidden");
                        errorDefinitions.set(409, "Conflict");
                        errorDefinitions.set(500, "Internal Server Error");
                        errorDefinitions.set(0, "Internal Server Error");
                        return [2 /*return*/, this.invoke("POST", "https://api.amazonalexa.com/", "/v2/householdlists/", pathParams, queryParams, headerParams, createListRequest, errorDefinitions)];
                    });
                });
            };
            return ListManagementServiceClient;
        }(services.BaseServiceClient));
        listManagement.ListManagementServiceClient = ListManagementServiceClient;
    })(listManagement = services.listManagement || (services.listManagement = {}));
})(services = exports.services || (exports.services = {}));
(function (services) {
    /**
     * Helper class that instantiates an ServiceClient implementation automatically resolving its
     * required ApiConfiguration.
     * @export
     * @class ServiceClientFactory
     */
    var ServiceClientFactory = /** @class */ (function () {
        function ServiceClientFactory(apiConfiguration) {
            this.apiConfiguration = apiConfiguration;
        }
        /*
         * Gets an instance of { deviceAddress.DeviceAddressService }.
         * @returns { deviceAddress.DeviceAddressService }
         */
        ServiceClientFactory.prototype.getDeviceAddressServiceClient = function () {
            try {
                return new services.deviceAddress.DeviceAddressServiceClient(this.apiConfiguration);
            }
            catch (e) {
                var factoryError = new Error("ServiceClientFactory Error while initializing DeviceAddressServiceClient: " + e.message);
                factoryError['name'] = 'ServiceClientFactoryError';
                throw factoryError;
            }
        };
        /*
         * Gets an instance of { directive.DirectiveService }.
         * @returns { directive.DirectiveService }
         */
        ServiceClientFactory.prototype.getDirectiveServiceClient = function () {
            try {
                return new services.directive.DirectiveServiceClient(this.apiConfiguration);
            }
            catch (e) {
                var factoryError = new Error("ServiceClientFactory Error while initializing DirectiveServiceClient: " + e.message);
                factoryError['name'] = 'ServiceClientFactoryError';
                throw factoryError;
            }
        };
        /*
         * Gets an instance of { listManagement.ListManagementService }.
         * @returns { listManagement.ListManagementService }
         */
        ServiceClientFactory.prototype.getListManagementServiceClient = function () {
            try {
                return new services.listManagement.ListManagementServiceClient(this.apiConfiguration);
            }
            catch (e) {
                var factoryError = new Error("ServiceClientFactory Error while initializing ListManagementServiceClient: " + e.message);
                factoryError['name'] = 'ServiceClientFactoryError';
                throw factoryError;
            }
        };
        return ServiceClientFactory;
    }());
    services.ServiceClientFactory = ServiceClientFactory;
})(services = exports.services || (exports.services = {}));
//# sourceMappingURL=index.js.map
