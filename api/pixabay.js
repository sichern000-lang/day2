// Vercel 서버리스 함수: 브라우저 대신 Pixabay를 호출해서 API 키를 숨깁니다.
// 키는 Vercel 환경변수 PIXABAY_API_KEY 에서 읽습니다.
module.exports = async (req, res) => {
  const key = process.env.PIXABAY_API_KEY;
  if (!key) {
    res.status(500).json({ error: '서버에 PIXABAY_API_KEY 환경변수가 없습니다.' });
    return;
  }

  const q = String(req.query.q || '').trim().slice(0, 100);
  if (!q) {
    res.status(400).json({ error: '검색어를 입력하세요.' });
    return;
  }
  const page = Math.min(50, Math.max(1, parseInt(req.query.page, 10) || 1));

  const url = 'https://pixabay.com/api/?' + new URLSearchParams({
    key, q, page, per_page: 10, image_type: 'photo', safesearch: 'true'
  });

  try {
    const r = await fetch(url);
    if (!r.ok) {
      res.status(r.status).json({ error: 'Pixabay 요청 실패 (' + r.status + ')' });
      return;
    }
    const data = await r.json();
    res.status(200).json({
      totalHits: data.totalHits,
      hits: data.hits.map((h) => ({
        id: h.id,
        tags: h.tags,
        url: h.webformatURL,
        pageURL: h.pageURL,
        user: h.user
      }))
    });
  } catch (e) {
    res.status(502).json({ error: 'Pixabay에 연결하지 못했습니다.' });
  }
};
