/* Thông tin cá nhân. Mọi {{...}} là placeholder — tự thay khi có nội dung thật. */
window.PROFILE = {
  name: "{{Họ tên}}",
  shortName: "{{AB}}",
  greeting: "xin chào, mình là {{Tên}}",
  roles: ["DEVELOPER", "DESIGNER", "STUDENT"],
  bio: ["{{Đoạn 1}}", "{{Đoạn 2}}"],
  bioLong: ["{{Đoạn dài 1}}", "{{Đoạn dài 2}}", "{{Đoạn dài 3}}", "{{Đoạn dài 4}}"],
  timeline: [
    { period: "{{2023 – nay}}", kind: "education", title: "{{Tên vị trí / ngành học}}", org: "{{Tên trường / công ty}}", note: "{{Một câu}}" },
    { period: "{{2024 – nay}}", kind: "club",      title: "{{Tên vị trí / ngành học}}", org: "{{Tên trường / công ty}}", note: "{{Một câu}}" },
    { period: "{{2025}}",       kind: "work",      title: "{{Tên vị trí / ngành học}}", org: "{{Tên trường / công ty}}", note: "{{Một câu}}" },
    { period: "{{2026}}",       kind: "course",    title: "{{Tên vị trí / ngành học}}", org: "{{Tên trường / công ty}}", note: "{{Một câu}}" }
  ],
  location: { vi: "{{Thành phố}}, Việt Nam", en: "{{City}}, Vietnam" },   // trường văn bản có thể là chuỗi hoặc { vi, en } (đọc qua pickLang)
  email: "{{email}}",
  web3formsKey: "{{WEB3FORMS_ACCESS_KEY}}",   // đăng ký miễn phí tại web3forms.com; còn "{{" thì form báo chưa cấu hình
  openToWork: true,
  portrait: null,                  // ảnh chân dung: đường dẫn, null → khối xám 800×1000
  cv: null,                        // vd "assets/files/cv.pdf" — null thì ẩn nút Tải CV
  socials: [
    { id: "github",    url: "https://github.com/{{github-user}}",       handle: "@{{github-user}}",   note: "{{Ghi chú GitHub}}" },
    { id: "linkedin",  url: "https://linkedin.com/in/{{linkedin-user}}", handle: "{{linkedin-user}}",  note: "{{Ghi chú LinkedIn}}" },
    { id: "facebook",  url: "https://facebook.com/{{facebook-user}}",    handle: "{{facebook-user}}",  note: "{{Ghi chú Facebook}}" },
    { id: "instagram", url: "https://instagram.com/{{instagram-user}}", handle: "@{{instagram-user}}", note: "{{Ghi chú Instagram}}" },
    { id: "tiktok",    url: "https://tiktok.com/@{{tiktok-user}}",      handle: "@{{tiktok-user}}",   note: "{{Ghi chú TikTok}}" }
  ],
  now: {
    reading: "{{Đang đọc}}",
    listening: "{{Đang nghe}}",
    goal: "{{Mục tiêu tháng này}}",
    place: "{{Đang ở đâu}}"
  }
};
