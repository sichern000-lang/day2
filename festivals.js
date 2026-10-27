// 2026년 하반기 제주 축제 데이터 (index.html, info.html 공용)
// 날짜는 웹 검색(뉴스·여행 블로그·축제 달력)으로 확인한 값이라 방문 전 공식 안내로 다시 확인하세요.
// - days: 연속되지 않는 날짜가 있는 행사일 때만 사용 (start/end는 첫날/마지막 날)
// - tentative: 올해 일정이 아직 확정되지 않은 행사 (D-day 계산에서 제외, 정보 페이지에만 표시)
// - url: 공식 행사 페이지 주소. 없으면 '축제 이름 + 2026' 검색 결과로 이동합니다.
const FESTIVALS = [
  { name: '구팔일 댕댕이 대잔치', start: '2026-07-04', end: '2026-07-05', place: '제주시 애월읍' },
  { name: '컬러풀산지 페스티벌', start: '2026-08-22', end: '2026-08-30', place: '제주시 원도심 탐라문화광장 일대',
    days: ['2026-08-22', '2026-08-23', '2026-08-29', '2026-08-30'] },
  { name: '제65회 탐라문화제', start: '2026-10-17', end: '2026-10-21', place: '제주시 시민복지타운광장 일대' },
  { name: '제주올레걷기축제', start: '2026-11-05', end: '2026-11-07', place: '조천만세동산', url: 'https://www.jejuolle.org' },
  { name: '대한민국 제주정원문화박람회', start: '2026-11-06', end: '2026-11-10', place: '서귀포 바람모루공원' },
  { name: '제주감귤박람회', start: '2026-11-19', end: '2026-11-23', place: '서귀포농업기술센터' },
  { name: '최남단방어축제', start: '2026-11-19', end: '2026-11-22', place: '모슬포항 일원' },
  { name: '카멜리아힐 동백축제', start: '2026-11-15', end: '2027-01-31', place: '서귀포시 안덕면 카멜리아힐',
    tentative: true, note: '올해 일정 미확정 · 예년 11월 중순~1월 말' }
];

function parseDay(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

const fmtDay = (str) => str.slice(5).replace('-', '.');

// 행사 페이지 주소: url이 있으면 그 주소로, 없으면 '축제 이름 + 2026' 검색 결과로 이동합니다.
const eventUrl = (f) =>
  f.url || 'https://search.naver.com/search.naver?query=' + encodeURIComponent(f.name + ' 2026');
