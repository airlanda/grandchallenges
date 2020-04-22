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
      sysDetails.innerHTML +=
      "<li>Description: " + systemHash[event.target.id].description.toUpperCase(); + "<br/></li>";
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
    var sphereGeom = new THREE.SphereGeometry(5, 20, 20);
    var sphereMat = new THREE.MeshBasicMaterial({ color: "white" });
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
  request.onload = function () {
    // Begin accessing JSON data here
    solarSystems = JSON.parse(this.response);
    console.log("onLoading");
    systemHash = {};
    if (request.status >= 200 && request.status < 400) {
      solarSystems.forEach(system => {
        var sphereGeom = new THREE.SphereGeometry(2, 10, 10);
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
          "' onclick='showSystemDetails(event)' style='border-top: 1px solid rgb(74, 210, 190);padding:4px;cursor:pointer'>" +
          system.name +
          "</div>";
        if (system.name) systemHash[system.name] = system;
         
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
    sphere.position.set(solarSystems[i].x * 4, solarSystems[i].y * 4,  system.z * 4);
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


function main() {
  galN0 = 1;
  canvas = document.getElementById("stage");
  graphics = canvas.getContext("2d");
  canvas.addEventListener("click", mousedownHandler, false);
  graphics.fillStyle = "black";
  graphics.fillRect(0, 0, canvas.width, canvas.height);
  hitService();
}
