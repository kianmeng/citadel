         // This file was generated by [tauri-specta](https://github.com/oscartbeaumont/tauri-specta). Do not edit this file manually.

         export const commands = {
async helloWorld(myName: string) : Promise<string> {
return await TAURI_INVOKE("plugin:tauri-specta|hello_world", { myName });
},
async loadBooksFromDb(libraryPath: string) : Promise<CalibreBook[]> {
return await TAURI_INVOKE("plugin:tauri-specta|load_books_from_db", { libraryPath });
},
async getImportableFileMetadata(file: ImportableFile) : Promise<ImportableBookMetadata> {
return await TAURI_INVOKE("plugin:tauri-specta|get_importable_file_metadata", { file });
},
async checkFileImportable(pathToFile: string) : Promise<ImportableFile> {
return await TAURI_INVOKE("plugin:tauri-specta|check_file_importable", { pathToFile });
},
async addBookToDbByMetadata(libraryPath: string, md: ImportableBookMetadata) : Promise<null> {
return await TAURI_INVOKE("plugin:tauri-specta|add_book_to_db_by_metadata", { libraryPath, md });
}
}



/** user-defined types **/

export type CalibreBook = { id: number; title: string; sortable_title: string; sortable_author_list: string; dir_rel_path: string; filename: string; has_cover: boolean; order_in_series: string; authors: string[] }
/**
 * Represents metadata for pre-import books, which have a very loose structure.
 */
export type ImportableBookMetadata = { file_type: ImportableBookType; 
/**
 * The title of the book, if one is available, or the name of the file to import.
 */
title: string; author: string | null; identifier: string | null; publisher: string | null; language: string | null; tags: string[]; 
/**
 * Path of the file to import.
 */
path: string; publication_date: string | null; 
/**
 * True if a cover image can be extracted from the file at `path`.
 */
file_contains_cover: boolean }
export type ImportableBookType = "EPUB" | "PDF" | "MOBI"
export type ImportableFile = { path: string }

/** tauri-specta globals **/

         import { invoke as TAURI_INVOKE } from "@tauri-apps/api";
import * as TAURI_API_EVENT from "@tauri-apps/api/event";
import { type WebviewWindowHandle as __WebviewWindowHandle__ } from "@tauri-apps/api/window";

type __EventObj__<T> = {
  listen: (
    cb: TAURI_API_EVENT.EventCallback<T>
  ) => ReturnType<typeof TAURI_API_EVENT.listen<T>>;
  once: (
    cb: TAURI_API_EVENT.EventCallback<T>
  ) => ReturnType<typeof TAURI_API_EVENT.once<T>>;
  emit: T extends null
    ? (payload?: T) => ReturnType<typeof TAURI_API_EVENT.emit>
    : (payload: T) => ReturnType<typeof TAURI_API_EVENT.emit>;
};

type __Result__<T, E> =
  | { status: "ok"; data: T }
  | { status: "error"; error: E };

function __makeEvents__<T extends Record<string, any>>(
  mappings: Record<keyof T, string>
) {
  return new Proxy(
    {} as unknown as {
      [K in keyof T]: __EventObj__<T[K]> & {
        (handle: __WebviewWindowHandle__): __EventObj__<T[K]>;
      };
    },
    {
      get: (_, event) => {
        const name = mappings[event as keyof T];

        return new Proxy((() => {}) as any, {
          apply: (_, __, [window]: [__WebviewWindowHandle__]) => ({
            listen: (arg: any) => window.listen(name, arg),
            once: (arg: any) => window.once(name, arg),
            emit: (arg: any) => window.emit(name, arg),
          }),
          get: (_, command: keyof __EventObj__<any>) => {
            switch (command) {
              case "listen":
                return (arg: any) => TAURI_API_EVENT.listen(name, arg);
              case "once":
                return (arg: any) => TAURI_API_EVENT.once(name, arg);
              case "emit":
                return (arg: any) => TAURI_API_EVENT.emit(name, arg);
            }
          },
        });
      },
    }
  );
}

     