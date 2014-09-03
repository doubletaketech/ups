//var server = 'http://dkerr-ups.nodejitsu.com';
var server = 'http://eva-21647.onmodulus.net';
$(document).ready(function(){

    $('#addressBTN').on('click',function(){
     addressVerify();
    });
    $('#addressRequestsBTN').on('click',function(){
     addressRequests();
    });
    $('#addressResponsesBTN').on('click',function(){
     addressResponses();
    });
    $('#trackBTN').on('click',function(){
     track();
    });
    $('#ratesBTN').on('click',function(){
     rates();
    });
    $('#confirmBTN').on('click',function(){
     confirm();
    });
    $('#transitBTN').on('click',function(){
     transit();
    });
    $('#freightrateBTN').on('click',function(){
     freightrate();
    });
    $('#freightrateDescribeBTN').on('click',function(){
     freightrateDescribe();
    });
    $('#freightshipDescribeBTN').on('click',function(){
     freightshipDescribe();
    });
    $('#freightshipBTN').on('click',function(){
     freightship();
    });

});

function addressVerify(){
    
    postData =  {
    request_option: 3, // 1, 2, or 3 per UPS docs
    // 1 - Address Validation
    // 2 - Address Classification
    // 3 - Address Validation and Address Classification.
    name: 'LA Convention Center',
    company: 'Company Name',
    address_line_1: '1201 S Figueroa St',
    address_line_2: '',
    address_line_3: '',
    city: 'Los Angeles',
    state_code: 'CA',
    postal_code: '90015',
    country_code: 'US'
  }
   
    var json = JSON.stringify(postData);
    
    $.ajax({
    type: 'POST',
    url: server+'/address',
    data: json,
    success: function (data) {

        console.log(data.AddressClassification);
        console.log(data.AddressKeyFormat);
        console.log(data.AmbiguousAddressIndicator);
        console.log(data.Response);
        var tbl = prettyPrint( data );
        $('#result').empty();
         $('#result').append(tbl);
        $('#resultText').val(JSON.stringify(data));
    },
    error: function (xhr, status, error) {
        //console.log('Error: ' + error.message);
         $('#result').empty();
        $('#result').append(JSON.stringify(xhr));
    }
    });

}

function addressRequests(){
    
    $.ajax({
    type: 'GET',
    url: server+'/addressrequests',
    success: function (data) {
    $('#result').empty();
         var tbl = prettyPrint( data );
        
         $('#result').append(tbl);
        $('#resultText').val(JSON.stringify(data));
    },
    error: function (xhr, status, error) {
        //console.log('Error: ' + error.message);
        $('#result').append(JSON.stringify(xhr));
        
    }
    });

}
function addressResponses(){
    
    $.ajax({
    type: 'GET',
    url: server+'/addressresponses',
    success: function (data) {
         $('#result').empty();
        
          var tbl = prettyPrint( data );
         $('#result').append(tbl);
        $('#resultText').val(JSON.stringify(data));
    },
    error: function (xhr, status, error) {
        //console.log('Error: ' + error.message);
        $('#result').append(JSON.stringify(xhr));
    }
    });

}

function track(){
     postData =  '1ZY291F40369744809';
   
    var json = JSON.stringify(postData);
    $.ajax({
    type: 'POST',
    url: server+'/track',
    data: json,
    success: function (data) {
    $('#result').empty();
        console.log(data.Response.ResponseStatusCode);
        console.log(data.Response.ResponseStatusDescription);
        console.log(data.Shipment.DeliveryDateUnavailable);
        console.log(data.Shipment.Package);
        console.log(data.Shipment.Service);
        console.log(data.Shipment.ShipmentIdentificationNumber);
        console.log(data.Shipment.ShipmentWeight);
        console.log(data.Shipment.Shipper);


         var tbl = prettyPrint( data );
         $('#result').append(tbl);
        $('#resultText').val(JSON.stringify(data));
    },
    error: function (xhr, status, error) {
        //console.log(error);
         $('#result').append(JSON.stringify(xhr));
    }
    });

}

function rates(){
     postData = {
    pickup_type: 'daily_pickup', // optional, can be: 'daily_pickup', 'customer_counter', 'one_time_pickup', 'on_call_air', 'suggested_retail_rates', 'letter_center', 'air_service_center'
   // pickup_type_code: '02', // optional, overwrites pickup_type
    customer_classification: '01', // optional, 01 is daily rates that goes with daily_pickup
    shipper: {
      name: 'Type Foo',
      shipper_number: 'E06F44', // not really optional, required for neg rates
     // phone_number: '', // optional
     // fax_number: '', // optional
     // email_address: '', // optional
     // tax_identification_number: '', // optional
      address: {
        address_line_1: '123 Fake Address',
        city: 'Dover',
        state_code: 'OH',
        country_code: 'US',
        postal_code: '44622'
      }
    },
    ship_to: {
      company_name: 'Company Name', // or person's name
      //attention_name: '', // optional
     // phone_number: '', // optional
      //fax_number: '', // optional
     // email_address: '', // optional
     // tax_identification_number: '', // optional
     // location_id: '', //optional, for specific locations
      address: {
        address_line_1: '3456 Fake Address', // optional
        city: 'Charlotte', // optional
        state_code: 'NC', // optional, required for negotiated rates
        country_code: 'US',
        postal_code: '28205',
        residential: false // optional, can be useful for accurate rating
      }
    },
    ship_from: { // optional, use if different from shipper address
      company_name: 'Company Name', // or person's name
    //  attention_name: 'Attention Name',
     // phone_number: '', // optional
     // tax_identification_number: '', // optional
      address: {
        address_line_1: '123 Fake Address',
        city: 'Dover',
        state_code: 'OH',
        country_code: 'US',
        postal_code: '44622'
      }
    },
/*    sold_to: { // optional, The person or company who imports and pays any duties due on the current shipment, required if Invoice of NAFTA CO is requested
      option: '01', // optional, applies to NAFTA CO form
      company_name: 'Company Name', // or person's name
      attention_name: 'Attention Name',
      phone_number: '', // optional
      tax_identification_number: '', // optional
      address: {
        address_line_1: '123 Fake Address',
        city: 'Dover',
        state_code: 'OH',
        country_code: 'US',
        postal_code: '44622'
      }
    },*/
    service: '03', // optional, will rate this specific service. 03 is UPS Ground
    /*services: [ // optional, you can specify which rates to look for -- performs multiple requests, so be careful not to do too many
      '03'
    ],
    
    14 = Next Day Air Early AM, 01 = Next Day Air,
    13 = Next Day Air Saver,
    59 = 2nd Day Air AM,
    02 = 2nd Day Air,
    12 = 3 Day Select,
    03 = Ground.
    
    */
    //return_service: '9', // optional, will provide a UPS Return Service specification
    packages: [
      {
        packaging_type: '02', // optional, packaging type code
        weight: 10,
        description: 'My Package', // optional
        delivery_confirmation_type: 2, // optional, 1 or 2
        insured_value: 1000.00, // optional, 2 decimals
        dimensions: { // optional, integers: 0-108 for imperial, 0-270 for metric
          length: 12,
          width: 12,
          height: 24
        }
      }
    ]
  }
   
/*packaging types
00 = UNKNOWN;
01 = UPS Letter;
02 = Package;
03 = Tube;
04 = Pak;
21 = Express Box;
24 = 25KG Box;
25 = 10KG Box;
30 = Pallet;
2a = Small Express Box;
2b = Medium Express Box; 2c = Large Express Box*/
     
     
     
    var json = JSON.stringify(postData);
    
    $.ajax({
    type: 'POST',
    url: server+'/rates',
    data: json,
    success: function (data) {

         $('#result').empty();


         var tbl = prettyPrint( data );
         $('#result').append(tbl);
        $('#resultText').val(JSON.stringify(data));
    },
    error: function (xhr, status, error) {
        //console.log(error);
         $('#result').append(JSON.stringify(xhr));
    }
    });

}

function confirm(){
     postData = {
    service_code: '03', // required for selected rate
  //  return_service: '9', // optional, will provide a UPS Return Service specification
    pickup_type: 'daily_pickup', // optional, can be: 'daily_pickup', 'customer_counter', 'one_time_pickup', 'on_call_air', 'suggested_retail_rates', 'letter_center', 'air_service_center'
    pickup_type_code: '02', // optional, overwrites pickup_type
    customer_classification: '00', // optional, need more details about what this does
    shipper: {
      name: 'eventrio',
      shipper_number: 'E06F44', // optional, but recommended for accurate rating
      phone_number: '', // optional
      fax_number: '', // optional
      email_address: '', // optional
      tax_identification_number: '', // optional
      address: {
        address_line_1: '123 Fake Address',
        city: 'Dover',
        state_code: 'OH',
        country_code: 'US',
        postal_code: '44622'
      }
    },
    ship_to: {
      company_name: 'Company Name', // or person's name
      attention_name: '', // optional
      phone_number: '', // optional
      fax_number: '', // optional
      email_address: '', // optional
      tax_identification_number: '', // optional
      location_id: '', //optional, for specific locations
      address: {
        address_line_1: '3456 Fake Address', // optional
        city: 'Charlotte', // optional
        state_code: 'NC', // optional, required for negotiated rates
        country_code: 'US',
        postal_code: '28205',
        residential: true // optional, can be useful for accurate rating
      }
    },
    ship_from: { // optional, use if different from shipper address
      company_name: 'Company Name', // or person's name
      attention_name: 'Attention Name',
      phone_number: '', // optional
      tax_identification_number: '', // optional
      address: {
        address_line_1: '123 Fake Address',
        city: 'Dover',
        state_code: 'OH',
        country_code: 'US',
        postal_code: '44622'
      }
    },
    sold_to: { // optional, The person or company who imports and pays any duties due on the current shipment, required if Invoice of NAFTA CO is requested
      option: '01', // optional, applies to NAFTA CO form
      company_name: 'Company Name', // or person's name
      attention_name: 'Attention Name',
      phone_number: '', // optional
      tax_identification_number: '', // optional
      address: {
        address_line_1: '123 Fake Address',
        city: 'Dover',
        state_code: 'OH',
        country_code: 'US',
        postal_code: '44622'
      }
    },
    packages: [ // at least one package is required
      {
        packaging_type: '02', // optional, packaging type code
        weight: 10,
        description: 'My Package', // optional
        delivery_confirmation_type: 2, // optional, 1 or 2
        insured_value: 1000.00, // optional, 2 decimals
        dimensions: { // optional, integers: 0-108 for imperial, 0-270 for metric
          length: 12,
          width: 12,
          height: 24
        },
       // reference_number: 'ABC123' // optional
        /*reference_number: { // optional, object format code/value keypair
          code: 'PM',
          value: 'ABC123'
        },*/
        reference_number: [ // optional, array format, can be strings or objects in code/value keypair format
          'ABC123',
          'WWWABC123'
        ]
      }
    ]
  }
   
    var json = JSON.stringify(postData);
    
    $.ajax({
    type: 'POST',
    url: server+'/confirm',
    data: json,
    success: function (data) {

         $('#result').empty();


        var tbl = prettyPrint( data );
         $('#result').append(tbl);
        $('#resultText').val(JSON.stringify(data));
    },
    error: function (xhr, status, error) {
        console.log(error);
        // $('#result').append(JSON.stringify(xhr));
    }
    });

}

function transit(){
    

     postData = {
    from: {
      city: 'Dover',
      state_code: 'OH',
      postal_code: '44622',
      country_code: 'US'
    },
    to: {
      city: 'Charlotte',
      state_code: 'NC',
      postal_code: '28205',
      country_code: 'US'
    },
    weight: 10, // set imperial to false for KGS
    pickup_date: '20141001', //'YYYYMMDD'
    total_packages: 1, // number of packages in shipment
    value: 999999999.99, // Invoice value, set currency in options
  }
   
    var json = JSON.stringify(postData);
    
    $.ajax({
    type: 'POST',
    url: server+'/transit',
    data: json,
    success: function (data) {

         $('#result').empty();


        var tbl = prettyPrint( data );
         $('#result').append(tbl);
    },
    error: function (xhr, status, error) {
        //console.log(error);
         $('#result').append(JSON.stringify(xhr));
    }
    });

}
function freightrateDescribe(){
    $.ajax({
    type: 'POST',
    url: server+'/freightratedescribe',
    data: {name:'value'},
    success: function (data) {

         $('#result').empty();

         
        var tbl = prettyPrint( data );
         $('#result').append(tbl);
        $('#resultText').val(JSON.stringify(data));
    },
    error: function (xhr, status, error) {
        //console.log(error);
         $('#result').append(JSON.stringify(xhr));
    }
    });
}





function freightrate(){
    
    var input = {
        shipperName: 'Developer Test 1',
        shipperAddress: '101 Developer Way',
        shipperCity:'Richmond',
        shipperState:'VA',
        shipperZip: '23224',
        shipperNumber:'E06F44',
        consigneeName:'Consignee Test 1',
        consigneeAddress:'1000 Consignee Street',
        consigneeCity:'Allanton',
        consigneeState:'MO',
        consigneeZip:'63025',
        shippingBillingOptionCode:'10',
        shippingBillingOptionCodeDescription:'Pre-Paid',
        serviceCode:'308',
        serviceCodeDescription:'UPS Freight LTL',
        handlingUnitOneQuantity:'1',
        handlingUnitOneCode: 'PLT',
        handlingUnitOneCodeDescription:'Pallet',
        commodityDescription:'Samples',
        commodityWeightValue:'1500',
        commodityWeightUnitOfMeasurementCode:'LBS',
        commodityDimensionsUnitOfMeasurementCode: 'IN',
        commodityDimensionsLength:'36',
        commodityDimensionsWidth:'36',
        commodityDimensionsHeight:'36',
        commodityNumberOfPieces:'1',
        commodityPackagingTypeCode:'PLT',
        commodityPackagingTypeCodeDescription:'Pallet',
        commodityFreightClass:'92.5',
        commodityNMFCCommodityCode:'1160301'
       
    }
     
    postData = {
                    "ShipFrom": {
                        "Name": input.shipperName,
                        "Address": {
                            "AddressLine": input.shipperAddress,
                            "City": input.shipperCity,
                            "StateProvinceCode": input.shipperState,
                            "Town": "",
                            "PostalCode": input.shipperZip,
                            "CountryCode": "US"
                        },
                        "AttentionName": "",
                        "TariffPoint": ""
                    },
                    "ShipTo": {
                        "Name": input.consigneeName,
                        "Address": {
                            "AddressLine": input.consigneeAddress,
                            "City": input.consigneeCity,
                            "StateProvinceCode": input.consigneeState,
                            "Town": "",
                            "PostalCode": input.consigneeZip,
                            "CountryCode": "US"
                        },
                        "AttentionName": "",
                        "TariffPoint": ""
                    },
                    "PaymentInformation": {
                        "Payer": {
                            "Name": input.shipperName,
                            "Address": {
                                "AddressLine": input.shipperAddress,
                                "City": input.shipperCity,
                                "StateProvinceCode": input.shipperState,
                                "Town": "",
                                "PostalCode": input.shipperZip,
                                "CountryCode": "US"
                            },
                            "ShipperNumber": input.shipperNumber,
                            "AttentionName": ""
                        },
                        "ShipmentBillingOption": {
                            "Code": input.shippingBillingOptionCode,
                            "Description": input.shippingBillingOptionCodeDescription
                        }
                    },
                    "Service": {
                        "Code": input.serviceCode,
                        "Description": input.serviceCodeDescription
                    },
                    "HandlingUnitOne": {
                        "Quantity": input.handlingUnitOneQuantity,
                        "Type": {
                            "Code": input.handlingUnitOneCode,
                            "Description": input.handlingUnitOneCodeDescription
                        }
                    },
                    "Commodity": {
                        "CommodityID": "",
                        "Description": input.commodityDescription,
                        "Weight": {
                             "UnitOfMeasurement": {
                                "Code": input.commodityWeightUnitOfMeasurementCode,
                                "Description": 'Pounds'
                            },
                            "Value": input.commodityWeightValue
                        },
                         "Dimensions": {
                            "UnitOfMeasurement": {
                                    "Code": input.commodityDimensionsUnitOfMeasurementCode
                             },
                          "Length": input.commodityDimensionsLength,
                          "Width": input.commodityDimensionsWidth,
                          "Height": input.commodityDimensionsHeight
                        },
                        "NumberOfPieces": input.commodityNumberOfPieces,
                        "PackagingType": {
                            "Code": input.commodityPackagingTypeCode,
                            "Description": input.commodityPackagingTypeCodeDescription
                        },
                        "FreightClass": input.commodityFreightClass,
                        "NMFCCommodityCode": input.commodityNMFCCommodityCode
                    }
                   
                }
    
   
    var json = JSON.stringify(postData);
   // console.log(json)
    $.ajax({
    type: 'POST',
    url: server+'/freightrate',
    data: json,
    success: function (data) {

         $('#result').empty();

         
        var tbl = prettyPrint( data );
         $('#result').append(tbl);
       $('#resultText').val(JSON.stringify(data));
    },
    error: function (xhr, status, error) {
        //console.log(error);
         $('#result').append(JSON.stringify(xhr));
    }
    });

}

function freightshipDescribe(){
    $.ajax({
    type: 'POST',
    url: server+'/freightshipdescribe',
    data: {name:'value'},
    success: function (data) {

         $('#result').empty();

         
        var tbl = prettyPrint( data );
         $('#result').append(tbl);
        $('#resultText').val(JSON.stringify(data));
    },
    error: function (xhr, status, error) {
        //console.log(error);
         $('#result').append(JSON.stringify(xhr));
    }
    });
}

function freightship(){
    
    var input = {
        requestOption: '1', //Ground
        shipperName: 'Developer Test 1',
        shipperAddress: '101 Developer Way',
        shipperCity:'Richmond',
        shipperState:'VA',
        shipperZip: '23224',
        shipperPhone:'8326891199',
        shipperNumber:'E06F44',
        consigneeName:'Consignee Test 1',
        consigneeAddress:'1000 Consignee Street',
        consigneeCity:'Allanton',
        consigneeState:'MO',
        consigneeZip:'63025',
        shipmentBillingOptionCode:'10',
        shipmentBillingOptionCodeDescription:'Pre-Paid',
        serviceCode:'308',
        serviceCodeDescription:'UPS Freight LTL',
        handlingUnitOneQuantity:'1',
        handlingUnitOneCode: 'PLT',
        handlingUnitOneCodeDescription:'Pallet',
        commodityDescription:'Samples',
        commodityWeightValue:'1500',
        commodityWeightUnitOfMeasurementCode:'LBS',
        commodityDimensionsUnitOfMeasurementCode: 'IN',
        commodityDimensionsLength:'36',
        commodityDimensionsWidth:'36',
        commodityDimensionsHeight:'36',
        commodityNumberOfPieces:'1',
        commodityPackagingTypeCode:'PLT',
        commodityPackagingTypeCodeDescription:'Pallet',
        commodityFreightClass:'92.5',
        commodityNMFCCommodityCode:'1160301'
       
    }
   
 var postData = 
    '<soap:Body><fsp:FreightShipRequest xmlns:fsp="http://www.ups.com/XMLSchema/XOLTWS/FreightShip/v1.0" xmlns="http://www.ups.com/XMLSchema/XOLTWS/FreightShip/v1.0">'+
            '<common:Request>'+
                '<common:RequestOption>1</common:RequestOption>'+
            '</common:Request>'+
            '<fsp:Shipment>'+
                '<fsp:ShipFrom>'+
                    '<fsp:Name>'+input.shipperName+'</fsp:Name>'+
                    '<fsp:Address>'+
                        '<fsp:AddressLine>'+input.shipperAddress+'</fsp:AddressLine>'+
                        '<fsp:City>'+input.shipperCity+'</fsp:City>'+
                        '<fsp:StateProvinceCode>'+input.shipperState+'</fsp:StateProvinceCode>'+
                        '<fsp:Town></fsp:Town>'+
                        '<fsp:PostalCode>'+input.shipperZip+'</fsp:PostalCode>'+
                        '<fsp:CountryCode>US</fsp:CountryCode>'+
                    '</fsp:Address>'+
                    '<fsp:Phone>'+
                        '<fsp:Number>'+input.shipperPhone+'</fsp:Number>'+
                    '</fsp:Phone>'+
                '</fsp:ShipFrom>'+
                '<fsp:ShipperNumber>'+input.shipperNumber+'</fsp:ShipperNumber>'+
                '<fsp:ShipTo>'+
                    '<fsp:Name>'+input.shipperName+'</fsp:Name>'+
                    '<fsp:Address>'+
                        '<fsp:AddressLine>'+input.consigneeName+'</fsp:AddressLine>'+
                        '<fsp:City>'+input.consigneeCity+'</fsp:City>'+
                        '<fsp:StateProvinceCode>'+input.consigneeState+'</fsp:StateProvinceCode>'+
                        '<fsp:Town></fsp:Town>'+
                        '<fsp:PostalCode>'+input.consigneeZip+'</fsp:PostalCode>'+
                        '<fsp:CountryCode>US</fsp:CountryCode>'+
                    '</fsp:Address>'+
                    '<fsp:AttentionName></fsp:AttentionName>'+
                    '<fsp:TariffPoint></fsp:TariffPoint>'+
                '</fsp:ShipTo>'+
                '<fsp:PaymentInformation>'+
                    '<fsp:Payer>'+
                        '<fsp:Name>'+input.shipperName+'</fsp:Name>'+
                        '<fsp:Address>'+
                            '<fsp:AddressLine>'+input.shipperAddress+'</fsp:AddressLine>'+
                            '<fsp:City>'+input.shipperCity+'</fsp:City>'+
                            '<fsp:StateProvinceCode>'+input.shipperState+'</fsp:StateProvinceCode>'+
                            '<fsp:Town></fsp:Town>'+
                            '<fsp:PostalCode>'+input.shipperZip+'</fsp:PostalCode>'+
                            '<fsp:CountryCode>US</fsp:CountryCode>'+
                        '</fsp:Address>'+
                        '<fsp:ShipperNumber>'+input.shipperNumber+'</fsp:ShipperNumber>'+
                        '<fsp:AttentionName></fsp:AttentionName>'+
                    '</fsp:Payer>'+
                    '<fsp:ShipmentBillingOption>'+
                        '<fsp:Code>'+input.shipmentBillingOptionCode+'</fsp:Code>'+
                        '<fsp:Description>'+input.shipmentBillingOptionCodeDescription+'</fsp:Description>'+
                    '</fsp:ShipmentBillingOption>'+
                '</fsp:PaymentInformation>'+
                '<fsp:Service>'+
                    '<fsp:Code>'+input.serviceCode+'</fsp:Code>'+
                    '<fsp:Description>'+input.serviceCodeDescription+'</fsp:Description>'+
                '</fsp:Service>'+
                '<fsp:HandlingUnitOne>'+
                    '<fsp:Quantity>'+input.handlingUnitOneQuantity+'</fsp:Quantity>'+
                    '<fsp:Type>'+
                        '<fsp:Code>'+input.handlingUnitOneCode+'</fsp:Code>'+
                        '<fsp:Description>'+input.handlingUnitOneCode+'</fsp:Description>'+
                    '</fsp:Type>'+
                '</fsp:HandlingUnitOne>'+
                '<fsp:Commodity>'+
                    '<fsp:CommodityID>'+input.commodityID+'</fsp:CommodityID>'+
                    '<fsp:Description>'+input.commodityDescription+'</fsp:Description>'+
                    '<fsp:Weight>'+
                        '<fsp:UnitOfMeasurement>'+
                            '<fsp:Code>'+input.commodityWeightUnitOfMeasurementCode+'</fsp:Code>'+
                            '<fsp:Description>'+input.commodityWeightUnitOfMeasurementCode+'</fsp:Description>'+
                        '</fsp:UnitOfMeasurement>'+
                        '<fsp:Value>'+input.commodityWeightValue+'</fsp:Value>'+
                    '</fsp:Weight>'+
                    '<fsp:NumberOfPieces>'+input.commodityNumberOfPieces+'</fsp:NumberOfPieces>'+
                    '<fsp:PackagingType>'+
                        '<fsp:Code>'+input.commodityPackagingTypeCode+'</fsp:Code>'+
                        '<fsp:Description>'+input.commodityPackagingTypeCode+'</fsp:Description>'+
                    '</fsp:PackagingType>'+
                    '<fsp:FreightClass>'+input.commodityFreightClass+'</fsp:FreightClass>'+
                '</fsp:Commodity>'+
                '<fsp:Documents>'+
                '<fsp:Image>'+
                    '<Type>'+
                    '<Code>30</Code>'+
                    '<Description>Label</Description>'+
                  '</Type>'+
                  '<LabelsPerPage>1</LabelsPerPage>'+
                  '<Format>'+
                    '<Code>01</Code>'+
                    '<Description>PDF</Description>'+
                  '</Format>'+
                  '<PrintFormat>'+
                    '<Code>02</Code>'+
                  '</PrintFormat>'+
                  '<PrintSize>'+
                    '<Length>4</Length>'+
                    '<Width>6</Width>'+
                  '</PrintSize>'+
                '</fsp:Image>'+
                '</fsp:Documents>'+
            '</fsp:Shipment>'+
        '</fsp:FreightShipRequest>'+
    '</soap:Body>';
    
   
   /* postData = {
            
                    "Request":{
                        "RequestOption": input.requestOption
                    },
                "Shipment": {
                    "ShipFrom": {
                        "Name": input.shipperName,
                        "Address": {
                            "AddressLine": input.shipperAddress,
                            "City": input.shipperCity,
                            "StateProvinceCode": input.shipperState,
                            "Town": "",
                            "PostalCode": input.shipperZip,
                            "CountryCode": "US"
                        },
                        "Phone": {
                                "Number": input.shipperPhone
                            }
                    },
                     "ShipperNumber": input.shipperNumber,
                    "ShipTo": {
                        "Name": input.consigneeName,
                        "Address": {
                            "AddressLine": input.consigneeAddress,
                            "City": input.consigneeCity,
                            "StateProvinceCode": input.consigneeState,
                            "Town": "",
                            "PostalCode": input.consigneeZip,
                            "CountryCode": "US"
                        },
                        "AttentionName": "",
                        "TariffPoint": ""
                    },
                    "PaymentInformation": {
                        "Payer": {
                            "Name": input.shipperName,
                            "Address": {
                                "AddressLine": input.shipperAddress,
                                "City": input.shipperCity,
                                "StateProvinceCode": input.shipperState,
                                "Town": "",
                                "PostalCode": input.shipperZip,
                                "CountryCode": "US"
                            },
                            "ShipperNumber": input.shipperNumber,
                            "AttentionName": ""
                        },
                        "ShipmentBillingOption": {
                            "Code": input.shippingBillingOptionCode,
                            "Description": input.shippingBillingOptionCodeDescription
                        }
                    },
                   
                    "Service": {
                        "Code": input.serviceCode,
                        "Description": input.serviceCodeDescription
                    },
                    "HandlingUnitOne": {
                        "Quantity": input.handlingUnitOneQuantity,
                        "Type": {
                            "Code": input.handlingUnitOneCode,
                            "Description": input.handlingUnitOneCodeDescription
                        }
                    },
                    "Commodity": {
                        "CommodityID": "",
                        "Description": input.commodityDescription,
                        "Weight": {
                             "UnitOfMeasurement": {
                                "Code": input.commodityWeightUnitOfMeasurementCode,
                                "Description": 'Pounds'
                            },
                            "Value": input.commodityWeightValue
                        },
                        "Dimensions": {
                            "UnitOfMeasurement": {
                                    "Code": input.commodityDimensionsUnitOfMeasurementCode
                             },
                          "Length": input.commodityDimensionsLength,
                          "Width": input.commodityDimensionsWidth,
                          "Height": input.commodityDimensionsHeight
                        },
                        "NumberOfPieces": input.commodityNumberOfPieces,
                        "PackagingType": {
                            "Code": input.commodityPackagingTypeCode,
                            "Description": input.commodityPackagingTypeCodeDescription
                        },
                        "FreightClass": input.commodityFreightClass,
                        "NMFCCommodityCode": input.commodityNMFCCommodityCode
                        
                    }
                    
         
                }
                
        }*/
    
   
    var json = JSON.stringify(postData);
   // console.log(json)
    $.ajax({
    type: 'POST',
    url: server+'/freightship',
    data: json,
    success: function (data) {

         $('#result').empty();

         
        var tbl = prettyPrint( data );
         $('#result').append(tbl);
        $('#resultText').val(JSON.stringify(data));
    },
    error: function (xhr, status, error) {
        //console.log(error);
         $('#result').append(JSON.stringify(xhr));
    }
    });

}