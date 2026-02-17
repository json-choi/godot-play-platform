# Godot Play Platform - 계획서

## 개요

Godot 게임을 공유하고 발견할 수 있는 웹 플랫폼 + 백엔드 API.

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| 웹 프론트엔드 | Next.js 15 + React 19 + Tailwind + shadcn/ui |
| 백엔드 API | Hono (Vercel Functions) |
| 스토리지 | Vercel Blob (PCK 파일) |
| DB | 없음 (MVP) → 나중에 PlanetScale/SQLite |
| 인증 | 없음 (MVP) → 나중에 Google OAuth |

---

## 핵심 기능

### MVP (Phase 1)

| 기능 | 설명 | 우선순위 |
|------|------|---------|
| 게임 업로드 | .pck 파일 + 메타데이터 업로드 | P0 |
| 게임 목록 | 전체 게임 목록 조회 | P0 |
| 게임 상세 | 스크린샷, 설명, 런처 실행 버튼 | P0 |
| 런처 딥링크 | `godot-launcher://play?id=xxx` | P0 |
| 썸네일 업로드 | 게임 대표 이미지 | P1 |

### Phase 2

| 기능 | 설명 |
|------|------|
| 검색 | 게임 이름, 태그 검색 |
| 카테고리 | 장르별 분류 |
| 인기 게임 | 다운로드 수 기반 정렬 |

### Phase 3

| 기능 | 설명 |
|------|------|
| 로그인 | Google OAuth |
| 내 게임 관리 | 업로드한 게임 수정/삭제 |
| 댓글/평점 | 사용자 피드백 |

---

## 디렉토리 구조

```
godot-play-platform/
├── apps/
│   └── web/
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx              # 홈 (인기 게임)
│       │   ├── games/
│       │   │   ├── page.tsx          # 게임 목록
│       │   │   └── [id]/
│       │   │       └── page.tsx      # 게임 상세
│       │   ├── upload/
│       │   │   └── page.tsx          # 업로드 폼
│       │   └── api/
│       │       └── [[...routes]]/
│       │           └── route.ts      # Hono API
│       ├── components/
│       │   ├── GameCard.tsx
│       │   ├── GameDetail.tsx
│       │   ├── UploadForm.tsx
│       │   └── LaunchButton.tsx
│       └── lib/
│           └── api.ts
│
├── packages/
│   └── shared/
│       ├── src/
│       │   ├── types.ts              # Game, User 타입
│       │   └── constants.ts          # 딥링크 스킴 등
│       └── package.json
│
├── package.json                      # Monorepo root
├── turbo.json
└── README.md
```

---

## API 설계

### 게임 목록

```
GET /api/games
Response: {
  games: Game[];
  total: number;
}
```

### 게임 상세

```
GET /api/games/:id
Response: Game
```

### 게임 업로드

```
POST /api/games
Body: FormData { name, description, pck, thumbnail }
Response: { id: string }
```

### PCK 다운로드

```
GET /api/games/:id/download
Response: Redirect to Vercel Blob URL
```

---

## 데이터 타입

```typescript
interface Game {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  pckUrl: string;
  pckSize: number;          // bytes
  screenshots: string[];
  tags: string[];
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
}
```

---

## game-builder 연동

1. game-builder에서 "플랫폼에 업로드" 버튼 추가
2. .pck export 후 플랫폼 API로 업로드
3. 업로드 완료되면 플랫폼 URL 반환

---

## 배포

- Vercel에 프로젝트 생성
- 환경 변수: `BLOB_READ_WRITE_TOKEN`

---

## 마일스톤

- [ ] 프로젝트 세팅 (monorepo, Next.js, Hono)
- [ ] 기본 UI 컴포넌트
- [ ] 게임 목록 페이지
- [ ] 게임 상세 페이지
- [ ] 업로드 기능
- [ ] Vercel Blob 연동
- [ ] 런처 딥링크 버튼
- [ ] 배포
