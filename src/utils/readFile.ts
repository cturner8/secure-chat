export const readFileData = (file: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result !== "string") return reject();
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
  });
