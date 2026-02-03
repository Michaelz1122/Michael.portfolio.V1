-- CreateEnum
CREATE TYPE "PublishStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageVersion" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
    "blocks" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublishedPointer" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "pageVersionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublishedPointer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSectionVersion" (
    "id" TEXT NOT NULL,
    "siteSectionId" TEXT NOT NULL,
    "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
    "blocks" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSectionVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SitePublishedPointer" (
    "id" TEXT NOT NULL,
    "siteSectionId" TEXT NOT NULL,
    "siteSectionVersionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SitePublishedPointer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PublishedPointer_pageId_key" ON "PublishedPointer"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "PublishedPointer_pageVersionId_key" ON "PublishedPointer"("pageVersionId");

-- CreateIndex
CREATE UNIQUE INDEX "SiteSection_key_key" ON "SiteSection"("key");

-- CreateIndex
CREATE UNIQUE INDEX "SitePublishedPointer_siteSectionId_key" ON "SitePublishedPointer"("siteSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "SitePublishedPointer_siteSectionVersionId_key" ON "SitePublishedPointer"("siteSectionVersionId");

-- AddForeignKey
ALTER TABLE "PageVersion" ADD CONSTRAINT "PageVersion_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublishedPointer" ADD CONSTRAINT "PublishedPointer_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublishedPointer" ADD CONSTRAINT "PublishedPointer_pageVersionId_fkey" FOREIGN KEY ("pageVersionId") REFERENCES "PageVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteSectionVersion" ADD CONSTRAINT "SiteSectionVersion_siteSectionId_fkey" FOREIGN KEY ("siteSectionId") REFERENCES "SiteSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SitePublishedPointer" ADD CONSTRAINT "SitePublishedPointer_siteSectionId_fkey" FOREIGN KEY ("siteSectionId") REFERENCES "SiteSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SitePublishedPointer" ADD CONSTRAINT "SitePublishedPointer_siteSectionVersionId_fkey" FOREIGN KEY ("siteSectionVersionId") REFERENCES "SiteSectionVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
