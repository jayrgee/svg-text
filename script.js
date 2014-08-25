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

  function addTextToThisParent(txt) {
    var parent = this;
    console.log(parent.id, txt);
    parent.appendChild(mySvg.svgTextPath({text: txt}));
  }

  function refreshTextItems(parentId, textList) {
    var parent = document.getElementById(parentId);

    removeAllChildren(parent);

    textList.forEach(function (txt) {
      addTextToThisParent.call(parent, txt);
    });
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

  eSvg1 = mySvg.svgElement({height: 100, width: 500, className: "parent"});
  eSvg1T1 = mySvg.svgElement({height: 100, width: "100%", y: 0});

  eSvg1Text1 = mySvg.svgText();

  initSvgText(eSvg1Text1);
  addListeners(eSvg1Text1);

  eSvg1T1.appendChild(eSvg1Text1);

  eSvg1.appendChild(eSvg1T1);

  eDemo = document.getElementById("demo");
  eDemo.appendChild(eSvg1);

  eSvg2Text1 = document.getElementById("txt1");
  eSvg2Text2 = document.getElementById("txt2");

}());