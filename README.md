# 멤버십 프로젝트 -  아마존 저장소

## 3주차 amazon-carousel
### 코드
---
- MVC패턴을 적용하여 구현해본다
- 재사용 가능한 코드를 구현해본다

### 프론트 & 백엔드 개발환경 구축
---
- Express 서버 구축
    - View Engine : Pug

- Webpack
    - babel-loader
    - sass-loader
    
### 미니 캐로셀
---
- 왼쪽 화살표 버튼
    - 화살표는 아이콘 사이트에서 가져온다
    - 카드는 왼쪽으로 슬라이딩 해야 한다
- 오른쪽 화살표 버튼
    - 화살표는 아이콘 사이트에서 가져온다
    - 카드는 오른쪽으로 슬라이딩 해야 한다
- 카드
    - 슬라이딩 부분
        - 카드는 정지되었을 때 한번에 하나의 카드만 보여주어야 한다
        - 카드는 매 3초마다 오른쪽 화살표 버튼을 눌렀을 때와 동일한 이벤트를 발생시켜야 한다
            - 다시 말해, 오른쪽으로 돌아가야 한다
        - 카드는 클릭할 수 있고, 클릭한다면 해당 컨텐츠의 사이트로 이동해야 한다
        - 화살표를 5초동안 클릭하지 않으면 다시 재 슬라이딩 된다
    - 텍스트 부분
        - 제목과 내용이 적당히 구분되는 크기와 사이 간격을 두어 존재해야 한다
        - 하단에 다른 페이지로 이동할 링크가 걸려있고 bold 텍스트가 존재해야 한다
            - hover시 underline이 생긴다
     
### 메인 카드형 캐로셀
#### 구현
- 상단 카드 UI
    - 직사각형 형태의 5개 카드가 일정한 간격을 두고 좌우로 배치
    - 각 카드 중앙에 이미지가 있고, 이미지 아래에 카테고리 제목이 위치
    - 각 카드는 클릭할 수 있고, 클릭하면 카드가 확대
    - 직사각형 형태의 카드 영역 어떤 곳(이미지, 카테고리 제목 포함)을 클릭해도 확대
    - 카드 클릭 후 확대된 카드 외 나머지 카드들은 다시 원래의 크기로 돌아감
    - 첫 번째 카드가 확대된 모습이 디폴트 상태
        - 카드가 확대되면 이미지도 함께 확대
        - 이미지 아래에 있는 카테고리 제목은 확대되지 않음
    - 카드가 확대되면 해당 카테고리가 가지고 있는 컨텐츠의 개수만큼 원형 모양의 버튼이 나타남
        - 카테고리의 컨텐츠 개수는 카드마다 다름
        - 원형 모양의 버튼은 클릭할 수 있음
        - 클릭한 버튼은 밝은색, 나머지 버튼은 보다 옅은 색으로 구분
    - 카드를 클릭해서 카드가 확대되면 옆에 있는 카드와 약간 겹쳐짐
        - 확대된 카드와 겹쳐진 카드 사이에 그림자 표시
        - 다른 카드를 클릭하면 다른 카드가 확대
            - 기존에 확대됐던 카드는 원래 크기로 돌아감
            - 기존에 확대된 카드와 겹쳐진 카드 사이에 있던 그림자도 사라짐

- 하단 캐로셀 UI
    - 양방향 무한으로 돌아가는 캐로셀
        - 돌아갈 때 마다 미니 캐로셀과 같은 애니메이션을 발생시킴
        - 슬라이딩
    - 왼쪽에는 컨텐츠와 관련된 이미지
    - 오른쪽 상단에는 카테고리, 컨텐츠는 미니 캐로셀과 마찬가지로 구성
        - 카테고리 색은 상단의 카드 색과 동일하게 구현
        - 하단의 링크는 캐로셀 컨텐츠마다 다름
            - 글꼴의 굵기는 bold이며 링크는 hover시 밑줄이 생김
            
- 기능
    - 카드나 카드 아래에 있는 원형 모양의 버튼을 누르면 가까운 방향으로 해당 캐로셀을 순서대로 빠르게 슬라이딩
    - 1번 캐로셀에서 왼쪽 화살표 버튼을 클릭
        - 마지막 순서의 캐로셀로 이동
        - 상단 카드는 1번 캐로셀에 해당하는 카테고리 카드가 축소되며 원형 버튼이 사라짐
        - 마지막 캐로셀로 이동되는데 왼쪽으로 한칸 이동되며 마지막 캐로셀에 해당하는 카테고리의 카드가 확대되고 원형 버튼이 나타남
        - 마지막 원형 버튼만 밝은 색으로 활성화

## 4주차
### 기능 및 구현 요구사항

#### 관리자 페이지 기능 요구사항

---

- 관리자 로그인 기능 (FE + BE)
    - 로그인 페이지 + 로그인 BE 로직
- 관리자 권한이 있는 사용자에게만 관리자 페이지에 접근이 가능하도록 해야 함
    - 로그인 후 관리자라면 관리자 페이지로 이동할 수 있게끔 링크를 걸어 두는 방식으로 구현 해봐도 될듯
- 전체 사용자 조회 기능
- 특정 사용자를 관리자로 지정 / 해지할 수 있는 기능
- ITEM 정보 업로드 기능
    - 업로드에는 메인 이미지를 업로드할 수 있어야 함
- 관리자 페이지의 FE는 라이브러리 사용 자유

#### 일반 페이지용 API 요구사항(BE)

---

- 전체 ITEM 목록을 가져오는 API
- 개별 ITEM의 주요 정보를 가져오는 API
- (옵션) 개별 ITEM의 세부 정보를 가져오는 API
- (옵션) 캐로셀의 ITEM 클릭 시 세부 정보 페이지를 보여주도록 구현

### 기술 요구사항

#### 웹 프레임워크

---

- Express 사용
- 관리자 페이지 로그인에는 `passport-local` 사용

        $ npm install passport passport-local

    [passport-local](http://www.passportjs.org/packages/passport-local/)

- 관리자 전용 로그인, 관리자 전용 페이지를 만들어야 함
- admin인지 확인하는 middleware 함수를 구현해야 함

#### 데이터베이스

---

- `mysql2` npm package 사용하여 구현

        $ npm install --save mysql2

    [mysql2](https://www.npmjs.com/package/mysql2)

- 초기 데이터 입력 스크립트를 구현하고 개발 환경에서 자동으로 실행하도록 함

    처음 login페이지에 접속할 때 또는 서버 처음 실행할 때 table 생성 및 데이터 입력을 해주어야 함

#### 정적 파일 관리

---

- 초기의 정적 파일은 `public` 폴더에 위치
- 관리자가 업로드 하는 이미지는 `static_root` 폴더에 위치

#### 응답

---

- Template Engine으로는 필요하다면 `pug`를 사용함
- API는 `json`으로 응답

#### 배포

---

- nCloud의 서버에 배포
- Github 저장소의 `README.md` 등에 완성된 배포 URL 기술