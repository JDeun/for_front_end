# 이 레파지토리(Repository)는 제가 프론트앤드 공부 및 추후 업무 시 템플릿으로 쓰면 도움이 될까 하여 만들고 있는 것입니다.
### 아직 뉴비이기에 실력이 다소 낮을 수 있습니다. 지속적으로 개선할 예정입니다.
### 또한 우선 만들고 업로드만 하다보니 정리가 다소 안되어있습니다. 이 또한 추후 개선할 예정입니다.

## HTML 요소

| **요소**         | **설명**                                             | **사용법**                                          | **예시**                                    |
|------------------|------------------------------------------------------|-----------------------------------------------------|---------------------------------------------|
| `<a>`            | 하이퍼링크를 생성합니다.                             | `<a href="URL">링크 텍스트</a>`                    | `<a href="https://example.com">Example</a>` |
| `<div>`          | 블록 레벨 컨테이너를 생성합니다.                    | `<div>내용</div>`                                   | `<div class="container">Content</div>`     |
| `<img>`          | 이미지를 삽입합니다.                                | `<img src="URL" alt="설명" width="값" height="값">`  | `<img src="image.jpg" alt="Example Image">` |
| `<p>`            | 단락을 생성합니다.                                  | `<p>단락 내용</p>`                                  | `<p>This is a paragraph.</p>`              |
| `<span>`         | 인라인 컨테이너를 생성합니다.                        | `<span>내용</span>`                                | `<span class="highlight">Highlighted</span>`|
| `<h1> - <h6>`    | 제목을 정의합니다.                                 | `<h1>제목</h1>`, `<h2>제목</h2>`, ... , `<h6>제목</h6>` | `<h1>Main Title</h1>`                      |
| `<table>`        | 표를 생성합니다.                                    | `<table><tr><td>셀</td></tr></table>`               | `<table><tr><td>Row 1, Cell 1</td></tr></table>` |
| `<form>`         | 폼을 생성합니다.                                    | `<form action="URL" method="GET/POST">폼 내용</form>` | `<form action="/submit" method="POST"><input type="text"></form>` |

## CSS 속성

| **속성**          | **설명**                                           | **설정값**                                              | **설정값 설명**                                                                                       | **사용법**                                           | **예시**                                            |
|-------------------|-----------------------------------------------------|---------------------------------------------------------|-------------------------------------------------------------------------------------------------------|------------------------------------------------------|-----------------------------------------------------|
| `align-items`     | Flexbox에서 교차 축 방향의 아이템 정렬을 설정.      | `flex-start`, `center`, `flex-end`, `baseline`, `stretch` | `flex-start`: 시작 위치에 정렬<br> `center`: 중앙 정렬<br> `flex-end`: 끝 위치에 정렬<br> `baseline`: 텍스트의 기준선에 정렬<br> `stretch`: 아이템을 늘려서 정렬 | `selector { display: flex; align-items: value; }`   | `div { display: flex; align-items: center; }`      |
| `background`      | 요소의 배경을 설정.                              | `color`, `url('image.jpg')`, `linear-gradient(color1, color2)`, `radial-gradient(color1, color2)` | `color`: 단색 배경<br> `url('image.jpg')`: 이미지 배경<br> `linear-gradient()`: 선형 그라디언트 배경<br> `radial-gradient()`: 원형 그라디언트 배경 | `selector { background: value; }`                   | `div { background: #f0f0f0; }` <br> `div { background: url('background.jpg'); }` |
| `border`          | 요소의 테두리를 설정.                            | `width`, `style`, `color` (예: `1px solid black`)       | `width`: 테두리 두께 (예: `1px`, `2px`)<br> `style`: 테두리 스타일 (예: `solid`, `dashed`, `dotted`)<br> `color`: 테두리 색상 (예: `black`, `#ff0000`) | `selector { border: width style color; }`            | `div { border: 1px solid black; }`                |
| `box-shadow`      | 요소에 그림자를 추가.                             | `offset-x offset-y blur-radius spread-radius color` (예: `2px 2px 5px gray`) | `offset-x`: 수평 그림자 이동 거리<br> `offset-y`: 수직 그림자 이동 거리<br> `blur-radius`: 흐림 정도<br> `spread-radius`: 그림자 크기 확장<br> `color`: 그림자 색상 | `selector { box-shadow: value; }`                   | `div { box-shadow: 2px 2px 5px gray; }`          |
| `color`           | 텍스트의 색상을 설정.                             | `color-name`, `#RRGGBB`, `rgb(r, g, b)`, `rgba(r, g, b, a)`, `hsl(h, s%, l%)`, `hsla(h, s%, l%, a)` | `color-name`: 색상 이름 (예: `blue`)<br> `#RRGGBB`: 16진수 색상 코드 (예: `#ff0000`)<br> `rgb()`: 빨강, 초록, 파랑 값<br> `rgba()`: RGB 색상에 투명도 추가<br> `hsl()`: 색상, 채도, 명도<br> `hsla()`: HSL 색상에 투명도 추가 | `selector { color: value; }`                         | `p { color: blue; }`                              |
| `display`         | 요소의 박스 모델을 설정.                           | `block`, `inline`, `flex`, `grid`, `none`               | `block`: 블록 레벨 요소<br> `inline`: 인라인 요소<br> `flex`: Flexbox 컨테이너<br> `grid`: Grid 레이아웃<br> `none`: 요소 숨기기 | `selector { display: value; }`                       | `div { display: block; }` <br> `span { display: inline; }` |
| `font-size`       | 텍스트의 크기를 설정.                             | `px`, `em`, `rem`, `%`, `pt`                            | `px`: 픽셀 단위로 크기 설정<br> `em`: 부모 폰트 크기에 상대적인 크기<br> `rem`: 루트 요소 폰트 크기에 상대적인 크기<br> `%`: 부모 요소의 크기에 대한 비율<br> `pt`: 포인트 단위 | `selector { font-size: value; }`                     | `p { font-size: 16px; }`                           |
| `margin`          | 요소와 다른 요소 사이의 여백을 설정.               | `length` (예: `px`, `em`), `percentage` (예: `10%`), `auto` | `length`: 고정된 길이 (예: `10px`, `2em`)<br> `percentage`: 부모 요소의 크기에 대한 비율<br> `auto`: 자동 여백 조정 | `selector { margin: top right bottom left; }`        | `div { margin: 10px 20px 15px 5px; }`             |
| `padding`         | 요소의 내용과 테두리 사이의 여백을 설정.           | `length` (예: `px`, `em`), `percentage` (예: `10%`)     | `length`: 고정된 길이 (예: `10px`, `2em`)<br> `percentage`: 부모 요소의 크기에 대한 비율 | `selector { padding: top right bottom left; }`       | `div { padding: 20px; }`                           |
| `position`        | 요소의 위치 설정 방식을 정의.                      | `static`, `relative`, `absolute`, `fixed`, `sticky`    | `static`: 기본 위치 설정<br> `relative`: 상대 위치 (기본 위치 기준으로 이동)<br> `absolute`: 절대 위치 (가장 가까운 위치 지정 조상 기준)<br> `fixed`: 고정 위치 (뷰포트 기준)<br> `sticky`: 스크롤 위치에 따라 고정 | `selector { position: value; }`                      | `div { position: absolute; top: 10px; left: 20px; }` |
| `text-align`      | 텍스트의 정렬 방식을 설정.                         | `left`, `center`, `right`, `justify`                    | `left`: 왼쪽 정렬<br> `center`: 중앙 정렬<br> `right`: 오른쪽 정렬<br> `justify`: 양쪽 맞춤 | `selector { text-align: value; }`                    | `p { text-align: center; }`                        |
| `width`           | 요소의 너비를 설정.                               | `length` (예: `px`, `em`), `percentage` (예: `100%`)     | `length`: 고정된 너비 (예: `100px`, `50%`)<br> `percentage`: 부모 요소의 너비에 대한 비율 | `selector { width: value; }`                         | `div { width: 100px; }`                            |
| `z-index`         | 요소의 쌓임 순서를 설정.                           | `integer`                                               | `integer`: 정수 값으로 쌓임 순서 정의 (높을수록 위로 쌓임) | `selector { z-index: value; }`                       | `div { position: absolute; z-index: 10; }`        |

### 설정값 설명

- **`color`**:
  - `color-name`: CSS에 내장된 색상 이름을 사용합니다. 예를 들어, `red`, `green`, `blue` 등.
  - `#RRGGBB`: 색상을 16진수로 정의합니다. `#ff0000`은 빨간색을 나타냅니다.
  - `rgb(r, g, b)`: 빨강, 초록, 파랑의 값을 0에서 255 사이로 설정합니다. 예를 들어, `rgb(255, 0, 0)`은 빨간색입니다.
  - `rgba(r, g, b, a)`: `rgb()`에 투명도(`a`)를 추가합니다. `a`는 0 (완전히 투명)에서 1 (완전히 불투명)까지의 값을 가집니다. 예를 들어, `rgba(255, 0, 0, 0.5)`는 반투명 빨간색입니다.
  - `hsl(h, s%, l%)`: 색상의 톤(`h`), 채도(`s%`), 명도(`l%`)로 정의합니다. 예를 들어, `hsl(0, 100%, 50%)`은 빨간색입니다.
  - `hsla(h, s%, l%, a)`: `hsl()`에 투명도(`a`)를 추가합니다. 예를 들어, `hsla(0, 100%, 50%, 0.5)`는 반투명 빨간색입니다.

- **`length`**:
  - `px` (픽셀): 화면상의 고정된 길이 단위로, 1픽셀은 화면의 1개 점을 의미합니다.
  - `em`: 현재 폰트 크기에 상대적인 단위로, 1em은 현재 폰트 크기와 동일합니다.
  - `rem`: 루트 요소의 폰트 크기에 상대적인 단위로, 1rem은 루트 요소의 폰트 크기와 동일합니다.
  - `pt` (포인트): 주로 인쇄에서 사용되는 단위로, 1포인트는 약 1/72인치입니다.

- **`percentage`**:
  - 요소의 크기 또는 여백을 부모 요소의 크기 비율로 정의합니다. 예를 들어, `50%`는 부모 요소의 너비나 높이의 절반을 의미합니다.

- **`auto`**:
  - 주로 여백이나 너비에서 자동으로 조정합니다. 예를 들어, `margin: auto`는 중앙 정렬을 수행합니다.

- **`integer`**:
  - 요소의 쌓임 순서를 정의하는 정수 값입니다. 숫자가 클수록 위에 쌓입니다. 예를 들어, `z-index: 10`은 `z-index: 5`보다 위에 위치합니다.
