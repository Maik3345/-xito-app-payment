/**
 * Archivo empleado para las configuraciones necesarias de hpci. se encuentras variables que almacenan los datos de la url
 * Inicial para conectar el iframe a hpci o funciones que funcionan como collback para los metodos que hpci expone y podemos 
 * emplear para capturar errores, mensajes, datos etc.
 */

var siteId;
var locationName;
var fullParentQStr;
var fullParentHost;
var currency;
var paymentProfile;
var stHPCI;
var resultMap = [];
var queryToken;
var locationHost = window.location.hostname;

// Variable que almacena los elementos iframes de la vista de payment, captura los iframe de la pagina y los alamcena en una variable
var iframes;
// Nombre del formulario actual en el que se este ingresando los datos de la
// tarjeta de credito
var iframeCurrentlySelected;
var templateValidations = `
    <div class="payment-validation">

    <ul class="list-group item-icons-payment">

        <li class="payment-error list-group-item list-succes-card list-group-item-danger d-flex justify-content-between align-items-center hidden-options-payment">
            <p>Ingrese número correcto de la tarjeta</p>
        </li>
        <li class="list-group-item list-succes-card list-group-item-success d-flex justify-content-between align-items-center hidden-options-payment visa">
            Tarjeta Visa
            <span class="payment-cards-icons fa fa-cc-mastercard"></span>
        </li>
        <li class="list-group-item list-succes-card list-group-item-success d-flex justify-content-between align-items-center hidden-options-payment mastercard">
            Tarjeta Mastercard
            <span class="payment-cards-icons fa fa-cc-mastercard"></span>
        </li>
        <li class="list-group-item list-succes-card list-group-item-success d-flex justify-content-between align-items-center hidden-options-payment amex">
            Tarjeta American Express
            <span class="payment-cards-icons fa fa-cc-mastercard"></span>
        </li>
        <li class="list-group-item list-succes-card list-group-item-success d-flex justify-content-between align-items-center hidden-options-payment discover">
            Tarjeta Discover
            <span class="payment-cards-icons fa fa-cc-mastercard"></span>
        </li>
        <li class="list-group-item list-succes-card list-group-item-success d-flex justify-content-between align-items-center hidden-options-payment diners">
            Diners
            <span class="payment-cards-icons fa fa-cc-mastercard"></span>
        </li>
        <li class="list-group-item list-succes-card list-group-item-success d-flex justify-content-between align-items-center hidden-options-payment jcb">
            Tarjeta JCB
            <span class="payment-cards-icons fa fa-cc-mastercard"></span>
        </li>
    </ul>
</div>
    `;



/**
 * Default FUNCTION HPCI
 * @param {any} hpciMappedCCValue 
 * @param {any} hpciMappedCVVValue 
 */

/**
 * Método que se encarga de inicializar la conexión de los iframes con hpci.
 * Para realizar la conexión se necesita la variable stHPCI donde se encuentra la configuración de la conexión de hpci
 */
function connectToHpci() {
    try {
        for (i = 0; i < iframes.length; i++) {

            // armo la url final para los iframes
            hpciCCFrameFullUrl = hpciCCFrameHost + "/iSynSApp/showPxyPage!ccFrame.action?pgmode1=prod&" +
                "locationName=" + locationName +
                "&sid=" + siteId +
                "&reportCCType=Y&reportCCDigits=Y&reportCVVDigits=Y" +
                "&fullParentHost=" + fullParentHost +
                "&fullParentQStr=" + fullParentQStr;

            // Metodo que se encarga de leeer la lista de iframes que hay almacenados y agregarles la ruta al src del iframe,
            // Esto se emplea cuando hay mas de un iframe en la pagina y el medio de pago puede ser dinamico.
            jQuery("#" + iframes[i].id).attr("src", hpciCCFrameFullUrl);
            // Realizo el append para agregar el contenido para las validaciones. cada elemento se agrega en el iframe indicado por medio del id
            jQuery("#" + iframes[i].id).parent().append(templateValidations);

            if (i === 0) {
                // Set the first iframe for a credit card tokenization
                hpciCCFrameName = iframes[i].id;
            }
        }
        // logConectionIframe();
    } catch (error) {
        //console.error("connectToHpci" + error);
    }
}

/**
 * Método para inicializar las variable que se emplean en el proceso de hpci payment
 */
function initialiceIframeVariable() {
    try {
        // incializo la viariable que permite saber cual formulario de pago se va a emplear
        iframeCurrentlySelected = "creditCardApp";
        iframes = jQuery("iframe");
    } catch (error) {
        //console.error("initialiceIframeVariable" + error)
    }
}

/**
 * Método empleado para capturar la configuración almacenada en la variable stHPCI.
 * Esta variable posee el iframe a emplear. la url de hpci, el id de la aplicación en hpci y otras configuraciones.
 */
function getStHPCI() {
    try {
        if (stHPCI !== undefined && stHPCI !== "") {
            queryTokenList = stHPCI.split(',');
            for (var i = 0; i < queryTokenList.length; i++) {
                queryToken = queryTokenList[i].split(';');
                resultMap.push(queryToken[1]);
                resultMap[queryToken[0]] = queryToken[1];
            }
        }
    } catch (error) {
        //console.error("getStHPCI" + error)
    }
}

/**
 * Método que realiza la inicialización de la configuración necesaria para hpci.
 */
function getCurrentConfigurationHpci() {
    try {
        // tslint:disable-next-line:no-string-literal
        siteId = resultMap["sid"];
        // tslint:disable-next-line:no-string-literal
        locationName = resultMap["locationName"];

        // validación para pruebas locales. si location.port es diferente a vacio se agregan los dos puntos al window.location.hostname
        if (location.port !== "") {
            locationHost += ":";
        }
        fullParentQStr = location.pathname;
        fullParentHost = location.protocol.concat("//") + locationHost + location.port;
        // tslint:disable-next-line:no-string-literal
        hpciCCFrameHost = resultMap["serviceUrl"];
        // tslint:disable-next-line:no-string-literal
        currency = resultMap["currency"];
        // printLogsHpci();
    } catch (error) {
        //console.error("getCurrentConfigurationHpci" + error);
    }
}

// Métodos que se inician al cargar la pagina
$(document).ready(function ($) {
    try {
        stHPCI = document.getElementById("config-hpci").value;
    } catch (error) {
        // console.log(error)
    }
    initialiceIframeVariable();
    getStHPCI();
    getCurrentConfigurationHpci();
    connectToHpci();

    // Inicializo el medio de pago para habilitar las valdiaciones.
    var res = receiveHPCIMsg();
});