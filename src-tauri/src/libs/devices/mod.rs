mod external_drive;
mod calibre_ext_cache;

#[derive(Debug)]
pub struct DeviceBook {
  pub title: String,
  pub authors: Vec<String>,
  pub id: String,
  pub uuid: String,
}

pub trait Device {
  fn list_books(&self) -> Vec<DeviceBook>;
}

pub fn list_books_on_external_drive(path: String) -> Vec<DeviceBook> {
    let device = external_drive::ExternalDrive {
      path,
    };
    device.list_books()
}