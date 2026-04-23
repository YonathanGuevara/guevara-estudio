const WA_LINK = 'https://wa.me/5492954321876?text=Hola%21%20Me%20interesa%20una%20consulta%20gratuita.';

const faq = [
  {
    q: '¿Trabajás con clientes de todo el país?',
    a: 'Sí, trabajo 100% de forma remota. Tengo clientes en CABA, GBA, Córdoba, Rosario, Mendoza y muchas ciudades más.',
  },
  {
    q: '¿Cuál es el costo de los servicios?',
    a: 'Los honorarios dependen del tipo y volumen de servicio. En la consulta inicial evaluamos tu situación y te paso una propuesta concreta.',
  },
  {
    q: '¿Cómo me enviás los reportes?',
    a: 'Digitalmente, por email o plataforma. Sin papeles, sin traslados. Todo en la nube y siempre disponible para vos.',
  },
  {
    q: '¿Puedo cambiar de contador a mitad de año?',
    a: 'Sí, es totalmente posible. Me encargo de toda la transición de forma ordenada para que no haya interrupciones.',
  },
];

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-[#3B82F6] text-xs font-semibold tracking-widest uppercase mb-3">
          Estemos en contacto
        </p>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
          Hablemos de tu negocio.
        </h1>
        <p className="text-[#9CA3AF] text-base leading-relaxed">
          La primera consulta es sin cargo. Me contás tu situación, yo te explico cómo puedo ayudarte. Sin compromisos ni tecnicismos.
        </p>
      </div>

      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 bg-[#111827] hover:bg-[#1a2335] border border-white/5 hover:border-green-500/20 rounded-2xl p-5 transition-all duration-300 cursor-pointer"
      >
        <span className="w-12 h-12 flex items-center justify-center bg-green-500/10 rounded-xl text-green-400 flex-shrink-0">
          <i className="ri-whatsapp-line text-2xl"></i>
        </span>
        <div>
          <p className="text-white font-bold text-base">WhatsApp directo</p>
          <p className="text-[#9CA3AF] text-sm">Respondemos rápido · +54 2954 321876</p>
        </div>
        <span className="ml-auto w-8 h-8 flex items-center justify-center text-[#9CA3AF]">
          <i className="ri-arrow-right-line"></i>
        </span>
      </a>

      <div className="flex flex-col gap-4">
        {[
          { icon: 'ri-mail-line', label: 'Email', value: 'ygasistenciacontable@gmail.com' },
          { icon: 'ri-time-line', label: 'Horario de atención', value: 'Lunes a viernes · 07:00 a 15:00 hs' },
          { icon: 'ri-global-line', label: 'Cobertura', value: 'Todo el país · 100% digital y remoto' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="w-9 h-9 flex items-center justify-center bg-white/5 rounded-lg text-[#3B82F6] flex-shrink-0">
              <i className={`${item.icon} text-base`}></i>
            </span>
            <div>
              <p className="text-[#6B7280] text-xs">{item.label}</p>
              <p className="text-white text-sm font-medium">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-white/5">
        <p className="text-white font-bold text-base mb-5">Preguntas frecuentes</p>
        <div className="flex flex-col gap-5">
          {faq.map((item) => (
            <div key={item.q}>
              <p className="text-white font-semibold text-sm mb-1.5">{item.q}</p>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
