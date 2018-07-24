import DOMNodeCollection from './dom_node_collection.js';

const cbArray = [];

window.$_$ = (arg) => {
  switch (typeof arg) {
    case 'function':
      cbArray.push(arg);
      break;
    case 'string':
      return fetchNodes(arg);
    case 'object':
      if (arg instanceof Element) {
        return new DOMNodeCollection([arg]);
      }
    default:
      return console.log('Invalid Input');
  }
};

window.$_$.extend = (...objs) => {
  return Object.assign(...objs);
};

window.$_$.ajax = (obj = {} ) => {
  const xhr = new XMLHttpRequest();

  const defaultParams = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    dataType: 'JSON',
    method: 'GET',
    url: '/',
    data: {},
    success: () => {},
    error: () => {}
  };
  obj = window.$_$.extend(defaultParams, obj);

  xhr.open(obj.method, obj.url, true);
  xhr.onload = (e) => {
    if (xhr.status === 200) {
      obj.success(xhr.response);
    } else {
      obj.error(xhr.response);
    }
  };

  xhr.send(JSON.stringify(obj.data));
};

const fetchNodes = (arg) => {
  const nodes = document.querySelectorAll(arg);
  const nodesArray = Array.from(nodes);
  return new DOMNodeCollection(nodesArray);
};

document.addEventListener('DOMContentLoaded', () => {
  cbArray.forEach(cb => cb());
});
