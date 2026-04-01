"use client";

import { useEffect, useActionState } from "react";
import { sign } from "./server/api";

export default function Home() {

  const [state, action] = useActionState(sign, { message: "", status: false });

  useEffect(() => {
    if(state.status)
      console.log("deu certo");
    else
      console.log("deu errado");
  }, [state]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Cadastro</h1>
        <form className="space-y-4" action={action}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              name="name"
              placeholder="Digite seu nome"
              className="mt-1 ps-2  w-full h-8 outline-none rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sexo</label>
            <select
              name="gender"
              className="mt-1 w-full h-8rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Selecione</option>
              <option value="masculine">Masculino</option>
              <option value="feminine">Feminino</option>
              <option value="other">Outro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contacto</label>
            <input
              type="tel"
              name="contact"
              placeholder="Digite seu telefone"
              className="mt-1 ps-2  w-full h-8 outline-none rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">BI</label>
            <input
              type="text"
              name="bi"
              placeholder="Digite o número do BI"
              className="mt-1 ps-2  w-full h-8 outline-none rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <button
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};