import React from 'react';
import AdminSection from '../AdminSection';
import { AddToTeam, TableUser } from './Actions';
import { AdminAction } from '../AdminSection';

const UserAdminSection: React.FC = () => {
  const actions: AdminAction[] = [
    {
      title: 'Ajouter à une équipe',
      form: <AddToTeam/>,
    },
    {
      title: 'Affichage utilisateurs',
      form: <TableUser/>,
    },
  ];

  return (
    <AdminSection actions={actions} />
  );
};

export default UserAdminSection;
