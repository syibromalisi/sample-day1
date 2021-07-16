# Sample Code Onboarding NodeJS 

Code ini adalah hasil dari onboarding NodeJS

## How to Run

#### Environment Variable
1. Create .env file
2. Set value environment variable
    ```
        NODE_ENV=DEV 
        PORT=3000
        DB_DIALECT=mssql
        DB=poc
        DB_HOST=20.197.67.11
        DB_PORT=1433
        DB_USERNAME=sa
        DB_PASSWORD=P@ssw0rd45
        KAFKA_HOST=20.195.33.95:29092
        APM_URL=http://20.195.39.206:8200/
        SECRET=S3Cret
    ```

#### Library & Compile
1. Download library
    ```
        npm install
    ```
2. Compile Source Code
    ```
        npm run build
    ```

#### Run
1. Start node
    ```
        npm run start
    ```

2. Start testing
    ```
        npm run test
    ```

## Documentation
1. [NodeJS](https://nodejs.org/en/)
