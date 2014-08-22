/*global mySvg*/
var eSvg1,
  eSvg2,
  eSvg1T1,
  eSvg1Text1,
  eSvg2Text1,
  eSvg2Text2;

(function () {

  "use strict";

  var eDemo;

  function refreshSvgText(svgText, ctl) {

    if (svgText.childNodes.length > 1) {
      svgText.childNodes[1].textContent = ctl.value;
    } else {
      svgText.textContent = ctl.value;
    }
    console.log(new Date(), ctl.value);

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

  eSvg1T1.appendChild(eSvg1Text1);

  eSvg1.appendChild(eSvg1T1);

  eDemo = document.getElementById("demo");
  eDemo.appendChild(eSvg1);

  eSvg2Text1 = document.getElementById("txt1");
  eSvg2Text2 = document.getElementById("txt2");

  initSvgText(eSvg2Text1);
  initSvgText(eSvg2Text2);

  addListeners(eSvg1Text1);
  addListeners(eSvg2Text1);
  addListeners(eSvg2Text2);

}());