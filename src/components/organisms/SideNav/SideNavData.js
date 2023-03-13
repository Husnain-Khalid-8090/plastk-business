/* eslint-disable react/jsx-filename-extension */
import React from 'react';

export const SideNavData = [
  {
    title: 'Dashboard',
    path: 'dashboard',
    icon: <span className="icon icon-dashboard" />,
    live: true,
    roles: ['bp_user', 'store_user'],
    permission: 'bap.dashboard.nav',
  },
  {
    title: 'Stores',
    path: 'stores',
    icon: <span className="icon icon-cart" />,
    live: true,
    roles: ['bp_user', 'store_user'],
    permission: 'bap.stores.nav',
  },
  {
    title: 'Store Groups',
    path: 'store-groups',
    icon: <span className="icon icon-bag" />,
    live: true,
    roles: ['bp_user', 'store_user'],
    permission: 'bap.store-groups.nav',
  },
  {
    title: 'Promotions',
    path: 'promotions',
    icon: <span className="icon icon-megaphone" />,
    live: true,
    roles: ['bp_user', 'store_user'],
    permission: 'bap.promotions.nav',
  },
  {
    title: 'Store Managers',
    path: 'store-managers',
    icon: <span className="icon icon-user" />,
    live: true,
    roles: ['bp_user'],
    permission: 'bap.store-managers.nav',
  },
  {
    title: 'Statements',
    path: 'statements',
    icon: <span className="icon icon-bill" />,
    live: false,
    roles: ['bp_user', 'store_user'],
    permission: 'bap.statements.nav',
  },
  {
    title: 'Payment History',
    path: 'payment-history',
    icon: (
      <span className="material-icons-outlined" css="font-size:1.7rem">
        attach_money
      </span>
    ),
    live: true,
    roles: ['bp_user', 'store_user'],
    permission: 'bap.payment-history.view',
  },
];
