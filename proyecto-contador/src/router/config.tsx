import type { RouteObject } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import SobreMi from '@/pages/sobre-mi/page';
import Servicios from '@/pages/servicios/page';
import Facturacion from '@/pages/facturacion/page';
import Herramientas from '@/pages/herramientas/page';
import Contacto from '@/pages/contacto/page';

const routes: RouteObject[] = [
  { path: '/', element: <SobreMi /> },
  { path: '/servicios', element: <Servicios /> },
  { path: '/facturacion', element: <Facturacion /> },
  { path: '/herramientas', element: <Herramientas /> },
  { path: '/contacto', element: <Contacto /> },
  { path: '*', element: <NotFound /> },
];

export default routes;import type { RouteObject } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import SobreMi from '@/pages/sobre-mi/page';
import Servicios from '@/pages/servicios/page';
import Aurea from '@/pages/aurea/page';
import Herramientas from '@/pages/herramientas/page';
import Contacto from '@/pages/contacto/page';

const routes: RouteObject[] = [
  { path: '/', element: <SobreMi /> },
  { path: '/servicios', element: <Servicios /> },
  { path: '/aurea', element: <Aurea /> },
  { path: '/herramientas', element: <Herramientas /> },
  { path: '/contacto', element: <Contacto /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
