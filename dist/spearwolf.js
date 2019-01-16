/*!
@file spearwolf-js - various javascript helpers and classes for various three.js/webgl experiments!
@author Wolfger Schramm <wolfger@spearwolf.de>
@version 0.0.1

Copyright 2016-2019 Wolfger Schramm

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((t=t||self).spearwolf={})}(this,function(t){"use strict";var n=function(t){return"object"==typeof t?null!==t:"function"==typeof t},e={}.toString,r=function(t){return e.call(t).slice(8,-1)};function i(t,n){return t(n={exports:{}},n.exports),n.exports}var o,u=i(function(t){var n=t.exports={version:"2.6.2"};"number"==typeof __e&&(__e=n)}),c=(u.version,i(function(t){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)})),s=i(function(t){var n=c["__core-js_shared__"]||(c["__core-js_shared__"]={});(t.exports=function(t,e){return n[t]||(n[t]=void 0!==e?e:{})})("versions",[]).push({version:u.version,mode:"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})}),a=0,f=Math.random(),l=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++a+f).toString(36))},p=i(function(t){var n=s("wks"),e=c.Symbol,r="function"==typeof e;(t.exports=function(t){return n[t]||(n[t]=r&&e[t]||(r?e:l)("Symbol."+t))}).store=n}),h=p("match"),g=function(t){var e;return n(t)&&(void 0!==(e=t[h])?!!e:"RegExp"==r(t))},v=function(t){if(!n(t))throw TypeError(t+" is not an object!");return t},y=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t},d=p("species"),b=Math.ceil,m=Math.floor,x=function(t){return isNaN(t=+t)?0:(t>0?m:b)(t)},S=function(t){if(null==t)throw TypeError("Can't call method on  "+t);return t},w=(o=!0,function(t,n){var e,r,i=String(S(t)),u=x(n),c=i.length;return u<0||u>=c?o?"":void 0:(e=i.charCodeAt(u))<55296||e>56319||u+1===c||(r=i.charCodeAt(u+1))<56320||r>57343?o?i.charAt(u):e:o?i.slice(u,u+2):r-56320+(e-55296<<10)+65536}),O=function(t,n,e){return n+(e?w(t,n).length:1)},_=Math.min,E=function(t){return t>0?_(x(t),9007199254740991):0},j=p("toStringTag"),k="Arguments"==r(function(){return arguments}()),P=RegExp.prototype.exec,T=function(t,n){var e,i,o,u,c=t.exec;if("function"==typeof c){var s=c.call(t,n);if("object"!=typeof s)throw new TypeError("RegExp exec method returned something other than an Object or null");return s}if("RegExp"!==(void 0===(e=t)?"Undefined":null===e?"Null":"string"==typeof(o=function(t,n){try{return t[n]}catch(t){}}(i=Object(e),j))?o:k?r(i):"Object"==(u=r(i))&&"function"==typeof i.callee?"Arguments":u))throw new TypeError("RegExp#exec called on incompatible receiver");return P.call(t,n)},I=function(){var t=v(this),n="";return t.global&&(n+="g"),t.ignoreCase&&(n+="i"),t.multiline&&(n+="m"),t.unicode&&(n+="u"),t.sticky&&(n+="y"),n},L=RegExp.prototype.exec,M=String.prototype.replace,R=L,C=function(){var t=/a/,n=/b*/g;return L.call(t,"a"),L.call(n,"a"),0!==t.lastIndex||0!==n.lastIndex}(),A=void 0!==/()??/.exec("")[1];(C||A)&&(R=function(t){var n,e,r,i,o=this;return A&&(e=new RegExp("^"+o.source+"$(?!\\s)",I.call(o))),C&&(n=o.lastIndex),r=L.call(o,t),C&&r&&(o.lastIndex=o.global?r.index+r[0].length:n),A&&r&&r.length>1&&M.call(r[0],e,function(){for(i=1;i<arguments.length-2;i++)void 0===arguments[i]&&(r[i]=void 0)}),r});var F=R,N=function(t){try{return!!t()}catch(t){return!0}},W=!N(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}),G=c.document,D=n(G)&&n(G.createElement),V=function(t){return D?G.createElement(t):{}},B=!W&&!N(function(){return 7!=Object.defineProperty(V("div"),"a",{get:function(){return 7}}).a}),H=function(t,e){if(!n(t))return t;var r,i;if(e&&"function"==typeof(r=t.toString)&&!n(i=r.call(t)))return i;if("function"==typeof(r=t.valueOf)&&!n(i=r.call(t)))return i;if(!e&&"function"==typeof(r=t.toString)&&!n(i=r.call(t)))return i;throw TypeError("Can't convert object to primitive value")},U=Object.defineProperty,$={f:W?Object.defineProperty:function(t,n,e){if(v(t),n=H(n,!0),v(e),B)try{return U(t,n,e)}catch(t){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},z=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}},q=W?function(t,n,e){return $.f(t,n,z(1,e))}:function(t,n,e){return t[n]=e,t},X={}.hasOwnProperty,Y=function(t,n){return X.call(t,n)},J=i(function(t){var n=l("src"),e=Function.toString,r=(""+e).split("toString");u.inspectSource=function(t){return e.call(t)},(t.exports=function(t,e,i,o){var u="function"==typeof i;u&&(Y(i,"name")||q(i,"name",e)),t[e]!==i&&(u&&(Y(i,n)||q(i,n,t[e]?""+t[e]:r.join(String(e)))),t===c?t[e]=i:o?t[e]?t[e]=i:q(t,e,i):(delete t[e],q(t,e,i)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[n]||e.call(this)})}),K=function(t,n,e){if(y(t),void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,r){return t.call(n,e,r)};case 3:return function(e,r,i){return t.call(n,e,r,i)}}return function(){return t.apply(n,arguments)}},Q=function(t,n,e){var r,i,o,s,a=t&Q.F,f=t&Q.G,l=t&Q.S,p=t&Q.P,h=t&Q.B,g=f?c:l?c[n]||(c[n]={}):(c[n]||{}).prototype,v=f?u:u[n]||(u[n]={}),y=v.prototype||(v.prototype={});for(r in f&&(e=n),e)o=((i=!a&&g&&void 0!==g[r])?g:e)[r],s=h&&i?K(o,c):p&&"function"==typeof o?K(Function.call,o):o,g&&J(g,r,o,t&Q.U),v[r]!=o&&q(v,r,s),p&&y[r]!=o&&(y[r]=o)};c.core=u,Q.F=1,Q.G=2,Q.S=4,Q.P=8,Q.B=16,Q.W=32,Q.U=64,Q.R=128;var Z=Q;Z({target:"RegExp",proto:!0,forced:F!==/./.exec},{exec:F});var tt=p("species"),nt=!N(function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}),et=function(){var t=/(?:)/,n=t.exec;t.exec=function(){return n.apply(this,arguments)};var e="ab".split(t);return 2===e.length&&"a"===e[0]&&"b"===e[1]}(),rt=Math.min,it=[].push,ot=!!function(){try{return new RegExp("x","y")}catch(t){}}();!function(t,n,e){var r=p(t),i=!N(function(){var n={};return n[r]=function(){return 7},7!=""[t](n)}),o=i?!N(function(){var n=!1,e=/a/;return e.exec=function(){return n=!0,null},"split"===t&&(e.constructor={},e.constructor[tt]=function(){return e}),e[r](""),!n}):void 0;if(!i||!o||"replace"===t&&!nt||"split"===t&&!et){var u=/./[r],c=e(S,r,""[t],function(t,n,e,r,o){return n.exec===F?i&&!o?{done:!0,value:u.call(n,e,r)}:{done:!0,value:t.call(e,n,r)}:{done:!1}}),s=c[0],a=c[1];J(String.prototype,t,s),q(RegExp.prototype,r,2==n?function(t,n){return a.call(t,this,n)}:function(t){return a.call(t,this)})}}("split",2,function(t,n,e,r){var i;return i="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,n){var r=String(this);if(void 0===t&&0===n)return[];if(!g(t))return e.call(r,t,n);for(var i,o,u,c=[],s=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),a=0,f=void 0===n?4294967295:n>>>0,l=new RegExp(t.source,s+"g");(i=F.call(l,r))&&!((o=l.lastIndex)>a&&(c.push(r.slice(a,i.index)),i.length>1&&i.index<r.length&&it.apply(c,i.slice(1)),u=i[0].length,a=o,c.length>=f));)l.lastIndex===i.index&&l.lastIndex++;return a===r.length?!u&&l.test("")||c.push(""):c.push(r.slice(a)),c.length>f?c.slice(0,f):c}:"0".split(void 0,0).length?function(t,n){return void 0===t&&0===n?[]:e.call(this,t,n)}:e,[function(e,r){var o=t(this),u=null==e?void 0:e[n];return void 0!==u?u.call(e,o,r):i.call(String(o),e,r)},function(t,n){var o=r(i,t,this,n,i!==e);if(o.done)return o.value;var u=v(t),c=String(this),s=function(t,n){var e,r=v(t).constructor;return void 0===r||null==(e=v(r)[d])?n:y(e)}(u,RegExp),a=u.unicode,f=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(ot?"y":"g"),l=new s(ot?u:"^(?:"+u.source+")",f),p=void 0===n?4294967295:n>>>0;if(0===p)return[];if(0===c.length)return null===T(l,c)?[c]:[];for(var h=0,g=0,b=[];g<c.length;){l.lastIndex=ot?g:0;var m,x=T(l,ot?c:c.slice(g));if(null===x||(m=rt(E(l.lastIndex+(ot?0:g)),c.length))===h)g=O(c,g,a);else{if(b.push(c.slice(h,g)),b.length===p)return b;for(var S=1;S<=x.length-1;S++)if(b.push(x[S]),b.length===p)return b;g=h=m}}return b.push(c.slice(h)),b}]});var ut,ct,st={f:{}.propertyIsEnumerable},at=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)},ft=function(t){return at(S(t))},lt=Object.getOwnPropertyDescriptor,pt={f:W?lt:function(t,n){if(t=ft(t),n=H(n,!0),B)try{return lt(t,n)}catch(t){}if(Y(t,n))return z(!st.f.call(t,n),t[n])}},ht=function(t,e){if(v(t),!n(e)&&null!==e)throw TypeError(e+": can't set as prototype!")},gt={set:Object.setPrototypeOf||("__proto__"in{}?function(t,n,e){try{(e=K(Function.call,pt.f(Object.prototype,"__proto__").set,2))(t,[]),n=!(t instanceof Array)}catch(t){n=!0}return function(t,r){return ht(t,r),n?t.__proto__=r:e(t,r),t}}({},!1):void 0),check:ht}.set,vt=Math.max,yt=Math.min,dt=s("keys"),bt=function(t){return dt[t]||(dt[t]=l(t))},mt=(ut=!1,function(t,n,e){var r,i=ft(t),o=E(i.length),u=function(t,n){return(t=x(t))<0?vt(t+n,0):yt(t,n)}(e,o);if(ut&&n!=n){for(;o>u;)if((r=i[u++])!=r)return!0}else for(;o>u;u++)if((ut||u in i)&&i[u]===n)return ut||u||0;return!ut&&-1}),xt=bt("IE_PROTO"),St=function(t,n){var e,r=ft(t),i=0,o=[];for(e in r)e!=xt&&Y(r,e)&&o.push(e);for(;n.length>i;)Y(r,e=n[i++])&&(~mt(o,e)||o.push(e));return o},wt="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","),Ot=wt.concat("length","prototype"),_t={f:Object.getOwnPropertyNames||function(t){return St(t,Ot)}},Et=p("species"),jt=$.f,kt=_t.f,Pt=c.RegExp,Tt=Pt,It=Pt.prototype,Lt=/a/g,Mt=/a/g,Rt=new Pt(Lt)!==Lt;if(W&&(!Rt||N(function(){return Mt[p("match")]=!1,Pt(Lt)!=Lt||Pt(Mt)==Mt||"/a/i"!=Pt(Lt,"i")}))){Pt=function(t,e){var r,i,o,u,c=this instanceof Pt,s=g(t),a=void 0===e;return!c&&s&&t.constructor===Pt&&a?t:(r=Rt?new Tt(s&&!a?t.source:t,e):Tt((s=t instanceof Pt)?t.source:t,s&&a?I.call(t):e),i=Pt,(u=(c?this:It).constructor)!==i&&"function"==typeof u&&(o=u.prototype)!==i.prototype&&n(o)&&gt&&gt(r,o),r)};for(var Ct=function(t){t in Pt||jt(Pt,t,{configurable:!0,get:function(){return Tt[t]},set:function(n){Tt[t]=n}})},At=kt(Tt),Ft=0;At.length>Ft;)Ct(At[Ft++]);It.constructor=Pt,Pt.prototype=It,J(c,"RegExp",Pt)}ct=c["RegExp"],W&&ct&&!ct[Et]&&$.f(ct,Et,{configurable:!0,get:function(){return this}});var Nt=new RegExp(/(.+)\[(\d+)\]$/),Wt=p("match"),Gt="".startsWith;Z(Z.P+Z.F*function(t){var n=/./;try{"/./"[t](n)}catch(e){try{return n[Wt]=!1,!"/./"[t](n)}catch(t){}}return!0}("startsWith"),"String",{startsWith:function(t){var n=function(t,n,e){if(g(n))throw TypeError("String#"+e+" doesn't accept regex!");return String(S(t))}(this,t,"startsWith"),e=E(Math.min(arguments.length>1?arguments[1]:void 0,n.length)),r=String(t);return Gt?Gt.call(n,r,e):n.slice(e,e+r.length)===r}});var Dt=Math.PI/180,Vt=p("unscopables"),Bt=Array.prototype;null==Bt[Vt]&&q(Bt,Vt,{});var Ht=function(t){Bt[Vt][t]=!0},Ut=function(t,n){return{value:n,done:!!t}},$t={},zt=Object.keys||function(t){return St(t,wt)},qt=W?Object.defineProperties:function(t,n){v(t);for(var e,r=zt(n),i=r.length,o=0;i>o;)$.f(t,e=r[o++],n[e]);return t},Xt=c.document,Yt=Xt&&Xt.documentElement,Jt=bt("IE_PROTO"),Kt=function(){},Qt=function(){var t,n=V("iframe"),e=wt.length;for(n.style.display="none",Yt.appendChild(n),n.src="javascript:",(t=n.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),Qt=t.F;e--;)delete Qt.prototype[wt[e]];return Qt()},Zt=Object.create||function(t,n){var e;return null!==t?(Kt.prototype=v(t),e=new Kt,Kt.prototype=null,e[Jt]=t):e=Qt(),void 0===n?e:qt(e,n)},tn=$.f,nn=p("toStringTag"),en=function(t,n,e){t&&!Y(t=e?t:t.prototype,nn)&&tn(t,nn,{configurable:!0,value:n})},rn={};q(rn,p("iterator"),function(){return this});var on=function(t,n,e){t.prototype=Zt(rn,{next:z(1,e)}),en(t,n+" Iterator")},un=bt("IE_PROTO"),cn=Object.prototype,sn=Object.getPrototypeOf||function(t){return t=Object(S(t)),Y(t,un)?t[un]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?cn:null},an=p("iterator"),fn=!([].keys&&"next"in[].keys()),ln=function(){return this},pn=function(t,n,e,r,i,o,u){on(e,n,r);var c,s,a,f=function(t){if(!fn&&t in g)return g[t];switch(t){case"keys":case"values":return function(){return new e(this,t)}}return function(){return new e(this,t)}},l=n+" Iterator",p="values"==i,h=!1,g=t.prototype,v=g[an]||g["@@iterator"]||i&&g[i],y=v||f(i),d=i?p?f("entries"):y:void 0,b="Array"==n&&g.entries||v;if(b&&(a=sn(b.call(new t)))!==Object.prototype&&a.next&&(en(a,l,!0),"function"!=typeof a[an]&&q(a,an,ln)),p&&v&&"values"!==v.name&&(h=!0,y=function(){return v.call(this)}),(fn||h||!g[an])&&q(g,an,y),$t[n]=y,$t[l]=ln,i)if(c={values:p?y:f("values"),keys:o?y:f("keys"),entries:d},u)for(s in c)s in g||J(g,s,c[s]);else Z(Z.P+Z.F*(fn||h),n,c);return c}(Array,"Array",function(t,n){this._t=ft(t),this._i=0,this._k=n},function(){var t=this._t,n=this._k,e=this._i++;return!t||e>=t.length?(this._t=void 0,Ut(1)):Ut(0,"keys"==n?e:"values"==n?t[e]:[e,t[e]])},"values");$t.Arguments=$t.Array,Ht("keys"),Ht("values"),Ht("entries");for(var hn=p("iterator"),gn=p("toStringTag"),vn=$t.Array,yn={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},dn=zt(yn),bn=0;bn<dn.length;bn++){var mn,xn=dn[bn],Sn=yn[xn],wn=c[xn],On=wn&&wn.prototype;if(On&&(On[hn]||q(On,hn,vn),On[gn]||q(On,gn,xn),$t[xn]=vn,Sn))for(mn in pn)On[mn]||J(On,mn,pn[mn],!0)}function _n(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var En=function(){function t(n,e,r,i){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.left=n,this.top=e,this.width=r,this.height=i}var n,e,r;return n=t,(e=[{key:"clone",value:function(){return new t(this.left,this.top,this.width,this.height)}},{key:"isInside",value:function(t,n){return this.left<=t&&t<this.right&&this.top<=n&&n<this.bottom}},{key:"isIntersecting",value:function(t){return!(t.right<=this.left||t.left>=this.right||t.bottom<=this.top||t.top>=this.bottom)}},{key:"isNorthWest",value:function(t,n){return(this.right<=t||this.left<t)&&(this.top<n||this.bottom<=n)}},{key:"isNorthEast",value:function(t,n){return(this.right>t||this.left>=t)&&(this.top<n||this.bottom<=n)}},{key:"isSouthEast",value:function(t,n){return(this.right>t||this.left>=t)&&(this.top>=n||this.bottom>n)}},{key:"isSouthWest",value:function(t,n){return(this.right<=t||this.left<t)&&(this.top>=n||this.bottom>n)}},{key:"right",get:function(){return this.left+this.width}},{key:"bottom",get:function(){return this.top+this.height}},{key:"centerX",get:function(){return this.left+this.width/2}},{key:"centerY",get:function(){return this.top+this.height/2}}])&&_n(n.prototype,e),r&&_n(n,r),t}();t.findNextPowerOf2=function(t){for(var n=1;t>n;)n<<=1;return n},t.get=function t(n,e){if(null!=n){if(e in n)return n[e];var r=e.split(/[.]/),i=function(t,n){var e=Nt.exec(n);if(e){var r=t[e[1]];return null!=r?r[parseInt(e[2],10)]:void 0}return t[n]}(n,r.shift());return null!=i&&r.length?t(i,r.join(".")):i}},t.hexCol2rgb=function(t){var n=t.startsWith("#")?1:0;return[parseInt(t.substring(n,n+2),16),parseInt(t.substring(n+2,n+4),16),parseInt(t.substring(n+4,n+6),16)]},t.hexCol2rgba=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:255,e=t.startsWith("#")?1:0;return[parseInt(t.substring(e,e+2),16),parseInt(t.substring(e+2,e+4),16),parseInt(t.substring(e+4,e+6),16),n]},t.isPowerOf2=function(t){return 0!==t&&0==(t&t-1)},t.makeCircleCoords=function(t){for(var n=.5*(arguments.length>1&&void 0!==arguments[1]?arguments[1]:1),e=360/t,r=[],i=0,o=0;i<t;i++)r.push([n*Math.sin(o*Dt),n*Math.cos(o*Dt)]),o+=e;return r},t.maxOf=function(t,n){return t>n?t:n},t.pick=function(t){return function(n){var e={};return n&&t.forEach(function(t){var r=n[t];void 0!==r&&(e[t]=r)}),e}},t.readOption=function(t,n,e,r){if(t){var i=t[n];if(void 0!==i)return i}return"function"==typeof e?e(r):e},t.sample=function(t){return t[Math.random()*t.length|0]},t.toFloatColors=function(t){return t.map(function(t){return t/255})},t.AABB2=En,Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=spearwolf.js.map
