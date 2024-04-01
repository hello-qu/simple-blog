import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data.json');

export default async function getArticle(req, res) {

  const jsonData = await fsPromises.readFile(dataFilePath);
  const objectData = JSON.parse(jsonData);
  const reqBody = JSON.parse(req.body)
  const article = objectData.find(item => item.id == reqBody.id)
  res.status(200).json(article);
}
