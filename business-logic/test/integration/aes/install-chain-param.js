
'use strict';

var utils = require('fabric-client/lib/utils.js');
var logger = utils.getLogger('E2E install-chaincode');

var tape = require('tape');
var _test = require('tape-promise');
var test = _test(tape);

var e2eUtils = require('../e2e/e2eUtils.js');
var testUtil = require('../../unit/util.js');
var version = 'v0';


function installChainByParam(OrgName,PeerName){


test('\n\n***** Node-Chaincode End-to-end flow: chaincode install *****\n\n', (t) => {
	e2eUtils.installChaincode(OrgName , testUtil.NODE_CHAINCODE_PATH, testUtil.METADATA_PATH, version, 'node', t, true)
		.then(() => {
			t.pass('Successfully installed chaincode in peers of organization'+OrgName);
			//return e2eUtils.installChaincode('org2', testUtil.NODE_CHAINCODE_PATH, testUtil.METADATA_PATH, version, 'node', t, true);
		}, (err) => {
			t.fail('Failed to install chaincode in peers of organization '+OrgName+' ' + err.stack ? err.stack : err);
			logger.error('Failed to install chaincode in peers of organization '+OrgName+'. ');
			//return e2eUtils.installChaincode('org2', testUtil.NODE_CHAINCODE_PATH, testUtil.METADATA_PATH, version, 'node', t, true);
		}).catch((err) => {
			t.fail('Test failed due to unexpected reasons. ' + err.stack ? err.stack : err);
			t.end();
		});
});
}