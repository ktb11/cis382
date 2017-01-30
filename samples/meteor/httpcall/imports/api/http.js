import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

if (Meteor.isServer) {
    Meteor.methods({
        
        getRestData(whichData) {
            
            let url = 'https://jsonplaceholder.typicode.com/'+whichData;
            console.log("URL: " + url);
            let result = '';
            let statusCode = '';
            
            try {
                try {
                  let callResult = Meteor.http.call('GET', url, {});
                  statusCode = callResult.statusCode;
                  result = JSON.stringify(callResult);
                } catch (callErr) {
                  statusCode = callErr.response.statusCode;
                  console.log('Catch - Call error:');
                  // console.log(callErr);
                  result = '{"error" : "' + callErr.response + '"}';
                } finally {
                  console.log('Finally');
                  console.log('Status Code: ' + statusCode);
                  // console.log('Result to be returned:');
                  // console.log(result);
                  return result;
                }
            } catch (err) {
                console.log('General error');
                console.log(err);
                return '{"error" : "' + err + '"}';
            }
        }
    });
}
