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
            S.divider(),
            // Other document types
            S.documentTypeListItem("seedling").title("Katalog Bibit"),
            S.documentTypeListItem("article").title("Artikel Panduan"),
            S.documentTypeListItem("processStep").title("Tahap Proses Kultur"),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});