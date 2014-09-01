/*global mySvg*/

(function () {

  "use strict";

  var eSvg1,
    eSvg2,
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

  function refreshTextItems(parentId, textList) {
    var parent = document.getElementById(parentId),
      pathId = 'arcPath1',
      radius = 180,
      textNodes,
      node,
      totAngle = 0,
      spcAngle = 0,
      angle,
      i;

    removeAllChildren(parent);

    textList.forEach(function (txt) {
      addTextToThisParent.call(parent, txt, {pathid: pathId});
    });

    console.log('radius: ' + radius);

    textNodes = parent.getElementsByTagName('text');

    totAngle = 0;

    if (textNodes.length > 0) {
      for (i = 0; i < textNodes.length; i++) {
        node = textNodes[i];
        totAngle += (node.getComputedTextLength() * 180) / (radius * Math.PI);
      }
      spcAngle = (360 - totAngle) / textNodes.length;
    }

    totAngle = 0;
    for (i = 0; i < textNodes.length; i++) {
      node = textNodes[i];
      node.setAttributeNS(null, 'transform', 'rotate(' + totAngle + ', 250, 250)');
      angle = ((node.getComputedTextLength() * 180) / (radius * Math.PI));
      console.log(node.textContent, node.getComputedTextLength(), angle);
      totAngle += spcAngle + angle;
    }
  }

  function refreshSvgText(svgText, ctl) {
    var arrTextIn = ctl.value.trim().split(" "),
      arrText = [];

    arrTextIn.forEach(function (txt) {
      if (txt.trim().length > 0) { arrText.push(txt); }
    });

    //console.log(arrText);

    svgText.textContent = ctl.value;

    refreshTextItems('txtItems', arrText);
    refreshTextItems('text-items', arrText);
  }

  function initSvgText(svgText) {

    var eText = document.getElementById("text-01");

    refreshSvgText(svgText, eText);
  }

  function initSvgRound(svg) {

    // define paths
    mySvg.addPathDef(svg, {id: "path1", d: "M70,250 A170,170 0 1,1 430,250 A170,170 0 1,1 70,250 Z"});
    mySvg.addPathDef(svg, {id: "path2", d: "M30,250 A220,220 0 1,0 470,250 A220,220 0 1,0 30,250 Z"});

    // display path(s)
    svg.appendChild(mySvg.makeSVG("use", {svgHref: "#path1", fill: "none", stroke: "#ff6", strokeDasharray: "5,10"}));
    svg.appendChild(mySvg.makeSVG("use", {svgHref: "#path2", fill: "none", stroke: "red", strokeDasharray: "5,10"}));

    // create container group for text
    svg.appendChild(mySvg.svgGroup({id: "text-items", fontSize: 24}));
  }

  function addListeners(svgText) {

    var eText = document.getElementById("text-01");

    eText.addEventListener("keyup", function () { refreshSvgText(svgText, eText); }, false);

  }

  // initialisation
  eDemo = document.getElementById("demo");

  eSvg1 = mySvg.svgElement({height: 100, width: 500, className: "blueprint"});
  eSvg2 = mySvg.svgElement({height: 500, width: 500, className: "blueprint"});
  svgRound = mySvg.makeSVG("svg", {id: "blahx", height: 100, width: 500, className: "blueprint"});
  eDemo.appendChild(svgRound);

  initSvgRound(eSvg2);
  eDemo.appendChild(eSvg2);

  eSvg1T1 = mySvg.svgElement({height: 100, width: "100%", y: 0});
  eSvg1Text1 = mySvg.svgText({fontSize: 25});

  initSvgText(eSvg1Text1);
  addListeners(eSvg1Text1);

  eSvg1T1.appendChild(eSvg1Text1);

  eSvg1.appendChild(eSvg1T1);

  eDemo.appendChild(eSvg1);

}());