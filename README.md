# TDDD27_2022_Strategy_Backtester

## Description
Web application for backtesting stock strategies in the nordic stock markets and sharing strategies and ensambles with other users.



## Specification
### Functional
The vision for this project is to create a web application for backtesting quantitative investing strategies in the nordic markets, where you also can share the results with other users. 

The main areas of core functionality is outlined in *Figure 1* below. 

![alt text](/documents%20and%20diagrams/Functional%20Specification%20Diagram.png)
*Figure 1: Main areas of functionality (zoom or click on image for better readability).*

The user authentication section is rather simple and self-explanatory. The strategy backtester area captures the core backtesting functionality and outlines the different steps that goes into it. A rough wire diagram of how the strategy backtester front-end view might look is found in *Figure 2* below.

![alt text](/documents%20and%20diagrams/Backtester%20View.png)
*Figure 2: Wire diagram of potential backtester front-end view (zoom or click on image for better readability).*

The area of user interaction will mainly be built around the idea that users can follow eachother. A feed of the latest public strategy backtests that users you follow have created can be viewed to find inspiration. The idea is also to create a toplist page where a table of public strategies can be sorted based on different performance and risk metrics. 

### Technological

## Run Development Environment
´´´
docker-compose -f docker-compose.dev.yml up --build
´´´