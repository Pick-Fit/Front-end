## 🙌 안녕하세요. Pick, Fit 프론트엔드입니다.

## 프로젝트 소개
**Pick, Fit (Pick 하세요! Fit 해드립니다! 당신의 Pick, Fit)**
** 버츄얼을 통한 편리한 스타일링과 구매 경험을 제공하는 서비스**

- 실제 트렌비에서 판매하고 있는 옷의 버츄얼이 가능합니다.
- 위시리스트에 갖고 싶은 옷을 등록, 실제 판매 링크로와의 연결로 손쉽운 구매가 가능합니다.
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
│   │   ├── category_processed_Blazer_Suit.json
│   │   ├── category_processed_Coat.json
│   │   ├── category_processed_Outerwear.json
│   │   ├── category_processed_Padding.json
│   │   ├── category_processed_Pants_denim.json
│   │   ├── category_processed_Sports_Outdoor.json
│   │   ├── category_processed_T-shirt_sweatshirt.json
│   │   ├── category_processed_jacket.json
│   │   └── category_processed_knitwear.json
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
│   │   ├── category_processed_Blouse_Shirt.json
│   │   ├── category_processed_One-Piece_Jump-Suit.json
│   │   ├── category_processed_Outerwear.json
│   │   ├── category_processed_Pants_denim.json
│   │   ├── category_processed_Skirt.json
│   │   ├── category_processed_Sports_Outdoor.json
│   │   ├── category_processed_T-shirt_sweatshirt.json
│   │   ├── category_processed_coat.json
│   │   └── category_processed_jacket.json
│   │   └── category_processed_knitwear.json
│   │   └── category_processed_padding.json
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
# 메인페이지
