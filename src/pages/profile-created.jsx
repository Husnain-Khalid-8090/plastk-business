import React, { useContext } from 'react';
import MessageBlock from '../components/molecules/MessageBlock';
import Button from '../components/atoms/Button';
import { AuthContext } from '../context/authContext';

export default function ProfileCreated() {
  const { onLogout } = useContext(AuthContext);
  return (
    <>
      <MessageBlock
        heading="Thank you!"
        description="Thank you for registering your business on the Plastk Business Accelerator Portal. Our team will review your registration details and we will get back to you shortly. You will be able to access the portal once your business has been approved."
        button={
          <Button type="primary" width={154} rounded sm onClick={onLogout}>
            Logout
          </Button>
        }
      />
    </>
  );
}
