## 🙌 안녕하세요. Pick, Fit 프론트엔드입니다.

## 프로젝트 소개
# **Pick, Fit (Pick 하세요! Fit 해드립니다! 당신의 Pick, Fit)**

**프로젝트 주제: 버츄얼을 통한 편리한 스타일링과 구매 경험을 제공하는 서비스**

## 프로젝트 구조
.
pickfit <br>
├── public<br>
│   ├── index.html<br>
│   └── manifest.json<br>
├── src<br>
│   ├── components<br>
│   │   ├── Header<br>
│   │   │   ├── Header.js<br>
│   │   │   ├── HeaderIcons.js<br>
│   │   │   ├── HeaderLogo.js<br>
│   │   │   └── HeaderWelcome.js<br>
│   │   ├── LoadingScreen.js<br>
│   │   ├── Pagination.js<br>
│   │   └── Spinner.js<br>
│   ├── contexts<br>
│   │   ├── AuthContext.js<br>
│   │   ├── SelectedItemContext.js<br>
│   │   ├── TryOnContext.js<br>
│   │   └── WishlistContext.js<br>
│   ├── font<br>
│   │   └── euljiro.ttf<br>
│   ├── images<br>
│   │   ├── Product_LeftArrow.png<br>
│   │   ├── Product_RightArrow.png<br>
│   │   ├── basket.png<br>
│   │   ├── check.png<br>
│   │   ├── check_white.png<br>
│   │   ├── close.png<br>
│   │   ├── google.png<br>
│   │   ├── inspection.png<br>
│   │   ├── leftArrow.png<br>
│   │   ├── lock.png<br>
│   │   ├── main_header_logo.png<br>
│   │   ├── main_logo.png<br>
│   │   ├── main_second_logo.png<br>
│   │   ├── man.png<br>
│   │   ├── myPage.png<br>
│   │   ├── rightArrow.png<br>
│   │   ├── tryMeOn.png<br>
│   │   ├── wishlist2.png<br>
│   │   ├── wishlist_black.png<br>
│   │   ├── wishlist_rad.png<br>
│   │   ├── wishlist_white.png<br>
│   │   └── woman.png<br>
│   ├── man<br>
│   │   ├── category_processed_Blazer_Suit.json<br>
│   │   ├── category_processed_Coat.json<br>
│   │   ├── category_processed_Outerwear.json<br>
│   │   ├── category_processed_Padding.json<br>
│   │   ├── category_processed_Pants_denim.json<br>
│   │   ├── category_processed_Sports_Outdoor.json<br>
│   │   ├── category_processed_T-shirt_sweatshirt.json<br>
│   │   ├── category_processed_jacket.json<br>
│   │   └── category_processed_knitwear.json<br>
│   ├── modal<br>
│   │   ├── LoginModal.js<br>
│   │   └── LogoutModal.js<br>
│   ├── pages<br>
│   │   ├── Mypage<br>
│   │   │   ├── MaintenanceSection.js<br>
│   │   │   ├── MyPage.js<br>
│   │   │   ├── ProfileSection.js<br>
│   │   │   ├── SectionContent.js<br>
│   │   │   └── Sidebar.js<br>
│   │   ├── VirtualTryOn<br>
│   │   │   ├── ClothingItemsSection.js<br>
│   │   │   ├── VirtualFittingApp.js<br>
│   │   │   ├── VirtualTryOnSection .js<br>
│   │   │   └── VirtualTryOnSection.js<br>
│   │   ├── trymeon<br>
│   │   │   ├── CategoryFilter.js<br>
│   │   │   ├── Product.js<br>
│   │   │   ├── RecommendationPopup.js<br>
│   │   │   └── TryMeOn.js<br>
│   │   ├── Home.js<br>
│   │   ├── LoginPage.js<br>
│   │   └── Wishlist.js<br>
│   ├── styles<br>
│   │   ├── TryOnPage<br>
│   │   │   └── VirtualFittingApp.css<br>
│   │   ├── trymeon<br>
│   │   │   ├── CategoryFilter.css<br>
│   │   │   ├── Product.css<br>
│   │   │   ├── RecommendationPopup.css<br>
│   │   │   └── TryMeOn.css<br>
│   │   ├── LoadingScreen.css<br>
│   │   ├── LoginModal.css<br>
│   │   ├── LogoutModel.css<br>
│   │   ├── MyPage.css<br>
│   │   ├── Pagination.css<br>
│   │   ├── Spinner.css<br>
│   │   ├── TabNavigation.css<br>
│   │   └── Wishlist.css<br>
│   ├── woman<br>
│   │   ├── category_processed_Blouse_Shirt.json<br>
│   │   ├── category_processed_One-Piece_Jump-Suit.json<br>
│   │   ├── category_processed_Outerwear.json<br>
│   │   ├── category_processed_Pants_denim.json<br>
│   │   ├── category_processed_Skirt.json<br>
│   │   ├── category_processed_Sports_Outdoor.json<br>
│   │   ├── category_processed_T-shirt_sweatshirt.json<br>
│   │   ├── category_processed_coat.json<br>
│   │   └── category_processed_jacket.json<br>
│   │   └── category_processed_knitwear.json<br>
│   │   └── category_processed_padding.json<br>
│   ├── App.css<br>
│   ├── App.js<br>
│   ├── App.test.js<br>
│   ├── index.css<br>
│   ├── index.js<br>
│   ├── reportWebVitals.js<br>
│   └── setupTests.js<br>
├── .gitignore<br>
├── package-lock.json<br>
├── package.json<br>
└── README.md
## 🛠 페이지 소개
- [메인 페이지](#Home.js) Home.js
- [로그인 페이지](LoginPage.js) LoginPage.js
- [위시리스트](Wishlist.js) Wishlist.js
-  
