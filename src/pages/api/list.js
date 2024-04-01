import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data.json');

export default async function getArticle(req, res) {
  const jsonData = await fsPromises.readFile(dataFilePath);
  const objectData = JSON.parse(jsonData);
  res.status(200).json(objectData);
}
