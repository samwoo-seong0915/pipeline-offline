# clinic-preconsult-launch

이 폴더는 이제 **프리체크인 파일럿 런치팩**으로 확장되었습니다.

핵심 아이디어:
- 고객이 사업자 링크 앞단에서 먼저 기준을 정리한다.
- 사업자는 요약 카드와 최소 지표를 보고 상담 효율화를 검증한다.
- 현재는 **의원 피부과 트랙**과 **뷰티 사업자 트랙**을 비교 실험할 수 있다.

## 먼저 읽을 순서
1. `14-dual-track-scenarios.md`
2. `00-decision-memo.md`
3. `01-offer-onepager.md`
4. `10-sales-reference.md`
5. `09-YOUR-TODO.md`

## 지금 구현된 소프트웨어
- 랜딩: `site/index.html`
- 사전 체크인: `site/intake.html`
- 운영 대시보드: `site/admin.html`
- Python API/SQLite 서버: `pilot_server.py`

## 로컬 실행 방법
```bash
cd clinic-preconsult-launch
python3 pilot_server.py
# 기본 주소: http://127.0.0.1:8788
```

## 테스트용 링크
- 클리닉 데모: `http://127.0.0.1:8788/intake.html?vertical=clinic&business=clinic-demo`
- 뷰티 데모: `http://127.0.0.1:8788/intake.html?vertical=beauty&business=beauty-demo`
- 운영 대시보드: `http://127.0.0.1:8788/admin.html?vertical=clinic&business=clinic-demo`

## 현재 저장 방식
- 기본: `pilot.db` (SQLite)
- 서버 없이 정적 파일만 열었을 때: 브라우저 local fallback

## 이번 구현 범위의 목적
- pain이 실제로 있는지 비교하기
- 어느 트랙이 더 빨리 설명되고 도입되는지 보기
- 시작 수 / 완료율 / CTA 클릭을 최소 기준으로 보기
- willingness-to-pay는 여전히 파일럿 대화에서 검증하기
