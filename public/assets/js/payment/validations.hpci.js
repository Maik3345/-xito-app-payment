// Nombre del iframe que se empleara para la valdiación de HPCI
var hpciCCFrameName = "";
// variable que almacena el nombre de la tarjeta seleccionada
var identityCardType = "";
// Variables de configuración
var hpciCCFrameHost;
var hpciCCFrameFullUrl;
// variable que almacena el tipo de tarjeta de credito retornado por hpci
var currentHpciCCTypeValue = "";
var currentHpciCCBINValue = "";
var currentHpciCCValidValue = "";
var currentHpciCCLengthValue = "";
var currentHpciCCEnteredLengthValue = "";
// variable que permite saber si han ingresado un código de verficiación
var currentCodeVerfiy = "";
var requesCreditarNumberTemplate = "<p> Ingrese número correcto de la tarjeta </p>";
var requesCreditarCodeTemplate = "<p>Ingrese un código de verificación valido</p>";
var continueProcessPayment;


/**
 * Función de error que se emplea cuando no se pudo procesar la tarjeta de credito.
 * @param {any} errorCode 
 * @param {any} errorMsg 
 */
function hpciSiteErrorHandler(errorCode, errorMsg) {
    try {
        // console.log("___" + "Error al procesar la tarjeta de credito:" + errorCode + "; mensaje:" + errorMsg);
        hiddenValidateElements();
        jQuery("#" + iframeCurrentlySelected).find(".payment-error").removeClass("hidden-options-payment");
    } catch (e) {
        // console.log("___" + errorCode + ' -hpciSiteErrorHandler- ' + errorMsg);
    }
    $ = jQuery;
};

/**
 * Método empleado para realizar la validación del número de la tarjeta ingresada.
 * @param {any} hpciCCTypeValue 
 * @param {any} hpciCCBINValue 
 * @param {any} hpciCCValidValue 
 * @param {any} hpciCCLengthValue 
 * @param {any} hpciCCEnteredLengthValue 
 */
function hpciCCDigitsSuccessHandlerV2(hpciCCTypeValue, hpciCCBINValue, hpciCCValidValue, hpciCCLengthValue, hpciCCEnteredLengthValue) {
    // Use to enable credit card digits key press
    sendHPCIChangeClassMsg("ccNum-wrapper", "input-text input-text--validatable");
    if (hpciCCValidValue === "Y") {
        sendHPCIChangeClassMsg("ccNum", "input-text__input input-text__input--populated");
    } else if (hpciCCValidValue === "N" && hpciCCLengthValue === "0") {
        if (hpciCCEnteredLengthValue > "0") {
            sendHPCIChangeClassMsg("ccNum", "input-text__input input-text__input--invalid input-text__input--populated");
        } else {
            sendHPCIChangeClassMsg("ccNum", "input-text__input");
        }
    } else if (hpciCCValidValue === "N" && hpciCCLengthValue > "0" && hpciCCEnteredLengthValue > "0") {
        sendHPCIChangeClassMsg("ccNum", "input-text__input input-text__input--invalid input-text__input--populated");
    }
    // Validaciones para el numero de la tarjeta ingresado
    validateViewElements(hpciCCTypeValue, hpciCCBINValue, hpciCCValidValue, hpciCCLengthValue, hpciCCEnteredLengthValue);
    $ = jQuery;
};


function notContinueWithProcessPayment() {
    jQuery("#" + iframeCurrentlySelected).find(".payment-error").removeClass("hidden-options-payment");
    // oculto los iconos de las tarjetas
    hiddenValidateElements();
    // puede continuar con el proceso de pago.
    continueProcessPayment = false;
}


/**
 * Método que se emplea para valdiar el tipo de tarjeta de credito Diners y setear el tipo de tarjeta como selección actual en el proceso de pago
 * Used in:validateViewElements
 * @param {any} currentCredictCardInformation 
 */
function validatrCreditCartDiners(currentCredictCardInformation) {
    hiddenValidateElements();
    if (currentCredictCardInformation.hpciCCBINValue > 0) {
        // console.log(currentCredictCardInformation.hpciCCBINValue);
        var ccChar2 = currentCredictCardInformation.hpciCCBINValue.substring(0, 2);
        if (ccChar2 === "36") {
            // Almaceno el nombre de la tarjeta
            identityCardType = "DINERS";
            currentHpciCCTypeValue = "diners";
            currentHpciCCBINValue = currentCredictCardInformation.hpciCCBINValue;
            currentHpciCCValidValue = currentCredictCardInformation.hpciCCValidValue;
            currentHpciCCLengthValue = currentCredictCardInformation.hpciCCLengthValue;
            currentHpciCCEnteredLengthValue = currentCredictCardInformation.hpciCCEnteredLengthValue;
            jQuery("#" + iframeCurrentlySelected).find(".diners").removeClass("hidden-options-payment");
        }

    }
}

/**
 * Método para validar la tarjeta de credito ingresada y visualizar los iconos correspondientes a la tarjeta.
 * Used in: validateViewElements
 * @param {any} currentCredictCardInformation 
 */
function validateCurrentCreditCard(creditCard) {

    // console.log(creditCard);
    if (creditCard.hpciCCTypeValue === "diners") {
        if (creditCard.hpciCCEnteredLengthValue >= 6) {
            var ccChar2 = creditCard.hpciCCBINValue.substring(0, 2);
            if (ccChar2 === "36") {
                // Almaceno el nombre de la tarjeta
                identityCardType = "DINERS";
                jQuery("#" + iframeCurrentlySelected).find(".diners").removeClass("hidden-options-payment");
            }
        }
    } else if (creditCard.hpciCCTypeValue === "visa") {
        // Almaceno el nombre de la tarjeta
        identityCardType = "VISA";
        jQuery("#" + iframeCurrentlySelected).find(".visa").removeClass("hidden-options-payment");
    } else if (creditCard.hpciCCTypeValue === "mastercard") {
        // Almaceno el nombre de la tarjeta
        identityCardType = "MASTERCARD";
        jQuery("#" + iframeCurrentlySelected).find(".mastercard").removeClass("hidden-options-payment");
    } else if (creditCard.hpciCCTypeValue === "amex") {
        // Almaceno el nombre de la tarjeta
        identityCardType = "AMEX";
        jQuery("#" + iframeCurrentlySelected).find(".amex").removeClass("hidden-options-payment");
    } else if (creditCard.hpciCCTypeValue === "discover") {
        // Almaceno el nombre de la tarjeta
        identityCardType = "DISCOVER";
        jQuery("#" + iframeCurrentlySelected).find(".discover").removeClass("hidden-options-payment");
    } else if (creditCard.hpciCCTypeValue === "jcb") {
        // Almaceno el nombre de la tarjeta
        identityCardType = "JCB";
        jQuery("#" + iframeCurrentlySelected).find(".jcb").removeClass("hidden-options-payment");
    } else {
        hiddenValidateElements();
    }
}

/**
 * Funcionalidad para validar los elementos de la tarjeta de credito
 * @param {any} hpciCCTypeValue 
 * @param {any} hpciCCBINValue 
 * @param {any} hpciCCValidValue 
 * @param {any} hpciCCLengthValue 
 * @param {any} hpciCCEnteredLengthValue 
 */
function validateViewElements(hpciCCTypeValue, hpciCCBINValue, hpciCCValidValue, hpciCCLengthValue, hpciCCEnteredLengthValue) {

    // Variable creada para almacenar los datos de la validación de la tarjeta de credito
    var currentCredictCardInformation = {
        hpciCCBINValue: hpciCCBINValue,
        hpciCCEnteredLengthValue: hpciCCEnteredLengthValue,
        hpciCCLengthValue: hpciCCLengthValue,
        hpciCCTypeValue: hpciCCTypeValue,
        hpciCCValidValue: hpciCCValidValue,
    }

    // console.log("___" + hpciCCTypeValue, hpciCCBINValue, hpciCCValidValue, hpciCCLengthValue, hpciCCEnteredLengthValue);
    // console.log("___" + "--- Validando Tipo de tarjeta de credito");

    jQuery("#" + iframeCurrentlySelected).find(".payment-error").children().remove();
    jQuery("#" + iframeCurrentlySelected).find(".payment-error").append(requesCreditarNumberTemplate);


    // Valido que la respuesta de la validación de la tarjeta de credito no sea null
    if (hpciCCTypeValue === "na" || hpciCCTypeValue === "unknown") {

        // Validación para la tarjeta de credito "Diners", hpci no retorna un identificador para dinner. por lo que se tiene que calcular si se esta ingresando una tarjeta diners.
        if (hpciCCEnteredLengthValue >= 6) {

            validatrCreditCartDiners(currentCredictCardInformation)

        } else {
            notContinueWithProcessPayment();
        }
    } else {
        jQuery("#" + iframeCurrentlySelected).find(".payment-error").addClass("hidden-options-payment");
        // Si no hay algun error, paso a validar el tipo de tarjeta de credito
        // Visualizo los iconos de las tarjtas de credito
        hiddenValidateElements();
        // console.log("___" + '---tipo de tarjeta:' + hpciCCTypeValue)

        // Variable empleada para saber si se puede continuar  con el proceso de pago.
        continueProcessPayment = true;
        currentHpciCCTypeValue = hpciCCTypeValue;
        currentHpciCCBINValue = hpciCCBINValue;
        currentHpciCCValidValue = hpciCCValidValue;
        currentHpciCCLengthValue = hpciCCLengthValue;
        currentHpciCCEnteredLengthValue = hpciCCEnteredLengthValue;
        // // console.log("___"+hpciCCTypeValue);
        validateCurrentCreditCard(currentCredictCardInformation);

    }
    // si no hay valores ingresados en el input, oculto el mensaje de error
    if (hpciCCLengthValue === 0 && hpciCCEnteredLengthValue === 0) {
        jQuery("#" + iframeCurrentlySelected).find(".payment-error").addClass("hidden-options-payment");
    }
    $ = jQuery;
}

/**
 * Función para ocultar los elementos de la validación de tarjeta de credito.
 */
function hiddenValidateElements() {
    try {
        // Oculto los iconos
        jQuery("#" + iframeCurrentlySelected).find(".visa").addClass("hidden-options-payment");
        jQuery("#" + iframeCurrentlySelected).find(".amex").addClass("hidden-options-payment");
        jQuery("#" + iframeCurrentlySelected).find(".discover").addClass("hidden-options-payment");
        jQuery("#" + iframeCurrentlySelected).find(".jcb").addClass("hidden-options-payment");
        jQuery("#" + iframeCurrentlySelected).find(".mastercard").addClass("hidden-options-payment");
        jQuery("#" + iframeCurrentlySelected).find(".diners").addClass("hidden-options-payment");
    } catch (error) {
        // console.error("hiddenValidateElements" + error)
    }
}

/**
 * Funcionalidad que solicita el ingreso del código de verificación.
 */
function requiredCodeVerify() {

    try {
        jQuery("#" + iframeCurrentlySelected).find(".payment-error").children().remove();
        jQuery("#" + iframeCurrentlySelected).find(".payment-error").append(requesCreditarCodeTemplate);

        notContinueWithProcessPayment();
        // console.log("___" + "Código requerido para continuar con el proceso de pago");
    } catch (error) {
        // console.error("requiredCodeVerify" + error)
    }
}

/**
 * Función que permite saber el número de dígitos de el código de verficación.
 * @param {any} hpciCVVDigitsValue 
 */
function hpciCVVDigitsSuccessHandler(hpciCVVDigitsValue) {
    // // console.log("___"+"---código de verificación: " + hpciCVVDigitsValue)
    // almaceno el numero de dígitos del código de verificación.
    currentCodeVerfiy = hpciCVVDigitsValue;
    if (currentCodeVerfiy !== "" && currentCodeVerfiy >= 3) {
        // Validación para las tarjetas american express
        if (hpciCVVDigitsValue < 4 && identityCardType === "AMEX") {
            jQuery("#" + iframeCurrentlySelected).find(".payment-error").children().remove();
            jQuery("#" + iframeCurrentlySelected).find(".payment-error").append(requesCreditarCodeTemplate);
            jQuery("#" + iframeCurrentlySelected).find(".payment-error").removeClass("hidden-options-payment");
            // oculto los iconos de las tarjetas
            hiddenValidateElements();
            // puede continuar con el proceso de pago.
            continueProcessPayment = false;
        } else if (hpciCVVDigitsValue >= 4 && identityCardType !== "AMEX") {
            jQuery("#" + iframeCurrentlySelected).find(".payment-error").children().remove();
            jQuery("#" + iframeCurrentlySelected).find(".payment-error").append(requesCreditarCodeTemplate);
            jQuery("#" + iframeCurrentlySelected).find(".payment-error").removeClass("hidden-options-payment");
            // oculto los iconos de las tarjetas
            hiddenValidateElements();
            // puede continuar con el proceso de pago.
            continueProcessPayment = false;
        } else {
            validateViewElements(currentHpciCCTypeValue, currentHpciCCBINValue, currentHpciCCValidValue, currentHpciCCLengthValue, currentHpciCCEnteredLengthValue);
        }
    } else {

        // Valido que dato hace falta de la tarjeta de credito. 
        if (currentHpciCCTypeValue !== "") {
            // Solicito el ingreso del código de verficiación en el payment
            requiredCodeVerify();
        }
    }
    $ = jQuery;
};