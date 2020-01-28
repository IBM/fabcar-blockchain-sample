
# Create a network locally using IBM Blockchain Platform extension for VS Code

## Prerequisites

You will need to install the [IBM Blockchain Platform Extension for VSCode version 1.38.0 or greater](https://marketplace.visualstudio.com/items?itemName=IBMBlockchain.ibm-blockchain-platform) 

You will also need to satisfy the following requirements for the [IBM Blockchain Platform Extension for VS Code](https://github.com/IBM-Blockchain/blockchain-vscode-extension/blob/master/README.md#requirements):

- [Node v8.x or v10.x and npm v6.x or greater](https://nodejs.org/en/download/)
- [VSCode version 1.38.0 or greater](https://code.visualstudio.com)
- [Docker version v17.06.2-ce or greater](https://www.docker.com/get-docker)
- [Docker Compose v1.14.0 or greater](https://docs.docker.com/compose/install/)


## Steps

1. [Clone the repo](#1-clone-the-repo)
2. [Use the VS Code extension to set up a smart contract on a basic Fabric network](#2-use-the-vs-code-extension-to-set-up-a-smart-contract-on-a-basic-fabric-network)
3. [Run the application](#3-run-the-application)


### 1. Clone the repo

Clone this repository in a folder your choice:

```bash
git clone https://github.com/IBM/fabcar-blockchain-sample.git
cd fabcar-blockchain-sample
```


### 2. Use the VS Code extension to set up a smart contract on a basic Fabric network

We will use the IBM Blockchain Platform extension to package the Fabcar smart contract.


### Package the smart contract

* Open Visual Studio code and open the `contract` folder from this repository that was cloned earlier.

Press the `F1` key to see the different VS code options. Choose `IBM Blockchain Platform: Package Open Project`.

<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71910509-05036d00-3140-11ea-8b15-7c8aeb403974.png">
</p>

Click the `IBM Blockchain Platform` extension button on the left. This will show the packaged contracts on top and the blockchain connections on the bottom.

<p align="center">
  <img height="500" src="https://user-images.githubusercontent.com/8854447/73010107-bdd3d800-3ddf-11ea-8505-aff152d604e4.png">
</p>

* Next, if you want to, you can export the package to a location on your machine. However, exporting the packaged smart contract is not required for installing the smart contract on the local network.

* Right click on the packaged contract (in this case, select fabcar@1.0.0) to export it and choose `Export Package`. Choose a location on your machine and save the `.cds` file. 


### Setup fabric locally

You should see `FABRIC ENVIRONMENTS` on the left side of the editor. Under this section, you should see `Local Fabric`. Click it to start the Local Fabric.

<p align="center">
  <img height="500" src="https://user-images.githubusercontent.com/8854447/73010107-bdd3d800-3ddf-11ea-8505-aff152d604e4.png">
</p>

The extension will now provision the Docker containers that will act as nodes in your network. Once the provisioning is finished and the network is up and running, you will see the options to install and instantiate the smart contract, the `Channels` information, the `Nodes` and the organization msps under `Organizations`. You are now ready to install the smart contract.

<p align="center">
  <img height="500" src="https://user-images.githubusercontent.com/8854447/72297496-0ba35000-362a-11ea-9f37-e5819b0dd751.png">
</p>


### Install and instantiate the smart contract

#### Install

* In the `FABRIC ENVIRONMENTS` section near the bottom, click on `Smart Contracts` > `Installed` > `+ Install`.  You will see a pop-up similar to the graphic below. 

<p align="center">
  <img width="500" src="https://user-images.githubusercontent.com/8854447/73303556-af712c00-41e4-11ea-86a5-23ec3d8c5294.png">
</p>

* Then select the packaged contract: `fabcar@1.0.0 Packaged`  **Note** The 1.0.0 comes from your `package.json` line:  `"version": "1.0.0"`

After the install is complete, you should get a message `Successfully installed on peer peer0.org1.example.com`.  You should also see that the contract is listed under `Installed` under `FABRIC ENVIRONMENTS`.

<p align="center">
  <img width="300" src="https://user-images.githubusercontent.com/8854447/73303619-ca43a080-41e4-11ea-8ecd-32bcf156ea47.png">
</p>


#### Instantiate

* Under **Smart Contracts** you will see a section that says **Instantiated**. Click on `+ Instantiate` under it.

* The extension will then ask you which contract and version to instantiate — choose `fabcar@1.0.0 Installed`.

<p align="center">
  <img width="500" src="https://user-images.githubusercontent.com/8854447/73303661-dcbdda00-41e4-11ea-944e-76efe60f98ca.png">
</p>

* The extension will then ask you which function to call on instantiate — type in `initLedger`

<p align="center">
  <img width="500" width="300" src="https://user-images.githubusercontent.com/8854447/73303702-eba48c80-41e4-11ea-8322-86b37981518a.png">
</p>

* Next, it will ask you for the arguments to the function. There are none, so just hit enter.

<p align="center">
  <img width="500" src="https://user-images.githubusercontent.com/8854447/72641072-43b2d780-3937-11ea-8cbc-ab4e757367d1.png">
</p>

* Next, the extension will then ask you do you want to use a provide a private data collection configuration file? - Click on `No`.

<p align="center">
  <img width="500" src="https://user-images.githubusercontent.com/8854447/72641080-4a414f00-3937-11ea-8f2b-37b85090fd6c.png">
</p>

* Lastly, the extension will then ask you do you want to choose a smart contract endorsement policy. Choose `Default (single endorser, any org)`.

<p align="center">
  <img width="500" src="https://user-images.githubusercontent.com/8854447/72641101-53322080-3937-11ea-89f8-4db2f23a8b27.png">
</p>

Once instantiation of the contract completes, you should get the message `Successfully instantiated smart contract` and you should see `fabcar@1.0.0` under `Instantiated` under `FABRIC ENVIRONMENTS`.

<p align="center">
  <img width="300" src="https://user-images.githubusercontent.com/8854447/73303981-653c7a80-41e5-11ea-8f3d-1b65537ac1e5.png">
</p>


### Add app-admin identity on CA Node

We will now create the app-admin identity using the CA (Certificate Authority) node. The identity information and key files are needed in order to authenticate and run the application.

Under `FABRIC ENVIRONMENTS` section in the left hand pane,  expand `Nodes` and right click on `ca.org1.example.com`. Choose `Create Identity (register and enroll)`.

<p align="center">
  <img width="500" src="https://user-images.githubusercontent.com/8854447/73304415-3672d400-41e6-11ea-8e84-232cdc7c62dc.png">
</p>

Type `app-admin` and press the enter key.

<p align="center">
  <img width="500" src="https://user-images.githubusercontent.com/8854447/73304459-47bbe080-41e6-11ea-9ca1-4d4f57b0cf84.png">
</p>

The extension will then ask if you want to add any attributes to this identity. Click on `Yes`.

<p align="center">
  <img width="500" src="https://user-images.githubusercontent.com/8854447/73304487-5aceb080-41e6-11ea-81fb-0f48d2ad2593.png">
</p>

The extension will then ask you to provide the attributes for this identity. Enter `[{"name":"hf.Registrar.Roles","value":"*","ecert":true}]`.

<p align="center">
  <img width="500" src="https://user-images.githubusercontent.com/8854447/73304618-9a959800-41e6-11ea-9a3e-4cfefc3a4fe7.png">
</p>

Once the identity is successfully created, you should get the message `Successfully created identity 'app-admin' with the attributes: [{"name":"hf.Registrar.Roles","value":"*","ecert":true}]`. You can now see `app-admin` in the `FABRIC WALLETS` section under `Local Fabric Wallet`.

<p align="center">
  <img width="300" src="https://user-images.githubusercontent.com/8854447/73304734-cfa1ea80-41e6-11ea-82ce-b85eeca80753.png">
</p>


### Export Wallet

Under `FABRIC WALLETS`, right click on `Local Fabric Wallet` and select `Export Wallet`.

<p align="center">
  <img width="300" src="https://user-images.githubusercontent.com/8854447/73304803-f06a4000-41e6-11ea-9fec-e8f62fe81e3c.png">
</p>

You can save the exported files anywhere. 

From the exported directory, copy the contents of the `app-admin` folder to the following location in the directory where you have cloned this repo:

  ```
  /fabcar-blockchain-sample/web-app/server/wallet/app-admin
  ```

<p align="center">
  <img width="500" src="https://user-images.githubusercontent.com/8854447/73305087-71293c00-41e7-11ea-8c8b-372486b74da5.png">
</p>


### Update the config file

Open the [config.json](../web-app/server/config.json) file. We need to update this file to indicate that we want to run the application locally.
  
  - Specify the "connection_file" as `connection.json`.
  - Specify the "caName" as `ca.org1.example.com`.
  - Update gateway discovery to `{ enabled: true, asLocalhost: true }` to connect to the local fabric network.

```
{
    "connection_file": "connection.json",
    "appAdmin": "app-admin",
    "appAdminSecret": "app-adminpw",
    "orgMSPID": "Org1MSP",
    "caName": "ca.org1.example.com",
    "userName": "user1",
    "gatewayDiscovery": { "enabled": true, "asLocalhost": true }
}
```

Almost done, you can run the application.


### 3. Run the application


#### Register User

  - Run the `registerUser.js` script.

    ```bash
    node registerUser.js
    ```

  - You should see the following in the terminal:

    ```bash
    Successfully registered and enrolled admin user user1 and imported it into the wallet
    ```


#### Run the application server

  - From the `server` directory, start the server.

    ```bash
    npm start
    ```


#### Start the web client

  - In a new terminal, open the web client folder and install the dependencies.

    ```bash
    cd web-app/client
    npm install
    ```

  - Start the client:

    ```bash
    npm start
    ```

You can find the app running at http://localhost:4200/

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/73296572-fc9ad100-41d7-11ea-9c55-f378741b56b4.gif">
</p>
<br>