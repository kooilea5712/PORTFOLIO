/* Dự án — 3 DỰ ÁN MẪU (web / desktop / local). Thay {{...}} bằng nội dung thật; cover: null → khối xám. */
window.PROJECTS = [
  {
    slug: "mau-1",
    title: "{{Tên dự án 1}}",
    type: "web",
    featured: true,
    year: "{{Năm}}",
    role: "{{Vai trò}}",
    summary: "{{Mô tả một dòng — dự án mẫu}}",
    cover: null,
    gallery: [],
    stack: ["{{Công nghệ 1}}", "{{Công nghệ 2}}"],
    links: {
      demo: "lab/{{slug-1}}/",
      github: "https://github.com/{{github-user}}/{{repo-1}}",
      download: null,
      video: null,
      figma: null
    },
    runLocal: null,
    requirements: null,
    caseStudy: { problem: "{{Vấn đề}}", solution: "{{Giải pháp}}", result: "{{Kết quả}}", learned: "{{Điều học được}}" },
    features: ["{{Tính năng 1}}", "{{Tính năng 2}}"]
  },
  {
    slug: "mau-2",
    title: "{{Tên dự án 2}}",
    type: "desktop",
    featured: true,
    year: "{{Năm}}",
    role: "{{Vai trò}}",
    summary: "{{Mô tả một dòng — dự án mẫu}}",
    cover: null,
    gallery: [],
    stack: ["{{Công nghệ 1}}", "{{Công nghệ 2}}"],
    links: {
      demo: null,
      github: "https://github.com/{{github-user}}/{{repo-2}}",
      download: "https://github.com/{{github-user}}/{{repo-2}}/releases",
      video: null,
      figma: null
    },
    runLocal: null,
    requirements: "{{Yêu cầu hệ thống}}",
    caseStudy: { problem: "{{Vấn đề}}", solution: "{{Giải pháp}}", result: "{{Kết quả}}", learned: "{{Điều học được}}" },
    features: ["{{Tính năng 1}}", "{{Tính năng 2}}"]
  },
  {
    slug: "mau-3",
    title: "{{Tên dự án 3}}",
    type: "local",
    featured: true,
    year: "{{Năm}}",
    role: "{{Vai trò}}",
    summary: "{{Mô tả một dòng — dự án mẫu}}",
    cover: null,
    gallery: [],
    stack: ["{{Công nghệ 1}}", "{{Công nghệ 2}}"],
    links: {
      demo: null,
      github: "https://github.com/{{github-user}}/{{repo-3}}",
      download: null,
      video: null,
      figma: null
    },
    runLocal: ["git clone {{repo-url}}", "{{lệnh cài đặt}}", "{{lệnh chạy}}"],
    requirements: null,
    caseStudy: { problem: "{{Vấn đề}}", solution: "{{Giải pháp}}", result: "{{Kết quả}}", learned: "{{Điều học được}}" },
    features: ["{{Tính năng 1}}", "{{Tính năng 2}}"]
  }
];
