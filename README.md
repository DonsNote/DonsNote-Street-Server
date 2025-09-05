# DonsNote-Street Server

DonsNote-Street 프로젝트의 백엔드 API 서버

## 🚀 기술 스택

- **Runtime**: Node.js
- **Language**: TypeScript  
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Authentication**: JWT + Apple Sign In

## 📦 설정

### 1. 환경 변수 설정
```bash
cp .env.example .env
```

Supabase 대시보드에서 데이터베이스 비밀번호를 확인하고 `.env` 파일을 수정하세요.

### 2. 의존성 설치
```bash
npm install
```

### 3. Prisma 클라이언트 생성
```bash
npx prisma generate
```

## 🏃‍♂️ 실행

### 개발 모드
```bash
npm run dev
```

### 프로덕션 빌드
```bash
npm run build
npm start
```

## 📊 데이터베이스

현재 Supabase를 사용하며 다음 테이블들이 있습니다:
- **User**: 사용자 정보
- **Artist**: 아티스트 프로필  
- **Busking**: 버스킹 공연 정보
- **Auth**: 인증 토큰 관리
- **Report**: 신고 시스템
- 관계 테이블들 (UserFollowArtist, UserBlockArtist 등)

⚠️ **보안 권고**: RLS (Row Level Security) 설정이 필요합니다. [Supabase RLS 가이드](https://supabase.com/docs/guides/database/database-linter?lint=0013_rls_disabled_in_public)를 참고하세요.

## 🛠️ API 엔드포인트

- `POST /auth/*` - 인증 관련
- `GET|POST|PUT|DELETE /users/*` - 사용자 관리  
- `GET|POST|PUT|DELETE /artists/*` - 아티스트 관리
- `GET|POST|PUT|DELETE /buskings/*` - 버스킹 공연 관리
- `POST /reports/*` - 신고 기능