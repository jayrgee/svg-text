/*global mySvg*/
(function init() {

  "use strict";

  var eSvg1,
    svgRound,
    eSvg1T1,
    eSvg1Text1,
    eDemo;

  function removeAllChildren(parent) {
    var childNodes = parent.childNodes,
      arrNodes = [],
      i;

    for (i = 0; i < childNodes.length; i++) {
      arrNodes.push(childNodes[i]);
    }

    arrNodes.forEach(function (node) {
      if (node.parentNode) { node.parentNode.removeChild(node); }
    });
  }

  function addTextToThisParent(txt, options) {
    var parent = this,
      svgText = mySvg.svgTextPath({text: txt, pathid: options.pathid});
    //console.log(parent.id, txt);
    parent.appendChild(svgText);
  }

  function refreshTextNodeRotations(textNodes, radius) {

    var node,
      totAngle = 0,
      spcAngle = 0,
      angle,
      i;

    totAngle = 0;

    for (i = 0; i < textNodes.length; i++) {
      node = textNodes[i];
      totAngle += (node.getComputedTextLength() * 180) / (radius * Math.PI);
    }

    spcAngle = (textNodes.length > 0) ? (360 - totAngle) / textNodes.length : 0;

    totAngle = 0;
    for (i = 0; i < textNodes.length; i++) {
      node = textNodes[i];
      node.setAttributeNS(null, 'transform', 'rotate(' + totAngle + ', 250, 250)');
      angle = ((node.getComputedTextLength() * 180) / (radius * Math.PI));
      console.log(node.textContent, node.getComputedTextLength(), angle);
      totAngle += spcAngle + angle;
    }

  }

  function refreshTextItems(parentId, textList, pathId) {
    var parent = document.getElementById(parentId),
      radius = 180,
      textNodes;

    if (parent === null) { return; }

    removeAllChildren(parent);

    textList.forEach(function (txt) {
      addTextToThisParent.call(parent, txt, {pathid: pathId});
    });

    console.log('radius: ' + radius);

    textNodes = parent.getElementsByTagName('text');

    refreshTextNodeRotations(textNodes, radius);
  }

  function refreshSvgText(svgText, ctl) {
    var arrText = ctl.value.trim().split(/\s+/);

    //console.log(arrText);

    svgText.textContent = ctl.value;

    refreshTextItems('txtItems', arrText, 'arcPath1');
    refreshTextItems('text-items', arrText, 'path1');
  }

  function initSvgText(svgText) {

    var eText = document.getElementById("text-01");

    refreshSvgText(svgText, eText);
  }

  function refreshSvgRoundText(elemGroup) {
    console.log('blah');

  }

  function makeSvgRound(svgAttributes, grpAttributes) {

    var svg = mySvg.makeSVG("svg", svgAttributes),
      grpSvgText = mySvg.makeSVG("g", grpAttributes),
      pathData = [
        {id: "path1", d: "M70,250 A170,170 0 1,1 430,250 A170,170 0 1,1 70,250 Z", stroke: "#ff6"},
        {id: "path2", d: "M30,250 A220,220 0 1,0 470,250 A220,220 0 1,0 30,250 Z", stroke: "red"}
      ];

    // define paths
    pathData.forEach(function addPath(data) {
      mySvg.addPathDef(svg, {id: data.id, d: data.d});
      // display path
      svg.appendChild(mySvg.makeSVG("use", {svgHref: "#" + data.id, fill: "none", stroke: data.stroke, strokeDasharray: "5,10"}));
    });

    // create container group for text
    svg.appendChild(grpSvgText);

    //pathId = pathData[0].id;

    return svg;
  }

  function addListeners(svgText) {

    var eText = document.getElementById("text-01");

    eText.addEventListener("keyup", function () { refreshSvgText(svgText, eText); }, false);

  }

  // initialisation
  eDemo = document.getElementById("demo");

  eSvg1Text1 = mySvg.svgText({fontSize: 25});
  initSvgText(eSvg1Text1);
  addListeners(eSvg1Text1);

  eSvg1T1 = mySvg.svgElement({height: 100, width: "100%", y: 0});
  eSvg1T1.appendChild(eSvg1Text1);

  eSvg1 = mySvg.svgElement({height: 100, width: 500, className: "blueprint"});
  eSvg1.appendChild(eSvg1T1);
  eDemo.appendChild(eSvg1);

  svgRound = makeSvgRound({id: "blah-blah", height: 500, width: 500, className: "blueprint"}, {id: "text-items", fontSize: 24});
  eDemo.appendChild(svgRound);

}());