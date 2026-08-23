import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  name: "turia-farm",
  title: "Turia Farm CMS",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  basePath: "/studio",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Konten")
          .items([
            // Singleton Home Page
            S.listItem()
              .title("Beranda (Home Page)")
              .id("homePage")
              .child(
                S.document()
                  .schemaType("homePage")
                  .documentId("homePage")
                  .title("Beranda")
              ),
            // Singleton Catalog Page
            S.listItem()
              .title("Katalog Bibit (Halaman)")
              .id("catalogPage")
              .child(
                S.document()
                  .schemaType("catalogPage")
                  .documentId("catalogPage")
                  .title("Katalog Bibit (Halaman)")
              ),
            // Singleton Site Config
            S.listItem()
              .title("Konfigurasi Situs (Global)")
              .id("siteConfig")
              .child(
                S.document()
                  .schemaType("siteConfig")
                  .documentId("siteConfig")
                  .title("Konfigurasi Situs")
              ),
            S.divider(),
            // Other document types
            S.documentTypeListItem("seedling").title("Daftar Varietas Bibit"),
            S.documentTypeListItem("article").title("Artikel Panduan"),
            S.documentTypeListItem("processStep").title("Tahap Proses Kultur"),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});