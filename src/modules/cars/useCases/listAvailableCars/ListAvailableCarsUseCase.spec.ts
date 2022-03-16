import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsAvailableUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe ("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsAvailableUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it ("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car1",
      "description": "Car description",
      "daily_rate": 110.00,
      "license_plate": "DEF-1234",
      "fine_amount": 40,
      "brand": "Car_brand",
      "category_id":"category_id"
    });

    const cars = await listCarsAvailableUseCase.execute({});
  
    expect(cars).toEqual([car])
  });

  it ("should be able to list all available cars by brand", async () =>{
    const car = await carsRepositoryInMemory.create({
      "name": "Car2",
      "description": "Car description",
      "daily_rate": 110.00,
      "license_plate": "DEF-1234",
      "fine_amount": 40,
      "brand": "Car_brand_test",
      "category_id":"category_id"
    });

    const cars = await listCarsAvailableUseCase.execute({
      brand: "Car_brand_test",
    });

    expect(cars).toEqual([car])
  });

  it ("should be able to list all available cars by name", async () =>{
    const car = await carsRepositoryInMemory.create({
      "name": "Car3",
      "description": "Car description",
      "daily_rate": 110.00,
      "license_plate": "DEF-1235",
      "fine_amount": 40,
      "brand": "Car_brand_test",
      "category_id":"category_id"
    });

    const cars = await listCarsAvailableUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car])
  });

  it ("should be able to list all available cars by category", async () =>{
    const car = await carsRepositoryInMemory.create({
      "name": "Car3",
      "description": "Car description",
      "daily_rate": 110.00,
      "license_plate": "DEF-1236",
      "fine_amount": 40,
      "brand": "Car_brand_test",
      "category_id":"12345"
    });

    const cars = await listCarsAvailableUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car])
  });
});
