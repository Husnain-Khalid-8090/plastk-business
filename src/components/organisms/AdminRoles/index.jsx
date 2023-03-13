// import React, { useContext, useEffect, useState } from 'react';
// // eslint-disable-next-line no-unused-vars
// import styled, { css } from 'styled-components/macro';
// import { AuthContext } from '../../../context/authContext';
// import { SelectStyled } from '../FilterBtns/FilterBtns.style';

// const AdminRoles = () => {
//   const { user } = useContext(AuthContext);
//   const [roleOptions, setRoleOptions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     setLoading(true);
//     const options = user?.adminRoleTypes.length
//       ? user?.adminRoleTypes.map((item, index) => ({ value: index, label: item, isDisabled: true }))
//       : [];
//     setRoleOptions(options);
//     setLoading(false);
//   }, [user]);
//   return (
//     <>
//       <SelectStyled
//         css="height:40px;"
//         disabled={loading}
//         defaultValue={{ value: 999, label: 'See Roles' }}
//         options={roleOptions}
//         onChange={() => {}}
//         noMargin
//         gray
//       />
//     </>
//   );
// };

// export default AdminRoles;
