import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";


let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe ("Send Forgot Mail", () => {

  beforeEach(() => {

    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
      );
  })

  it ("should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail")  //função spyOn vai ficar espiando a classe mailProvider e mapeando o sendMail
    await usersRepositoryInMemory.create({            //se o sendMail for executado o spyon consegue detectar
      driver_license: "456321", 
      email: "teste3@rentx.com.br",
      name: "teste3",
      password: "teste3",
    });

    await sendForgotPasswordMailUseCase.execute("teste3@rentx.com.br");

    expect (sendMail).toHaveBeenCalled();
  });

  it ("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("haagd@abdbd.hgad")
    ).rejects.toEqual(new AppError("User does not exists!"))
  });

  it ("shoul be able to create an users token", async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");
    usersRepositoryInMemory.create({
      driver_license: "545466",
      email: "gadgd@ghgh.gg",
      name: "Jhgadgf",
      password: "56454"
    });

    await sendForgotPasswordMailUseCase.execute("gadgd@ghgh.gg");

    expect(generateTokenMail).toHaveBeenCalled();
  });
});  