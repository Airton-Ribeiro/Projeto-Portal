(()=>{"use strict";var n={355:(n,r,e)=>{e.d(r,{Z:()=>c});var t=e(537),o=e.n(t),a=e(645),i=e.n(a)()(o());i.push([n.id,"  /* .container {\n    max-width: 800px;\n    margin: 20px auto;\n    padding: 20px;\n    background-color: #ffffff;\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n    border-radius: 5px;\n  }\n\n  #titulo-index {\n    color: #007bff;\n    text-align: center;\n  }\n\n  #texto-index {\n    text-align: center;\n    color: #6c757d;\n  }\n\n  #tabela-index {\n    width: 100%;\n    border-collapse: collapse;\n    margin-top: 20px;\n  }\n\n  #th-index, #td-index {\n    padding: 12px;\n    text-align: left;\n    border-bottom: 1px solid #dee2e6;\n  }\n\n  .th-index-class {\n    background-color: #007bff;\n    color: #fff;\n  }\n\n  .tr-index:nth-child(even) {\n    background-color: #f2f2f2;\n  }\n\n  .a-index {\n    color: #007bff;\n    text-decoration: none;\n  }\n\n  .a-index:hover {\n    text-decoration: underline;\n  } */\n  #bg-image {\n    background-image:url(https://github.com/Astro-Dust/background/blob/main/background-projeto1.png?raw=true);\n    background-size: cover;\n    \n    /* Substitua 'url('caminho/da/imagem.jpg')' pelo caminho real da sua imagem */\n    /* background-image: url('/frontend/assets/images/background.png'); */\n    /* Ajuste a propriedade background-size conforme necessário */\n    /* background-size: cover; */\n    /* Ajuste a propriedade background-position conforme necessário */\n    /* background-position: center; */\n    /* Ajuste a propriedade background-repeat conforme necessário */\n}","",{version:3,sources:["webpack://./frontend/assets/css/style.css"],names:[],mappings:"EAAE;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;KA+CG;EACH;IACE,yGAAyG;IACzG,sBAAsB;;IAEtB,6EAA6E;IAC7E,qEAAqE;IACrE,6DAA6D;IAC7D,4BAA4B;IAC5B,iEAAiE;IACjE,iCAAiC;IACjC,+DAA+D;AACnE",sourcesContent:["  /* .container {\r\n    max-width: 800px;\r\n    margin: 20px auto;\r\n    padding: 20px;\r\n    background-color: #ffffff;\r\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\r\n    border-radius: 5px;\r\n  }\r\n\r\n  #titulo-index {\r\n    color: #007bff;\r\n    text-align: center;\r\n  }\r\n\r\n  #texto-index {\r\n    text-align: center;\r\n    color: #6c757d;\r\n  }\r\n\r\n  #tabela-index {\r\n    width: 100%;\r\n    border-collapse: collapse;\r\n    margin-top: 20px;\r\n  }\r\n\r\n  #th-index, #td-index {\r\n    padding: 12px;\r\n    text-align: left;\r\n    border-bottom: 1px solid #dee2e6;\r\n  }\r\n\r\n  .th-index-class {\r\n    background-color: #007bff;\r\n    color: #fff;\r\n  }\r\n\r\n  .tr-index:nth-child(even) {\r\n    background-color: #f2f2f2;\r\n  }\r\n\r\n  .a-index {\r\n    color: #007bff;\r\n    text-decoration: none;\r\n  }\r\n\r\n  .a-index:hover {\r\n    text-decoration: underline;\r\n  } */\r\n  #bg-image {\r\n    background-image:url(https://github.com/Astro-Dust/background/blob/main/background-projeto1.png?raw=true);\r\n    background-size: cover;\r\n    \r\n    /* Substitua 'url('caminho/da/imagem.jpg')' pelo caminho real da sua imagem */\r\n    /* background-image: url('/frontend/assets/images/background.png'); */\r\n    /* Ajuste a propriedade background-size conforme necessário */\r\n    /* background-size: cover; */\r\n    /* Ajuste a propriedade background-position conforme necessário */\r\n    /* background-position: center; */\r\n    /* Ajuste a propriedade background-repeat conforme necessário */\r\n}"],sourceRoot:""}]);const c=i},645:n=>{n.exports=function(n){var r=[];return r.toString=function(){return this.map((function(r){var e="",t=void 0!==r[5];return r[4]&&(e+="@supports (".concat(r[4],") {")),r[2]&&(e+="@media ".concat(r[2]," {")),t&&(e+="@layer".concat(r[5].length>0?" ".concat(r[5]):""," {")),e+=n(r),t&&(e+="}"),r[2]&&(e+="}"),r[4]&&(e+="}"),e})).join("")},r.i=function(n,e,t,o,a){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(t)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(i[s]=!0)}for(var d=0;d<n.length;d++){var u=[].concat(n[d]);t&&i[u[0]]||(void 0!==a&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=a),e&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=e):u[2]=e),o&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=o):u[4]="".concat(o)),r.push(u))}},r}},537:n=>{n.exports=function(n){var r=n[1],e=n[3];if(!e)return r;if("function"==typeof btoa){var t=btoa(unescape(encodeURIComponent(JSON.stringify(e)))),o="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(t),a="/*# ".concat(o," */");return[r].concat([a]).join("\n")}return[r].join("\n")}},379:n=>{var r=[];function e(n){for(var e=-1,t=0;t<r.length;t++)if(r[t].identifier===n){e=t;break}return e}function t(n,t){for(var a={},i=[],c=0;c<n.length;c++){var s=n[c],d=t.base?s[0]+t.base:s[0],u=a[d]||0,p="".concat(d," ").concat(u);a[d]=u+1;var l=e(p),f={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==l)r[l].references++,r[l].updater(f);else{var g=o(f,t);t.byIndex=c,r.splice(c,0,{identifier:p,updater:g,references:1})}i.push(p)}return i}function o(n,r){var e=r.domAPI(r);return e.update(n),function(r){if(r){if(r.css===n.css&&r.media===n.media&&r.sourceMap===n.sourceMap&&r.supports===n.supports&&r.layer===n.layer)return;e.update(n=r)}else e.remove()}}n.exports=function(n,o){var a=t(n=n||[],o=o||{});return function(n){n=n||[];for(var i=0;i<a.length;i++){var c=e(a[i]);r[c].references--}for(var s=t(n,o),d=0;d<a.length;d++){var u=e(a[d]);0===r[u].references&&(r[u].updater(),r.splice(u,1))}a=s}}},569:n=>{var r={};n.exports=function(n,e){var t=function(n){if(void 0===r[n]){var e=document.querySelector(n);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(n){e=null}r[n]=e}return r[n]}(n);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");t.appendChild(e)}},216:n=>{n.exports=function(n){var r=document.createElement("style");return n.setAttributes(r,n.attributes),n.insert(r,n.options),r}},565:(n,r,e)=>{n.exports=function(n){var r=e.nc;r&&n.setAttribute("nonce",r)}},795:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var r=n.insertStyleElement(n);return{update:function(e){!function(n,r,e){var t="";e.supports&&(t+="@supports (".concat(e.supports,") {")),e.media&&(t+="@media ".concat(e.media," {"));var o=void 0!==e.layer;o&&(t+="@layer".concat(e.layer.length>0?" ".concat(e.layer):""," {")),t+=e.css,o&&(t+="}"),e.media&&(t+="}"),e.supports&&(t+="}");var a=e.sourceMap;a&&"undefined"!=typeof btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),r.styleTagTransform(t,n,r.options)}(r,n,e)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(r)}}}},589:n=>{n.exports=function(n,r){if(r.styleSheet)r.styleSheet.cssText=n;else{for(;r.firstChild;)r.removeChild(r.firstChild);r.appendChild(document.createTextNode(n))}}}},r={};function e(t){var o=r[t];if(void 0!==o)return o.exports;var a=r[t]={id:t,exports:{}};return n[t](a,a.exports,e),a.exports}e.n=n=>{var r=n&&n.__esModule?()=>n.default:()=>n;return e.d(r,{a:r}),r},e.d=(n,r)=>{for(var t in r)e.o(r,t)&&!e.o(n,t)&&Object.defineProperty(n,t,{enumerable:!0,get:r[t]})},e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),e.o=(n,r)=>Object.prototype.hasOwnProperty.call(n,r),(()=>{var n;e.g.importScripts&&(n=e.g.location+"");var r=e.g.document;if(!n&&r&&(r.currentScript&&(n=r.currentScript.src),!n)){var t=r.getElementsByTagName("script");if(t.length)for(var o=t.length-1;o>-1&&!n;)n=t[o--].src}if(!n)throw new Error("Automatic publicPath is not supported in this browser");n=n.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=n})(),e.nc=void 0,(()=>{e.p;var n=e(379),r=e.n(n),t=e(795),o=e.n(t),a=e(569),i=e.n(a),c=e(565),s=e.n(c),d=e(216),u=e.n(d),p=e(589),l=e.n(p),f=e(355),g={};g.styleTagTransform=l(),g.setAttributes=s(),g.insert=i().bind(null,"head"),g.domAPI=o(),g.insertStyleElement=u(),r()(f.Z,g),f.Z&&f.Z.locals&&f.Z.locals})()})();
//# sourceMappingURL=bundle.js.map