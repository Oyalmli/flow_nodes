"use strict";(self.webpackChunkflow_nodes=self.webpackChunkflow_nodes||[]).push([[3047],{595:function(e){function n(e){!function(e){function n(e,n){return"___"+e.toUpperCase()+n+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(t,a,o,r){if(t.language===a){var u=t.tokenStack=[];t.code=t.code.replace(o,(function(e){if("function"===typeof r&&!r(e))return e;for(var o,c=u.length;-1!==t.code.indexOf(o=n(a,c));)++c;return u[c]=e,o})),t.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(t,a){if(t.language===a&&t.tokenStack){t.grammar=e.languages[a];var o=0,r=Object.keys(t.tokenStack);!function u(c){for(var i=0;i<c.length&&!(o>=r.length);i++){var s=c[i];if("string"===typeof s||s.content&&"string"===typeof s.content){var l=r[o],p=t.tokenStack[l],f="string"===typeof s?s:s.content,g=n(a,l),k=f.indexOf(g);if(k>-1){++o;var d=f.substring(0,k),h=new e.Token(a,e.tokenize(p,t.grammar),"language-"+a,p),m=f.substring(k+g.length),y=[];d&&y.push.apply(y,u([d])),y.push(h),m&&y.push.apply(y,u([m])),"string"===typeof s?c.splice.apply(c,[i,1].concat(y)):s.content=y}}else s.content&&u(s.content)}return c}(t.tokens)}}}})}(e)}e.exports=n,n.displayName="markupTemplating",n.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_markupTemplating.ed274de9.chunk.js.map