-- CreateEnum
CREATE TYPE "Category" AS ENUM ('chargers', 'cables', 'audio', 'protection', 'accessories', 'adapters', 'gaming', 'mobile', 'sim', 'powerbanks');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discountPrice" DOUBLE PRECISION,
    "images" TEXT[],
    "category" "Category" NOT NULL,
    "subcategory" TEXT NOT NULL,
    "compatibility" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "rating" DOUBLE PRECISION NOT NULL,
    "reviews" INTEGER NOT NULL,
    "inStock" BOOLEAN NOT NULL,
    "isNew" BOOLEAN DEFAULT false,
    "isFeatured" BOOLEAN DEFAULT false,
    "isLatest" BOOLEAN DEFAULT false,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryInfo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" "Category" NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "CategoryInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoryInfo_slug_key" ON "CategoryInfo"("slug");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
