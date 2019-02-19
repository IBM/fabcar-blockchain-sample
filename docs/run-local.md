
# Create a network locally using IBM Blockchain Platform extension for VS Code

## Prerequisites

You will need to follow the requirements for the [IBM Blockchain Platform Extension for VS Code](https://github.com/IBM-Blockchain/blockchain-vscode-extension/blob/master/README.md#requirements):

- [VSCode version 1.26 or greater](https://code.visualstudio.com)
- [Yeoman (yo) v2.x](http://yeoman.io/)
- [Docker version v17.06.2-ce or greater](https://www.docker.com/get-docker)
- [Docker Compose v1.14.0 or greater](https://docs.docker.com/compose/install/)

## Steps
1. [Clone the repo](#1-clone-the-repo)
2. [Package the smart contract](#2-package-the-smart-contract)
3. [Setup network locally and deploy the smart contract](#3-setup-network-locally-and-deploy-the-smart-contract)
4. [Run the application](#4-run-the-application)



## 1. Clone the repo

Clone this repository in a folder your choice:

```bash
git clone https://github.com/IBM/fabcar-blockchain-sample.git
cd fabcar-blockchain-sample
```


## 2. Package the smart contract

We will use the IBM Blockchain Platform extension to package the Fabcar smart contract.
* Open Visual Studio code and open the `contract` folder from this repository that was cloned earlier.

* Press the `F1` key to see the different VS code options. Choose `IBM Blockchain Platform: Package a Smart Contract Project`.

* Click the `IBM Blockchain Platform` extension button on the left. This will show the packaged contracts on top and the blockchain connections on the bottom.

* Next, right click on the packaged contract to export it and choose `Export Package`

* Choose a location on your machine and save `.cds` file.  We will use this packages smart contract later to deploy on our work.

<br>
<p align="center">
  <img src="doc-gifs/package-smart-contract.gif">
</p>
<br>

## 3. Setup network locally and deploy the smart contract

* Click on the overflow menu for `LOCAL FABRIC OPS`, and choose `Start Fabric Runtime` to start a network. This will download the Docker images required for a local Fabric setup, and start the network. Once setup is complete, you should see under `LOCAL FABRIC OPS`, options to install and instantiate smart contract, your `Channels` information, your peer under `Nodes` and the organization msp under `Organizations`. You are now ready to install the smart contract.

* Click on `+Install` under `Installed` dropdown in the `LOCAL FABRIC OPS` console. Choose the peer: `peer0.org1.example.com`. Choose the `fabcar@1.0.0` contract. You should see a notification for successful install of the smart contract, and the smart contract listed under `Installed` in your `LOCAL FABRIC OPS` console. You are now ready to instantiate the smart contract.

* Click on `+Instantiate` under `Instantiated` dropdown in the `LOCAL FABRIC OPS` console. Choose the channel: `mychannel`. Choose the `fabcar@1.0.0` contract.  Type in `initLedger` for the function. You can press **Enter** for optional arguments.  Once this is successfully instantiated, you should see a successful notification in the output view, and the smart contract listed under `Instantiated` in your `LOCAL FABRIC OPS` console.


<br>
<p align="center">
  <img src="doc-gifs/deploy-local.gif">
</p>
<br>


## 4. Run the application

* #### Enroll admin
  - First, navigate to the `web-app` directory, and install the node dependencies.
    ```bash
    cd web-app/server
    npm install
    ```

  - Run the `enrollAdmin.js` script
    ```bash
    node enrollAdmin.js
    ```

  - You should see the following in the terminal:
    ```bash
    msg: Successfully enrolled admin user app-admin and imported it into the wallet
    ```

* #### Register User
  - Run the `registerUser.js` script.
    ```bash
    node registerUser.js
    ```

  - You should see the following in the terminal:
    ```bash
    Successfully registered and enrolled admin user user1 and imported it into the wallet
    ```



* #### Run the application server
  - From the `server` directory, start the server.

    ```bash
    npm start
    ```

* #### Start the web client
  - In a new terminal, open the web client folder and install the dependencies.
    ```bash
    cd web-app/client
    npm install
    ```

  - Start the client:
    ```bash
    npm run serve
    ```


You can find the app running at http://localhost:8080/

<br>
<p align="center">
  <img src="docs/doc-gifs/application.gif">
</p>
<br>
