var mySvg = (function () {

  "use strict";

  var nsSvg = "http://www.w3.org/2000/svg",
    nsXlink = "http://www.w3.org/1999/xlink";

  function svgInit(s, options) {
    var o = options || {},
      h = o.height || 100,
      w = o.width || 100;

    s.setAttributeNS(null, 'width', w);
    s.setAttributeNS(null, 'height', h);
    if (o.x) { s.setAttributeNS(null, 'x', o.x); }
    if (o.y) { s.setAttributeNS(null, 'y', o.y); }
    if (o.className) { s.setAttributeNS(null, 'class', o.className); }
  }

  function svgElement(options) {
    var s = document.createElementNS(nsSvg, "svg");
    s.setAttribute("xmlns", nsSvg);
    s.setAttribute("xmlns:xlink", nsXlink);

    svgInit(s, options);
    return s;
  }

  function svgGroup(options) {
    var g = document.createElementNS(nsSvg, "g");
    return g;
  }

  function svgTextPath(options) {
    var t = document.createElementNS(nsSvg, "text"),
      tp = document.createElementNS(nsSvg, "textPath"),
      oDefault = {text: 'SVG text!', pathid: 'myPath'},
      o = options || oDefault,
      text = o.text || oDefault.text,
      pathid = o.pathid || oDefault.pathid,
      txtnode = document.createTextNode(text);

    tp.setAttributeNS(nsXlink, "xlink:href", "#" + pathid);
    tp.appendChild(txtnode);
    t.appendChild(tp);

    return t;
  }

  function addPathDef(svg, options) {
    var defs,
      defsList = svg.getElementsByTagNameNS(nsSvg, 'defs'),
      path = document.createElementNS(nsSvg, "path");

    if (defsList.length === 0) {
      defs = document.createElementNS(nsSvg, 'defs');
    } else {
      defs = defsList[0];
    }

    path.setAttributeNS(null, 'id', options.id);
    path.setAttributeNS(null, 'd', options.d);

    defs.appendChild(path);
    if (defsList.length === 0) { svg.appendChild(defs); }
  }

  function svgText(options) {
    var t = document.createElementNS(nsSvg, "text"),
      oDefault = {x: "50%", y: "50%", text: 'SVG text!', fontSize: 50},
      o = options || oDefault,
      x = o.x || oDefault.x,
      y = o.y || oDefault.y,
      fontSize = o.fontSize || oDefault.fontSize,
      text = o.text || oDefault.text,
      txtnode = document.createTextNode(text);

    t.setAttributeNS(null, 'x', x);
    t.setAttributeNS(null, 'y', y);
    t.setAttributeNS(null, "font-size", fontSize);
    t.setAttributeNS(null, "text-anchor", "middle");
    t.setAttributeNS(null, "dominant-baseline", "middle");
    t.appendChild(txtnode);

    return t;
  }

  function svgCircle(options) {
    var c = document.createElementNS(nsSvg, "circle"),
      o = options || {},
      cx = o.cx || 50,
      cy = o.cy || 50,
      r = o.r || 40;

    c.setAttributeNS(null, 'cx', cx);
    c.setAttributeNS(null, 'cy', cy);
    c.setAttributeNS(null, 'r', r);

    return c;
  }

  function svgDashedCircle(options) {
    var c = svgCircle(options),
      o = options || {},
      stroke = o.stroke || '#fff';

    c.setAttributeNS(null, 'stroke', stroke);
    c.setAttributeNS(null, 'fill', 'transparent');
    c.setAttributeNS(null, 'stroke-dasharray', '5,10');
    c.setAttributeNS(null, 'stroke-width', 1);
    c.setAttributeNS(null, 'class', 'persist');

    return c;
  }

  function svgCircles(coords, options) {
    var g = document.createElementNS(nsSvg, "g"),
      o = options || {},
      stroke = o.stroke || '#fff',
      fill = o.fill || 'transparent';

    g.setAttributeNS(null, 'stroke', stroke);
    g.setAttributeNS(null, 'fill', fill);

    coords.forEach(function (c) {
      g.appendChild(svgCircle({cx: c.x, cy: c.y, r: o.r}));
    });

    return g;
  }

  function svgCircles2(params, options) {
    var g = document.createElementNS(nsSvg, "g"),
      o = options || {},
      stroke = o.stroke || '#fff',
      fill = o.fill || 'transparent';

    g.setAttributeNS(null, 'fill', fill);
    g.setAttributeNS(null, 'stroke', stroke);

    params.forEach(function (p) {
      g.appendChild(svgCircle({cx: p.x, cy: p.y, r: p.r}));
    });

    return g;
  }

  function removeGroups(parent) {
    var gNodes = parent.getElementsByTagName('g'),
      arrNodes = [],
      i;

    for (i = 0; i < gNodes.length; i++) {
      arrNodes.push(gNodes[i]);
    }

    arrNodes.forEach(function (node) {
      if (node.parentNode) { node.parentNode.removeChild(node); }
    });
  }

  function getTextNodes(parent) {
    return parent.getElementsByTagNameNS('text');
  }

  return {
    svgInit: svgInit,
    svgElement: svgElement,
    svgGroup: svgGroup,
    svgCircle: svgCircle,
    svgCircles: svgCircles,
    svgCircles2: svgCircles2,
    svgDashedCircle: svgDashedCircle,
    svgText: svgText,
    svgTextPath: svgTextPath,
    addPathDef: addPathDef,
    removeGroups: removeGroups
  };
}());
