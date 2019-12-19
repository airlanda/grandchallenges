# Ag-Lite
Grand Challenges class repo. This repo contains an attempt to implement some of the Elite's procedural generation elements in a MEAN stack application for research purposes. This is part of my Grand Challenges class leading to a master's degree thesis.

## Research
The purpose the research is to understand how clever algorithms allowed to generate large amounts of data
for complex game worlds in a time (80's) where computing resources were limited.

## Installation
After cloning the repom, do an npm update from an elevated rights command terminal. This will get all necessary dependencies. OPTIONAL: If someone is developing on he c++ back end, then an npn install will compile the C++ code. The node api uses gyp files that are coded in C++. Npm install will compile the abstraction layer between the nodejs game logic and the C/C++ Elite api. I modified a C++ of the Elite code to use it as an API. I got it from  Ian Bell's Christian Pinde's C port).

## Execution
The protype's functionaity is infant at the moment but I'm able to generate the game world reusing the C port and return the data in json format using a rest endpoint.

  ## 2D Version
 Once the app is installed, run npm start and navigate to http://localhost:3000/

 The 2D version uses HTML canvas to render the galaxy maps in 2D. There are 8 galaxies with 256 planetary systems each.

  ## 3D Version 
  For the 3D Version, go to your browser and navigate to http://localhost:3000/index3D.html

## License
[MIT](https://choosealicense.com/licenses/mit/)
