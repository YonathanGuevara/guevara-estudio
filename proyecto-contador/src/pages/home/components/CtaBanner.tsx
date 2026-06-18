import { Link } from 'react-router-dom';

const WA_LINK = 'https://wa.me/5491150069106?text=Hola%21%20Me%20interesa%20una%20consulta%20gratuita.';

export default function CtaBanner() {
  return (
    <section className="py-24 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E3A5F] to-[#0F172A] border border-[#3B82F6]/20 p-10 lg:p-16">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#3B82F6]/5 pointer-events-none"></div>
          <div className="absolute -bottom-16 -left-10 w-60 h-60 rounded-full bg-[#3B82F6]/3 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left max-w-xl">
              <p className="text-[#3B82F6] text-xs font-semibold tracking-widest uppercase mb-4">
                El próximo paso
              </p>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                ¿Listo para ordenar tu negocio?
              </h2>
              <p className="text-[#9CA3AF] text-base leading-relaxed">
                La primera consulta es sin cargo. Me contás tu situación, yo te digo
                cómo puedo ayudarte. Sin compromisos, sin tecnicismos.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full sm:w-auto lg:w-auto flex-shrink-0">
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap text-sm"
              >
                Contactame ahora
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-right-line"></i>
                </span>
              </Link>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap text-sm"
              >
                <span className="w-4 h-4 flex items-center justify-center text-green-400">
                  <i className="ri-whatsapp-line text-base"></i>
                </span>
                Escribime por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
