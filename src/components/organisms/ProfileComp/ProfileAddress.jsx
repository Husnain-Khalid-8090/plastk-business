import React, { useContext } from 'react';
import Grid from '../../atoms/Grid';
import ProfileField from '../../atoms/ProfileField';
import { AuthContext } from '../../../context/authContext';

const ProfileAddress = () => {
  const { user } = useContext(AuthContext);

  return (
    <Grid xs={2} xl={3} gap={{ xs: 25, sm: 50 }} rowGap={{ xl: 25 }}>
      <ProfileField
        icon={<i className="icon-user" />}
        title="Street Address"
        value={user?.address?.street_address ? user?.address?.street_address : '---'}
      />
      <ProfileField icon={<i className="icon-user" />} title="Suite Number" value="---" />
      <ProfileField
        icon={<i className="icon-phonecall" />}
        title="City"
        value={user?.address.city ? user?.address.city : `  ---  `}
      />
      <ProfileField
        icon={<i className="icon-hash" />}
        title="Province"
        value={user?.address?.state ? user?.address?.state : `  ---  `}
      />
      <ProfileField
        icon={<i className="icon-hash" />}
        title="Postal Code"
        value={user?.address?.postal_code ? user?.address?.postal_code : `  ---  `}
      />
    </Grid>
  );
};

export default ProfileAddress;
