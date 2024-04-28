import __pages_import_0__ from './pages/[...]';
import __pages_import_1__ from './pages/login';
import __pages_import_2__ from './pages/index';
import __pages_import_3__ from './pages/index/user/profile/index';

const routes = [
  { caseSensitive: false, path: '*', element: <__pages_import_0__ /> },
  { caseSensitive: false, path: 'login', element: <__pages_import_1__ /> },
  {
    caseSensitive: false,
    path: '/',
    element: <__pages_import_2__ />,
    children: [
      {
        caseSensitive: false,
        path: 'user',
        children: [
          {
            caseSensitive: false,
            path: 'profile',
            children: [
              {
                caseSensitive: false,
                path: '',
                element: <__pages_import_3__ />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
