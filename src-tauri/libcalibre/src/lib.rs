mod api;
pub mod client;
pub mod client_v2;
mod cover_image;
pub mod domain;
pub mod dtos;
mod entities;
pub mod mime_type;
mod models;
pub mod persistence;
mod schema;
pub mod util;

use diesel::SqliteConnection;
use std::sync::{Arc, Mutex};

pub use domain::book::aggregate::BookWithAuthorsAndFiles;
pub use domain::book::entity::Book;
pub use domain::book_file::entity::BookFile;
pub use entities::author::Author;

pub struct ClientV2 {
    connection: Arc<Mutex<SqliteConnection>>,
}
