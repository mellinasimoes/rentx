import fs from "fs";

export const deleteFile= async (filename: string)=>{
  try {
    await fs.promises.stat(filename);    
  } catch {
    return;
  }
  await fs.promises.unlink(filename);
};


//stat verifica se já existe arquivo avatar na url passada
//unlink remove o arquivo
//se não existir arquivo cai no catch, cai no return e sai da app
//se o arquivo já existir, remover o avatar antigo

