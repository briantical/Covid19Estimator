!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=14)}({14:function(e,t){const n=e=>{const t=.15*e;return Math.trunc(t)},r=(e,t)=>{const n=.35*e-t;return Math.trunc(n)},o=e=>{const t=.05*e;return Math.trunc(t)},s=e=>{const t=.02*e;return Math.trunc(t)},u=(e,t,n,r)=>{const o=e*t*n/r;return Math.trunc(o)};e.exports=e=>{const{reportedCases:t,periodType:c,totalHospitalBeds:i,region:{avgDailyIncomeInUSD:a,avgDailyIncomePopulation:l}}=e;let{timeToElapse:d}=e;d=((e,t)=>{switch(e){case"weeks":return 7*t;case"months":return 30*t;default:return t}})(c,d);const f=Math.floor(d/3),y={},p={};y.currentlyInfected=10*t;const{currentlyInfected:m}=y;y.infectionsByRequestedTime=m*2**f;const{infectionsByRequestedTime:T}=y;y.severeCasesByRequestedTime=n(T);const{severeCasesByRequestedTime:B}=y;y.hospitalBedsByRequestedTime=r(i,B),y.casesForICUByRequestedTime=o(T),y.casesForVentilatorsByRequestedTime=s(T),y.dollarsInFlight=u(T,a,l,d),p.currentlyInfected=50*t;const{currentlyInfected:v}=p;p.infectionsByRequestedTime=v*2**f;const{infectionsByRequestedTime:q}=p;p.severeCasesByRequestedTime=n(q);const{severeCasesByRequestedTime:R}=p;return p.hospitalBedsByRequestedTime=r(i,R),p.casesForICUByRequestedTime=o(q),p.casesForVentilatorsByRequestedTime=s(q),p.dollarsInFlight=u(q,a,l,d),{data:e,impact:y,severeImpact:p}}}}));