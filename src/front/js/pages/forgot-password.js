import React from 'react';
import Authenticate from '../component/authenticate';
const ForgotPassword = () => {
  return (
    <>
      <Authenticate buttonText={'Create a Password'} title={'Change Password'} showRecovery={true} />

    </>
  )
}

export default ForgotPassword