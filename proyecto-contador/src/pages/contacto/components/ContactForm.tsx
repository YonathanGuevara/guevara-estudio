import { useState, FormEvent, ChangeEvent } from 'react';

const WA_NUMBER = '5492954321876';

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  consulta: string;
  mensaje: string;
}

const consultaOptions = [
  'Impuestos y Contabilidad',
  'Monotributo o Autónomos',
  'Sueldos y Liquidaciones',
  'Dashboard y Gestión Financiera',
  'Asesoramiento para emprendedores',
  'Planificación Fiscal',
  'Consulta general',
];

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    consulta: '',
    mensaje: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Armamos el mensaje para WhatsApp con todos los datos del formulario
    const lines = [
      `¡Hola! Quiero hacer una consulta desde el sitio web.`,
      ``,
      `👤 *Nombre:* ${form.nombre}`,
      `📧 *Email:* ${form.email}`,
      form.telefono ? `📱 *Teléfono:* ${form.telefono}` : null,
      `📋 *Consulta sobre:* ${form.consulta}`,
      form.mensaje ? `\n💬 *Mensaje:*\n${form.mensaje}` : null,
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-[#111827] border border-white/5 rounded-3xl p-10 text-center">
        <div className="w-16 h-16 flex items-center justify-center bg-green-500/10 rounded-full mx-auto mb-5">
          <i className="ri-whatsapp-line text-green-400 text-2xl"></i>
        </div>
        <h3 className="text-white font-extrabold text-2xl mb-3">¡WhatsApp abierto!</h3>
        <p className="text-[#9CA3AF] text-base leading-relaxed">
          Se abrió WhatsApp con tu consulta lista para enviar. Solo tocá "Enviar" en la app.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ nombre: '', email: '', telefono: '', consulta: '', mensaje: '' });
          }}
          className="mt-7 inline-flex items-center gap-2 text-[#3B82F6] hover:text-white text-sm font-medium transition-colors cursor-pointer"
        >
          <i className="ri-refresh-line"></i>
          Enviar otra consulta
        </button>
      </div>
    );
  }

  return (
    <form
      id="formulario-contacto"
      onSubmit={handleSubmit}
      className="bg-[#111827] border border-white/5 rounded-3xl p-8 lg:p-10 flex flex-col gap-5"
    >
      <h3 className="text-white font-extrabold text-xl mb-1">Contame tu consulta</h3>
      <p className="text-[#9CA3AF] text-sm mb-2">
        Al enviar, se abre WhatsApp con tu mensaje listo. La primera consulta es sin cargo.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-white text-xs font-semibold">Nombre completo *</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            placeholder="Ej: Juan García"
            className="bg-white/5 border border-white/10 focus:border-[#3B82F6] text-white placeholder-[#6B7280] text-sm px-4 py-3 rounded-xl outline-none transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-white text-xs font-semibold">Email *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="juan@empresa.com"
            className="bg-white/5 border border-white/10 focus:border-[#3B82F6] text-white placeholder-[#6B7280] text-sm px-4 py-3 rounded-xl outline-none transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-white text-xs font-semibold">Teléfono / WhatsApp</label>
          <input
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="+54 11 1234-5678"
            className="bg-white/5 border border-white/10 focus:border-[#3B82F6] text-white placeholder-[#6B7280] text-sm px-4 py-3 rounded-xl outline-none transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-white text-xs font-semibold">¿Sobre qué necesitás asesoramiento? *</label>
          <select
            name="consulta"
            value={form.consulta}
            onChange={handleChange}
            required
            className="bg-white/5 border border-white/10 focus:border-[#3B82F6] text-white text-sm px-4 py-3 rounded-xl outline-none transition-colors cursor-pointer"
          >
            <option value="" disabled className="bg-[#111827]">Seleccioná una opción</option>
            {consultaOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-[#111827]">{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-white text-xs font-semibold">Contame más sobre tu situación</label>
        <textarea
          name="mensaje"
          value={form.mensaje}
          onChange={handleChange}
          placeholder="Describí brevemente tu negocio y en qué necesitás ayuda..."
          rows={4}
          maxLength={500}
          className="bg-white/5 border border-white/10 focus:border-[#3B82F6] text-white placeholder-[#6B7280] text-sm px-4 py-3 rounded-xl outline-none transition-colors resize-none"
        />
        <p className="text-[#6B7280] text-xs text-right">{form.mensaje.length}/500</p>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold px-7 py-4 rounded-xl transition-colors cursor-pointer whitespace-nowrap text-sm mt-1"
      >
        <i className="ri-whatsapp-line text-lg"></i>
        Enviar consulta por WhatsApp
        <span className="w-4 h-4 flex items-center justify-center">
          <i className="ri-arrow-right-line"></i>
        </span>
      </button>
    </form>
  );
}
