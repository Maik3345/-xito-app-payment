/**
 * Método que permite crear la estructura de los datos enviados en el payment
 * 
 * @param {any} id 
 * @param {any} code 
 * @param {any} identitycard 
 * @param {any} identitycardtype 
 * @param {any} bank 
 * @param {any} dues 
 * @param {any} cardnumber 
 * @param {any} cardname 
 * @param {any} expirationmonth 
 * @param {any} expirationyear 
 * @param {any} verificationcode 
 * @param {any} clienttype 
 */
function Payment(id, code, identitycard, identitycardtype, bank, dues, cardnumber, cardname, expirationmonth, expirationyear, verificationcode, clienttype) {
    this.id = id;
    this.code = code;
    this.identityCard = identitycard;
    this.identityCardType = identitycardtype;
    this.bank = bank;
    this.dues = dues;
    this.cardNumber = cardnumber;
    this.cardName = cardname;
    this.expirationMonth = expirationmonth;
    this.expirationYear = expirationyear;
    this.verificationCode = verificationcode;
    this.clientType = clienttype;
}


// variable que almacena los datos del payment
var payment = new Payment();

/**
 * Método para crear las validaciones en el formulario. 
 * los campos Numero y código de verificación de la tarjeta no se validan. 
 * estas validaciones son por parte de hpci
 * @param {any} $form 
 * @returns 
 */
function validatePaymentMethodForm($form) {

    $form.formValidation({
        autoFocus: true,
        fields: {
            inputNameCreditCard: {
                validators: {
                    notEmpty: {
                        message: 'Por favor introduce el nombre que esta en la tarjeta.'
                    },
                    regexp: {
                        regexp: /^[a-zA-ZñÑ\s]+$/
                    },
                    stringLength: {
                        max: 80
                    }
                }
            },
            selectMonth: {
                validators: {
                    notEmpty: {
                        message: 'Por favor seleccione un mes de vencimiento.'
                    }
                }
            },
            selectNumberDues: {
                validators: {
                    notEmpty: {
                        message: 'Por favor seleccione el número de cuotas.'
                    }
                }
            },
            selectYear: {
                validators: {
                    notEmpty: {
                        message: 'Por favor seleccione un año de vencimiento.'
                    }
                }
            }
        },
        framework: 'bootstrap',

        icon: {
            invalid: 'glyphicon glyphicon-remove',
            valid: 'glyphicon glyphicon-ok',
            validating: 'glyphicon glyphicon-refresh',

        },
        locale: 'es_ES'
    })

        // Método que permite asignar el valor de los campos del formulario a la variable empleada para finalizar el payment
        .on('success.validator.fv', function (e, data) {
            switch (data.field) {
                case 'inputNameCreditCard':
                    payment.cardName = data.element.val().trim();
                    break;
                case 'selectNumberDues':
                    payment.dues = data.element.val().trim();
                    break;
                case 'selectMonth':
                    payment.expirationMonth = data.element.val().trim();
                    break;
                case 'selectYear':
                    payment.expirationYear = data.element.val().trim();
                    break;
            }
        })

    // Método que valida si el formulario esta correctamente diligenciado.
    if ($form.length) {
        if (typeof $form.data('formValidation') !== 'undefined') {
            $form.data('formValidation').validate();
            if (!$form.data('formValidation').isValid()) {
                return false;
            } else {
                continuePaymentProcess();
            }
        }
    }
}


function validateCreeditCard() {
    var responseHCPI = sendHPCIMsg();
    if (responseHCPI !== null) {
        if (responseHCPI === false) {
            hpciSiteSuccessHandlerV2 = function (mappedCCValue, mappedCVVValue, ccBINValue) {
                // //console.log("___"+mappedCCValue, mappedCVVValue, ccBINValue);
                try {
                    // //console.log("___"+"Error en el proceso hpci")
                } catch (e) {
                    // //console.log("___"+' -hpciSiteSuccessHandlerV2- ');
                }
                // Obtengo los elementos 
                var ccNumInput = jQuery("#" + iframeCurrentlySelected).find("#ccNum");
                ccNumInput.value = mappedCCValue;
                var ccCVVInput = jQuery("#" + iframeCurrentlySelected).find("#ccCVV");
                ccCVVInput.value = mappedCVVValue;
                var ccBINInput = jQuery("#" + iframeCurrentlySelected).find("#ccBIN");
                ccBINInput.value = ccBINValue;
            }
        }
    }
}

/**
 * Método que permite finalizar el payment.
 * 
 */
function continuePaymentProcess() {
    //console.log(payment);
    alert("enviando")
}

// Evento que se aplica al boton de "Ir a pagar". ejecutamos la funcion que agrega
// la validación al formulario y valida que los campos este correctos
$("#btn-payment-app").click(function () {
    // var form = $("#form-payment");
    validateCreeditCard();
    // validatePaymentMethodForm(form);
});