server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/address"] = requestHandlers.address;
handle["/addressrequests"] = requestHandlers.addressrequests;
handle["/addressresponses"] = requestHandlers.addressresponses;
handle["/transit"] = requestHandlers.transit;
handle["/rates"] = requestHandlers.rates;
handle["/track"] = requestHandlers.track;
handle["/confirm"] = requestHandlers.confirm;
handle["/freightrate"] = requestHandlers.freightrate;
handle["/freightratedescribe"] = requestHandlers.freightratedescribe;
handle["/freightshipdescribe"] = requestHandlers.freightshipdescribe;
handle["/freightship"] = requestHandlers.freightship;
handle["/taxes"] = requestHandlers.taxes;

server.start(router.route, handle);
