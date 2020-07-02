import React from 'react'
import SideBar from '../../components/Sidebar/sidebar';


// @ Get this values from server
const userPermissionsData = [
  {
    contentName: 'SquadUsuario',
    icon: 'AccountTreeIcon',
    name: 'Squad/Usuário',
    route: '/rota-1'
  },
  {
    contentName: 'MinhasInformacoes',
    icon: 'AssessmentIcon',
    name: 'Minhas Informações',
    route: '/rota-2'
  },
  {
    contentName: 'Squad',
    icon: 'CreateIcon',
    name: 'Cadastrar Squad',
    route: '/rota-3'
  },
 
]

const Main = () => <SideBar userPermissionsData={userPermissionsData} />


export default Main