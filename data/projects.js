/* Dự án — 4 DỰ ÁN MẪU (web / desktop / local / design; mau-4 không featured). Thay {{...}} bằng nội dung thật; cover: null → khối xám. */
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
    gallery: [null, null, null],
    stack: ["{{Công nghệ 1}}", "{{Công nghệ 2}}"],
    links: {
      demo: "lab/demo-site/",
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
    title: { vi: "{{Tên dự án 2}}", en: "{{Project name 2}}" },   // ví dụ trường song ngữ { vi, en }
    type: "desktop",
    featured: true,
    year: "{{Năm}}",
    role: "{{Vai trò}}",
    summary: { vi: "{{Mô tả một dòng — dự án mẫu}}", en: "{{One-line description — sample project}}" },
    cover: null,
    gallery: [null, null, null],
    stack: ["{{Công nghệ 1}}", "{{Công nghệ 2}}"],
    links: {
      demo: null,
      github: "https://github.com/{{github-user}}/{{repo-2}}",
      download: "https://github.com/{{github-user}}/{{repo-2}}/releases",
      video: null,
      figma: null
    },
    runLocal: null,
    requirements: { vi: "{{Yêu cầu hệ thống}}", en: "{{System requirements}}" },
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
    gallery: [null, null, null],
    stack: ["{{Công nghệ 1}}", "{{Công nghệ 2}}"],
    links: {
      demo: null,
      github: "https://github.com/{{github-user}}/{{repo-3}}",
      download: null,
      video: null,
      figma: null
    },
    runLocal: ["git clone {{repo-url}}", "cd {{thư-mục}}", "npm install", "npm run dev"],
    requirements: null,
    caseStudy: { problem: "{{Vấn đề}}", solution: "{{Giải pháp}}", result: "{{Kết quả}}", learned: "{{Điều học được}}" },
    features: ["{{Tính năng 1}}", "{{Tính năng 2}}"]
  },
  {
    slug: "mau-4",
    title: "{{Tên dự án 4}}",
    type: "design",
    featured: false,
    year: "{{Năm}}",
    role: "{{Vai trò}}",
    summary: "{{Mô tả một dòng — dự án mẫu, không featured}}",
    cover: null,
    gallery: [null, null, null],
    stack: ["{{Công cụ thiết kế}}"],
    links: {
      demo: null,
      github: null,
      download: null,
      video: null,
      figma: "https://www.figma.com/{{figma-url}}"
    },
    runLocal: null,
    requirements: null,
    caseStudy: { problem: "{{Vấn đề}}", solution: "{{Giải pháp}}", result: "{{Kết quả}}", learned: "{{Điều học được}}" },
    features: ["{{Tính năng 1}}", "{{Tính năng 2}}"]
  }
];
