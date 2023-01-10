# 개발내역 & 주요해결과제
- 22.01.09 ~ 22.01.10 :: bugfix, 공유하기, db CRUD
  - 공유하기기능 추가
    - desktop 에서는 clipboard 복사
    - native 에서는 바로 공유하기
  - 공유이후
    - 그룹을 생성한 유저만 expense list를 수정 추가 가능
  - firebase doc 삭제이후 정산내역(collection)이 남아있던 문제해결
  - edge case bugfix
  - Component 분리
    - logic / unit test

- 22.01.06 ~ 22.01.09 :: bugfix, ui update v1.1.0
  - add each page loading ui 
  - add alert toastify module
  - update login, logout ui/ux x

- 22.01.02 ~ 22.01.05 :: firebase 연동한 dutchpay v1.0.0 배포
  - vercel + firebase
  - fireAuth logic 
  - firebase module : admin sdk vs client
  - uml diagram
  - model / contoller / service
  - requset body sanitize : zod
  - too many api request : optimistic update vs mutate revalidate later

- 22.01.02 ~ 22.01.05 :: firebase 연동한 dutchpay v1.0.0 배포
  - vercel + firebase
  - fireAuth logic 
  - firebase module : admin sdk vs client
  - uml diagram
  - model / contoller / service
  - requset body sanitize : zod
  - too many api request : optimistic update vs mutate revalidate later

- 22.12.20 ~ 12.27 :: 로컬스토리지 기반한 dutchpay beta 배포
  - dutchpay calulate logic : two pointer algorithm
  - ui frame work - mantine UI vs chakra UI 
  - ux member multi value
  - localstorage es6 map, set parse
  - aws amplify
  


## 구현내용
- [x] : 정산을 위한 그룹을 생성 / 삭제할 수 있다.  
- [x] : 생성된 그룹에 정산정보를 입력 / 삭제할 수 있다.
- [x] : 정산정보를 차트로 보여준다.
- [x] : 정산정보를 이미지로 내려받을 수 있다.
- [x] : 구글계정을 이용하여 유저가 어플리케이션에서 사용한 정보를 저장 / 수정 / 삭제 할 수 있다.
- [x] : 데이터 베이스를 외부에서 관리할 수 있다.

## 향후고려사항
- [ ] : social media 공유 고려하기
- [ ] : 익명사용자가 local로 서비스를 이용 가능하게
- [ ] : excel import / export
- [ ] : 기존사용자의 데이터 migration
  
## Service Sequence Diagram
![sequence diagram v1.0](https://user-images.githubusercontent.com/77092632/210679849-3fa075c3-a2b9-4706-bedd-ef7f83c2bb19.png)
0. Auth
1. 그룹생성
2. 정산정보

## UI
- 메인페이지

![/](https://user-images.githubusercontent.com/77092632/209542153-ad935c7f-a995-4f73-942d-59c44066c326.png)

- 멀티그룹생성 페이지

![/group](https://user-images.githubusercontent.com/77092632/209542196-b05c802a-39e4-4ed8-8580-171ac276286f.png)

- 멀티입력구현

![/group/create](https://user-images.githubusercontent.com/77092632/209544288-03b43f36-be97-4e47-b728-b9e4c0e76ebf.gif)


## User Feedback
- ~~다른 device로 접속했더니 정산정보가 없다.~~
- 기존의 정보를 하나하나 입력 다 해야하나
- 자주만나는 멤버를 항상 다 입력해야 하나?
- 기존 그룹은 놔두고 똑같은 그룹을 복사해서 생성하고 싶다.
- 소통채널이 카카오톡인게 말이되냐
- 기존의 로컬을 쓰고싶다. 로그인을 강제하지 말라
- 카카오톡으로 바로 공유 안되냐?
- 정산내역도 이미지로 공유하고 싶다
