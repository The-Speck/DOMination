/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DOMNodeCollection; });\nclass DOMNodeCollection {\n  constructor(nodes) {\n    this.nodes = nodes;\n  }\n\n  html(str) {\n    if(typeof str === 'string') {\n      this.each(node => node.innerHTML = str);\n    } else {\n      return this.nodes[0].innerHTML;\n    }\n  }\n\n  each(func){\n    this.nodes.forEach(func);\n  }\n\n  empty() {\n    this.html('');\n  }\n\n  append(arg) {\n    if(arg instanceof Element){\n      return this.append(new DOMNodeCollection(arg));\n    }\n\n    if(typeof arg === 'string') {\n      this.each(node => node += arg);\n    } else if(arg instanceof 'DOMNodeCollection') {\n      this.each(node => {\n        arg.each(argNode => {\n          node.appendChild(argNode.cloneNode(true));\n        });\n      });\n    }\n  }\n\n  attr(key, value){\n    if (value) {\n      this.each(node => node.setAttribute(key, value));\n    } else {\n      this.nodes[0].getAttribute(key);\n    }\n  }\n\n  addClass(className){\n    this.each(node => node.className.add(className));\n  }\n\n  removeClass(className){\n    this.each(node => node.className.remove(className));\n  }\n\n  children(attr){\n    let children = [];\n    this.each(node => children = children.concat(Array.from(node.children)));\n\n    if (attr) {\n      return children.map(child => child.attr(attr));\n    } else {\n      return new DOMNodeCollection(children);\n    }\n  }\n\n  parent(attr){\n    let parents = [];\n    this.each(node => parents.push(node.parentNode));\n\n    parents = [...new Set(parents)];\n\n    if (attr) {\n      return parents.map(parent => parent.attr(attr));\n    } else {\n      return new DOMNodeCollection(parents);\n    }\n  }\n\n  find(selector){\n    let selected = [];\n    this.each(node => {\n      const nodeArray = Array.from(node.querySelectorAll(selector));\n      selected = selected.concat(nodeArray);\n    });\n    return new DOMNodeCollection(selected);\n  }\n\n  remove() {\n    this.each(node => node.parentNode.removeChild(node));\n  }\n\n  on(type, cb) {\n    this.each(node => {\n      node.addEventListener(type, cb);\n      node.cb = cb;\n    });\n  }\n\n  off(type) {\n    this.each(node => {\n      const cb = node.cb;\n      node.removeEventListener(type, cb);\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom_node_collection_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom_node_collection.js */ \"./lib/dom_node_collection.js\");\n\n\nconst cbArray = [];\n\nwindow.$_$ = (arg) => {\n  switch (typeof arg) {\n    case 'function':\n      cbArray.push(arg);\n      break;\n    case 'string':\n      return fetchNodes(arg);\n    case 'object':\n      if (arg instanceof Element) {\n        return new _dom_node_collection_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([arg]);\n      }\n    default:\n      return console.log('Invalid Input');\n  }\n};\n\nwindow.$_$.extend = (...objs) => {\n  return Object.assign(...objs);\n};\n\nwindow.$_$.ajax = (obj = {} ) => {\n  const xhr = new XMLHttpRequest();\n\n  const defaultParams = {\n    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n    dataType: 'JSON',\n    method: 'GET',\n    url: '/',\n    data: {},\n    success: () => {},\n    error: () => {}\n  };\n  obj = window.$_$.extend(defaultParams, obj);\n\n  xhr.open(obj.method, obj.url, true);\n  xhr.onload = (e) => {\n    if (xhr.status === 200) {\n      obj.success(xhr.response);\n    } else {\n      obj.error(xhr.response);\n    }\n  };\n\n  xhr.send(JSON.stringify(obj.data));\n};\n\nconst fetchNodes = (arg) => {\n  const nodes = document.querySelectorAll(arg);\n  const nodesArray = Array.from(nodes);\n  return new _dom_node_collection_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](nodesArray);\n};\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  cbArray.forEach(cb => cb());\n});\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });