use std::collections::HashMap;

use serde::{Serialize, Deserialize, Deserializer, de};
use serde_json::Value;

use super::DeviceBook;

pub type MetadataRoot = Vec<Item>;

#[derive(Debug, Serialize, Clone)]
pub struct ThumbnailDetail {
    width: i32,
    height: i32,
    data: String, // base64 encoded image
}

impl<'de> Deserialize<'de> for ThumbnailDetail {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        let arr = Vec::<Value>::deserialize(deserializer)?;
        let width = arr.get(0).ok_or_else(|| de::Error::custom("width missing"))?.as_i64().unwrap() as i32;
        let height = arr.get(1).ok_or_else(|| de::Error::custom("height missing"))?.as_i64().unwrap() as i32;
        let data = arr.get(2).ok_or_else(|| de::Error::custom("data missing"))?.as_str().unwrap().to_string();
        Ok(ThumbnailDetail { width, height, data })
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Item {
    pub thumbnail: Option<ThumbnailDetail>,
    pub publication_type: Option<String>,
    pub application_id: i32,
    pub db_id: Option<i32>,
    pub series_index: Option<SeriesIndex>,
    pub pubdate: String,
    pub rights: Option<String>,
    pub book_producer: Option<String>,
    #[serde(skip_deserializing)]
    pub user_metadata: UserMetadata, // As type is unknown, you may need a custom implementation
    pub title: String,
    pub title_sort: Option<String>,
    pub timestamp: String,
    pub lpath: String,
    pub last_modified: String,
    pub tags: Vec<String>,
    pub size: i32,
    pub cover: Option<String>,
    pub link_maps: HashMap<String, serde_json::Value>,
    pub mime: Option<String>,
    pub uuid: String,
    pub languages: Vec<String>,
    pub identifiers: HashMap<String, String>,
    pub rating: Option<i32>,
    pub user_categories: HashMap<String, serde_json::Value>,
    pub author_sort_map: HashMap<String, String>,
    pub authors: Vec<String>,
    pub author_sort: String,
    pub series: Option<String>,
    pub publisher: Option<String>,
    pub comments: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
pub enum SeriesIndex {
    Integer(i32),
    Float(f64),
}

// Placeholder struct as actual type is unknown
#[derive(Debug, Default, Serialize, Deserialize)]
pub struct UserMetadata;

pub fn device_book_from_item(item: &Item) -> DeviceBook {
    DeviceBook {
        title: item.title.clone(),
        authors: item.authors.clone(),
        id: item.application_id.clone().to_string(),
        uuid: item.uuid.clone(),
    }
}