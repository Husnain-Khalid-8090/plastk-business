import React, { useContext } from 'react';
import Grid from '../../atoms/Grid';
import ProfileField from '../../atoms/ProfileField';
import { AuthContext } from '../../../context/authContext';

const PersonalInfo = () => {
  const { user } = useContext(AuthContext);

  return (
    <Grid xs={2} xl={3} gap={{ xs: 25, sm: 50 }} rowGap={{ xl: 25 }}>
      <ProfileField
        icon={<i className="icon-user" />}
        title="Business Name"
        value={user?.role === 'bp_user' ? (user?.businessName ? user?.businessName : `  ---  `) : user?.business_name}
      />
      <ProfileField
        icon={<i className="icon-user" />}
        title="Business Contact Name"
        value={
          user?.role === 'bp_user'
            ? user?.primary_contact_person
              ? user?.primary_contact_person
              : `  ---  `
            : user?.business_name
        }
      />
      <ProfileField
        icon={<i className="icon-phonecall" />}
        title="Contact Number"
        value={user?.contact_number ? user?.contact_number : `  ---  `}
      />
      <ProfileField
        icon={<i className="icon-hash" />}
        title="Business Number(B.I.N)"
        value={user?.business_no ? user?.business_no : `  ---  `}
      />
      <ProfileField
        icon={<i className="icon-hash" />}
        title="GST Number"
        value={user?.business_gst ? user?.business_gst : `  ---  `}
      />

      <ProfileField icon={<i className="icon-email" />} title="Email" value={user?.email ? user?.email : `  ---  `} />
    </Grid>
  );
};

export default PersonalInfo;
