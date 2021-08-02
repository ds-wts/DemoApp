/* 
Installation => npm i react-native-otp-verify
ReferenceLink => https://www.npmjs.com/package/react-native-otp-verify
ReferenceLink => https://medium.com/@ansonmathew/automatic-sms-verification-react-native-android-9cf1af1cde53

* * Should start with <#>, to register as an OTP SMS
* * The message should end with the generated hash key

1. A valid verification message might look like the following:
<#> Your Example app code is: 123456 /f8Escobih1Z

2. /f8Escobih1Z this is hash key 
 */

import React, {useEffect} from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import RNOtpVerify from 'react-native-otp-verify';

const SmsRetriever = props => {
  const getHash = () =>
    RNOtpVerify.getHash()
      .then(res => console.log('HashKey =>', res))
      .catch(console.log);

  const startListeningForOtp = () =>
    RNOtpVerify.getOtp()
      .then(p => RNOtpVerify.addListener(otpHandler))
      .catch(p => console.log(p));

  const otpHandler = message => {
    console.log('Message', message);
    const otp = /(\d{6})/g.exec(message)[1];

    console.log('otp', otp);
    RNOtpVerify.removeListener();
  };

  useEffect(() => {
    getHash();
    startListeningForOtp();

    return () => {
      RNOtpVerify.removeListener();
    };
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Sms Otp Listeners Example</Text>
    </View>
  );
};

export default SmsRetriever;
