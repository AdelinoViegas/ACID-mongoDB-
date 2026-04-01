"use server"

import mongoose from "mongoose";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect("mongodb://localhost:27017/test2");
}

const userschema = new mongoose.Schema({
    name: String,
    gender: String,
    contact: String,
    bi: String
})

const userModel = mongoose.model("User", userschema);

export async function sign(prev:unknown, form: FormData){
  try{
    await connectDB();
    const session = await mongoose.startSession();

    const user = {
      name: form.get("name") as string,
      gender: form.get("gender") as string,
      contact: form.get("contact") as string,
      bi: form.get("bi") as string
    }

    await session.withTransaction( async () =>{
      await userModel.create(
        [user],
        {session}
      );
    });
    
    await session.endSession();

    return {
        message: "Cadastro realizado com sucesso",
        status: true
    }
 }catch(err: unknown){
    const error = err as Error;

    return {
        message: error.cause?error.cause:"Erro ao cadastrar",
        statu: false
    }
 }
}