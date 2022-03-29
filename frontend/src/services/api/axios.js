import axios from "axios";

export function APICreateContact(data, token) {
  let formData = new FormData();
  formData.append("user", data.user);
  formData.append("first_name", data.first_name);
  formData.append("last_name", data.last_name);
  formData.append("birthdate", data.birthdate);
  formData.append("image", data.image);

  return formData;
}
