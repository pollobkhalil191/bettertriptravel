(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[270],{8019:(e,t,s)=>{Promise.resolve().then(s.bind(s,893))},6964:(e,t,s)=>{"use strict";s.d(t,{A:()=>a});let l=s(2651).A.create({baseURL:"https://btt.triumphdigital.co.th/api",headers:{"Content-Type":"application/json"}});l.interceptors.request.use(e=>{let t=localStorage.getItem("token");return t&&(e.headers.Authorization="Bearer ".concat(t)),e});let a=l},893:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>u});var l=s(5155),a=s(2115),r=s(6964);let i=e=>{let{filters:t,setFilters:s,sort:a,setSort:r,setFilterPopup:i}=e;return(0,l.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[(0,l.jsxs)("div",{className:"flex gap-4",children:[(0,l.jsxs)("select",{className:"p-2 border rounded",value:t.price,onChange:e=>s({...t,price:e.target.value}),children:[(0,l.jsx)("option",{value:"",children:"Price"}),(0,l.jsx)("option",{value:"low",children:"Low"}),(0,l.jsx)("option",{value:"high",children:"High"})]}),(0,l.jsxs)("select",{className:"p-2 border rounded",value:t.language,onChange:e=>s({...t,language:e.target.value}),children:[(0,l.jsx)("option",{value:"",children:"Language"}),(0,l.jsx)("option",{value:"en",children:"English"}),(0,l.jsx)("option",{value:"fr",children:"French"})]}),(0,l.jsxs)("select",{className:"p-2 border rounded",value:t.duration,onChange:e=>s({...t,duration:e.target.value}),children:[(0,l.jsx)("option",{value:"",children:"Duration"}),(0,l.jsx)("option",{value:"short",children:"Short"}),(0,l.jsx)("option",{value:"long",children:"Long"})]}),(0,l.jsxs)("select",{className:"p-2 border rounded",value:t.time,onChange:e=>s({...t,time:e.target.value}),children:[(0,l.jsx)("option",{value:"",children:"Time"}),(0,l.jsx)("option",{value:"morning",children:"Morning"}),(0,l.jsx)("option",{value:"evening",children:"Evening"})]})]}),(0,l.jsxs)("div",{className:"flex items-center gap-4",children:[(0,l.jsxs)("select",{className:"p-2 border rounded",value:a,onChange:e=>r(e.target.value),children:[(0,l.jsx)("option",{value:"recommended",children:"Recommended"}),(0,l.jsx)("option",{value:"price-low-high",children:"Price: Low to High"}),(0,l.jsx)("option",{value:"price-high-low",children:"Price: High to Low"})]}),(0,l.jsx)("button",{onClick:()=>i(!0),className:"p-2 bg-blue-500 z-[1111] text-white rounded",children:"Filter"})]})]})};var n=s(5565),o=s(7396),c=s(1536);let d=e=>{let{tour:t}=e,{score_total:s,total_review:a}=t.review_score;return(0,l.jsx)(o.default,{href:"/tour/".concat(t.id),children:(0,l.jsxs)("div",{className:"tour-card bg-white rounded-lg overflow-hidden cursor-pointer shadow-md transition-transform duration-300 hover:scale-105",children:[(0,l.jsx)("div",{className:"relative",children:(0,l.jsx)(n.default,{width:500,height:300,src:t.image,alt:t.title,className:"w-full h-48 object-cover"})}),(0,l.jsxs)("div",{className:"p-4 border-t",children:[(0,l.jsx)("p",{className:"text-sm text-gray-500",children:(0,l.jsx)(o.default,{href:"/Tours?location_id=".concat(t.location.id),className:"text-blue-500 hover:underline",children:t.location.name})}),(0,l.jsx)("h3",{className:"text-xl font-semibold text-gray-800 line-clamp-2",children:t.title}),(0,l.jsxs)("div",{className:"mt-2 space-y-1",children:[(0,l.jsx)("p",{className:"text-sm text-gray-500",children:t.duration}),(0,l.jsxs)("div",{className:"flex items-center space-x-1",children:[(()=>{let e=[];for(let t=1;t<=5;t++)e.push(t<=s?(0,l.jsx)(c.gt3,{className:"text-yellow-500"},t):(0,l.jsx)(c.wei,{className:"text-gray-300"},t));return e})()," ",(0,l.jsxs)("span",{className:"text-sm text-gray-600 ml-1",children:["(",a,")"]})]}),(0,l.jsxs)("p",{className:"text-lg font-bold text-primary",children:["From ",(0,l.jsx)("span",{className:"font-semibold",children:t.sale_price}),(0,l.jsx)("span",{className:"text-sm font-light",children:" per person"})]})]})]})]})},t.id)},u=()=>{let[e,t]=(0,a.useState)([]),[s,n]=(0,a.useState)(null),[o,c]=(0,a.useState)(null),[u,h]=(0,a.useState)({price:"",language:"",duration:"",time:""}),[m,x]=(0,a.useState)("recommended"),[g,p]=(0,a.useState)(!1);(0,a.useEffect)(()=>{let e=new URLSearchParams(window.location.search).get("location_id");e?c(e):c(null)},[]),(0,a.useEffect)(()=>{(async()=>{try{let l=[],a=1,i=!0;for(;i;){var e,s;let t=await r.A.get("/tour/search",{params:{location_id:o||"",limit:10,page:a}}),n=t.data.data||[];l=[...l,...n],i=null!==(s=null===(e=t.data.meta)||void 0===e?void 0:e.has_more)&&void 0!==s?s:n.length>0,a++}t(l)}catch(e){e instanceof Error?console.error("Error fetching tours:",e.message):console.error("Unexpected error:",e),n("Failed to fetch tours")}})()},[o]);let j=e.filter(e=>{let t=!u.price||e.sale_price===u.price,s=!u.language||e.title.includes(u.language),l=!u.duration||e.duration.includes(u.duration),a=!u.time||e.duration.includes(u.time);return t&&s&&l&&a});return s?(0,l.jsx)("div",{children:s}):(0,l.jsxs)("div",{className:"p-4 lg:px-14 lg:py-14",children:[(0,l.jsx)(i,{filters:u,setFilters:h,sort:m,setSort:x,setFilterPopup:p}),(0,l.jsxs)("div",{className:"mb-4 text-gray-700",children:[(0,l.jsx)("span",{className:"font-semibold",children:j.length})," Tours Found"]}),g&&(0,l.jsx)("div",{className:"fixed inset-0 flex justify-center items-center bg-black bg-opacity-50",children:(0,l.jsxs)("div",{className:"bg-white p-6 rounded-lg shadow-lg w-[645px] h-[530px]",children:[(0,l.jsx)("h2",{className:"text-lg font-bold mb-4",children:"Filter Options"}),(0,l.jsx)("button",{onClick:()=>p(!1),className:"mt-4 p-2 bg-red-500 text-white rounded",children:"Close"})]})}),(0,l.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8",children:j.map(e=>(0,l.jsx)(d,{tour:e},e.id))})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[711,565,651,234,441,517,358],()=>t(8019)),_N_E=e.O()}]);