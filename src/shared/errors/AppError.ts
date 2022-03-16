export class AppError{
  public readonly message: string;

  public readonly statusCode: number;  //Permite passar o número do erro

  constructor (message:string,statusCode=400){ //Quando não vier nenhum status o erro será 400
    this.message=message;
    this.statusCode=statusCode;
  }
}