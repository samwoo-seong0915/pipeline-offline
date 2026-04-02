# beauty-precheckin

이 폴더는 **뷰티샵용 예약 전 리드 정리 도구**만 다룹니다.

한 줄 정의:

> 예약 전에 고객 기대치와 적합도를 먼저 정리해서,
> 운영자가 더 빨리 응대 판단을 하게 만든다.

## 지금 봐야 할 파일
1. `01-wedge.md`
2. `02-next-actions.md`
3. `site/index.html`
4. `site/intake.html`
5. `site/admin.html`
6. `pilot_server.py`

## 현재 소프트웨어
- 랜딩: `site/index.html`
- 고객 사전 체크인: `site/intake.html`
- 운영 대시보드: `site/admin.html`
- 저장/API 서버: `pilot_server.py`

## 로컬 실행
```bash
cd beauty-precheckin
python3 pilot_server.py
# http://127.0.0.1:8788
```

## 테스트 링크
- 랜딩: `http://127.0.0.1:8788/`
- 고객 흐름: `http://127.0.0.1:8788/intake.html?vertical=beauty&business=beauty-demo`
- 운영 대시보드: `http://127.0.0.1:8788/admin.html?vertical=beauty&business=beauty-demo`

## 지금 검증하는 것
- 운영자가 이 문제를 진짜 pain으로 느끼는가
- 고객이 문진을 끝까지 완료하는가
- 요약 카드가 실제 응대 판단에 도움이 되는가
- 카카오 문의로 자연스럽게 이어지는가
