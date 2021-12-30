import { MigrationInterface, QueryRunner } from 'typeorm'

export class initialDatabase1640743520207 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `-- CreateTable
        CREATE TABLE "freight" (
            "organization_id" SERIAL NOT NULL,
            "package_id" INTEGER NOT NULL,
            "shipping_method" TEXT NOT NULL,
            "quantity" INTEGER NOT NULL,
            "origin_city" TEXT NOT NULL,
            "destination_city" TEXT NOT NULL,
            "is_express" BOOLEAN NOT NULL DEFAULT false,
            "have_insurance" BOOLEAN NOT NULL DEFAULT false,
            "total_cubage_weigth" INTEGER NOT NULL,
            "width" INTEGER NOT NULL,
            "weight" INTEGER NOT NULL,
            "length" INTEGER NOT NULL,
            "height" INTEGER NOT NULL,
            "risk" TEXT NOT NULL,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP(3) NOT NULL,

            CONSTRAINT "freight_pkey" PRIMARY KEY ("organization_id")
        );`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "freight" DROP CONSTRAINT "freight_pkey"`
    )
    await queryRunner.query(`DROP TABLE "freight"`)
  }
}
