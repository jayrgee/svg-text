/*global mySvg*/
var eSvg1,
  eSvg2,
  eSvg1T1,
  eSvg1Text1,
  eSvg2Text1,
  eSvg2Text2,
  arrText;

(function () {

  "use strict";

  var eDemo;

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
    console.log(parent.id, txt);
    parent.appendChild(svgText);
    //console.log(txt, svgText.getComputedTextLength());
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

    arrText = ctl.value.trim().split(" ");
    console.log(arrText);

    svgText.textContent = ctl.value;

    refreshTextItems('txtItems', arrText);
  }

  function initSvgText(svgText) {

    var eText = document.getElementById("text-01");

    refreshSvgText(svgText, eText);
  }

  function addListeners(svgText) {

    var eText = document.getElementById("text-01");

    eText.addEventListener("keyup", function () { refreshSvgText(svgText, eText); }, false);

  }

  eSvg1 = mySvg.svgElement({height: 100, width: 500, className: "blueprint"});
  eSvg2 = mySvg.svgElement({height: 100, width: 500, className: "blueprint"});

  eSvg1T1 = mySvg.svgElement({height: 100, width: "100%", y: 0});
  eSvg1Text1 = mySvg.svgText({fontSize: 25});

  initSvgText(eSvg1Text1);
  addListeners(eSvg1Text1);

  eSvg1T1.appendChild(eSvg1Text1);

  eSvg1.appendChild(eSvg1T1);

  eDemo = document.getElementById("demo");
  eDemo.appendChild(eSvg1);
  eDemo.appendChild(eSvg2);

  //eSvg2Text1 = document.getElementById("txt1");
  //eSvg2Text2 = document.getElementById("txt2");

}());