"use server"

import mongoose from "mongoose";

async function connectDB() {
  //mongoose.set("transactionAsyncLocalStorage", true);
  
  if (mongoose.connection.readyState >= 1) 
    return;

  await mongoose.connect(
    "mongodb://mongo:hello@localhost:27017,localhost:27018,localhost:27019/?replicaSet=rs0&authSource=admin"
  );
}

const userschema = new mongoose.Schema({
  name: String,
  gender: String,
  contact: String,
  bi: String
})

const userModel = mongoose.models.User || mongoose.model("User", userschema);

export async function sign(prev:unknown, form: FormData){
  await connectDB();
  const session = await mongoose.startSession();

  try{
    const user = {
      name: form.get("name") as string,
      gender: form.get("gender") as string,
      contact: form.get("contact") as string,
      bi: form.get("bi") as string
    }
    
    await session.withTransaction( async () => {
      await userModel.create([user], {session});
    });

    return {
      message: "cadastrado com sucesso!",
      status: true
    }

 }catch(err: unknown){
    const error = err as Error;

    console.log(error.message);
    return {
        message: error.cause?error.cause:"Erro ao cadastrar",
        status: false
    }
 }
}