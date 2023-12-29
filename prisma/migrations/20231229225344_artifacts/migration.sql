-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('Image', 'Text', 'WebLink');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('Public', 'Private');

-- CreateTable
CREATE TABLE "ArtifactTemplate" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "userId" UUID,
    "visibility" "Visibility" NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "ArtifactTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldTemplate" (
    "id" UUID NOT NULL,
    "order" INTEGER NOT NULL,
    "aiPrompt" TEXT,
    "type" "FieldType" NOT NULL,
    "description" TEXT,
    "placeholder" TEXT,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "artifactTemplateId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "FieldTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artifact" (
    "id" UUID NOT NULL,
    "artifactTemplateId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Artifact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Field" (
    "id" UUID NOT NULL,
    "order" INTEGER NOT NULL,
    "text" TEXT,
    "fieldTemplateId" UUID NOT NULL,
    "artifactId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fieldId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FieldTemplate_order_key" ON "FieldTemplate"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Field_order_key" ON "Field"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Image_fieldId_key" ON "Image"("fieldId");

-- AddForeignKey
ALTER TABLE "ArtifactTemplate" ADD CONSTRAINT "ArtifactTemplate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldTemplate" ADD CONSTRAINT "FieldTemplate_artifactTemplateId_fkey" FOREIGN KEY ("artifactTemplateId") REFERENCES "ArtifactTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artifact" ADD CONSTRAINT "Artifact_artifactTemplateId_fkey" FOREIGN KEY ("artifactTemplateId") REFERENCES "ArtifactTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artifact" ADD CONSTRAINT "Artifact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_fieldTemplateId_fkey" FOREIGN KEY ("fieldTemplateId") REFERENCES "FieldTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_artifactId_fkey" FOREIGN KEY ("artifactId") REFERENCES "Artifact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
