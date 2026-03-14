// Vercel 서버리스 — visitjeju API 프록시
// 환경변수: VISITJEJU_API_KEY
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const key = process.env.VISITJEJU_API_KEY;
  if (!key) return res.status(500).json({ error: 'NO_KEY' });

  const { category = '', page = 1, keyword = '' } = req.query;
  const url = new URL('https://api.visitjeju.net/vsjApi/contents/searchList');
  url.searchParams.set('apiKey', key);
  url.searchParams.set('locale', 'kr');
  url.searchParams.set('currentPage', String(page));
  if (category) url.searchParams.set('category', category);
  if (keyword?.trim()) url.searchParams.set('keyword', keyword.trim());

  try {
    const r = await fetch(url.toString());
    const data = await r.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
