/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

// capture network variables from config.json
const configPath = path.join(process.cwd(), 'config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);
let connection_file = config.connection_file;
let appAdmin = config.appAdmin;
let userName = config.userName;
let gatewayDiscovery = config.gatewayDiscovery;

const ccpPath = path.join(process.cwd(), connection_file);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

async function main() {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(userName);
        //TODO: enable once removal works successfully.
        if (!userExists) {
            console.log('An identity for the user ' + userName + ' does not exist in the wallet.');
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists(appAdmin);
        if (!adminExists) {
            console.log('An identity for the admin user ' + appAdmin + ' does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: appAdmin, discovery: gatewayDiscovery });

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const identityService = ca.newIdentityService();
        const adminIdentity = gateway.getCurrentIdentity();

        // Revoke the user, then delete the user from wallet.
        await ca.revoke({ enrollmentID: userName }, adminIdentity);
        identityService.delete(userName, adminIdentity, true).then(function() {
            wallet.delete(userName);
            console.log('Successfully deregistered the user ' + userName + ' and deleted it from the wallet.');
        });

    } catch (error) {
        console.error('Failed to deregister user ' + userName + ': ' + error);
        process.exit(1);
    }
}

main();
