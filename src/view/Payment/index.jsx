import React from 'react'
import styled from 'styled-components'
import { Footer } from '../../components'


const Payment = () => {
    function onApplePayButtonClicked() { 

        if (!ApplePaySession) {
            return;
        }
        
        // Define ApplePayPaymentRequest
        const request = {
            "countryCode": "US",
            "currencyCode": "USD",
            "merchantCapabilities": [
                "supports3DS"
            ],
            "supportedNetworks": [
                "visa",
                "masterCard",
                "amex",
                "discover"
            ],
            "total": {
                "label": "Demo (Card is not charged)",
                "type": "final",
                "amount": "1.99"
            }
        };
        
        // Create ApplePaySession
        const session = new ApplePaySession(3, request);
        session.onvalidatemerchant = async event => {
            // Call your own server to request a new merchant session.
            const merchantSession = await validateMerchant();
            session.completeMerchantValidation(merchantSession);
        };
        
        session.onpaymentmethodselected = event => {
            // Define ApplePayPaymentMethodUpdate based on the selected payment method.
            // No updates or errors are needed, pass an empty object.
            const update = {};
            session.completePaymentMethodSelection(update);
        };
        
        session.onshippingmethodselected = event => {
            // Define ApplePayShippingMethodUpdate based on the selected shipping method.
            // No updates or errors are needed, pass an empty object. 
            const update = {};
            session.completeShippingMethodSelection(update);
        };
        
        session.onshippingcontactselected = event => {
            // Define ApplePayShippingContactUpdate based on the selected shipping contact.
            const update = {};
            session.completeShippingContactSelection(update);
        };
        
        session.onpaymentauthorized = event => {
            // Define ApplePayPaymentAuthorizationResult
            const result = {
                "status": ApplePaySession.STATUS_SUCCESS
            };
            session.completePayment(result);
        };
        
        session.oncouponcodechanged = event => {
            // Define ApplePayCouponCodeUpdate
            const newTotal = calculateNewTotal(event.couponCode);
            const newLineItems = calculateNewLineItems(event.couponCode);
            const newShippingMethods = calculateNewShippingMethods(event.couponCode);
            const errors = calculateErrors(event.couponCode);
            
            session.completeCouponCodeChange({
                newTotal: newTotal,
                newLineItems: newLineItems,
                newShippingMethods: newShippingMethods,
                errors: errors,
            });
        };
        
        session.oncancel = event => {
            // Payment canceled by WebKit
        };
        
        session.begin();
    }
    // async function onApplePayButtonClicked() {
    //     console.log('test');
    //     // Consider falling back to Apple Pay JS if Payment Request is not available.
    //     if (!PaymentRequest) {
    //         console.log('failed');
    //         return;
    //     }
        
    //     try {
    //         // Define PaymentMethodData
    //         const paymentMethodData = [{
    //             "supportedMethods": "https://apple.com/apple-pay",
    //             "data": {
    //                 "version": 3,
    //                 "merchantIdentifier": "merchant.com.apdemo",
    //                 "merchantCapabilities": [
    //                     "supports3DS"
    //                 ],
    //                 "supportedNetworks": [
    //                     "amex",
    //                     "discover",
    //                     "masterCard",
    //                     "visa"
    //                 ],
    //                 "countryCode": "US"
    //             }
    //         }];
    //         // Define PaymentDetails
    //         const paymentDetails = {
    //             "total": {
    //                 "label": "Demo (Card is not charged)",
    //                 "amount": {
    //                     "value": "1.50",
    //                     "currency": "USD"
    //                 }
    //             }
    //         };
    //         // Define PaymentOptions
    //         const paymentOptions = {
    //             "requestPayerName": false,
    //             "requestBillingAddress": false,
    //             "requestPayerEmail": false,
    //             "requestPayerPhone": false,
    //             "requestShipping": false,
    //         };
            
    //         // Create PaymentRequest
    //         console.log(PaymentRequest)
    //         const request = new PaymentRequest(paymentMethodData, paymentDetails, paymentOptions);
    //         request.onmerchantvalidation = event => {
    //             // Call your own server to request a new merchant session.
    //             console.log(event)
    //             const merchantSessionPromise = validateMerchant();
    //             event.complete(merchantSessionPromise);
    //         };
            
    //         request.onpaymentmethodchange = event => {
    //             if (event.methodDetails.type !== undefined) {
    //                 // Define PaymentDetailsUpdate based on the selected payment method.
    //                 // No updates or errors needed, pass an object with the same total.
    //                 const paymentDetailsUpdate = {
    //                     'total': paymentDetails.total
    //                 };
    //                 event.updateWith(paymentDetailsUpdate);
    //             } else if (event.methodDetails.couponCode !== undefined) {
    //                 // Define PaymentDetailsUpdate based on the coupon code.
    //                 const total = calculateTotal(event.methodDetails.couponCode);
    //                 const displayItems = calculateDisplayItem(event.methodDetails.couponCode);
    //                 const shippingOptions = calculateShippingOptions(event.methodDetails.couponCode);
    //                 const error = calculateError(event.methodDetails.couponCode);
            
    //                 event.updateWith({
    //                     total: total,
    //                     displayItems: displayItems,
    //                     shippingOptions: shippingOptions,
    //                     modifiers: [
    //                         {
    //                             data: {
    //                                 additionalShippingMethods: shippingOptions,
    //                             },
    //                         },
    //                     ],
    //                     error: error,
    //                 });
    //             }
    //         };
        
    //         request.onshippingoptionchange = event => {
    //             // Define PaymentDetailsUpdate based on the selected shipping option.
    //             // No updates or errors needed, pass an object with the same total.
    //             const paymentDetailsUpdate = {
    //                 'total': paymentDetails.total
    //             };
    //             event.updateWith(paymentDetailsUpdate);
    //         };
        
    //         request.onshippingaddresschange = event => {
    //             // Define PaymentDetailsUpdate based on a shipping address change.
    //             const paymentDetailsUpdate = {};
    //             event.updateWith(paymentDetailsUpdate);
    //         };
        
    //         const response = await request.show();
    //         const status = "success";
    //         await response.complete(status);
    //     } catch (e) {
    //         // Handle errors
    //     }
    // }
    
    return (
        <Footer>
            <div onClick={ onApplePayButtonClicked } className="apple-pay-button-with-text apple-pay-button-black-with-text">
                <span className="text">Buy with</span>
                <span className="logo"></span>
            </div>
        </Footer>
    )
}

export default Payment;