# TDDD27_2022_Strategy_Backtester

## Description
A web application for backtesting rebalancing stock strategies in the nordic stock markets and sharing strategies with other users. The application is primarily built in TypeScript on the MEAN-stack with a separate python task server used for running backtests. The historical market data source used in the project is Börsdata API. 

## Screencasts
[Project Screencast (YT)](https://www.youtube.com/watch?v=35Il-kkOVsY)

[Code Screencast (YT)](https://www.youtube.com/watch?v=VR8H3Fex6Sc)


## Specification
### Functional
The vision for this project is to create a web application for backtesting quantitative investing strategies in the nordic markets, where you also can share the results with other users for inspiration. 

The main areas of core functionality is outlined in *Figure 1* below. 

![alt text](/documents%20and%20diagrams/Functional%20Specification%20Diagram.png)
*Figure 1: Main areas of functionality (zoom or click on image for better readability).*

The user authentication section is rather simple and self-explanatory. The strategy backtester area captures the core backtesting functionality and outlines the different steps that goes into it. A rough wire diagram of how the strategy backtester front-end view might look is found in *Figure 2* below.

![alt text](/documents%20and%20diagrams/Backtester%20View.png)
*Figure 2: Wire diagram of potential backtester front-end view (zoom or click on image for better readability).*

The area of user interaction will mainly be built around the idea that users can follow eachother. A feed of the latest public strategy backtests that users you follow have created can be viewed to find inspiration. The idea is also to create a toplist page where a table of public strategies can be sorted based on different performance and risk metrics. There will also be a view for looking at the strategy backtest results of a backtest that is seperate from the strategy builder depicted in *Figure 2*.


### Technological
An outline of the tech stack for the project can be seen in *Figure 3* below. The architecture includes Angular as the client-side framework and two separate backends that serve their own purpose. Server 1 is a Node Server that all user requests go through, and it handles authentication and storage, interacting with the MongoDB database. Server 2 is a python server for running longer tasks (running backtests) and will expose a simple FastAPI api for starting a backtest. The backtester will communicate with the 3rd party Börsdata API and fetch stock market data that is used in the backtest.

The angular dev server, the node server, MongoDB and the python server will each run in their own separate docker containers and be orchestrated with docker-compose to provide us with a really convenient development environment. 

![alt text](/documents%20and%20diagrams/Tech%20Stack.png)
*Figure 3: Technology specification (zoom or click on image for better readability).*

The reasoning behind Angular as the client framework is that I like the structure of Angular and that it has everything we need, so we don't need to rely on many 3rd party libraries. Angular Material will be the component library of choice in the project, as it provides us with many great basic components that can be used as building blocks to speed up development.

The Node + Express combination of the first server was mainly chosen because of how scalable and fast Node is. We will make use of the Passport middleware for handling authentication with a local strategy. We will store active sessions in MongoDB and use the mongo-connect middleware to make our lives easier in this regard. The express-session middleware will be used to generate the actual session cookies. We will use mongoose as the Object Document Mapper for the MongoDB database. The decision for MongoDB is that it is a great NoSQL database that is flexible and easy to work with. 

The python server (server 2) was first not part of the vision, but I think it is needed to make the system more realistic (even though it won't be deployed). The request limits of the Borsdata API will be the bottleneck of the system, and to manage all the requests for a typical backtest will take serveral minutes. To not tie up resources on the main node server, the idea is to use a separate task server for longer tasks to run the actual backtests. The main node server will forward the backtest details that the user have inputed in the front-end (stock market universe, filter definitions, etc.) in json to the task server and when the backtests are completed the task server will make a post request back to the node server with the strategy backtest results that can be stored in the database. Since the Borsdata API will act as a bottleneck, backtests won't be able to run in parallel and some form of queue would probably be needed to manage backtests, but not sure how complicated this would be to implement. Another potential motivator behind using python for the backtester is that pandas and other libraries suitable for working with large amounts of financial data can be used.

## Run Development Environment
docker-compose command to start the development environment

```
docker-compose -f docker-compose.dev.yml up --build
```
