ups
===
Provides a node.js interface to the UPS Ground and Freight SOAP APIs.  

Leverages node-soap module for Package XML API only
Adds Freight Rating Web Service using node-soap
Adds Freight Ship Web Service using straight https.request (because node-soap has a bug that doesn't support the FreightShip wsdl)

