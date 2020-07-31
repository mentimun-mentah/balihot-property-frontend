import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

export const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export const uploadButton = loading => (
  <div>
    {loading ? <LoadingOutlined /> : <PlusOutlined />}
    <div>Upload{loading ? <>ing</> : null}</div>
  </div>
);
