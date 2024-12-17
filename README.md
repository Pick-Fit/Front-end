## 🙌 안녕하세요. Pick, Fit 프론트엔드입니다.

## 프로젝트 소개
**Pick, Fit (Pick 하세요! Fit 해드립니다! 당신의 Pick, Fit)**
** 버츄얼을 통한 편리한 스타일링과 구매 경험을 제공하는 서비스**

- 실제 트렌비에서 판매하고 있는 옷의 버츄얼이 가능합니다.
- 위시리스트에 갖고 싶은 옷을 등록, 실제 판매 링크로와의 연결로 쉽게 구매가 가능합니다.
- 현재 내가 입은 옷과 어울리는 옷도 추천해줍니다. 이 또한 실제 구매까지 손쉽게 연결됩니다.
  
## 프로젝트 구조
```js
pickfit 
├── public
│   ├── index.html
│   └── manifest.json
├── src
│   ├── components
│   │   ├── Header
│   │   │   ├── Header.js
│   │   │   ├── HeaderIcons.js
│   │   │   ├── HeaderLogo.js
│   │   │   └── HeaderWelcome.js
│   │   ├── LoadingScreen.js
│   │   ├── Pagination.js
│   │   └── Spinner.js
│   ├── contexts
│   │   ├── AuthContext.js
│   │   ├── SelectedItemContext.js
│   │   ├── TryOnContext.js
│   │   └── WishlistContext.js
│   ├── font
│   │   └── euljiro.ttf
│   ├── images
│   │   ├── Product_LeftArrow.png
│   │   ├── Product_RightArrow.png
│   │   ├── basket.png
│   │   ├── check.png
│   │   ├── check_white.png
│   │   ├── close.png
│   │   ├── google.png
│   │   ├── inspection.png
│   │   ├── leftArrow.png
│   │   ├── lock.png
│   │   ├── main_header_logo.png
│   │   ├── main_logo.png
│   │   ├── main_second_logo.png
│   │   ├── man.png
│   │   ├── myPage.png
│   │   ├── rightArrow.png
│   │   ├── tryMeOn.png
│   │   ├── wishlist2.png
│   │   ├── wishlist_black.png
│   │   ├── wishlist_rad.png
│   │   ├── wishlist_white.png
│   │   └── woman.png
│   ├── man
│   │   ├── 트렌비 남성 의류 데이터.json
│   ├── modal
│   │   ├── LoginModal.js
│   │   └── LogoutModal.js
│   ├── pages
│   │   ├── Mypage
│   │   │   ├── MaintenanceSection.js
│   │   │   ├── MyPage.js
│   │   │   ├── ProfileSection.js
│   │   │   ├── SectionContent.js
│   │   │   └── Sidebar.js
│   │   ├── VirtualTryOn
│   │   │   ├── ClothingItemsSection.js
│   │   │   ├── VirtualFittingApp.js
│   │   │   ├── VirtualTryOnSection .js
│   │   │   └── VirtualTryOnSection.js
│   │   ├── trymeon
│   │   │   ├── CategoryFilter.js
│   │   │   ├── Product.js
│   │   │   ├── RecommendationPopup.js
│   │   │   └── TryMeOn.js
│   │   ├── Home.js
│   │   ├── LoginPage.js
│   │   └── Wishlist.js
│   ├── styles
│   │   ├── TryOnPage
│   │   │   └── VirtualFittingApp.css
│   │   ├── trymeon
│   │   │   ├── CategoryFilter.css
│   │   │   ├── Product.css
│   │   │   ├── RecommendationPopup.css
│   │   │   └── TryMeOn.css
│   │   ├── LoadingScreen.css
│   │   ├── LoginModal.css
│   │   ├── LogoutModel.css
│   │   ├── MyPage.css
│   │   ├── Pagination.css
│   │   ├── Spinner.css
│   │   ├── TabNavigation.css
│   │   └── Wishlist.css
│   ├── woman
│   │   ├── 트렌비 여성 의류 데이터.json
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```
## 🛠 페이지별 기능
# 메인 페이지
- PickFit에 대한 전반적인 설명이 있는 페이지입니다.
- 로그인, Wishlist, Mypage, TrymeOn, Tryon 페이지로 이동 가능합니다.

# 로그인 페이지
- Google 소셜로그인이 가능한 페이지입니다.
- 로그인하면 메인페이지로 이동하며 로그인 됩니다.

# MyPage
- 구글 소셜로그인한 사용자의 이메일, 이름이 확인 가능합니다.
- 사용자의 닉네임, 연락처, 주소의 등록, 수정이 가능합니다.
- 유효성 검사로 올바른 값만 입력 가능합니다.

# TryMeOn
- Pick&Fit에서 제공하는 모든 옷을 조회합니다.
- 성별, 카테고리별 조회가 가능합니다.
- 옷 이미지 우측 상단의 하트 버튼으로 위시리스트에 추가, 삭제가 가능합니다.
- 옷 이미지 우측 하단의 Try On 버튼을 누르면 Try On 페이지로 이동합니다.
- 옷 이미지 클릭 시 4개의 코디를 추천해줍니다.
- 페이지네이션으로 한 페이지의 보이는 옷의 개수를 제한합니다.

# Wishlist
- TryMeOn에서 ♥를 눌러 추가한 장바구니 개념의 페이지입니다.

# TryOn
- TryMeOn 페이지에서 Try-On 버튼을 누른 옷의 목록을 조회합니다.
- 한번에 최대 2개의 옷이 보이도록 페이지네이션 했습니다.
- 화면 좌측의 모델의 이미지를 선택하고 옷의 이미지를 선택하면 버츄얼 된 이미지 확인이 가능합니다.



































