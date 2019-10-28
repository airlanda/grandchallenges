# Ag-Lite
Grand Challenges class repo. This repo contains an attempt to implement some of the Elite's procedural generation elements in a MEAN stack application for research purposes. This is part of my Grand Challenges class leading to a master's degree thesis.

## Research
The purpose the research is to understand how clever algorithms allowed to generate large amounts of data
for complex game worlds in a time (80's) where computing resources were limited.

## Installation
After cloning the repom, do an npm install from an elevated rights command terminal. This wil also compile the gyp files (node api) which then creates the abstraction layer between the nodejs game logic and the C/C++ Elite api (which I'm reusing from Ian Bell's Christian Pinde's C port).

## Execution
The protype's functionaity is infant at the moment but I'm able to generate the game world reusing the C port and return the data in json format using a rest endpoint.

Once the app is installed, run npm start and navigate to http://localhost:3000/startGame

 Also, navigate http://localhost:3000/ for the UI protptype. It currently renders galaxy 1 with it's systems. 

This will return 256 planetary systems from the default galaxy.

## License
[MIT](https://choosealicense.com/licenses/mit/)
