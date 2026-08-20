const KEY = "f556554a7f3a4bba84675abe795eb7d4";
const BASE = "https://www.robusst.com";
const HOST = "www.robusst.com";

const urls = [
  `${BASE}/en`,
  `${BASE}/en/solutions`,
  `${BASE}/en/solutions/ai-call-center`,
  `${BASE}/en/solutions/branded-calling`,
  `${BASE}/en/solutions/customer-data-platform`,
  `${BASE}/en/solutions/customized-solutions`,
  `${BASE}/en/solutions/cybersecurity`,
  `${BASE}/en/solutions/intelligent-noc`,
  `${BASE}/en/solutions/network-monetization`,
  `${BASE}/en/solutions/sts-dms`,
  `${BASE}/en/platforms`,
  `${BASE}/en/about`,
  `${BASE}/en/contact`,
  `${BASE}/en/partnership`,
  `${BASE}/en/stories`,
  `${BASE}/en/careers`,
];

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, urlList: urls }),
});

console.log(res.status, await res.text());
