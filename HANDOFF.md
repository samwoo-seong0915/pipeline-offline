# Pipeline Offline — Beauty Precheckin

> 이 저장소의 현재 active path는 **뷰티샵용 예약 전 리드 정리 도구** 하나입니다.
> 예전 스마트스토어/클리닉 탐색 산출물은 `archive/clinic-preconsult-launch-legacy/` 아래에 보관합니다.

## SSH 접속
```bash
ssh -o IdentitiesOnly=yes -i ~/.ssh/id_ed25519 mac@10.50.1.121
cd /Users/mac/projects/pipeline-offline
```

## 현재 한 줄 정의

> 예약 전에 고객 기대치와 적합도를 정리해서,
> 뷰티샵 운영자의 응대 시간과 예약 mismatch를 줄이는 도구

즉 지금 푸는 문제는:
- “무슨 시술이 맞아요?”가 아니라
- **“이 고객을 지금 어떻게 응대해야 하나?”**

## 현재 active workspace
- `/Users/mac/projects/pipeline-offline/beauty-precheckin/`

중요 파일:
- `beauty-precheckin/README.md`
- `beauty-precheckin/01-wedge.md`
- `beauty-precheckin/02-next-actions.md`
- `beauty-precheckin/site/index.html`
- `beauty-precheckin/site/intake.html`
- `beauty-precheckin/site/admin.html`
- `beauty-precheckin/pilot_server.py`

## 고객 입력
- 원하는 부위 또는 목표
- 예산 범위
- 가능한 시간대
- 민감도 / 걱정
- 첫 방문인지 여부

## 사업자 출력
- 첫 응대 포인트
- 예약 적합도 힌트
- 후속 메시지용 요약 카드
- 시작 수 / 완료율 / CTA 클릭

## 지금 검증해야 하는 것
1. 샵 운영자가 이 문제를 실제 pain으로 느끼는가
2. 고객이 문진을 끝까지 완료하는가
3. 요약 카드가 응대 판단에 바로 도움이 되는가
4. 카카오 문의로 자연스럽게 이어지는가
5. 이후 파일럿/유료 대화로 넘어갈 수 있는가

## 로컬 실행
```bash
cd /Users/mac/projects/pipeline-offline/beauty-precheckin
python3 pilot_server.py
# http://127.0.0.1:8788
```

## 현재 원칙
- 병원/클리닉 쪽은 지금 active path가 아님
- 시장 비교보다 **빠른 pain / WTP 검증**이 우선
- active 문서와 active 코드에는 beauty wedge 외 내용을 섞지 않음
