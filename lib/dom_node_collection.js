export default class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(str) {
    if(typeof str === 'string') {
      this.each(node => node.innerHTML = str);
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  each(func){
    this.nodes.forEach(func);
  }

  empty() {
    this.html('');
  }

  append(arg) {
    if(arg instanceof Element){
      return this.append(new DOMNodeCollection(arg));
    }

    if(typeof arg === 'string') {
      this.each(node => node += arg);
    } else if(arg instanceof 'DOMNodeCollection') {
      this.each(node => {
        arg.each(argNode => {
          node.appendChild(argNode.cloneNode(true));
        });
      });
    }
  }

  attr(key, value){
    if (value) {
      this.each(node => node.setAttribute(key, value));
    } else {
      this.nodes[0].getAttribute(key);
    }
  }

  addClass(className){
    this.each(node => node.className.add(className));
  }

  removeClass(className){
    this.each(node => node.className.remove(className));
  }

  children(attr){
    let children = [];
    this.each(node => children = children.concat(Array.from(node.children)));

    if (attr) {
      return children.map(child => child.attr(attr));
    } else {
      return new DOMNodeCollection(children);
    }
  }

  parent(attr){
    let parents = [];
    this.each(node => parents.push(node.parentNode));

    parents = [...new Set(parents)];

    if (attr) {
      return parents.map(parent => parent.attr(attr));
    } else {
      return new DOMNodeCollection(parents);
    }
  }

  find(selector){
    let selected = [];
    this.each(node => {
      const nodeArray = Array.from(node.querySelectorAll(selector));
      selected = selected.concat(nodeArray);
    });
    return new DOMNodeCollection(selected);
  }

  remove() {
    this.each(node => node.parentNode.removeChild(node));
  }

  on(type, cb) {
    this.each(node => {
      node.addEventListener(type, cb);
      node.cb = cb;
    });
  }

  off(type) {
    this.each(node => {
      const cb = node.cb;
      node.removeEventListener(type, cb);
    });
  }
}
