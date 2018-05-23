// function hpciDefaultSiteSuccessHandler(hpciMappedCCValue, hpciMappedCVVValue) {
//     console.log(hpciMappedCCValue, hpciMappedCVVValue);
// }


// var hpciCCPreliminarySuccessHandler = function (hpciCCTypeValue, hpciCCBINValue, hpciCCValidValue, hpciCCLengthValue) {
//     console.log(hpciCCTypeValue, hpciCCBINValue, hpciCCValidValue, hpciCCLengthValue);
// };

// var hpciDefaultSiteErrorHandler = function () {
//     try {
//         // name of the form submission for ecommerce site
//     } catch (error) {
//         console.log(' -hpciDefaultSiteErrorHandler' + error);
//     }
// };
// var hpci3DSitePINSuccessHandler = function () {
//     try {} catch (e) {
//         console.log(' -hpci3DSitePINSuccessHandler');
//     }
// };

// var hpci3DSitePINErrorHandler = function () {
//     // Adapt the following message / action to match your required
//     // experience
//     console.log("Could not verify PIN for the credit card");
//     $ = jQuery;
// };

// /**
//  * Método para visualizar el log del proceso de conexión de los iframe con hpci
//  */
// function logConectionIframe() {
//     console.log("********** IFRAME ACTUAL **********");
//     console.info("Formulario de pago: " + iframeCurrentlySelected);
//     console.info("hpciCCFrameHost: " + hpciCCFrameHost);
//     console.log("El iframe a emplear para el proceso de pago posee el id: " + hpciCCFrameName);
// }

// /**
//  * Método para realizar la visualización de la conexión a hpci.
//  */
// function printLogsHpci() {
//     console.log("********** HPCI CONFIGURATION **************");
//     console.info(location.protocol.concat("//") + locationHost + location.port);
//     console.info(location.pathname);
//     console.info("SiteId: " + siteId);
//     console.info("LocationName: " + locationName);
//     console.info("Currency: " + currency);
//     console.info("Payment Profiles: " + paymentProfile);
//     console.info("fullParentHost: " + fullParentHost);
//     console.info("fullParentQStr: " + fullParentQStr);
//     console.log("********** HPCI CURRENT PAYMENT **************");
// }