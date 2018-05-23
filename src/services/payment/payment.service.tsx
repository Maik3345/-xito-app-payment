/**
 * Método empleado para consultar las configuraciones necesarias para el app 
 */
export function getConfigurationsPayment() {
    return fetch('http://localhost:3004/getConfigurationPayment', { method: 'GET' });
}
