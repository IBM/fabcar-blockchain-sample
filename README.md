[日本語はこちら - Japanese version](./README-ja.md)


[![Build Status](https://travis-ci.org/IBM/fabcar-blockchain-sample.svg?branch=master)](https://travis-ci.org/IBM/fabcar-blockchain-sample)


# FabCar Blockchain Sample

>Hyperledger Fabric sample Fabcar on IBM Blockchain Platform

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
- [Node v8.x or v10.x and npm v6.x or greater](https://nodejs.org/en/download/)
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
  <img src="https://user-images.githubusercontent.com/8854447/71910509-05036d00-3140-11ea-8b15-7c8aeb403974.png">
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
  - Navigate to the <b>Nodes</b> tab in the left navigation and click <b>Add Certificate Authority</b>.
  - Click <b>Create an IBM Cloud Certificate Authority</b> and <b>Next</b>.
  - Give it a <b>CA display name</b> of `Org1 CA` and click <b>Next</b>.
  - Specify an <b>CA Administrator Enroll ID</b> of `admin` and <b>CA Administrator Enroll Secret</b> of `adminpw`, then click <b>Next</b>.
  - Review the summary and click <b>Add Certificate Authority</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71913565-bb1d8580-3145-11ea-9eaa-1b4e8a10e985.gif">
</p>
<br>


#### Associate the peer organization CA admin identity
  - In the Nodes tab, select the <b>Org1 CA</b> once it is running (indicated by the green box in the tile).
  - Click <b>Associate identity</b> on the CA overview panel.
  - On the side panel, select <b>Enroll ID</b>. 
  - Provide an <b>Enroll ID</b> of `admin` and an <b>Enroll secret</b> of `adminpw`. Use the default value of `Org1 CA Identity` for the <b>Identity display name</b>.
  - Click <b>Associate identity</b> to add the identity into your wallet and associate the admin identity with the <b>Org1 CA</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71913744-1e0f1c80-3146-11ea-85e4-eea5280aa8e9.gif">
</p>
<br>


#### Use peer organization CA to register the peer and org1 admin identities
  - Select the <b>Org1 CA</b> Certificate Authority and ensure the `admin` identity that was created for the CA is visible in the table.
  - We will register an admin for our organization "org1". Click on the <b>Register User</b> button. Give an <b>Enroll ID</b> of `org1admin`, and <b>Enroll Secret</b> of `org1adminpw`. Set the <b>Type</b> for this identity as `client`. We can specify to <b>Use root affiliation</b> or uncheck this field and select from any of the affiliated organizations from the drop-down list. We will leave the <b>Maximum enrollments</b> field blank. Click <b>Next</b>.
  - We will not be adding any attributes to this user. Click <b>Register user</b>.
  - We will repeat the process to create an identity of the peer. Click on the <b>Register User</b> button. Give an <b>Enroll ID</b> of `peer1`, and <b>Enroll Secret</b> of `peer1pw`. Set the <b>Type</b> for this identity as `peer`. We can specify to <b>Use root affiliation</b> or uncheck this field and select from any of the affiliated organizations from the drop-down list. Click <b>Next</b>.
  - We will not be adding any attributes to this user. Click <b>Register user</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71913929-7c3bff80-3146-11ea-9930-a455f1e45fe2.gif">
</p>
<br>


#### Create the peer organization MSP definition
  - Navigate to the <b>Organizations</b> tab in the left navigation and click <b>Create MSP definition</b>.
  - Enter the <b>MSP Display name</b> as `Org1MSP` and an <b>MSP ID</b> of `Org1MSP`.
  - Under <b>Root Certificate Authority</b> details, specify the peer CA that we created `Org1 CA` as the root CA for the organization.
  - Give the <b>Enroll ID</b> and <b>Enroll secret</b> for your organization admin, `org1admin` and `org1adminpw`. Then, give the Identity name as `Org1 Admin`.
  - Click the <b>Generate</b> button to enroll this identity as the admin of your organization and export the identity to the wallet. Click <b>Export</b> to export the admin certificates to your file system. Finally click <b>Create MSP definition</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71914115-e5bc0e00-3146-11ea-891c-6422bc4c2c4e.gif">
</p>
<br>


#### Create a peer
  - Navigate to the <b>Nodes</b> tab in the left navigation and click <b>Add peer</b>.
  - Click <b>Create an IBM Cloud peer</b> and then click <b>Next</b>.
  - Give the <b>Peer display name</b> as `Peer Org1` and click <b>Next</b>.
  - On the next screen, select `Org1 CA` as the <b>Certificate Authority</b>. Then, give the <b>Peer enroll ID</b> and <b>Peer enroll secret</b> for the peer identity that you created for your peer, that is, `peer1`, and `peer1pw`. Select the <b>Organization MSP</b> as `Org1MSP`, from the drop-down list. Leave the <b>TLS CSR hostname</b> blank. Click <b>Next</b>.
  - The next step is to Associate an identity with this peer to make it the admin of your peer. Select your peer admin identity `Org1 Admin` and click <b>Next</b>.
  - Review the summary and click <b>Add peer</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71914297-53683a00-3147-11ea-9ecb-bace14e5e5c5.gif">
</p>
<br>


#### Create your orderer organization CA
  - Navigate to the <b>Nodes</b> tab in the left navigation and click <b>Add Certificate Authority</b>.
  - Click <b>Create an IBM Cloud Certificate Authority</b> and <b>Next</b>.
  - Give it a <b>CA display name</b> of `Orderer CA` and click <b>Next</b>.
  - Specify an <b>CA Administrator Enroll ID</b> of `admin` and <b>CA Administrator Enroll Secret</b> of `adminpw`, then click <b>Next</b>.
  - Review the summary and click <b>Add Certificate Authority</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71914392-86123280-3147-11ea-9a6f-b6eddab790b1.gif">
</p>
<br>


#### Associate the orderer organization CA admin identity
  - In the Nodes tab, select the <b>Orderer CA</b> once it is running (indicated by the green box in the tile).
  - Click <b>Associate identity</b> on the CA overview panel.
  - On the side panel, select <b>Enroll ID</b>. 
  - Provide an <b>Enroll ID</b> of `admin` and an <b>Enroll secret</b> of `adminpw`. Use the default value of `Orderer CA Identity` for the <b>Identity display name</b>.
  - Click <b>Associate identity</b> to add the identity into your wallet and associate the admin identity with the <b>Orderer CA</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71914593-e73a0600-3147-11ea-8944-1c5e2bbecfba.gif">
</p>
<br>


#### Use orderer organization CA to register orderer and orderer admin identities
  - Select the <b>Orderer CA</b> Certificate Authority and ensure the `admin` identity that was created for the CA is visible in the table.
  - We will register an admin for the "orderer" organization. Click on the <b>Register User</b> button. Give an <b>Enroll ID</b> of `ordereradmin`, and <b>Enroll Secret</b> of `ordereradminpw`. Set the <b>Type</b> for this identity as `client`. We can specify to <b>Use root affiliation</b> or uncheck this field and select from any of the affiliated organizations from the drop-down list. We will leave the <b>Maximum enrollments</b> field blank. Click <b>Next</b>.
  - We will not be adding any attributes to this user. Click <b>Register user</b>.
  - We will repeat the process to create an identity of the orderer. Click on the <b>Register User</b> button. Give an <b>Enroll ID</b> of `orderer1`, and <b>Enroll Secret</b> of `orderer1pw`. Set the <b>Type</b> for this identity as `orderer`. We can specify to <b>Use root affiliation</b> or uncheck this field and select from any of the affiliated organizations from the drop-down list. Click <b>Next</b>.
  - We will not be adding any attributes to this user. Click <b>Register user</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71914721-35e7a000-3148-11ea-8db6-2d3584fca238.gif">
</p>
<br>


#### Create the orderer organization MSP definition
  - Navigate to the <b>Organizations</b> tab in the left navigation and click <b>Create MSP definition</b>.
  - Enter the <b>MSP Display name</b> as `OrdererMSP` and an <b>MSP ID</b> of `OrdererMSP`.
  - Under <b>Root Certificate Authority</b> details, specify the peer CA that we created `Orderer CA` as the root CA for the organization.
  - Give the <b>Enroll ID</b> and <b>Enroll secret</b> for your organization admin, `ordereradmin` and `ordereradminpw`. Then, give the Identity name as `Orderer Admin`.
  - Click the <b>Generate</b> button to enroll this identity as the admin of your organization and export the identity to the wallet. Click <b>Export</b> to export the admin certificates to your file system. Finally click <b>Create MSP definition</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71914893-95de4680-3148-11ea-8a9d-5952c26c8cdc.gif">
</p>
<br>



#### Create an orderer
  
  - Navigate to the <b>Nodes</b> tab in the left navigation and click <b>Add ordering service</b>.
  - Click <b>Create an IBM Cloud Ordering service</b> and then click <b>Next</b>.
  - Give the <b>Ordering service display name</b> as `Orderer` and click <b>Next</b>.
  - On the next screen, select `Orderer CA` as the <b>Certificate Authority</b>. Then, give the <b>Ordering service enroll ID</b> and <b>Ordering service enroll secret</b> for the peer identity that you created for your orderer, that is, `orderer1`, and `orderer1pw`. Select the <b>Organization MSP</b> as `OrdererMSP`, from the drop-down list. Leave the <b>TLS CSR hostname</b> blank. Click <b>Next</b>.
  - The next step is to Associate an identity with this peer to make it the admin of your peer. Select your peer admin identity `Orderer Admin` and click <b>Next</b>.
  - Review the summary and click <b>Add ordering service</b>.


<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71915205-42b8c380-3149-11ea-8050-5edfd461ae10.gif">
</p>
<br>


#### Add organization as Consortium Member on the orderer to transact
  - Navigate to the <b>Nodes</b> tab, and click on the <b>Orderer</b> that we created.
  - Under <b>Consortium Members</b>, click <b>Add organization</b>.
  - From the drop-down list, select `Org1MSP`, as this is the MSP that represents the peer's organization "Org1".
  - Click <b>Add organization</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71915342-88758c00-3149-11ea-98e2-2ed00dc9c8c3.gif">
</p>
<br>


#### Create the channel
  - Navigate to the <b>Channels</b> tab in the left navigation and click <b>Create channel</b>.
  - Give the <b>Channel name</b> as `mychannel`.
  - Select the orderer you created, `Orderer` from the <b>Ordering service</b> drop-down list.
  - Under <b>Organizations</b>, select `Org1MSP (Org1MSP)` from the drop-down list to add the organization "Org1" as a member of this channel. Click <b>Add</b> button. Set the permissions for this member as <b>Operator</b>.
  - Scroll down to the <b>Channel creator organization</b> section and select `Org1MSP (Org1MSP)` from the dropdown as the <b>Channel creator MSP</b> and select `Org1 Admin` from the dropdown under <b>Identity</b>.
  - Click <b>Create channel</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71915595-15b8e080-314a-11ea-9843-d7df9be30fe5.gif">
</p>
<br>


#### Join your peer to the channel
  - Click <b>Join channel</b> to add a peer to the channel.
  - Select your `Orderer` as the <b>Ordering service</b> and click <b>Next</b>.
  - Enter the name of the <b>Channel</b> as `mychannel` and click <b>Next</b>.
  - Next we need to select which peers should be added to the channel. In our case, we just want to add the peer we created under "Org1". Select `Peer Org1` .
  - Click <b>Join channel</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71915747-67fa0180-314a-11ea-984b-80deb0877d03.gif">
</p>
<br>


### 5. Deploy FabCar Smart Contract on the network

#### Install a smart contract
  - Navigate to the <b>Smart contracts</b> tab in the left navigation and click <b>Install smart contract</b>.
  - Browse to the location of the Blockchain for maintaining Digital Assets smart contract package file (it is probably named `fabcar@1.0.0.cds`), which we packaged earlier using the IBM Blockchain Platform extension for Visual Studio code.
  - Click on <b>Add file</b> and find your packaged smart contract. 
  - Once the contract is uploaded, click <b>Install smart contract</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/73293647-42549b00-41d2-11ea-9e57-48ccb584ec94.gif">
</p>
<br>

#### Instantiate smart contract
  - Under <b>Installed smart contracts</b>, find the smart contract from the list (**Note: ours is called fabcar**) installed on our peer and click <b>Instantiate</b> from the overflow menu on the right side of the row.
  - On the side panel that opens, select the channel, `mychannel` on which to instantiate the smart contract. Click <b>Next</b>.
  - Select the organization members to be included in the endorsement policy. In our case, we need to select `Org1MSP`. Click <b>Next</b>.
  - We can skip the <b>Setup private data collection</b> step and simply click <b>Next</b>.
  - Give <b>Function name</b> of `initLedger` and leave <b>Arguments</b> blank.
  - Click <b>Instantiate</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/73294157-459c5680-41d3-11ea-848e-f7c70ea3fe64.gif">
</p>
<br>


### 6. Connect application to the network

#### Connect with sdk through connection profile
  - Scroll down to the <b>Instantiated smart contracts</b> section and find the "fabcar" contract in the list. Click on `Connect with SDK` from the overflow menu on the right side of the row.
  - From the dropdown for <b>MSP for connection</b> choose `Org1MSP`.
  - From the dropdown for <b>Certificate Authority</b> choose `Org1 CA`.
  - Download the connection profile by scrolling down and clicking <b>Download Connection Profile</b>. This will download the connection json which we will use to establish a connection between the Node.js web application and the Blockchain Network.
  - You can click <b>Close</b> once the download completes.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/73294452-e1c65d80-41d3-11ea-930b-cf225f68e52d.gif">
</p>
<br>


#### Create an application admin
  - Navigate to the <b>Nodes</b> tab in the left navigation, and under <b>Certificate Authorities</b>, choose your organization CA, <b>Org1 CA</b>.
  - Click on <b>Register user</b>.
  - Give an <b>Enroll ID</b> of `app-admin` and <b>Enroll Secret</b> of `app-adminpw`. Set the <b>Type</b> for this identity as `client`. We can specify to <b>Use root affiliation</b> or uncheck this field and select from any of the affiliated organizations from the drop-down list. We will leave the <b>Maximum enrollments</b> field blank. Click <b>Next</b>.
  - Under <b>Attributes</b>, click on <b>Add attribute</b>. Give attribute as `hf.Registrar.Roles` = `*`. This will allow this identity to act as a registrar and issue identities for our app. Click <b>Add attribute</b>.
  - Click <b>Register user</b>.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/72450922-25a77480-3789-11ea-9ce3-2319e7e11008.gif">
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

```
{
    "connection_file": "mychannel_fabcar_profile.json",
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


#### Register User

  - Run the `registerUser.js` script.
    
    ```bash
    node registerUser.js
    ```

  - You should see the following in the terminal:
    
    ```bash
    Successfully registered and enrolled admin user user1 and imported it into the wallet
    ```


#### Start the application server

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

You can go to the IBM Blockchain Platform console to monitor your users and get information on your channel including the blocks added.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/73297271-3fa97400-41d9-11ea-825d-a2943e6ca929.gif">
</p>
<br>


## Troubleshooting

* If you encounter an error ``discover error: access denied``, you need to set the `gatewayDiscovery` properly in your `config.json` file. This is <b>REQUIRED</b>  You must set it as follows to connect to IBP:

                 `"gatewayDiscovery": {"enabled": true, "asLocalhost": false }`


## Links

* [Hyperledger Fabric Docs](http://hyperledger-fabric.readthedocs.io/en/latest/)
* [IBM Code Patterns for Blockchain](https://developer.ibm.com/patterns/category/blockchain/)


## License

This code pattern is licensed under the Apache Software License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1 (DCO)](https://developercertificate.org/) and the [Apache Software License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache Software License (ASL) FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)