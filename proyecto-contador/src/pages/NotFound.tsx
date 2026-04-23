import { Link, useLocation } from 'react-router-dom';

export default function NotFound() {
  const location = useLocation();
  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center px-4 bg-[#0A0A0A]">
      <h1 className="absolute bottom-0 text-9xl md:text-[12rem] font-black text-white/5 select-none pointer-events-none z-0">
        404
      </h1>
      <div className="relative z-10">
        <h1 className="text-xl md:text-2xl font-semibold text-white mt-6">
          Página no encontrada
        </h1>
        <p className="mt-2 text-base text-gray-400 font-mono">
          {location.pathname}
        </p>
        <p className="mt-4 text-lg text-gray-500">
          La página que buscás no existe.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
        >
          <i className="ri-arrow-left-line"></i>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
