[日本語はこちら - Japanese version](./README-ja.md)


[![Build Status](https://travis-ci.org/IBM/fabcar-blockchain-sample.svg?branch=master)](https://travis-ci.org/IBM/fabcar-blockchain-sample)


# FabCar Blockchain Sample

>Hyperledger Fabric sample Fabcar on IBM Blockchain Platform

> **NOTE**: This developer pattern creates a blockchain network on *IBM Blockchain Platform version **2.5*** using the *Hyperledger Fabric version **1.4***.

This code pattern demonstrates setting up a network on the IBM Blockchain Platform and deploying the Fabcar smart contract on the network.  Next, we setup our application to interact with the network including identities to submit transactions on the smart contract.  The application is setup with a Node.js server using the Fabric Node SDK to process requests to the network, and an Angular client to bring up a web interface.

 When the reader has completed this code pattern, they will understand how to:

* Setup a Hyperledger Fabric network on IBM Blockchain Platform
* Install and instantiate smart contract through the IBM Blockchain Platform
* Develop a Node.js server with the Hyperledger Fabric SDK to interact with the deployed network
* Create an Angular frontend for the web app to interface with the network


## Architecture flow

<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/72905801-17b0a100-3cff-11ea-8b4d-0cd6df807aa6.png">
</p>

1. The Blockchain Operator sets up the IBM Blockchain Platform service.
2. The IBM Blockchain Platform enables to create a Hyperledger Fabric network onto a IBM Cloud Kubernetes Service, allowing to install and instantiate the Fabcar smart contract on the network.
3. The Node.js application server uses the Fabric SDK to interact with the deployed network on IBM Blockchain Platform and creates APIs for a web client.
4. The Angular client uses the Node.js application API to interact with the network.
5. The User interacts with the Fabcar Angular web interface to update and query the blockchain ledger and state.


## Included components

*	[IBM Blockchain Platform](https://www.ibm.com/cloud/blockchain-platform) gives you total control of your blockchain network with a user interface that can simplify and accelerate your journey to deploy and manage blockchain components on the IBM Cloud Kubernetes Service.
*	[IBM Cloud Kubernetes Service](https://www.ibm.com/cloud/container-service) creates a cluster of compute hosts and deploys highly available containers. A Kubernetes cluster lets you securely manage the resources that you need to quickly deploy, update, and scale applications.
* [IBM Blockchain Platform Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=IBMBlockchain.ibm-blockchain-platform) is designed to assist users in developing, testing, and deploying smart contracts -- including connecting to Hyperledger Fabric environments.


## Featured technologies

+ [Hyperledger Fabric v1.4](https://hyperledger-fabric.readthedocs.io/en/release-1.4/) is a platform for distributed ledger solutions, underpinned by a modular architecture that delivers high degrees of confidentiality, resiliency, flexibility, and scalability.
+ [Node.js](https://nodejs.org/en/) is an open source, cross-platform JavaScript run-time environment that executes server-side JavaScript code.
+ [Express.js](https://expressjs.com/) is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
+ [Angular.io](https://angular.io/) is a front-end framework for building web applications.


## Prerequisites

- [IBM Cloud account](https://cloud.ibm.com/registration/?target=%2Fdashboard%2Fapps)
- [Node v10.x and npm v6.x or greater](https://nodejs.org/en/download/)
- [VSCode version 1.38.0 or greater](https://code.visualstudio.com)
- [IBM Blockchain Platform Extension for VSCode](https://marketplace.visualstudio.com/items?itemName=IBMBlockchain.ibm-blockchain-platform)


## Running the application

Follow these steps to set up and run this code pattern. The steps are described in detail below.


## Steps

> To run a local network, you can find steps [here](./run-local.md)

1. [Clone the repo](#1-clone-the-repo)
2. [Package the smart contract](#2-package-the-smart-contract)
3. [Create IBM Cloud services](#3-create-ibm-cloud-services)
4. [Build a network](#4-build-a-network)
5. [Deploy FabCar Smart Contract on the network](#5-deploy-fabcar-smart-contract-on-the-network)
6. [Connect application to the network](#6-connect-application-to-the-network)
7. [Run the application](#7-run-the-application)


### 1. Clone the repo

Clone this repository in a folder your choice:

```bash
git clone https://github.com/IBM/fabcar-blockchain-sample.git
cd fabcar-blockchain-sample
```

### 2. Package the smart contract

We will use the IBM Blockchain Platform extension on VS Code to package the Fabcar smart contract.

* Open Visual Studio code and open the `contract` folder from `fabcar-blockchain-sample` repository that was cloned earlier. 
   **It is important that you are opening the `contract` folder and not the entire `fabcar-blockchain-sample` directory; otherwise you will see an error that states that it doesn't understand what programming language you are using.**

* Press the `F1` key to see the different VS code options. Choose `IBM Blockchain Platform: Package Open Project`.

<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/85969156-de0e5100-b994-11ea-8764-a4ad5dcb3f01.png">
</p>

* Click the `IBM Blockchain Platform` extension button on the left. This will show the packaged contracts on top and the blockchain connections on the bottom.

<p align="center">
  <img height="500" src="https://user-images.githubusercontent.com/8854447/73010107-bdd3d800-3ddf-11ea-8505-aff152d604e4.png">
</p>

* Next, right click on the packaged contract (in this case, select fabcar@1.0.0) to export it and choose `Export Package`.

* Choose a location on your machine and save the `.cds` file. We will use this packaged smart contract later to deploy on the IBM Blockchain Platform service.

Now, we will start setting up the different services required for configuring our Hyperledger Fabric network on the IBM Cloud and for running our application using this network.


### 3. Create IBM Cloud services

* Create the [IBM Cloud Kubernetes Service](https://cloud.ibm.com/kubernetes/catalog/cluster). You can find the service in the `Catalog`. For this code pattern, we can use the `Free` cluster, and give it a name. Note, that the IBM Cloud allows one instance of a free cluster which expires after 30 days. **Note: it could take 20 minutes for the IBM Cloud Kubernetes Service setup to complete**.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71910506-046ad680-3140-11ea-9f4b-8bcb4d2a651b.gif">
</p>
<br>

* Create the [IBM Blockchain Platform](https://cloud.ibm.com/catalog/services/blockchain-platform) service on the IBM Cloud. You can find the service in the `Catalog`, and give it a name.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71910502-046ad680-3140-11ea-9853-3598b9363d91.gif">
</p>
<br>

* After your kubernetes cluster is up and running, you can deploy your IBM Blockchain Platform on the cluster. Again - wait for the IBM Cloud Kubernetes service to indicate it was deployed. The IBM Blockchain Platform service walks through few steps and finds your cluster on the IBM Cloud to deploy the service on.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71910501-046ad680-3140-11ea-8440-9d2fef0be426.gif">
</p>
<br>

* Once the Blockchain Platform is deployed on the Kubernetes cluster, you can launch the console to start configuring your blockchain network.


### 4. Build a network

We will build a network as provided by the IBM Blockchain Platform [documentation](https://cloud.ibm.com/docs/services/blockchain/howto?topic=blockchain-ibp-console-build-network#ibp-console-build-network). This will include creating a channel with a single peer organization with its own MSP and CA (Certificate Authority), and an orderer organization with its own MSP and CA. We will create the respective identities to deploy peers and operate nodes.


#### Create your peer organization CA
  - Navigate to the <b>Nodes</b> tab in the left navigation and click <b>Add Certificate Authority +</b>.
  - Click <b>Create a Certificate Authority +</b> and click <b>Next</b>.
  - Give it a <b>CA display name</b> of `Org1 CA`, a <b>CA administrator enroll ID</b> of `admin` and a <b>CA administrator enroll secret</b> of `adminpw`, then click <b>Next</b>.
  - Review the summary and click <b>Add Certificate Authority</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/85798060-cf146e00-b70a-11ea-856b-ef3264428fbc.gif">
</p>
<br>


#### Associate the peer organization CA admin identity
  - In the Nodes tab, select the <b>Org1 CA</b> once it is running (indicated by the green box in the tile).
  - Click <b>Associate identity</b> on the CA overview panel.
  - On the side panel, select the <b>Enroll ID</b> tab. 
  - Provide an <b>Enroll ID</b> of `admin` and an <b>Enroll secret</b> of `adminpw`. Use the default value of `Org1 CA Admin` for the <b>Identity display name</b>.
  - Click <b>Associate identity</b> to associate the `admin` identity with the <b>Org1 CA</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/85799219-dfc5e380-b70c-11ea-80a6-afccb0e526fc.gif">
</p>
<br>


#### Use peer organization CA to register the peer and org1 admin identities
  - Select the <b>Org1 CA</b> Certificate Authority and ensure the `admin` identity that was created for the CA is visible in the table.
  - The next step is to register an admin for the organization "Org1". Click on the <b>Register User +</b> button. Give an <b>Enroll ID</b> of `org1admin` and an <b>Enroll secret</b> of `org1adminpw`. Set the <b>Type</b> for this identity as `admin`. Specify to <b>Use root affiliation</b>. Leave the <b>Maximum enrollments</b> field blank. Click <b>Next</b>.
  - Skip the section to add attributes to this user and click <b>Register user</b>.
  - Repeat the process to create an identity of the peer. Click on the <b>Register User +</b> button. Give an <b>Enroll ID</b> of `peer1` and an <b>Enroll secret</b> of `peer1pw`. Set the <b>Type</b> for this identity as `peer`. Specify to <b>Use root affiliation</b>. Leave the <b>Maximum enrollments</b> field blank. Click <b>Next</b>.
  - Skip the section to add attributes to this user and click <b>Register user</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/85800394-e35a6a00-b70e-11ea-967a-f37334a685a3.gif">
</p>
<br>


#### Create the peer organization MSP definition
  - Navigate to the <b>Organizations</b> tab in the left navigation and click <b>Create MSP definition +</b>.
  - Enter the <b>MSP display name</b> as `Org1MSP` and the <b>MSP ID</b> as `Org1MSP`. Click <b>Next</b>.
  - Specify `Org1 CA` as the <b>Root Certificate Authority</b>. Click <b>Next</b>.
  - Select the <b>New identity</b> tab. Give the <b>Enroll ID</b> and <b>Enroll secret</b> for your organization admin, i.e. `org1admin` and `org1adminpw` respectively. Then, give the <b>Identity name</b> as `Org1 Admin`.
  - Click the <b>Generate</b> button to enroll this identity as the admin of your organization and add the identity to the wallet. Click <b>Export</b> to export the admin certificates to your file system. Click <b>Next</b>.
  - Review all the information and click <b>Create MSP definition</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/85800904-cbcfb100-b70f-11ea-9b95-376d9ef72caa.gif">
</p>
<br>


#### Create a peer
  - Navigate to the <b>Nodes</b> tab in the left navigation and click <b>Add peer +</b>.
  - Click <b>Create a peer +</b> and then click <b>Next</b>.
  - Give the <b>Peer display name</b> as `Peer Org1` and click <b>Next</b>.
  - On the next screen, select `Org1 CA` as the <b>Certificate Authority</b>. Then, give the <b>Peer enroll ID</b> and <b>Peer enroll secret</b> as `peer1` and `peer1pw` respectively. Select the <b>Organization MSP</b> as `Org1MSP`. Leave the <b>TLS CSR hostname</b> blank and select the highest value available in the drop-down for <b>Fabric version</b>, i.e. `2.1.1-0`. Click <b>Next</b>.
  - Provide `Org1 Admin` as the <b>Peer administrator identity</b> and click <b>Next</b>.
  - Review the summary and click <b>Add peer</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/85802117-41d51780-b712-11ea-80b1-06710ec3207d.gif">
</p>
<br>


#### Create your orderer organization CA
  - Navigate to the <b>Nodes</b> tab in the left navigation and click <b>Add Certificate Authority +</b>.
  - Click <b>Create a Certificate Authority +</b> and click <b>Next</b>.
  - Give it a <b>CA display name</b> of `Orderer CA`, a <b>CA administrator enroll ID</b> of `admin` and a <b>CA administrator enroll secret</b> of `adminpw`, then click <b>Next</b>.
  - Review the summary and click <b>Add Certificate Authority</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/85802348-c4f66d80-b712-11ea-801b-9f2fbbb66593.gif">
</p>
<br>


#### Associate the orderer organization CA admin identity
  - In the Nodes tab, select the <b>Orderer CA</b> once it is running (indicated by the green box in the tile).
  - Click <b>Associate identity</b> on the CA overview panel.
  - On the side panel, select the <b>Enroll ID</b> tab. 
  - Provide an <b>Enroll ID</b> of `admin` and an <b>Enroll secret</b> of `adminpw`. Use the default value of `Orderer CA Admin` for the <b>Identity display name</b>.
  - Click <b>Associate identity</b> to associate the `admin` identity with the <b>Orderer CA</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/85802898-e2780700-b713-11ea-82c7-9ffc09686f0b.gif">
</p>
<br>


#### Use orderer organization CA to register orderer and orderer admin identities
  - Select the <b>Orderer CA</b> Certificate Authority and ensure the `admin` identity that was created for the CA is visible in the table.
  - The next step is to register an admin for the organization "Orderer". Click on the <b>Register User +</b> button. Give an <b>Enroll ID</b> of `ordereradmin` and an <b>Enroll secret</b> of `ordereradminpw`. Set the <b>Type</b> for this identity as `admin`. Specify to <b>Use root affiliation</b>. Leave the <b>Maximum enrollments</b> field blank. Click <b>Next</b>.
  - Skip the section to add attributes to this user and click <b>Register user</b>.
  - Repeat the process to create an identity of the orderer. Click on the <b>Register User +</b> button. Give an <b>Enroll ID</b> of `orderer` and an <b>Enroll secret</b> of `ordererpw`. Set the <b>Type</b> for this identity as `orderer`. Specify to <b>Use root affiliation</b>. Leave the <b>Maximum enrollments</b> field blank. Click <b>Next</b>.
  - Skip the section to add attributes to this user and click <b>Register user</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/85803027-4995bb80-b714-11ea-81c7-b4b4cb2ec49d.gif">
</p>
<br>


#### Create the orderer organization MSP definition
  - Navigate to the <b>Organizations</b> tab in the left navigation and click <b>Create MSP definition +</b>.
  - Enter the <b>MSP display name</b> as `OrdererMSP` and the <b>MSP ID</b> as `OrdererMSP`. Click <b>Next</b>.
  - Specify `Orderer CA` as the <b>Root Certificate Authority</b>. Click <b>Next</b>.
  - Select the <b>New identity</b> tab. Give the <b>Enroll ID</b> and <b>Enroll secret</b> for your organization admin, i.e. `ordereradmin` and `ordereradminpw` respectively. Then, give the <b>Identity name</b> as `Orderer Admin`.
  - Click the <b>Generate</b> button to enroll this identity as the admin of your organization and add the identity to the wallet. Click <b>Export</b> to export the admin certificates to your file system. Click <b>Next</b>.
  - Review all the information and click <b>Create MSP definition</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/85803287-caed4e00-b714-11ea-94e7-305880e6ba63.gif">
</p>
<br>



#### Create an orderer
  - Navigate to the <b>Nodes</b> tab in the left navigation and click <b>Add ordering service +</b>.
  - Click <b>Create an ordering service +</b> and then click <b>Next</b>.
  - Give the <b>Ordering service display name</b> as `Orderer` and click <b>Next</b>.
  - On the next screen, select `Orderer CA` as the <b>Certificate Authority</b>. Then, give the <b>Ordering service enroll ID</b> and <b>Ordering service enroll secret</b> as `orderer` and `ordererpw` respectively. Select the <b>Organization MSP</b> as `OrdererMSP`. Leave the <b>TLS CSR hostname</b> blank and select the highest value available in the drop-down for <b>Fabric version</b>, i.e. `2.1.1-0`. Click <b>Next</b>.
  - Provide `Orderer Admin` as the <b>Orderer administrator identity</b> and click <b>Next</b>.
  - Review the summary and click <b>Add ordering service</b>.


<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/85803547-5ff04700-b715-11ea-934f-943ffe0439b0.gif">
</p>
<br>


#### Add organization as Consortium Member on the orderer to transact
  - Navigate to the <b>Nodes</b> tab, and click on the <b>Orderer</b> that was created.
  - Under <b>Consortium Members</b>, click <b>Add organization +</b>.
  - Select the <b>Existing MSP ID</b> tab. From the drop-down list, select `Org1MSP (Org1MSP)`, as this is the MSP that represents the peer's organization "Org1".
  - Click <b>Add organization</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/85803823-105e4b00-b716-11ea-9ee3-28e0d30ffa95.gif">
</p>
<br>


#### Create the channel
  - Navigate to the <b>Channels</b> tab in the left navigation and click <b>Create channel +</b>.
  - Click <b>Next</b>.
  - Give the <b>Channel name</b> as `mychannel`. Select `Orderer` from the <b>Ordering service</b> drop-down list. Click <b>Next</b>.
  - Under <b>Organizations</b>, select `Org1MSP (Org1MSP)` from the drop-down list to add the organization "Org1" as a member of this channel. Click the <b>Add</b> button. Set the permissions for this member as <b>Operator</b>. Click <b>Next</b>.
  - Leave the <b>Policy</b> as the default value i.e. `1 out of 1`. Click <b>Next</b>.
  - Select the <b>Channel creator MSP</b> as `Org1MSP (Org1MSP)` and the <b>Identity</b> as `Org1 Admin`. Click <b>Next</b>.
  - Review the summary and click <b>Create channel</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/85804332-5a93fc00-b717-11ea-81e7-a4b6955575ee.gif">
</p>
<br>


#### Join your peer to the channel
  - Click on the newly created channel <b>mychannel</b>.
  - In the side panel that opens, under <b>Choose from available peers</b>, select `Peer Org1`. Once the peer is selected, a check mark will be displayed next to it. Ensure that <b>Make anchor peer(s)</b> is marked as `Yes`. Click <b>Join channel</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/85804533-e60d8d00-b717-11ea-8066-64d66e4b4d33.gif">
</p>
<br>


### 5. Deploy FabCar Smart Contract on the network

#### Install a smart contract
  - Navigate to the <b>Smart contracts</b> tab in the left navigation and click <b>Install smart contract +</b>.
  - Click on <b>Add file</b>.
  - Browse to the location of the Fabcar smart contract package file (it is probably named `fabcar@1.0.0.cds`), which we packaged earlier using the IBM Blockchain Platform extension for Visual Studio code.
  - Once the contract is uploaded, click <b>Install smart contract</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/86621220-d0a42880-bf8b-11ea-92b7-b67972796dc9.gif">
</p>
<br>


#### Instantiate smart contract
  - Under <b>Installed smart contracts</b>, find the smart contract from the list (**Note: ours is called fabcar**) installed on our peer and click <b>Instantiate</b> from the overflow menu on the right side of the row.
  - On the side panel that opens, select the channel, `mychannel` on which to instantiate the smart contract. Click <b>Next</b>.
  - Select `Org1MSP` as the organization member to be included in the endorsement policy. Click <b>Next</b>.
  - Skip the <b>Setup private data collection</b> step and simply click <b>Next</b>.
  - Provide the <b>Function name</b> as `initLedger` and leave the <b>Arguments</b> blank.
  - Click <b>Instantiate smart contract</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/86622766-735da680-bf8e-11ea-9b21-0e9c9eebcfef.gif">
</p>
<br>


### 6. Connect application to the network

#### Connect with sdk through connection profile
  - Navigate to the <b>Organizations</b> tab in the left navigation, and click on <b>Org1MSP</b>.
  - Click on <b>Download Connection Profile</b>. 
  - In the side panel that opens up, select `Yes` as the response for <b>Include Org1 CA for user registration and enrollment?</b>. Under <b> Select peers to include</b>, select `Peer Org1`. Then click <b>Download connection profile</b>. This will download the connection json which we will use to establish a connection between the Node.js web application and the Blockchain Network.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/86624377-334bf300-bf91-11ea-9438-80da5de5cfce.gif">
</p>
<br>


#### Create an application admin
  - Navigate to the <b>Nodes</b> tab in the left navigation, and under <b>Certificate Authorities</b>, choose <b>Org1 CA</b>.
  - Click on the <b>Register User +</b> button. Give an <b>Enroll ID</b> of `app-admin` and an <b>Enroll secret</b> of `app-adminpw`. Set the <b>Type</b> for this identity as `client`. Specify to <b>Use root affiliation</b>. Leave the <b>Maximum enrollments</b> field blank. Click <b>Next</b>.
  - Click on <b>Add attribute +</b>. Enter the <b>attribute name</b> as `hf.Registrar.Roles` and the <b>attribute value</b> as `*`. Click <b>Register user</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/85872406-b0ab8280-b79d-11ea-80e8-632d2bd39285.gif">
</p>
<br>


#### Update application connection profile

  - Copy the connection profile you downloaded into the [server folder](web-app/server).
  - Update the [config.json](web-app/server/config.json) file with:
    - The connection json file name you downloaded.
    - The <b>enroll id</b> and <b>enroll secret</b> for your app admin, which we earlier provided as `app-admin` and `app-adminpw` respectively.
    - The orgMSP ID, which we provided as `Org1MSP`.
    - The caName, which can be found in your connection json file under "organizations" -> "Org1MSP" -> certificateAuthorities". This would be like an IP address and a port.
    - The username you would like to register.
    - Update gateway discovery to `{ enabled: true, asLocalhost: false }` to connect to IBM Blockchain Platform.

> <b>the current default contents of the config.json are to connect to a local fabric instance from VS Code.</b>

After the updates, the contents of the config.json should look similar to the file shown below:
```
{
    "connection_file": "Org1MSP_profile.json",
    "appAdmin": "app-admin",
    "appAdminSecret": "app-adminpw",
    "orgMSPID": "Org1MSP",
    "caName": "169.46.208.151:30404",
    "userName": "user1",
    "gatewayDiscovery": { "enabled": true, "asLocalhost": false }
}
```


### 7. Run the application

#### Enroll admin

  - First, navigate to the `web-app/server` directory, and install the node dependencies:
    
    ```bash
    cd web-app/server
    npm install
    ```

  - Run the `enrollAdmin.js` script:
    
    ```bash
    node enrollAdmin.js
    ```

  - You should see the following in the terminal:
    
    ```bash
    msg: Successfully enrolled admin user app-admin and imported it into the wallet
    ```


#### Register User

  - From the `server` directory, run the `registerUser.js` script:
    
    ```bash
    node registerUser.js
    ```

  - You should see the following in the terminal:
    
    ```bash
    Successfully registered and enrolled admin user user1 and imported it into the wallet
    ```


#### Start the application server

  - From the `server` directory, start the server:

    ```bash
    npm start
    ```


#### Start the web client

  - In a new terminal, open the `web-app/client` directory and install the dependencies:

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

You can go to the IBM Blockchain Platform console to monitor your users and get information on your channel including the blocks added.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/86625249-c6395d00-bf92-11ea-9d5b-93c036bc4870.gif">
</p>
<br>


## Troubleshooting

* If you encounter an error ``discover error: access denied``, you need to set the `gatewayDiscovery` properly in your `config.json` file. This is <b>REQUIRED</b>  You must set it as follows to connect to IBP:

                 `"gatewayDiscovery": {"enabled": true, "asLocalhost": false }`

* When running the *registerUser.js* script, if you get an error that says `Failed to register user user1: TypeError [ERR_INVALID_ARG_TYPE]: The "options.ca" property must be one of type string, Buffer, TypedArray, or DataView. Received type object` , you can get past this error by editing your connection profile that was downloaded from IBM Blockchain Platform. Open the connection profile and look for `tlsCACerts` under your certificateAuthority. If the `pem` value under `tlsCACerts` is of type array, remove the square brackets `[]` and convert it to a string. That is, if your connection profile is like the following image:

<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/86639850-a06a8300-bfa7-11ea-90a1-c82bdb5f88a2.png">
</p>

update it as shown in the image below:

<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/86640129-05be7400-bfa8-11ea-8e35-dc1165ffaaca.png">
</p>

* When running the *registerUser.js* script, if you get an error that says `Error: Calling register endpoint failed with error [Error: self signed certificate]`, you can get past this by adding `"httpOptions": {"verify": false}` to the certificateAuthorities section of the connection profile that was downloaded from IBM Blockchain Platform.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/85960318-b2796f80-b970-11ea-9fcc-b8af15bf4b38.png">
</p>
<br>


## Links

* [Hyperledger Fabric Docs](http://hyperledger-fabric.readthedocs.io/en/latest/)
* [IBM Code Patterns for Blockchain](https://developer.ibm.com/patterns/category/blockchain/)


## License

This code pattern is licensed under the Apache Software License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1 (DCO)](https://developercertificate.org/) and the [Apache Software License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache Software License (ASL) FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)
