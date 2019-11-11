//import { Scene } from "./three";

var audio = document.getElementById("audioControl");
//audio.volume = 0.05;
var canvas; // DOM object corresponding to the canvas
var graphics; // 2D graphics context for drawing on the canvas
var interval;
var galNo = 1;
var systemHash = {};

// Opera 8.0+
var isOpera =
  (!!window.opr && !!opr.addons) ||
  !!window.opera ||
  navigator.userAgent.indexOf(" OPR/") >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== "undefined";

// Chrome 1 - 71
var isChrome =
  !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

function showSystemDetails(event) {
  //renderPlanetSystems();
  if (systemHash) {
    var sysDetails = document.getElementById("systemDetails");
    sysDetails.className = "systemDetails";
    sysDetails.innerHTML = "<ul>";
    sysDetails.innerHTML +=
      "<li>Name: " + systemHash[event.target.id].name + "<br/></li>";
    sysDetails.innerHTML +=
      "<li>Population: " +
      systemHash[event.target.id].population +
      " billion<br/></li>";
    sysDetails.innerHTML +=
      "<li>Government: " + systemHash[event.target.id].govtype + "<br/></li>";
    sysDetails.innerHTML +=
      "<li>Economy: " + systemHash[event.target.id].economy + "<br/></li>";
    sysDetails.innerHTML +=
      "<li>Tech Level: " + systemHash[event.target.id].techlev + "<br/></li>";
    sysDetails.innerHTML += "</ul><br/>";
  }

  sysDetails.innerHTML +=
    "<div style='border-top: 1px solid lime; padding-top:1em'>";
  sysDetails.innerHTML += "<div style='text-align:center'>Commodities</div>";
  var commodities = systemHash["commodities"];

  for (var i = 0; i < commodities.length; i++) {
    sysDetails.innerHTML += "<div>";
    if (commodities[i] != null || commodities[i] != undefined) {
      sysDetails.innerHTML +=
        "-" + commodities[i].name + "    qty:" + commodities[i].quantity;
    }
    sysDetails.innerHTML += "</div>";
  }
  sysDetails.innerHTML += "</div>";

  //   drawCircleOutline(
  //     systemHash[event.target.id].x * 2,
  //     systemHash[event.target.id].y * 2,
  //     "red",
  //     20
  //   );
}

function mousedownHandler(event) {
  //Find the mouse's X and Y positions
  var xOffSet = 0;
  var yOffset = 0;

  if (isFirefox) {
    xOffSet = canvas.offsetLeft;
    yOffset = canvas.offsetTop;
  }

  var mouseX = event.layerX - xOffSet;
  var mouseY = event.layerY - yOffset;
  console.log("x " + mouseX + " " + "y " + mouseY);
  solarSystems.forEach(system => {
    //setPixel(system.x * 2, system.y * 2, "white", system.radius / 2000);
    var sphereGeom = new THREE.SphereGeometry(5, 10, 10);
    var sphereMat = new THREE.MeshLambertMaterial({ color: "white" });
    var sphere = new THREE.Mesh(sphereGeom, sphereMat);
    var zPos = getRandomArbitrary(-1024, 1024);
    sphere.position.set(solarSystems[i].x * 4, solarSystems[i].y * 4, solarSystems[i].z);
    scene.add(sphere);
    // var sphereGeom = new THREE.SphereGeometry(radius, segments, rings);
    // var sphereMat = new THREE.MeshLambertMaterial({ color: "blue" });
    // var sphere = new THREE.Mesh(sphereGeom, sphereMat);

    if (
      mouseX >= system.x * 2 - 5 &&
      mouseX <= system.x * 2 + 5 &&
      mouseY >= system.y * 2 - 5 &&
      mouseY <= system.y * 2 + 5
    ) {
      graphics.fillStyle = "black";
      graphics.fillRect(system.x * 2 + 20, system.y * 2 - 10, 120, 75);

      graphics.beginPath();
      graphics.lineWidth = "1";
      graphics.strokeStyle = "lime";
      graphics.rect(system.x * 2 + 20, system.y * 2 - 10, 120, 75);
      graphics.stroke();

      graphics.font = "11px agmmodore";
      graphics.fillStyle = "lime";
      // graphics.textAlign = "center";
      graphics.fillText(system.name, system.x * 2 + 30, system.y * 2 + 5);
      graphics.fillText(system.govtype, system.x * 2 + 30, system.y * 2 + 20);
      graphics.fillText(system.economy, system.x * 2 + 30, system.y * 2 + 35);
    }
  });
  //Define
}

function getGalaxyData() {
  galNo++;
  console.log(galNo);
  //   while (scene.children.length > 0) {
  //     scene.remove(scene.children[0]);
  //   }
  hitService(galNo);
}

function hitService() {
  var request = new XMLHttpRequest();
  request.open("POST", "http://localhost:3000/startGame", true);
  console.log("opening");
  systemList.innerHTML = "";
  request.onload = function() {
    // Begin accessing JSON data here
    solarSystems = JSON.parse(this.response);
    console.log("onLoading");
    systemHash = {};
    if (request.status >= 200 && request.status < 400) {
      solarSystems.forEach(system => {
        var sphereGeom = new THREE.SphereGeometry(5, 10, 10);
        var sphereMat = new THREE.MeshLambertMaterial({ color: "white" });
        var sphere = new THREE.Mesh(sphereGeom, sphereMat);
        var zPos = getRandomArbitrary(-1024, 1024);
        sphere.position.set(system.x * 4, system.y * 4, system.z * 4);
        sphere["name"] = system.name;
        scene.add(sphere);
        var systemList = document.getElementById("systemList");
        systemList.innerHTML +=
          "<div id='" +
          system.name +
          "' onclick='showSystemDetails(event)' style='border-top: 1px solid #e9ce7c;padding:4px;cursor:pointer'>" +
          system.name +
          "</div>";
        if (system.name) systemHash[system.name] = system;
        else systemHash["commodities"] = system;
      });
      var galaxyIndicator = document.getElementById("galaxyNumberEl");
      galaxyIndicator.innerHTML = galNo;
    } else {
      console.log("error");
    }
  };
  // Set the request header i.e. which type of content you are sending
  request.setRequestHeader("Content-Type", "application/json");
  var data = JSON.stringify({ galaxyNumber: galNo });
  request.send(data);
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function renderPlanetSystems() {
  //graphics.fillStyle = "black";
  // graphics.fillRect(0, 0, canvas.width, canvas.height);
  //   while(scene.children.length > 0){
  //     scene.remove(scene.children[0]);
  // }
  for (var i = 0; i < 256; i++) {
    var sphereGeom = new THREE.SphereGeometry(5, 10, 10);
    var sphereMat = new THREE.MeshLambertMaterial({ color: "white" });
    var sphere = new THREE.Mesh(sphereGeom, sphereMat);
    var zPos = getRandomArbitrary(-1024, 1024);
    sphere.position.set(solarSystems[i].x * 4, solarSystems[i].y * 4, zPos);
    scene.add(sphere);
    //  setPixel(solarSystems[i].x * 2, solarSystems[i].y * 2, "white", 2);
    //if (solarSystems[i].name == "LAVE")
    //    setPixel(solarSystems[i].x * 2, solarSystems[i].y * 2, "white", 10);
  }
}

function setPixel(x, y, color, radius) {
  graphics.fillStyle = color;
  // graphics.fillRect(x, y, thickness, thickness);
  fillCircle(x, y, color, radius);
}

function drawCircleOutline(cx, cy, color, radius) {
  graphics.beginPath();
  // Do NOT change the arguments to arc
  graphics.arc(cx, cy, radius, 0, 2 * Math.PI, false);
  graphics.lineWidth = "4";
  graphics.strokeStyle = color;
  graphics.stroke();
}

function fillCircle(cx, cy, color, radius) {
  graphics.beginPath();
  // Do NOT change the arguments to arc
  graphics.arc(cx, cy, radius, 0, 2 * Math.PI, false);
  graphics.fillStyle = color;
  graphics.strokeStyle = "lime";
  graphics.fill();
}

function drawLineX(x1, y1, x2, y2, pixelColor, thickness) {
  // TODO: your code here
  var dy = Math.abs(y2 - y1);
  var dx = x2 - x1;

  var twoDx = 2 * dx;
  var twoDy = 2 * dy;

  var dHat = twoDy - dx;

  var y = y1;
  var yIncrease = y2 < y1 ? -1 : 1;

  for (var x = x1; x <= x2; x++) {
    setPixel(x, y, pixelColor, thickness);
    if (dHat <= 0) {
      dHat += twoDy;
    } else {
      dHat += twoDy - twoDx;
      y += yIncrease;
    }
  }
}

function drawLineY(x1, y1, x2, y2, pixelColor, thickness) {
  // TODO: your code here
  var dy = y2 - y1;
  var dx = Math.abs(x2 - x1);

  var twoDx = dx + dx;
  var twoDy = dy + dy;

  var dHat = twoDx - dy;

  var xIncrease = 1;
  if (x1 > x2) xIncrease = -1;

  for (var y = y1, x = x1; y <= y2; y++) {
    setPixel(x, y, pixelColor, thickness);
    if (dHat <= 0) {
      dHat += twoDx;
    } else {
      dHat += twoDx - twoDy;
      x += xIncrease;
    }
  }
}

// Implements Bresenham's rasterizer to draw line
// DOES NOT USE ANY FLOATING-POINT ARITHMETIC
function drawLineFast(x1, y1, x2, y2, pixelColor, thickness) {
  var dy = y2 - y1;
  var dx = x2 - x1;

  var m = dy / dx;

  if (Math.abs(dx) >= Math.abs(dy)) {
    if (x2 > x1) drawLineX(x1, y1, x2, y2, pixelColor, thickness);
    else drawLineX(x2, y2, x1, y1, pixelColor, thickness);
  } else {
    if (y2 > y1) drawLineY(x1, y1, x2, y2, pixelColor, thickness);
    else drawLineY(x2, y2, x1, y1, pixelColor, thickness);
  }
}

function renderStarAnimation(
  cx,
  cy,
  outerR,
  innerR,
  color,
  thickness,
  theta1,
  theta2
) {
  var outerPoints = [];
  var innerPoints = [];
  var thetaStep = (2 * Math.PI) / 5;

  for (var i = theta1; i < 5 * thetaStep + theta1; i += thetaStep) {
    outerPoints.push({
      x: cx + Math.round(outerR * Math.cos(i)),
      y: cy + Math.round(outerR * Math.sin(i))
    });
  }

  // initial angle for the first inner point

  // TODO: write a loop to compute inner point coordinates in an array
  for (var i = theta2; i < 5 * thetaStep + theta2; i += thetaStep) {
    innerPoints.push({
      x: cx + Math.round(innerR * Math.cos(i)),
      y: cy + Math.round(innerR * Math.sin(i))
    });
  }
  // TODO: write a loop that draws the star outline using drawLineFast
  for (var i = 0; i < outerPoints.length; i++) {
    drawLineFast(
      outerPoints[i].x,
      outerPoints[i].y,
      innerPoints[i].x,
      innerPoints[i].y,
      color,
      thickness
    );
    if (i == 0)
      drawLineFast(
        innerPoints[innerPoints.length - 1].x,
        innerPoints[innerPoints.length - 1].y,
        outerPoints[i].x,
        outerPoints[i].y,
        color,
        thickness
      );
    else
      drawLineFast(
        innerPoints[i - 1].x,
        innerPoints[i - 1].y,
        outerPoints[i].x,
        outerPoints[i].y,
        color,
        thickness
      );
  }
}

function animateStarRotation(cx, cy, outerR, innerR, color, thickness) {
  var rotDegrees = 0;
  var thetaStep = (2 * Math.PI) / 5; // angle between consecutive outer/inner points

  var theta1 = Math.PI / 2 - thetaStep; // initial angle for the first outer point
  var theta2 = Math.PI / 2 - thetaStep / 2;
  var angle = rotDegrees * (Math.PI / 180);
  var starColor = "red";
  interval = setInterval(function() {
    graphics.clearRect(0, 0, canvas.width, canvas.height);
    renderStarAnimation(
      cx,
      cy,
      outerR,
      innerR,
      starColor,
      thickness,
      theta1,
      theta2
    );
    rotDegrees++;
    var angle = rotDegrees * (Math.PI / 180);
    theta1 += angle;
    theta2 += angle;
    if (rotDegrees == 359) {
      rotDegrees = 0;
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      starColor = "rgb(" + r + "," + g + "," + b + ")";
      theta1 = Math.PI / 2 - thetaStep; // initial angle for the first outer point
      theta2 = Math.PI / 2 - thetaStep / 2;
    }
  }, 33);
}

// Draws a star centered at (cx, cy), with outer points
// at distance outerR, and inner points at distance innerR
function drawStar(cx, cy, outerR, innerR, color, thickness) {
  var thetaStep = (2 * Math.PI) / 5; // angle between consecutive outer/inner points

  var theta = Math.PI / 2 - thetaStep; // initial angle for the first outer point

  var outerPoints = [];
  var innerPoints = [];
  // TODO: write a loop to compute outer point coordinates in an array
  //      xcoord = cx + Math.round(outerR * Math.cos(theta));
  //      ycoord = cy + Math.round(outerR * Math.sin(theta));
  //      update theta

  for (var i = theta; i < 5 * thetaStep + theta; i += thetaStep) {
    outerPoints.push({
      x: cx + Math.round(outerR * Math.cos(i)),
      y: cy + Math.round(outerR * Math.sin(i))
    });
  }

  theta = Math.PI / 2 - thetaStep / 2; // initial angle for the first inner point
  // TODO: write a loop to compute inner point coordinates in an array
  for (var i = theta; i < 5 * thetaStep + theta; i += thetaStep) {
    innerPoints.push({
      x: cx + Math.round(innerR * Math.cos(i)),
      y: cy + Math.round(innerR * Math.sin(i))
    });
  }
  // TODO: write a loop that draws the star outline using drawLineFast
  for (var i = 0; i < outerPoints.length; i++) {
    drawLineFast(
      outerPoints[i].x,
      outerPoints[i].y,
      innerPoints[i].x,
      innerPoints[i].y,
      color,
      thickness
    );
    if (i == 0)
      drawLineFast(
        innerPoints[innerPoints.length - 1].x,
        innerPoints[innerPoints.length - 1].y,
        outerPoints[i].x,
        outerPoints[i].y,
        color,
        thickness
      );
    else
      drawLineFast(
        innerPoints[i - 1].x,
        innerPoints[i - 1].y,
        outerPoints[i].x,
        outerPoints[i].y,
        color,
        thickness
      );
  }
}

function testAlgorithm() {
  drawLineFast(50, 300, 350, 100, "magenta"); // slope < 1
  drawLineFast(350, 100, 50, 300, "purple"); // switch points; code should still work
  drawLineFast(200, 80, 100, 380, "red"); // slope > 1
  drawLineFast(50, 200, 350, 200, "green"); // slope = 0
  drawLineFast(250, 50, 250, 350, "blue"); // slope = ∞
}

function draw() {
  // TODO: your code here, using calls to drawLineFast and drawStar only
  // testAlgorithm();
  drawStar(200, 200, 100, 50, "red", 2);
}

function renderStars() {
  var outerRadius = Math.floor(Math.random() * 76);
  var innerRadius = Math.floor(outerRadius / 2);
  var centerX = Math.floor(Math.random() * 400);
  var centerY = Math.floor(Math.random() * 400);
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  drawStar(
    centerX,
    centerY,
    outerRadius,
    innerRadius,
    "rgb(" + r + "," + g + "," + b + ")",
    2
  );
}

function animateStarColors() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  drawStar(200, 200, 100, 50, "rgb(" + r + "," + g + "," + b + ")", 4);
}

function renderBasicStar() {
  drawStar(200, 200, 100, 50, "red", 2);
}

function runHomeWork(section) {
  clearInterval(interval);
  graphics.clearRect(0, 0, canvas.width, canvas.height);
  if (section == "star") {
    renderBasicStar();
    // interval = setInterval(function(){
    //   renderBasicStar();
    // }, 33);
  } else if (section == "random") {
    interval = setInterval(function() {
      renderStars();
    }, 33);
  } else if (section == "colors") {
    interval = setInterval(function() {
      animateStarColors();
    }, 33);
  } else if (section == "rotate") {
    animateStarRotation(200, 200, 100, 50, "red", 2);
  }
}

function main() {
  galN0 = 1;
  canvas = document.getElementById("stage");
  graphics = canvas.getContext("2d");
  canvas.addEventListener("click", mousedownHandler, false);
  graphics.fillStyle = "black";
  graphics.fillRect(0, 0, canvas.width, canvas.height);
  hitService();
}
