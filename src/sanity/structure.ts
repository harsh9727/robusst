import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Robusst content")
    .items([
      S.listItem()
        .title("Connection tests")
        .schemaType("migrationConnectionTest")
        .child(
          S.documentTypeList("migrationConnectionTest").title(
            "Connection tests",
          ),
        ),
    ]);
