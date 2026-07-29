import type { RouteObject } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/home/page';
import Servicios from '@/pages/servicios/page';
import SobreMi from '@/pages/sobre-mi/page';
import Contacto from '@/pages/contacto/page';

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/servicios', element: <Servicios /> },
  { path: '/sobre-mi', element: <SobreMi /> },
  { path: '/contacto', element: <Contacto /> },
  { path: '/herramientas', element: <Herramientas /> },
];

export default routes;
import Herramientas from '@/pages/herramientas/page';
// y en routes:
{ path: '/herramientas', element: <Herramientas /> },
