-- CreateTable
CREATE TABLE "link" (
    "url" TEXT NOT NULL,
    "shortened" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "link_url_key" ON "link"("url");

-- CreateIndex
CREATE UNIQUE INDEX "link_shortened_key" ON "link"("shortened");
