import * as React from 'react';
import { getConfigurationsPayment } from '../../services/payment/payment.service';
import FormPayment from '../form-payment/index';
import './index.scss';


class Payment extends React.Component <any,any> {

  
  constructor(state:any) {
    super(state)
    this.state = {
      configPayment: {
        sidHpci: ""
      },
      name: "Maik"
    }
  }
  public render() {
    return (
      <div className="payment-content" id="creditCardApp">
        <div className="title-payment">
          <p>Agregar tarjeta de cr&eacute;dito </p>
        </div>

        <div className="credit-card-accepted">
          <p className="title">Tarjetas aceptadas</p>
          <div className="credit-cards-methods">
            <img src="https://exito.com/images/payment/footer-payment-cards.png" />
          </div>
        </div>

        {/* INPUT DONDE SE ALMACENA LA INFORMACIÓN PARA PODER CREAR LA URL PARA HPCI */}
        <input type="hidden" id="config-hpci" value="sid;531241,locationName;checkoutApp,currency;COP,paymentProfile;DEF_PAYU,serviceUrl;https://ccframe.hostedpci.com" />
        {this.state.name}
        <FormPayment />

      </div>
    );
  }


  /**
   *  Al iniciar el componente
   * @memberof Payment
   */
  public componentDidMount() {
    this.getPaymentConfiguration();
  }

  /**
   * Método empleado para consultar las configuraciones del app
   * @memberof FormPayment
   */
  public getPaymentConfiguration() {
    getConfigurationsPayment().then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ configPayment: responseJson })
      });
  }
}

export default Payment;