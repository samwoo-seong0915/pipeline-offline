# clinic-preconsult-launch

현재 이 폴더의 **단일 focus**는 아래 하나다.

> **뷰티샵용 예약 전 리드 정리 도구**
> - 고객은 예약 전에 목표 / 예산 / 시간대 / 민감도 / 걱정을 먼저 정리한다.
> - 사업자는 요약 카드로 받아 응대 우선순위와 예약 적합도를 더 빨리 판단한다.

## 지금 봐야 할 파일
1. `14-beauty-wedge.md`
2. `09-YOUR-TODO.md`
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
cd clinic-preconsult-launch
python3 pilot_server.py
# http://127.0.0.1:8788
```

## 테스트 링크
- 랜딩: `http://127.0.0.1:8788/`
- 고객 흐름: `http://127.0.0.1:8788/intake.html?vertical=beauty&business=beauty-demo`
- 운영 대시보드: `http://127.0.0.1:8788/admin.html?vertical=beauty&business=beauty-demo`

## 무엇을 검증하나
- 샵 운영자가 이 문제를 실제 pain으로 느끼는가
- 고객이 문진을 실제로 끝까지 완료하는가
- 요약 카드가 응대 판단에 바로 도움이 되는가
- 카카오 문의로 자연스럽게 이어지는가
- 이후 파일럿/유료 대화로 넘어갈 수 있는가

## 정리 메모
- 이전의 의료/클리닉/듀얼트랙 탐색은 **현재 focus가 아님**.
- `00`~`13` 문서들은 과거 탐색 기록으로 남겨두되, 현재 의사결정 기준은 아니다.
- 지금은 **뷰티 한 방향만 검증**한다.
