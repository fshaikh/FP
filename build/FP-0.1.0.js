var FP=FP||{};!function(a){"use strict";var b={},c=null,d="constructorProxy",e="get",f="set",g="apply",h=function(){return c?c:c="object"==typeof self&&self.self===self&&self||"object"==typeof global&&global.global===global&&global},i=function(a,b,c){return c?k(a,b.extend):j(a)},j=function(a){var b=function(b){b=z(a,b),y(this,b),this._className=a,l(this,b)};return b},k=function(a,b){var c=m(b);if(c){var d=function(b){b=z(a,b),c.data.ctor.call(this,b),this._className=a,this.base=E(E(this))};return d.prototype=F(c),d}},l=function(a,b){a[d]&&a[d].call(a,b)},m=function(a){var c=b[a];return c},n=function(a){b[a.className]=a},o=function(a,b){x(a.prototype,b),b&&b.config&&B(a.prototype,b.config)},p=function(a,b,c){var d=c?c.static:null;d&&(q(b,d),r(b,d))},q=function(a,b){y(a,b)},r=function(a,b){x(a,b)},s=function(a,b){if(b&&b.mixin)for(var c=b.mixin,d=c.length,e=0;e<d;e++)t(c[e],a.prototype)},t=function(a,b){var c=m(a);if(c){var d=c.data.options;for(var e in d)d.hasOwnProperty(e)&&(b[e]=d[e])}},u=function(a,b){b&&b.singleton&&b.singleton!==!1&&v(a,b)},v=function(a,b){a.instance=null,a.getInstance=function(b){a.instance;return a.instance?a.instance:(a.instance=w(a,b),a.instance)}},w=function(a,b){return new a(b)},x=function(a,b){for(var c in b)b.hasOwnProperty(c)&&"function"==typeof b[c]&&("constructor"===c?a[d]=b[c]:a[c]=b[c])},y=function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])},z=function(a,c){var d=b[a],e=d.data.options?d.data.options.config:null;if(c=c||{},e)for(var f in e)e.hasOwnProperty(f)&&(c.hasOwnProperty(f)||(c[f]=e[f]));return c},A=function(a,c){var d=b[c.extend];return!d||!(!d.data.options||!d.data.options.sealed)},B=function(a,b){if(b&&"object"==typeof b)for(var c in b)if(b.hasOwnProperty(c)){var d=c;d=d.replace(d.charAt(0),d.charAt(0).toLocaleUpperCase());var g=e+d;a[g]=C(c);var h=f+d;a[h]=D(c,d),B(a,b[c])}},C=function(a){return function(){return this[a]}},D=function(a,b){return function(c){var d=c,e=g+b;this[e]&&(d=this[e].call(this,c)),this[a]="undefined"==typeof d?this[a]:d}},E=function(a){var b;return b="undefined"!=typeof Object.getPrototypeOf?Object.getPrototypeOf(a):a.__proto__},F=function(a){var b;return b="undefined"==typeof Object.create?new a.data.ctor:Object.create(a.data.ctor.prototype)},G=function(a,b){var c=i(a,b,!1);r(c,b),K(a,c,b),M(a,b,c)},H=function(a,b,c){if(c&&c.overload){var d=c.overload;I(d,a,b.prototype)}},I=function(a,b,c){for(var d=0;d<a.length;d++)for(var e=a[d],f=e.name,g=e.functions,h=g.length,i=0;i<h;i++)J(c,f,g[i])},J=function(a,b,c){var d=a[b];a[b]=function(){return c.length===arguments.length?c.apply(this,arguments):"function"==typeof d?d.apply(this,arguments):void 0}},K=function(a,b,c){var d=L(a,b,c);n(d)},L=function(a,b,c){return{className:a,data:{ctor:b,options:c}}},M=function(a,b,c){var d=a.indexOf(".")!==-1;if(!d)return void(h()[a]=c);for(var e=a.split("."),f=e.length,g=h(),i=g,j=0;j<f;j++){var k=e[j];i[k]||(i[k]=j===f-1?c:{}),i=i[k]}};a.define=function(a,b){var c=!!b&&!!b.staticClass;if(c)return void G(a,b);var d=!!b&&!!b.extend;if(d&&A(a,b))throw"Parent object is marked as sealed.";var e=i(a,b,d);o(e,b),H(a,e,b),p(a,e,b),s(e,b),u(e,b),K(a,e,b),M(a,b,e)},a.create=function(a,b){var c=m(a);return c?c.data.options&&c.data.options.singleton&&c.data.options.singleton!==!1?c.data.ctor.getInstance(b):w(c.data.ctor,b):null},a.getClasses=function(){return b},a.setGlobalScope=function(a){c=a},FP.define("FP.Util",{staticClass:!0,isNaN:function(a){return"number"==typeof a&&a!==a},isInteger:function(a){}}),Object.freeze&&Object.freeze(FP)}(FP);