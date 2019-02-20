const jsforce = require('jsforce');
const csv = require('fast-csv');

const username = '';
const password = '';
const asyncResultId = '';
const loginUrl = 'https://test.salesforce.com'

const fileName = `${asyncResultId}_deployResult.csv`;

const conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl: loginUrl
});


const asyncResultIds = [asyncResultId];
conn.login(username, password, function(err, userInfo) {
    if (err) {
        return console.error(err);
    }
    // Now you can get the access token and instance URL information.
    // Save them to establish connection next time.
    console.log(conn.accessToken);
    console.log(conn.instanceUrl);
    // logged in user property
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
    conn.metadata.checkDeployStatus(asyncResultIds, true,function(err,results) {
        if (err) {
            console.error(err);
        }
       csv.writeToPath(fileName,results.details.componentFailures,{headers:true}).on('finish',()=>{
       	  console.log('Done creating the CSV File');
       })
    })
});
