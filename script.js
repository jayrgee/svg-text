/*global mySvg*/
var eSvg,
  eSvgT1,
  eSvgT2,
  eSvgText1,
  eSvgText2;

(function () {

  "use strict";

  var eDemo;

  function refreshSvgText(svgText, ctl) {

    svgText.textContent = ctl.value;
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

  eSvg = mySvg.svgElement({height: 300, width: 400, className: "parent"});
  eSvgT1 = mySvg.svgElement({height: 100, width: 400, y: 0});
  eSvgT2 = mySvg.svgElement({height: 200, width: 400, y: 100});

  eSvgText1 = mySvg.svgText();
  eSvgText2 = mySvg.svgText();

  initSvgText(eSvgText1);
  initSvgText(eSvgText2);

  eSvgT1.appendChild(eSvgText1);
  eSvgT2.appendChild(eSvgText2);

  eSvg.appendChild(eSvgT1);
  eSvg.appendChild(eSvgT2);

  eDemo = document.getElementById("demo");
  eDemo.appendChild(eSvg);

  addListeners(eSvgText1);
  addListeners(eSvgText2);

}());