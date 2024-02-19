         // This file was generated by [tauri-specta](https://github.com/oscartbeaumont/tauri-specta). Do not edit this file manually.

         export const commands = {
async calibreLoadBooksFromDb(libraryRoot: string) : Promise<LibraryBook[]> {
return await TAURI_INVOKE("plugin:tauri-specta|calibre_load_books_from_db", { libraryRoot });
},
async calibreListAllAuthors(libraryRoot: string) : Promise<LibraryAuthor[]> {
return await TAURI_INVOKE("plugin:tauri-specta|calibre_list_all_authors", { libraryRoot });
},
async calibreSendToDevice(libraryRoot: string, deviceMountDir: string, book: LibraryBook) : Promise<null> {
return await TAURI_INVOKE("plugin:tauri-specta|calibre_send_to_device", { libraryRoot, deviceMountDir, book });
},
/**
 * Lists all importable file types. Those are files that Citadel knows how
 * to import, and that libcalibre supports.
 */
async calibreListAllFiletypes() : Promise<([string, string])[]> {
return await TAURI_INVOKE("plugin:tauri-specta|calibre_list_all_filetypes");
},
async initClient(libraryPath: string) : Promise<CalibreClientConfig> {
return await TAURI_INVOKE("plugin:tauri-specta|init_client", { libraryPath });
},
async getImportableFileMetadata(file: ImportableFile) : Promise<{ file_type: ImportableBookType; title: string; author_names: string[] | null; identifier: string | null; publisher: string | null; language: string | null; tags: string[]; path: string; publication_date: string | null; file_contains_cover: boolean } | null> {
return await TAURI_INVOKE("plugin:tauri-specta|get_importable_file_metadata", { file });
},
async checkFileImportable(pathToFile: string) : Promise<{ path: string } | null> {
return await TAURI_INVOKE("plugin:tauri-specta|check_file_importable", { pathToFile });
},
async addBookToDbByMetadata(libraryRoot: string, md: ImportableBookMetadata) : Promise<null> {
return await TAURI_INVOKE("plugin:tauri-specta|add_book_to_db_by_metadata", { libraryRoot, md });
},
async updateBook(libraryRoot: string, bookId: string, updates: BookUpdate) : Promise<__Result__<number, null>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("plugin:tauri-specta|update_book", { libraryRoot, bookId, updates }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async isValidLibrary(libraryRoot: string) : Promise<boolean> {
return await TAURI_INVOKE("plugin:tauri-specta|is_valid_library", { libraryRoot });
},
async createLibrary(libraryRoot: string) : Promise<__Result__<null, string>> {
try {
    return { status: "ok", data: await TAURI_INVOKE("plugin:tauri-specta|create_library", { libraryRoot }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
}
}



/** user-defined types **/

export type BookFile = { Local: LocalFile } | { Remote: RemoteFile }
export type BookUpdate = { author_id_list: string[] | null; title: string | null; timestamp: string | null; publication_date: string | null }
export type CalibreClientConfig = { library_path: string }
/**
 * Represents metadata for pre-import books, which have a very loose structure.
 */
export type ImportableBookMetadata = { file_type: ImportableBookType; 
/**
 * The title of the book, if one is available, or the name of the file to import.
 */
title: string; 
/**
 * The list of authors of the book, if available. Some books may not be formatted correctly,
 * and will have no authors, or all author names will be one string separated by "," or ";".
 */
author_names: string[] | null; identifier: string | null; publisher: string | null; language: string | null; tags: string[]; 
/**
 * Path of the file to import.
 */
path: string; publication_date: string | null; 
/**
 * True if a cover image can be extracted from the file at `path`.
 */
file_contains_cover: boolean }
export type ImportableBookType = "Epub" | "Pdf" | "Mobi" | "Text"
export type ImportableFile = { path: string }
export type LibraryAuthor = { id: string; name: string; sortable_name: string }
export type LibraryBook = { id: string; uuid: string | null; title: string; author_list: LibraryAuthor[]; sortable_title: string | null; author_sort_lookup: { [key in string]: string } | null; file_list: BookFile[]; cover_image: LocalOrRemoteUrl | null }
export type LocalFile = { 
/**
 * The absolute path to the file, including extension.
 */
path: string; 
/**
 * The MIME type of the file. Common values are `application/pdf` and `application/epub+zip`.
 */
mime_type: string }
export type LocalOrRemote = "Local" | "Remote"
export type LocalOrRemoteUrl = { kind: LocalOrRemote; url: string; local_path: string | null }
export type RemoteFile = { url: string }

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

     