# Hướng dẫn điền nội dung và hiểu cách web chạy

Dành cho người mới học code. Bạn **không cần sửa code logic** — chỉ sửa các file trong thư mục `data/`
(và vài dòng SEO trong HTML, xem mục E). Mọi chỗ ghi `{{...}}` là chỗ giữ chỗ: thay bằng nội dung thật của bạn.

Mục lục: [A. Web chạy thế nào](#a-web-chạy-thế-nào) · [B. Bảng từng trường](#b-bảng-từng-trường-trong-data) ·
[C. Cú pháp JS cần biết](#c-cú-pháp-js-cần-biết-khi-sửa-data) · [D. Hướng dẫn từng bước](#d-hướng-dẫn-từng-bước) ·
[E. SEO sửa tay trong HTML](#e-phần-seo-sửa-tay-trong-html) · [F. Tìm chỗ còn sót `{{...}}`](#f-tìm-chỗ-còn-sót-) ·
[G. Checklist trước khi đăng](#g-checklist-trước-khi-đăng-web)

---

## A. Web chạy thế nào

### A1. Thứ tự nạp file

Mỗi trang HTML nạp file theo đúng thứ tự này (đều có `defer` nên chạy sau khi HTML đã đọc xong):

```
1. data/profile.js, skills.js, projects.js, life.js   ← NỘI DUNG của bạn (window.PROFILE, SKILLS, PROJECTS, LIFE)
2. data/i18n.js                                       ← từ điển chữ giao diện VI/EN (window.I18N)
3. assets/js/i18n.js                                  ← hàm t(), pickLang(), dịch chữ tĩnh trong HTML
4. assets/js/main.js                                  ← navbar, menu mobile, hiệu ứng, hàm dùng chung
5. assets/js/render.js  (hoặc project.js, contact.js, lightbox.js)  ← đọc data → vẽ ra trang
```

Thứ tự quan trọng: file sau dùng được đồ của file trước. Vì vậy `data/` luôn nạp trước, `render.js` luôn nạp sau cùng.

### A2. Dữ liệu đi từ đâu tới đâu

```
data/profile.js ─┐
data/skills.js  ─┤                       ┌─► render.js  ─► trang chủ, about, life, projects
data/projects.js ┼─ (pickLang / t) ──────┤
data/life.js    ─┤                       └─► project.js ─► project.html?p=<slug>
data/i18n.js    ─┘   contact.js ─► form liên hệ + copy email · lightbox.js ─► xem ảnh Life
```

Ví dụ: bạn sửa `PROFILE.shortName` → `render.js` hàm `renderBranding()` đặt chữ đó vào logo **ở mọi trang**.
Bạn thêm một dự án vào `data/projects.js` → `renderProjectGrid()` tự vẽ thêm một thẻ, `project.js` tự có trang chi tiết.
Bạn **không phải sửa HTML**.

### A3. `pickLang()` và `t()` làm gì

- **`pickLang(giá_trị)`** — dùng cho **nội dung của bạn** (trong `data/*.js`). Nếu giá trị là chuỗi `"Xin chào"` thì trả về nguyên chuỗi;
  nếu là `{ vi: "Xin chào", en: "Hello" }` thì trả về đúng ngôn ngữ đang chọn (thiếu bản EN thì dùng bản VI). Mảng thì áp dụng cho từng phần tử.
  Nghĩa là **mọi chữ trong `data/*.js` đều có thể viết một thứ tiếng (chuỗi) hoặc hai thứ tiếng (`{ vi, en }`)**.
- **`t("khóa")`** — dùng cho **chữ giao diện cố định** (nút "Gửi", "Xem thêm", tên menu…). Chữ nằm trong `data/i18n.js`, mỗi khóa có bản `vi` và `en`.
  Chuỗi có thể chứa `{name}` — `t()` tự thay bằng `PROFILE.name` (ví dụ tiêu đề tab "Giới thiệu — {name}").
  File `data/i18n.js` **không chứa nội dung cá nhân**, bạn thường không phải sửa nó.

### A4. Vì sao đổi ngôn ngữ thì tải lại trang?

Chữ xuất hiện ở hai nơi: (1) chữ viết sẵn trong HTML, (2) chữ do JS vẽ ra từ `data/`. Thay vì viết code cập nhật từng chỗ,
bấm VI/EN chỉ **lưu lựa chọn** (trong `localStorage`, khoá `portfolio-lang`) rồi `location.reload()`. Trang nạp lại và mọi thứ được vẽ lại đúng ngôn ngữ.
Đơn giản hơn, ít lỗi hơn; đánh đổi là trang nháy một lần khi đổi.

---

## B. Bảng từng trường trong `data/`

Chú thích cột "Kiểu": **T** = chuỗi hoặc `{ vi, en }` (đọc qua `pickLang`) · **URL/đường dẫn** = chuỗi thường · **Mảng** = `[ ... ]` · **Bool** = `true`/`false`.
"Bắt buộc": **Có** = thiếu thì trang lỗi hoặc trống phần quan trọng; **Không** = bỏ trống/`null` thì phần đó ẩn hoặc hiện khối xám.

### B1. `data/profile.js` → `window.PROFILE`

| Trường | Kiểu | Bắt buộc | Hiển thị ở | Hàm render | Ví dụ |
|---|---|---|---|---|---|
| `name` | T | Có | Tiêu đề tab các trang con, footer, alt ảnh chân dung | `t()` (`{name}`), `renderAboutBio`, `project.js` | `"Nguyễn Văn An"` |
| `shortName` | T | Có | Logo navbar (mọi trang) | `renderBranding` | `"NA"` |
| `email` | T | Có | Contact (bấm để copy), icon email, link mailto khi form lỗi | `initCopyEmail`, `renderSocials`, `showFormMessage` | `"an@gmail.com"` |
| `location` | T | Không | Contact → "Vị trí" | `renderLocation` | `{ vi: "Hà Nội, Việt Nam", en: "Hanoi, Vietnam" }` |
| `openToWork` | Bool | Không | Chấm xanh "Đang tìm cơ hội" (hero + contact) | `renderOpenToWork` | `true` |
| `cv` | đường dẫn / `null` | Không | Nút "Tải CV" (contact + about). `null` → ẩn nút | `renderCvLinks` | `"assets/files/cv.pdf"` |
| `portrait` | đường dẫn / `null` | Không | Ảnh chân dung ở about.html. `null` → khối xám | `renderAboutBio` | `"assets/img/portrait/an.webp"` |
| `web3formsKey` | chuỗi | Không* | Form liên hệ (gửi thật) | `submitContactForm` | `"a1b2c3d4-…"` |
| `greeting` | T | Có | Dòng chào nhỏ trên cùng ở hero | `renderProfileText` | `{ vi: "xin chào, mình là An", en: "hello, I'm An" }` |
| `roles` | Mảng (mỗi phần tử T) | Có | Chữ tự gõ sau "I'M A" ở hero | `initHeroTyping` (main.js) | `["DEVELOPER", "DESIGNER", "STUDENT"]` |
| `bio` | T (thường `{ vi: [...], en: [...] }`) | Có | Giới thiệu ngắn ở trang chủ (mục About) | `renderHomeBio` | `{ vi: ["Đoạn 1", "Đoạn 2"], en: ["Para 1", "Para 2"] }` |
| `bioLong` | T (như `bio`) | Có | Giới thiệu dài ở about.html (3–4 đoạn) | `renderAboutBio` | như `bio`, nhiều đoạn hơn |
| `current.logo` | T | Không | Chữ lớn mờ làm nền mục "Hiện tại" | `renderCurrent` | `"HUST"` |
| `current.title` | T | Có | Tiêu đề mục "Hiện tại" | `renderCurrent` | `{ vi: "SINH VIÊN ĐẠI HỌC X", en: "STUDENT AT X" }` |
| `current.text` | T | Có | Mô tả ngắn mục "Hiện tại" | `renderCurrent` | `"Mình đang học năm 3…"` |
| `current.link` | đường dẫn | Không | Nút "Xem thêm" dẫn tới đâu | `renderCurrent` | `"about.html"` |
| `services[].key` | chuỗi | Có | Chọn icon: `"design"`, `"development"`, `"learning"` (khác → icon tròn) | `renderServices` | `"design"` |
| `services[].title` | T | Có | Tiêu đề khối "Tôi làm gì" (trang chủ + about) | `renderServices` | `{ vi: "Thiết kế", en: "Design" }` |
| `services[].text` | T | Có | Mô tả 2 dòng của khối | `renderServices` | `"Mình thiết kế giao diện…"` |
| `timeline[].period` | T | Có | Mốc thời gian (font mono) ở about.html | `renderTimeline` | `"2023 – nay"` |
| `timeline[].kind` | chuỗi | Có | Loại: `"education"` `"work"` `"club"` `"course"` | `renderTimeline` | `"education"` |
| `timeline[].title` | T | Có | Chức danh / ngành học | `renderTimeline` | `"Kỹ thuật phần mềm"` |
| `timeline[].org` | T | Có | Trường / công ty | `renderTimeline` | `"Đại học X"` |
| `timeline[].note` | T | Không | Một câu mô tả | `renderTimeline` | `"Điểm trung bình 3.5"` |
| `contactLead` | T | Không | Câu mời dưới tiêu đề CONTACT | `renderProfileText` | `"Có việc cần làm cùng nhau? Nhắn mình nhé."` |
| `lifeIntro` | T | Không | Câu mở đầu mục Life (trang chủ + life.html) | `renderProfileText` | `"Khi không ngồi trước màn hình, mình đi bộ…"` |
| `socials[].id` | chuỗi | Có | `github` `linkedin` `facebook` `instagram` `tiktok` `youtube` (chọn icon + màu hover) | `renderSocials` | `"github"` |
| `socials[].url` | URL | Có | Link mở trong tab mới | `renderSocials` | `"https://github.com/an"` |
| `socials[].handle` | chuỗi | Có | Tên hiện trên thẻ Life | `renderSocials` | `"@an"` |
| `socials[].note` | T | Không | Một dòng mô tả trên thẻ | `renderSocials` | `"Code của mình"` |
| `now.reading` / `listening` / `goal` / `place` | T | Không | Khối "Now" (Đang đọc / nghe / mục tiêu / đang ở) | `renderNow` | `"Clean Code"` |

\* Không có `web3formsKey` thật thì form chỉ báo "chưa được cấu hình" và đưa link mailto — web vẫn chạy.

### B2. `data/skills.js` → `window.SKILLS`

| Trường | Kiểu | Bắt buộc | Hiển thị ở | Hàm render | Ví dụ |
|---|---|---|---|---|---|
| `mastered[].name` | T | Có | Nhóm "Đang dùng thành thạo" (trang chủ, mục Skills) | `renderSkills` | `"JavaScript"` |
| `mastered[].icon` | đường dẫn / `null` | Không | Logo 96px. `null` → khối xám | `renderSkills` | `"assets/img/logos/javascript.svg"` |
| `learning[].name` | T | Có | Nhóm "Đang học" | `renderSkills` | `"React"` |
| `learning[].icon` | đường dẫn / `null` | Không | Logo 56px (xám, hover mới màu) | `renderSkills` | `"assets/img/logos/react.svg"` |
| `learning[].progress` | số 0–100 | Không | Thanh tiến độ màu nhấn | `renderSkills` | `40` |
| `learning[].since` | T | Không | Chữ "từ …" bên dưới tên | `renderSkills` | `"09/2026"` |
| `tools[]` | Mảng chuỗi (T) | Không | Nhóm "Công cụ khác" (chip chữ) | `renderSkills` | `["Git", "Figma", "VS Code"]` |

### B3. `data/projects.js` → `window.PROJECTS` (mảng; mỗi phần tử là một dự án)

| Trường | Kiểu | Bắt buộc | Hiển thị ở | Hàm render | Ví dụ |
|---|---|---|---|---|---|
| `slug` | chuỗi | **Có**, **không trùng** | Đường dẫn `project.html?p=<slug>`, sitemap | `findProject`, `renderProjectCard` | `"eatsome"` (chữ thường, không dấu, không khoảng trắng) |
| `title` | T | Có | Thẻ dự án, đầu trang chi tiết, tiêu đề tab | `renderProjectCard`, `renderProjectHeader` | `"eatsome."` |
| `type` | chuỗi | Có | Chọn cách "Xem thử" + tab lọc: `"web"` `"desktop"` `"local"` `"design"` | `renderPreview` | `"web"` |
| `featured` | Bool | Không | `true` → hiện ở trang chủ (nên 4–6 dự án). `false` → chỉ ở projects.html | `renderProjectGrid` | `true` |
| `year` | T | Không | Dòng "năm · vai trò" | `renderProjectHeader` | `2026` hoặc `"2026"` |
| `role` | T | Không | Vai trò | `renderProjectHeader` | `"Solo"` / `"Team 3 người"` |
| `summary` | T | Có | Mô tả một dòng (thẻ + đầu trang chi tiết + meta description) | `renderProjectCard` | `"Ứng dụng tìm nhà hàng"` |
| `cover` | đường dẫn / `null` | Không | Ảnh bìa 16:10. `null` → khối xám | `renderProjectCard`, `renderCover` | `"assets/img/projects/eatsome/cover.webp"` |
| `gallery` | Mảng đường dẫn (`null` = khối xám) | Không | Gallery cuối trang chi tiết | `renderGallery` | `["…/1.webp", "…/2.webp"]` |
| `stack` | Mảng (T) | Có | Tag công nghệ + chip lọc ở projects.html | `renderProjectCard`, `initProjectsPage` | `["HTML", "SCSS", "JavaScript"]` |
| `links.demo` | URL / đường dẫn / `null` | Không | Nút Demo; **web**: được nhúng vào khung trình duyệt | `renderPreviewWeb` | `"lab/eatsome/"` hoặc `"https://eatsome.vercel.app"` |
| `links.github` | URL / `null` | Không | Nút Code | `renderProjectHeader` | `"https://github.com/an/eatsome"` |
| `links.download` | URL / `null` | Không | Nút Tải xuống (**desktop**) | `renderPreviewDesktop` | `"https://github.com/an/app/releases"` |
| `links.video` | `.mp4` / link YouTube / `null` | Không | Video demo (**desktop**, **local**). Không có → khối xám 1280×720 | `renderVideo` | `"https://youtu.be/XXXXXXXXXXX"` hoặc `"assets/video/demo.mp4"` |
| `links.figma` | URL / `null` | Không | Nút "Mở Figma" (**design**) | `renderPreviewDesign` | `"https://figma.com/file/…"` |
| `runLocal` | Mảng chuỗi / `null` | Không | Khối "Cách chạy local" có nút Copy (**local**) | `renderPreviewLocal` | `["git clone …", "npm install", "npm run dev"]` |
| `requirements` | T / `null` | Không | Dòng "Yêu cầu hệ thống" (**desktop**) | `renderPreviewDesktop` | `"Windows 10+, .NET 8"` |
| `caseStudy.problem` | T | Không | Khối "Vấn đề" | `renderCaseStudy` | `"Người dùng khó chọn quán"` |
| `caseStudy.solution` | T | Không | Khối "Giải pháp" | `renderCaseStudy` | `"Gợi ý theo khẩu vị"` |
| `caseStudy.result` | T | Không | Khối "Kết quả" | `renderCaseStudy` | `"100 người dùng thử"` |
| `caseStudy.learned` | T | Không | Khối "Điều học được" | `renderCaseStudy` | `"Cách tổ chức state"` |
| `features` | Mảng (T) | Không | Danh sách "Tính năng chính" | `renderStackAndFeatures` | `["Tìm theo vị trí", "Lưu quán yêu thích"]` |

Trường không dùng thì để `null` hoặc `[]`; không xoá cả khóa `links` / `caseStudy` (code đọc vào bên trong chúng).

### B4. `data/life.js` → `window.LIFE` (mảng ảnh)

| Trường | Kiểu | Bắt buộc | Hiển thị ở | Hàm render | Ví dụ |
|---|---|---|---|---|---|
| `img` | đường dẫn / `null` | Không | Ảnh. `null` → khối xám ghi kích thước | `renderLife` | `"assets/img/life/01.webp"` |
| `size` | chuỗi `"rộng×cao"` | Không | **Chỉ dùng khi `img` là `null`** (kích thước/tỉ lệ khối xám). Có ảnh thật thì xoá | `renderLife`, lightbox | `"800×1000"` |
| `caption` | T | Có | Địa điểm / tiêu đề (chú thích + lightbox) | `renderLife` | `"Đà Lạt"` |
| `date` | T | Không | Thời gian | `renderLife` | `"03/2026"` |
| `note` | T | Không | Một câu cảm nghĩ | `renderLife` | `"Sương sớm trên đồi"` |

Trang chủ chỉ hiện **6 ảnh đầu**; `life.html` hiện tất cả (kèm lightbox).

---

## C. Cú pháp JS cần biết khi sửa `data/`

```js
window.PROFILE = {                       // { ... }  = một "đối tượng": nhiều cặp  tên: giá trị
  name: "Nguyễn Văn An",                 // chuỗi: LUÔN nằm trong dấu nháy "..." ; sau mỗi cặp có dấu phẩy
  openToWork: true,                      // true / false: viết thường, KHÔNG có nháy
  cv: null,                              // null = "không có gì"; KHÔNG có nháy
  year: 2026,                            // số: không có nháy
  roles: ["DEVELOPER", "STUDENT"],       // [ ... ] = "mảng": danh sách, phần tử cách nhau bằng dấu phẩy
  greeting: { vi: "xin chào", en: "hello" },   // { vi, en } = song ngữ
  socials: [                             // mảng các đối tượng
    { id: "github", url: "https://github.com/an" },     // ← có dấu phẩy vì còn phần tử sau
    { id: "tiktok", url: "https://tiktok.com/@an" }     // ← phần tử CUỐI: không dấu phẩy
  ]
};
```

Mẹo: chuỗi có dấu nháy kép bên trong thì viết `\"` hoặc dùng nháy đơn `'...'`. Chuỗi dài không xuống dòng trong dấu nháy.
Chú thích bắt đầu bằng `//` (cả dòng sau nó bị bỏ qua) — dùng để ghi chú cho mình.

### 3 lỗi hay gặp

| Lỗi | Ví dụ sai | Triệu chứng | Cách sửa |
|---|---|---|---|
| **Thiếu dấu phẩy** giữa 2 phần tử/2 cặp | `name: "An"` ↵ `email: "a@b.c"` | Section hoặc cả trang **trống**; Console báo `Unexpected string` / `Unexpected identifier` ở dòng gần đó | Thêm `,` cuối dòng trên |
| **Thừa dấu phẩy** ở phần tử cuối / hoặc 2 dấu `,,` | `["a", "b",,]` | Thường vẫn chạy nhưng có thể hiện phần tử rỗng/`undefined`; trình duyệt cũ báo lỗi | Xoá dấu phẩy thừa |
| **Quên đóng ngoặc/nháy** `}` `]` `"` | `{ id: "github", url: "https://…"` (thiếu `}`) | Toàn bộ file không chạy → mọi phần dùng file đó **trống**; Console: `Unexpected end of input` hoặc `missing ) after argument list` | Đếm ngoặc: mỗi `{` cần `}`, mỗi `[` cần `]`, mỗi `"` mở cần `"` đóng |

### Xem lỗi bằng F12 → Console

1. Mở trang trong trình duyệt, nhấn **F12** (hoặc chuột phải → *Inspect*).
2. Chọn tab **Console**. Lỗi màu đỏ, kèm **tên file và số dòng**, ví dụ `projects.js:34 Uncaught SyntaxError: Unexpected token '}'`.
3. Mở file đó, đi tới dòng được báo (hoặc **dòng ngay trước** nó — thiếu dấu phẩy thường báo ở dòng sau chỗ thiếu) và sửa.
4. Lưu file, bấm **Ctrl + F5** để tải lại; lỗi hết thì Console sạch.
5. Dòng cảnh báo vàng `[i18n] Thiếu key …` nghĩa là một chữ giao diện chưa có bản EN trong `data/i18n.js` (web vẫn chạy, hiện tạm bản VI).

Muốn kiểm tra cú pháp một file `data/*.js` mà không mở trình duyệt (có Node): `node --check data\profile.js`.

---

## D. Hướng dẫn từng bước

### D1. Thêm một dự án

Mở `data/projects.js`, **copy nguyên một khối `{ ... }`** của dự án mẫu cùng loại, dán thêm vào mảng (nhớ dấu phẩy giữa các khối), rồi sửa. Đổi `slug` thành duy nhất.

**Dự án web** (`type: "web"`) — chạy được trên trình duyệt:
```js
{
  slug: "eatsome", title: "eatsome.", type: "web", featured: true,
  year: 2026, role: "Solo", summary: "Ứng dụng tìm nhà hàng",
  cover: "assets/img/projects/eatsome/cover.webp",
  gallery: ["assets/img/projects/eatsome/1.webp", "assets/img/projects/eatsome/2.webp"],
  stack: ["HTML", "SCSS", "JavaScript"],
  links: { demo: "lab/eatsome/", github: "https://github.com/an/eatsome", download: null, video: null, figma: null },
  runLocal: null, requirements: null,
  caseStudy: { problem: "…", solution: "…", result: "…", learned: "…" },
  features: ["…", "…"]
}
```
`demo` là `"lab/eatsome/"` (web con, xem D5) hoặc một URL đã deploy (`https://….vercel.app`). Trang chi tiết nhúng nó vào khung trình duyệt giả (màn ≥ 768px) hoặc hiện ảnh + nút "Mở toàn màn hình" (mobile).

**Dự án desktop app** (`type: "desktop"`) — .exe, WinForms, Python GUI…:
đặt `links.download` = link **GitHub Releases** (đừng để file .exe trong thư mục web), `links.video` = video demo (YouTube hoặc `.mp4` < 10MB), `requirements: "Windows 10+, .NET 8"`, `gallery` = ảnh chụp màn hình; `demo: null`.

**Dự án localhost/backend** (`type: "local"`) — Node, PHP, Java, có database:
`links.video` = video walkthrough, và `runLocal: ["git clone https://github.com/an/app", "cd app", "npm install", "npm run dev"]` (mỗi lệnh một phần tử → hiện thành một dòng có nút Copy). Có deploy thật (Render/Railway) thì đặt `links.demo` = URL đó.

**Dự án design** (`type: "design"`) — Figma, UI:
`cover` = ảnh lớn, `links.figma` = link file Figma/Behance; `demo`, `download`, `runLocal` để `null`.

Sau khi thêm: mở `projects.html` kiểm tra; nhớ **thêm một dòng vào `sitemap.xml`**: `<url><loc>https://tên-miền/project.html?p=eatsome</loc></url>`.

### D2. Thêm ảnh Life

1. Chuẩn bị ảnh (xem D6), đặt vào `assets/img/life/` (vd `13.webp`).
2. Thêm một dòng vào `data/life.js` (nhớ dấu phẩy ở dòng trước):
   ```js
   { img: "assets/img/life/13.webp", caption: "Đà Lạt", date: "03/2026", note: "Sương sớm trên đồi" }
   ```
   Đã có ảnh thật thì **không cần `size`**. Muốn ảnh hiện trên trang chủ, đặt nó trong **6 dòng đầu**.

### D3. Thêm kỹ năng + logo

1. Tải logo SVG miễn phí từ [simpleicons.org](https://simpleicons.org) hoặc [devicon.dev](https://devicon.dev), lưu vào `assets/img/logos/` (vd `react.svg`).
2. Thêm vào `data/skills.js`:
   - đang dùng thành thạo: `{ name: "React", icon: "assets/img/logos/react.svg" }` vào `mastered`;
   - đang học: `{ name: "Docker", icon: "assets/img/logos/docker.svg", progress: 30, since: "09/2026" }` vào `learning`;
   - công cụ: thêm chuỗi `"Figma"` vào `tools`.

### D4. Ẩn một mạng xã hội

Mở `data/profile.js`, trong `socials` **xoá cả dòng** `{ id: "tiktok", … }` (nhớ: phần tử cuối không có dấu phẩy sau nó).
Icon ở hero/menu/footer/contact và thẻ ở Life biến mất cùng lúc. Nhớ xoá cả dòng tương ứng trong `"sameAs"` của JSON-LD ở `index.html` (mục E).

### D5. Đưa web con vào `lab/<slug>/`

1. Build dự án thành thư mục tĩnh (có `index.html` ở gốc). Dự án HTML/CSS/JS thuần thì dùng luôn thư mục đó.
2. Copy cả thư mục vào `lab/<slug>/` (vd `lab/eatsome/index.html`).
3. Trong web con, **mọi đường dẫn phải tương đối** (`css/style.css`, không phải `/css/style.css`) — nếu không sẽ hỏng khi đặt trong thư mục con.
4. Trong `data/projects.js` đặt `links.demo: "lab/eatsome/"`.
5. Mở `project.html?p=eatsome` để thử. Khung xem thử chạy iframe có `sandbox="allow-scripts allow-same-origin allow-forms"`: web con cần popup/tải file sẽ không chạy trong khung (vẫn chạy khi bấm "Mở toàn màn hình").
6. Thư mục mẫu `lab/demo-site/` chỉ để thử — xoá khi không dùng.

### D6. Thêm ảnh: thư mục, kích thước, nén sang `.webp`

| Loại ảnh | Thư mục | Kích thước gợi ý |
|---|---|---|
| Ảnh bìa dự án | `assets/img/projects/<slug>/cover.webp` | 1600×1000 (tỉ lệ 16:10) |
| Ảnh gallery dự án | `assets/img/projects/<slug>/1.webp`, `2.webp`… | rộng 1600px |
| Ảnh Life | `assets/img/life/01.webp`… | rộng 800–1200px (mọi tỉ lệ) |
| Chân dung | `assets/img/portrait/<tên>.webp` | 800×1000 (4:5) |
| Logo kỹ năng | `assets/img/logos/<tên>.svg` | SVG (không cần kích thước) |
| Ảnh chia sẻ (OG) | `assets/img/og-image.jpg` | **1200×630**, `.jpg` |
| Video demo ngắn | `assets/video/` | `.mp4` < 10MB (dài hơn → YouTube) |
| CV | `assets/files/cv.pdf` | PDF |

Nén sang `.webp` (nhẹ hơn JPG 25–35%): cách dễ nhất là vào [squoosh.app](https://squoosh.app) → kéo ảnh vào → chọn **WebP**, chất lượng khoảng 80 → tải về.
Hoặc dùng dòng lệnh `cwebp -q 80 anh.jpg -o anh.webp` nếu đã cài. Đặt tên file **không dấu, không khoảng trắng, chữ thường**.
Mục tiêu: mỗi ảnh dưới ~300KB. Ảnh mặc định hiện **đen trắng**, rê chuột (hoặc cuộn tới giữa màn hình trên điện thoại) mới hiện màu — đó là thiết kế.

---

## E. Phần SEO sửa tay trong HTML

Công cụ tìm kiếm và mạng xã hội đọc HTML, **không chạy JS**, nên các thẻ này không thể lấy từ `data/`. Ở đầu `<head>` mỗi file có dòng
`<!-- SEO — sửa tay: {{Họ tên}}, {{domain}}, mô tả trang -->`. Cần sửa (số dòng chỉ tương đối, có thể lệch vài dòng nếu bạn thêm/xoá):

| File | Dòng cần sửa | Thay gì |
|---|---|---|
| `index.html` | 7 `<title>`, 8 `description`, 10 `canonical`, 12–13 `og:title`/`og:description`, 15 `og:url`, 16 `og:image`, **34–49 JSON-LD** (`name`, `url`, `email`, `sameAs`) | `{{Họ tên}}`, `{{Mô tả ngắn}}`, `{{domain}}`, `{{email}}`, các `{{...-user}}` |
| `about.html` | 7, 8, 10, 12–13, 15, 16 | `{{Họ tên}}`, `{{Mô tả trang giới thiệu}}`, `{{domain}}` |
| `projects.html` | 7, 8, 10, 12–13, 15, 16 | `{{Họ tên}}`, `{{Mô tả trang dự án}}`, `{{domain}}` |
| `project.html` | 7, 8, 10, 12–13, 15, 16 | `{{Họ tên}}`, `{{Mô tả trang chi tiết dự án}}`, `{{domain}}` (title/description/og/canonical còn được `project.js` cập nhật theo từng dự án) |
| `life.html` | 7, 8, 10, 12–13, 15, 16 | `{{Họ tên}}`, `{{Mô tả trang cuộc sống}}`, `{{domain}}` |
| `404.html` | 12, 13, 17, 18, 20 | `{{Họ tên}}`, `{{Mô tả trang lỗi}}`, `{{domain}}` |
| `robots.txt` | dòng `Sitemap:` | `{{domain}}` |
| `sitemap.xml` | mọi `<loc>` | `{{domain}}`; thêm `<url>` cho mỗi dự án mới |
| `favicon.svg` | chữ `A` trong thẻ `<text>` | chữ cái đầu của bạn |

Ghi nhớ: `{{domain}}` là tên miền không có `https://` (vd `an-nguyen.dev`). `og:image` trỏ tới `assets/img/og-image.jpg` (1200×630) — **bạn phải thêm file này**.
Tiêu đề tab của các trang con còn được `data/i18n.js` đặt lại bằng JS (dùng `PROFILE.name`), nên chỉ cần nhớ sửa `<title>` tĩnh cho công cụ tìm kiếm.

---

## F. Tìm chỗ còn sót `{{...}}`

Mở **PowerShell** trong thư mục `D:\PORTFOLIO` và chạy:

```powershell
Select-String -Path *.html,data\*.js,*.xml,*.txt,*.svg -Pattern '\{\{' | Select-Object Path,LineNumber,Line
```

- Mỗi dòng in ra là một chỗ chưa điền. Đếm nhanh: thêm `| Measure-Object` ở cuối.
- Lệnh trên không quét `lab/`; web con của bạn tự kiểm tra riêng.
- Muốn xem số lượng theo file: `Select-String -Path *.html,data\*.js,*.xml,*.txt,*.svg -Pattern '\{\{' | Group-Object Path | Select-Object Count,Name`

---

## G. Checklist trước khi đăng web

- [ ] `data/profile.js`: điền hết (tên, `shortName`, email, bio, bioLong, current, services, timeline, socials, now…).
- [ ] `data/skills.js`, `data/projects.js`, `data/life.js`: thay dự án/kỹ năng/ảnh mẫu bằng nội dung thật; xoá mẫu thừa; `slug` không trùng.
- [ ] Ảnh thật trong `assets/img/` (đã nén `.webp`), logo kỹ năng, **`assets/img/og-image.jpg` (1200×630)**.
- [ ] **Web3Forms:** đăng ký miễn phí tại web3forms.com (nhập email nhận thư) → dán Access Key vào `PROFILE.web3formsKey`. Gửi thử một thư.
- [ ] CV: đặt `assets/files/cv.pdf` rồi `PROFILE.cv = "assets/files/cv.pdf"`.
- [ ] SEO (mục E): `{{Họ tên}}`, `{{domain}}`, mô tả từng trang, JSON-LD; sửa `robots.txt`, `sitemap.xml`, `favicon.svg`.
- [ ] Chạy lệnh PowerShell mục F → không còn `{{` nào .
- [ ] Xoá `lab/demo-site/` nếu không dùng; xoá các dự án mẫu trong `data/projects.js` (mau-1 … mau-4) và thay bằng dự án thật.
- [ ] Thử ở **375px** (điện thoại) và **1440px** (máy tính), cả **VI** và **EN**: không cuộn ngang, F12 → Console không có lỗi đỏ.
- [ ] Bấm thử mọi link: menu, nút Demo/Code/Tải xuống, thẻ mạng xã hội, form liên hệ, nút Copy.
- [ ] Hosting: đặt `404.html` đúng chỗ hosting yêu cầu; site đặt ở **gốc tên miền** (vì `404.html` dùng đường dẫn tuyệt đối `/assets/...`).
- [ ] `git commit` bản cuối trước khi đăng.
