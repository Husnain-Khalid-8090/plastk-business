import React, { useContext } from 'react';
import Grid from '../../atoms/Grid';
import ProfileField from '../../atoms/ProfileField';
import { AuthContext } from '../../../context/authContext';
import ModalContainer from '../../molecules/ModalContainer';
import Button from '../../atoms/Button';
import ResetPassword from './resetPassword';

const Security = () => {
  const { user } = useContext(AuthContext);
  const dateString = user?.updated_ps;
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return (
    <Grid xs={2} xl={3} gap={{ xs: 25, sm: 50 }} rowGap={{ xl: 25 }}>
      <ProfileField
        icon={<i className="icon-key" />}
        title="Password"
        value={`last updated at ${formattedDate}` || '---'}
      />
      <div />
      <ModalContainer
        md
        btnComponent={({ onClick }) => (
          <Button
            type="primary"
            width={200}
            height={80}
            css="border: 2px solid var(--primary); color:var(--primary) "
            sm
            rounded
            mobileCircle
            onClick={() => {
              onClick();
            }}>
            <span className="text">Update Password</span>
          </Button>
        )}
        content={({ onClose }) => <ResetPassword onClose={onClose} />}
      />
    </Grid>
  );
};

export default Security;
