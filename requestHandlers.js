
var querystring = require("querystring");
var upsAPI = require('shipping-ups');
var util = require('util');
var fs = require('fs');
var https = require('https');
var parser = require('xml2json');

var options = {
    imperial: true, // for inches/lbs, false for metric cm/kgs
    currency: 'USD',
    environment: 'sandbox',
    access_key: 'ECD9453AD9018E66',
    username: 'eventrio',
    password: 'Kenziemac1!',
    pretty: false,
    user_agent: 'eventrio | dkerr',
    debug: false
  }

var ups = new upsAPI(options);

var MongoClient = require('mongodb').MongoClient;




function start(response,request) { 
    
    response.writeHead(200, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        var json = JSON.stringify({"msg":"started"});
       response.end(json);

    
   

}

function address(response,request) {
    var postData= '';
    request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
    });
    request.addListener("end", function() {
        var jsonData = JSON.parse(postData);
        
               insertAddressRequest(jsonData);     
        
        ups.address_validation(jsonData, function(err, res) {
        var json;
          if(err) {
            console.log(err);
              json = JSON.stringify(err);
          }
            else {
                json = JSON.stringify(res);
            }
            
            var jsonDataResponse = JSON.parse(json);
            insertAddressResponse(jsonDataResponse);
            
            response.writeHead(200, { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });

           response.end(json);
        });
    });
  
}

function insertAddressRequest(jsonData) {
    
    MongoClient.connect('mongodb://nodejitsu:13694c3dd76b5e92327047bf5bf5cfe8@troup.mongohq.com:10073/nodejitsudb3830799472',function(err, connection) {
            var collection = connection.collection('address_verification_request');
                collection.insert(jsonData, function(err, count) {
                    //collection.find().toArray(function(err, documents) {
                      //  console.dir(documents);
                        connection.close();
                    });
               
            });
}
function insertAddressResponse(jsonData) {
    
    MongoClient.connect('mongodb://nodejitsu:13694c3dd76b5e92327047bf5bf5cfe8@troup.mongohq.com:10073/nodejitsudb3830799472',function(err, connection) {
            var collection = connection.collection('address_verification_response');
                collection.insert(jsonData, function(err, count) {
                   // collection.find().toArray(function(err, documents) {
                       // console.dir(documents);
                        connection.close();
                    });
               
            });
}

function addressrequests(response,request) {
    MongoClient.connect('mongodb://nodejitsu:13694c3dd76b5e92327047bf5bf5cfe8@troup.mongohq.com:10073/nodejitsudb3830799472',function(err, connection) {
            var collection = connection.collection('address_verification_request');
                
                    collection.find().toArray(function(err, documents) {
                       // console.dir(documents);
                        
                        
                    json = JSON.stringify(documents);

                      response.writeHead(200, { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    });
       
                    response.end(json);
                        
                        connection.close();
                    });
            
            });
}

function addressresponses(response,request) {
    MongoClient.connect('mongodb://nodejitsu:13694c3dd76b5e92327047bf5bf5cfe8@troup.mongohq.com:10073/nodejitsudb3830799472',function(err, connection) {
            var collection = connection.collection('address_verification_response');
                
                    collection.find().toArray(function(err, documents) {
                       // console.dir(documents);
                        
                        
                    json = JSON.stringify(documents);

                      response.writeHead(200, { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    });
       
                    response.end(json);
                        
                        connection.close();
                    });
            
            });
}


function transit(response,request) {
    
    var postData= '';
    request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
    });
    request.addListener("end", function() {
        
        var jsonData = JSON.parse(postData);
        ups.time_in_transit(jsonData, function(err, res) {
             var json;
          if(err) {
            //console.log(err);
               json = JSON.stringify(res);
          }
        else {
             json = JSON.stringify(res);
        }

          response.writeHead(200, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
       
       response.end(json);
        });
    });
    
    
}

function rates(response,request) {
    
     var postData= '';
    request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
    });
    request.addListener("end", function() {
        var jsonData = JSON.parse(postData);
        ups.rates(jsonData, function(err, res) {
            var json;
          if(err) {
           // return console.log(err);
               json = JSON.stringify(err);
          }
        else {
             json = JSON.stringify(res);
        }
          response.writeHead(200, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
       
       response.end(json);

        });
    });
    
}

function track(response,request) {
    
     var postData= '';
    request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
    });
    request.addListener("end", function() {
        var jsonData = JSON.parse(postData);
    
        ups.track(jsonData, function(err, res) {
        var json;
          if(err) {
           json = JSON.stringify(err)
          }
        else {
            json = JSON.stringify(res);
        }

          response.writeHead(200, { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });

           response.end(json);
        });
    
    });
}
function confirm(response,request) {
     var postData= '';
    request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
    });
    request.addListener("end", function() {
        var jsonData = JSON.parse(postData);
            var json;
                ups.confirm(jsonData, function(err, res) {
                  if(err) {
                    //return console.log(err);
                      json = JSON.stringify(err);
                       response.writeHead(200, { 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        });
                       
                       response.end(json);
                  }
                else {
                    //json = JSON.stringify(res);
                

                //console.log(util.inspect(res, {depth: null}));
                  ups.accept(res.ShipmentDigest, function(errA, resA) {
                      //console.log(res);
                    //if(err) {
                      //return console.log(err);
                        //json = JSON.stringify(errA);
                    /*}
                    else {*/
                            json = JSON.stringify(resA);

                        
                           /* fs.writeFile('./label.gif', new Buffer(res.ShipmentResults.PackageResults.LabelImage.GraphicImage, "base64"), function(err) {
                            
                                ups.void(res.ShipmentResults.ShipmentIdentificationNumber, function(err, res) {
                               
                                    if(err) {
                                        json = JSON.stringify(err);
                                      
                                    }
                                    else {
                                        json = JSON.stringify(res);
                                    }

                                })
                            });*/
                   // }
                       response.writeHead(200, { 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        });
                       
                       response.end(json);
                  });
                }
                
            });
    
    });
}

function freightrate(response,request) {
   
    var json;
    var soap = require('soap');
  var url = 'http://www.doubletaketech.net/ups/wsdl/FreightRate.wsdl';
  var postData= '';
    request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
    });
     
    
    request.addListener("end", function() {
       var jsonData = JSON.parse(postData);
        
        soap.createClient(url, function(err, client) {

              client.addSoapHeader({
                  "upss:UPSSecurity": {
                    "upss:UsernameToken": {
                      "upss:Username": options.username,
                      "upss:Password": options.password
                    },
                    "upss:ServiceAccessToken": {
                      "upss:AccessLicenseNumber": options.access_key
                    }
                  }
              });
            
                /*if(err){
                  json = JSON.stringify(err);
                  }
                  else {
                      json = JSON.stringify(client.describe());
                  }*/
           
              
             client.FreightRateService.FreightRatePort.ProcessFreightRate(jsonData, function(err, result) {
               // console.log('freight called');
                 
                  if(err){
                    json = JSON.stringify(err.body);
                      //console.log(util.inspect(err));
                  }
                  else {
                      json = JSON.stringify(result);
                  }
                  // console.log(json);
                // console.log(util.inspect(err));
                 // console.log(util.inspect(result, { showHidden: true, depth: null }));
                   // console.log(result);
                 //var json = JSON.stringify(client.lastRequest);
                 response.writeHead(200, { 
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin': '*'
                                });
                 response.end(json);

               
              });

              
            
            
            });
        
         
    });  
    
}


function freightratedescribe(response,request) {
   
    
    var soap = require('soap');
  var url = 'http://www.doubletaketech.net/ups/wsdl/FreightRate.wsdl';
    
        soap.createClient(url, function(err, client) {

               client.addSoapHeader({
                  "upss:UPSSecurity": {
                    "upss:UsernameToken": {
                      "upss:Username": options.username,
                      "upss:Password": options.password
                    },
                    "upss:ServiceAccessToken": {
                      "upss:AccessLicenseNumber": options.access_key
                    }
                  }
              });
            
                if(err){
                  json = JSON.stringify(err);
                  }
                  else {
                      json = JSON.stringify(client.describe());
                  }
           
              
                 response.writeHead(200, { 
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin': '*'
                                });
                 response.end(json);

             
              
            
            
            });
        
          
    
}

function freightshipdescribe(response,request) {
   
    
    var soap = require('soap');
  var url = 'http://www.doubletaketech.net/ups/wsdl/FreightShip.wsdl';
    
        soap.createClient(url, function(err, client) {

               client.addSoapHeader({
                  "upss:UPSSecurity": {
                    "upss:UsernameToken": {
                      "upss:Username": options.username,
                      "upss:Password": options.password
                    },
                    "upss:ServiceAccessToken": {
                      "upss:AccessLicenseNumber": options.access_key
                    }
                  }
              });
            
                if(err){
                  json = JSON.stringify(err);
                  }
                  else {
                      json = JSON.stringify(client.describe());
                  }
           
              
                 response.writeHead(200, { 
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin': '*'
                                });
                 response.end(json);

             
              
            
            
            });
        
          
    
}

function freightship(response,request) {
   
   /* var json;
    var soap = require('soap');
  var url = 'http://www.doubletaketech.net/ups/wsdl/FreightShip.wsdl';
  var postData= '';
    request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
    });
     
    
    request.addListener("end", function() {
       var jsonData = JSON.parse(postData);
         var args = {common : {Request: '', RequestOption : '1'}};
        soap.createClient(url, args,function(err, client) {

               client.addSoapHeader({
                  "upss:UPSSecurity": {
                    "upss:UsernameToken": {
                      "upss:Username": options.username,
                      "upss:Password": options.password
                    },
                    "upss:ServiceAccessToken": {
                      "upss:AccessLicenseNumber": options.access_key
                    }
                  }
              });
           
              
             client.FreightShipService.FreightShipPort.ProcessShipment(jsonData,function(err, result) {
                
                 
                 
                  if(err){
                  json = err;
                  }
                  else {
                      json = JSON.stringify(result);
                  }
                   console.log(json);
                 json = JSON.stringify(client.lastRequest);
                 response.writeHead(200, { 
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin': '*'
                                });
                 response.end(json);

               
              });

              
            
            
            });
        
         
    });  */
   
        var body = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:error="http://www.ups.com/XMLSchema/XOLTWS/Error/v1.1" xmlns:common="http://www.ups.com/XMLSchema/XOLTWS/Common/v1.0" xmlns:upss="http://www.ups.com/XMLSchema/XOLTWS/UPSS/v1.0" xmlns:fsp="http://www.ups.com/XMLSchema/XOLTWS/FreightShip/v1.0" xmlns:tns="http://www.ups.com/WSDL/XOLTWS/FreightShip/v1.0">'+
        '<soap:Header><upss:UPSSecurity>'+
            '<upss:UsernameToken>'+
            '<upss:Username>eventrio</upss:Username>'+
            '<upss:Password>Kenziemac1!</upss:Password>'+
            '</upss:UsernameToken>'+
            '<upss:ServiceAccessToken>'+
            '<upss:AccessLicenseNumber>ECD9453AD9018E66</upss:AccessLicenseNumber>'+
            '</upss:ServiceAccessToken>'+
            '</upss:UPSSecurity>'+
            '</soap:Header>'+
    '<soap:Body><fsp:FreightShipRequest xmlns:fsp="http://www.ups.com/XMLSchema/XOLTWS/FreightShip/v1.0" xmlns="http://www.ups.com/XMLSchema/XOLTWS/FreightShip/v1.0">'+
            '<common:Request>'+
                '<common:RequestOption>1</common:RequestOption>'+
            '</common:Request>'+
            '<fsp:Shipment>'+
                '<fsp:ShipFrom>'+
                    '<fsp:Name>Developer Test 1</fsp:Name>'+
                    '<fsp:Address>'+
                        '<fsp:AddressLine>101 Developer Way</fsp:AddressLine>'+
                        '<fsp:City>Richmond</fsp:City>'+
                        '<fsp:StateProvinceCode>VA</fsp:StateProvinceCode>'+
                        '<fsp:Town></fsp:Town>'+
                        '<fsp:PostalCode>23224</fsp:PostalCode>'+
                        '<fsp:CountryCode>US</fsp:CountryCode>'+
                    '</fsp:Address>'+
                    '<fsp:Phone>'+
                        '<fsp:Number>8326891199</fsp:Number>'+
                    '</fsp:Phone>'+
                '</fsp:ShipFrom>'+
                '<fsp:ShipperNumber>E06F44</fsp:ShipperNumber>'+
                '<fsp:ShipTo>'+
                    '<fsp:Name>Consignee Test 1</fsp:Name>'+
                    '<fsp:Address>'+
                        '<fsp:AddressLine>1000 Consignee Street</fsp:AddressLine>'+
                        '<fsp:City>Allanton</fsp:City>'+
                        '<fsp:StateProvinceCode>MO</fsp:StateProvinceCode>'+
                        '<fsp:Town></fsp:Town>'+
                        '<fsp:PostalCode>63025</fsp:PostalCode>'+
                        '<fsp:CountryCode>US</fsp:CountryCode>'+
                    '</fsp:Address>'+
                    '<fsp:AttentionName></fsp:AttentionName>'+
                    '<fsp:TariffPoint></fsp:TariffPoint>'+
                '</fsp:ShipTo>'+
                '<fsp:PaymentInformation>'+
                    '<fsp:Payer>'+
                        '<fsp:Name>Developer Test 1</fsp:Name>'+
                        '<fsp:Address>'+
                            '<fsp:AddressLine>101 Developer Way</fsp:AddressLine>'+
                            '<fsp:City>Richmond</fsp:City>'+
                            '<fsp:StateProvinceCode>VA</fsp:StateProvinceCode>'+
                            '<fsp:Town></fsp:Town>'+
                            '<fsp:PostalCode>23224</fsp:PostalCode>'+
                            '<fsp:CountryCode>US</fsp:CountryCode>'+
                        '</fsp:Address>'+
                        '<fsp:ShipperNumber>E06F44</fsp:ShipperNumber>'+
                        '<fsp:AttentionName></fsp:AttentionName>'+
                    '</fsp:Payer>'+
                    '<fsp:ShipmentBillingOption>'+
                        '<fsp:Code>10</fsp:Code>'+
                        '<fsp:Description>Pre-Paid</fsp:Description>'+
                    '</fsp:ShipmentBillingOption>'+
                '</fsp:PaymentInformation>'+
                '<fsp:Service>'+
                    '<fsp:Code>308</fsp:Code>'+
                    '<fsp:Description>UPS Freight LTL</fsp:Description>'+
                '</fsp:Service>'+
                '<fsp:HandlingUnitOne>'+
                    '<fsp:Quantity>1</fsp:Quantity>'+
                    '<fsp:Type>'+
                        '<fsp:Code>PLT</fsp:Code>'+
                        '<fsp:Description>Pallet</fsp:Description>'+
                    '</fsp:Type>'+
                '</fsp:HandlingUnitOne>'+
                '<fsp:Commodity>'+
                    '<fsp:CommodityID></fsp:CommodityID>'+
                    '<fsp:Description>Samples</fsp:Description>'+
                    '<fsp:Weight>'+
                        '<fsp:UnitOfMeasurement>'+
                            '<fsp:Code>LBS</fsp:Code>'+
                            '<fsp:Description>Pounds</fsp:Description>'+
                        '</fsp:UnitOfMeasurement>'+
                        '<fsp:Value>1500</fsp:Value>'+
                    '</fsp:Weight>'+
                    '<fsp:NumberOfPieces>1</fsp:NumberOfPieces>'+
                    '<fsp:PackagingType>'+
                        '<fsp:Code>PLT</fsp:Code>'+
                        '<fsp:Description>Pallet</fsp:Description>'+
                    '</fsp:PackagingType>'+
                    '<fsp:FreightClass>92.5</fsp:FreightClass>'+
                    '<fsp:NMFCCommodityCode>1160301</fsp:NMFCCommodityCode>'+
                '</fsp:Commodity>'+
            '</fsp:Shipment>'+
        '</fsp:FreightShipRequest>'+
    '</soap:Body>'+
'</soap:Envelope>';
console.log(body);
    

        var postRequest = {
            host: "wwwcie.ups.com",
            path: "/webservices/FreightShip",
            method: "POST",
            port: '443',
            headers: {
                'Content-Type': 'text/xml',
                'Content-Length': Buffer.byteLength(body, 'utf8')
            }
        };

        var buffer = "";

        var req = https.request( postRequest, function( res )    {
            
           //console.log( res.statusCode );
           var buffer = "";
           res.on( "data", function( data ) { buffer = buffer + data; } );
           res.on( "end", function( data ) { 
               //console.log( buffer ); 
               // var json = JSON.stringify(buffer);
               

                var xml = buffer;
                var json = parser.toJson(xml);
                //console.log(json);
               
                 response.writeHead(200, { 
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin': '*'
                                });
                 response.end(json);
           } );

        });
    
        req.on('error', function(e) {
              console.log('problem with request: ' + e.message);
            var json = JSON.stringify(e);
                 response.writeHead(200, { 
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin': '*'
                                });
                 response.end(json);
            });

        req.write( body );
        req.end();
    
   /* RESPONSE SAMPLE JSON
   
   {
    "soapenv:Envelope": {
        "xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
        "soapenv:Header": {},
        "soapenv:Body": {
            "freightShip:FreightShipResponse": {
                "xmlns:freightShip": "http://www.ups.com/XMLSchema/XOLTWS/FreightShip/v1.0",
                "common:Response": {
                    "xmlns:common": "http://www.ups.com/XMLSchema/XOLTWS/Common/v1.0",
                    "common:ResponseStatus": {
                        "common:Code": 1,
                        "common:Description": "Success"
                    }
                },
                "freightShip:ShipmentResults": {
                    "freightShip:OriginServiceCenterCode": "RIC",
                    "freightShip:ShipmentNumber": 59113106,
                    "freightShip:BOLID": 8810533,
                    "freightShip:Rate": [{
                        "freightShip:Type": {
                            "freightShip:Code": "DSCNT",
                            "freightShip:Description": "DSCNT"
                        },
                        "freightShip:Factor": {
                            "freightShip:Value": 1229.29,
                            "freightShip:UnitOfMeasurement": {
                                "freightShip:Code": "USD"
                            }
                        }
                    }, {
                        "freightShip:Type": {
                            "freightShip:Code": "DSCNT_RATE",
                            "freightShip:Description": "DSCNT_RATE"
                        },
                        "freightShip:Factor": {
                            "freightShip:Value": 75,
                            "freightShip:UnitOfMeasurement": {
                                "freightShip:Code": "%"
                            }
                        }
                    }, {
                        "freightShip:Type": {
                            "freightShip:Code": 2,
                            "freightShip:Description": 2
                        },
                        "freightShip:Factor": {
                            "freightShip:Value": 40.98,
                            "freightShip:UnitOfMeasurement": {
                                "freightShip:Code": "USD"
                            }
                        }
                    }, {
                        "freightShip:Type": {
                            "freightShip:Code": "LND_GROSS",
                            "freightShip:Description": "LND_GROSS"
                        },
                        "freightShip:Factor": {
                            "freightShip:Value": 1639.05,
                            "freightShip:UnitOfMeasurement": {
                                "freightShip:Code": "USD"
                            }
                        }
                    }, {
                        "freightShip:Type": {
                            "freightShip:Code": "AFTR_DSCNT",
                            "freightShip:Description": "AFTR_DSCNT"
                        },
                        "freightShip:Factor": {
                            "freightShip:Value": 409.76,
                            "freightShip:UnitOfMeasurement": {
                                "freightShip:Code": "USD"
                            }
                        }
                    }],
                    "freightShip:TotalShipmentCharge": {
                        "freightShip:CurrencyCode": "USD",
                        "freightShip:MonetaryValue": 450.74
                    },
                    "freightShip:BillableShipmentWeight": {
                        "freightShip:UnitOfMeasurement": {
                            "freightShip:Code": "LBS"
                        },
                        "freightShip:Value": 1500
                    },
                    "freightShip:Service": {
                        "freightShip:Code": 308
                    }
                }
            }
        }
    }
}
*/
     
    
}

function taxes(response,request) {
    
    var serviceHost = 'api.zip-tax.com';
    var serviceUrl = '/request/v20?key=6WHX6LD&format=JSON';
    
    var postData= '';
    
    request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
    });
    
    request.addListener("end", function() {
        
        var jsonData = JSON.parse(postData);
        
        serviceUrl = serviceUrl + '&postalcode='+jsonData.postalcode+'&state='+jsonData.state;
      
        var options = {
          host: serviceHost,
          path: serviceUrl
        };

        callback = function(res) {
           var resultData= '';

            
          res.on('data', function (chunk) {
            resultData += chunk;
          });

         
          res.on('end', function () {
            console.log(resultData);
             json = JSON.stringify(resultData);
                response.writeHead(200, { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
                });
       
                response.end(json);
          });
        }

        http.request(options, callback).end();
          
    });
    
    
    
}




exports.start = start;
exports.address = address;
exports.addressrequests = addressrequests;
exports.addressresponses = addressresponses;
exports.transit = transit;
exports.rates = rates;
exports.track = track;
exports.confirm = confirm;
exports.freightrate = freightrate;
exports.freightratedescribe = freightratedescribe;
exports.freightshipdescribe = freightshipdescribe;
exports.freightship = freightship;
exports.taxes = taxes;


