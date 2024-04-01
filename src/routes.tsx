import __pages_import_0__ from './pages/[...]';
import __pages_import_1__ from './pages/login';
import __pages_import_2__ from './pages/index';

const routes = [
  { caseSensitive: false, path: '*', element: <__pages_import_0__ /> },
  { caseSensitive: false, path: 'login', element: <__pages_import_1__ /> },
  { caseSensitive: false, path: '/', element: <__pages_import_2__ /> },
];

export default routes;
