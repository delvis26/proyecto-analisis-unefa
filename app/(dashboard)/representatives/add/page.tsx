export default function AddRepresentative() {
  return (
    <section className="bg-white rounded-xl p-5 border border-black/5 shadow-sm flex flex-col gap-5">
      <h1 className="text-center text-xl font-bold">
        REGISTRAR REPRESENTANTE
      </h1>
      <form className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <input
            className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
            type="text"
            placeholder="Nombre"
            name="name"
          />
          <input
            className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
            type="text"
            placeholder="Segundo nombre"
            name="middle_name"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
            type="text"
            placeholder="Apellido"
            name="last_name"
          />
          <input
            className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
            type="text"
            placeholder="Segundo apellido"
            name="second_last_name"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative w-full border border-black/20 transition-shadow ring-blue-500/20 focus-within:ring-[3px] rounded-xl overflow-hidden">
            <div className="absolute inset-y-0 flex items-center"> 
                <select name="nationality" className="h-full outline-none px-3 border-r border-black/20 bg-transparent">
                    <option value="V">V</option>
                    <option value="E">E</option>
                </select>
            </div>
            <input
              required
              name="identification_number"
              className="w-full pl-16 pr-3 py-3 outline-none"
              type="text"
              placeholder="Cedula de identidad"
            />
          </div>
          <input
            className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
            type="text"
            placeholder="Telefono"
            name="phone"
          />
          <input
            className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
            type="email"
            placeholder="Correo electronico"
            name="email"
          />
        </div>
        <input
            className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
            type="text"
            placeholder="Dirección"
            name="adress"
          />
        
        <button className="p-3 disabled:opacity-70 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors duration-150 uppercase">
            Registrar
        </button>
      </form>
    </section>
  );
}
