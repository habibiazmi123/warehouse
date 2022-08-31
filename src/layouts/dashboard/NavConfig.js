// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Warehouse',
    path: '/warehouse',
    icon: getIcon('eva:cube-outline'),
  }
];

export default navConfig;
