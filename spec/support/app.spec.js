const request = require("request");
const assert = require('chai').assert;
const base_url = "http://localhost:8080";


describe("Atix labs test", () => {
  let server;
  
  before(() => {
    server = require('../../server/server');
  });
  
  after(() => {
    server.close();
  });

  describe("hashFile", () => {
	const endpoint = "/api";

    it("GET /file ", async () => {
      const resourse = '/file';
      const options = {
        method: 'GET',
        uri: base_url+endpoint+resourse
        
      };
	  const response  = await asyncRequest(options);
	  console.log('response: ', response.data);
	});

	it("GET /validateFile ", async () => {
		const resourse = '/validateFile';
		const options = {
		  method: 'GET',
		  uri: base_url+endpoint+resourse
		  
		};
		const response  = await asyncRequest(options);
		console.log('response: ', response.data);
	  });

	  it("GET /file ", async () => {
		const resourse = '/file';
		const options = {
		  method: 'GET',
		  uri: base_url+endpoint+resourse
		};
		const response  = await asyncRequest(options);
		console.log('response: ', response.data);
	   
	  });

    });

 });

const asyncRequest = async (value) => {
  return new Promise((resolve, reject) => {
       request(value, (error, response, data) => {
          if(error) reject(error)
          else resolve({response, data})
          })
         })
}
