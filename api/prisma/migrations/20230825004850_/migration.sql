-- AddForeignKey
ALTER TABLE "CarMaintenance" ADD CONSTRAINT "CarMaintenance_fk_car_fkey" FOREIGN KEY ("fk_car") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
