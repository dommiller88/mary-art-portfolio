import { UserRound } from "lucide-react";
import type { StructureResolver } from "sanity/structure";

/**
 * Custom desk structure: Biography is a singleton (a document type with
 * exactly one document), so it gets its own list item instead of a
 * document list, and is excluded from the generic "everything else" list.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Biography")
        .icon(UserRound)
        .child(
          S.document().schemaType("biography").documentId("biography")
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !["biography"].includes(listItem.getId() ?? "")
      ),
    ]);
