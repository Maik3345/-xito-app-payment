import * as React from 'react';
import './index.scss';

class FormPayment extends React.Component {



  
  public createSelectMonth = () => {

    const select = []
    const limit = 2000;

    for (let i = 0; i < limit; i++) {
      select.push(
        <option key={i} value={i}>{i}</option>
      )
    }
    return select
  }

  public render() {
    return (
      <form className="row no-gutters" id="form-payment">

        <div className="col">
          {/* HPCI */}
          <iframe seamless={true} id="ccframecreditCardApp" name="ccframecreditCardApp" src="" className="iframe-payment" >
            If you can see this, your browser doesn't understand IFRAME.
                </iframe>
          {/* HPCI */}
        </div>


        <div className="form-group col-12 cont-input-payment">
          <label className="title-input" htmlFor="inputNameCreditCard">Nombre del titular</label>
          <small id="NameCreditCardHelp" className="form-text text-muted comment-text">Ingresa el nombre como aparece en la tarjeta.</small>
          <input name="inputNameCreditCard" type="text" className="form-control" placeholder="Escribe el nombre del titular" id="inputNameCreditCard" />
        </div>

        <div className="col-12 cont-input-payment">
          <label className="title-input" htmlFor="selectMonth">Fecha de vencimiento</label>
          <div className="form-row">
            <div className="form-group col">
              <select name="selectMonth" className="form-control" id="selectMonth">
                <option selected={true}>Mes</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>

            <div className="form-group col">
              <select name="selectYear" className="form-control" id="selectYear">
                <option selected={true}>Año</option>
                {this.createSelectMonth()}
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>
          </div>


        </div>

        <div className="form-group col-12 cont-input-payment">
          <label className="title-input" htmlFor="selectNumberDues">N&uacute;mero de cuotas</label>
          <select name="selectNumberDues" className="form-control" id="selectNumberDues">
            <option selected={true}>Selecciona</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
            <option value="32">32</option>
            <option value="33">33</option>
            <option value="34">34</option>
            <option value="35">35</option>
            <option value="36">36</option>
            <option value="37">37</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
            <option value="43">43</option>
            <option value="44">44</option>
            <option value="45">45</option>
            <option value="46">46</option>
            <option value="47">47</option>
            <option value="48">48</option>
          </select>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="checkFuturePurchases" />
          <label className="form-check-label normal-text" htmlFor="checkFuturePurchases">
            Guardar mi tarjeta para futuras compras
                        </label>
        </div>

        <div className="payment-button">
          <button type="button" className="btn btn-success" id="btn-payment-app">ir a pagar</button>
        </div>
      </form>
    );
  }
}

export default FormPayment;