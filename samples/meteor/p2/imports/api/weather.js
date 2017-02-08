import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';


const xWeatherData = ' \
{ \
	"coord": { \
		"lon": -123.13, \
		"lat": 44.1 \
	}, \
	"weather": [ \
		{ \
			"id": 800, \
			"main": "Clear", \
			"description": "clear sky", \
			"icon": "02n" \
		} \
	], \
	"base": "stations", \
	"main": { \
		"temp": 280.183, \
		"pressure": 1006.08, \
		"humidity": 94, \
		"temp_min": 280.183, \
		"temp_max": 280.183, \
		"sea_level": 1034.67, \
		"grnd_level": 1006.08 \
	}, \
	"wind": { \
		"speed": 1.06, \
		"deg": 197.002 \
	}, \
	"clouds": { \
		"all": 8 \
	}, \
	"dt": 1485304942, \
	"sys": { \
		"message": 0.2081, \
		"country": "US", \
		"sunrise": 1485358607, \
		"sunset": 1485393217 \
	}, \
	"id": 5750516, \
	"name": "Santa Clara", \
	"cod": 200 \
}';

// REST API calls must be on the server to avoid xcross (cross domain) errors
// HTTP.call has both an asynchronous syntax (provide a callback function), or a synchronous syntax (no callbac)
// If you use asynchronous version,  more difficult to return, as the getWeatherData() method will already have tried
// to return a result but the callback has nothing to do with returning info from getWeatherData()
if (Meteor.isServer) {
  Meteor.methods({
    getWeatherData(zipCode, countryCode, apiKey) {
      // return xWeatherData; // Use this technique to test call
      let url = 'http://api.openweathermap.org/data/2.5/weather?zip='+zipCode+','+countryCode+'&appid='+apiKey+'&units=imperial';
      console.log('zip: ' + zipCode);
      console.log('country: ' + countryCode);
      console.log('api: ' + apiKey);
      let result = '';
      let status = ''; // 200 = results, 401 = invalid api key
      try {
        try {
          let callResult = HTTP.call('GET', url, {});
          status = callResult.statusCode;
          result = callResult.content;
        } catch (callErr) {
          console.log('Catch - Call error:');
          console.log(callErr);
          console.log("Call response message:");
          console.log(callErr.response.data.message);
          status = callErr.response.statusCode;
          result = '{"error" : "' + callErr.response.data.message + '"}';
        } finally {
          console.log('Finally');
          console.log("Status code: " + status);
          console.log('Result to be returned:');
          console.log(result);
          return result;
        }
      } catch (err) {
        console.log(result);
        if (result != null && result.content) {
          console.log('in catch - content');
          console.log(err);
          return '{"error" : "' + result.content + '"}';
        } else {
          console.log('in catch no content');
          return '{"error" : "' + err + '"}';
        }
      }
    },
  });
}
