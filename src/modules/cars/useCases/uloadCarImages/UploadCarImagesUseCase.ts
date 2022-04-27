import { injectable, inject } from "tsyringe";
import { ICarsImagesRepository } from "@modules/cars/repositories/in-memory/ICarsImagesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IstorageProvider";


interface IRequest{
  car_id:string; 
  images_name:string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ car_id, images_name}: IRequest): Promise<void> {

    console.log("images_name: ", images_name);

    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id,image);
      await this.storageProvider.save(image, "cars");
    });
  }
}

export { UploadCarImagesUseCase }