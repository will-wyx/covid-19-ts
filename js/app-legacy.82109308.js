(function(){"use strict";var e={204:function(e,n,t){t(6992),t(8674),t(9601),t(7727);var a=t(9567),i=t(4549),r=t.n(i),o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"app",attrs:{id:"app"}},[t("peoples-tree",{ref:"tree",staticClass:"app__tree",attrs:{peoples:e.peoples,expanded:e.expanded,loading:e.loading,"max-index":e.maxIndex},on:{change:e.handleChange,click:e.handleNodeClick}}),t("div",{staticClass:"app__main"},[t("div",{staticClass:"app__filter"},e._l(e.areas,(function(n,a){return t("el-checkbox",{key:a,on:{change:e.handleAreaChange},model:{value:n.checked,callback:function(t){e.$set(n,"checked",t)},expression:"area.checked"}},[e._v(e._s(n.label)+"("+e._s(n.count)+") ")])})),1),t("a-map",{ref:"map",staticClass:"app__map",attrs:{points:e.points},on:{click:e.handleMarkerClick}})],1)],1)},c=[],l=t(3019),s=(t(1539),t(1249),t(9826),t(2222),t(8783),t(3948),t(4747),t(8309),t(7042),t(4916),t(4765),function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"a-map"},[t("div",{ref:"amap",staticClass:"a-map__map"}),t("div",{ref:"marker",staticClass:"a-map__marker"},[t("p",[e._v(e._s(e.current.id))]),t("p",[e._v(e._s(e.current.title))])])])}),u=[],d=t(9648),f=t.n(d),p={name:"AMap",data:function(){return{map:null,cluster:null,AMap:null,infoWindow:null,current:{id:"",title:""}}},props:{points:{type:Array,default:function(){return[]}}},mounted:function(){this.initMap()},watch:{points:function(e){var n=this,t=[];e.forEach((function(e){e.location?t.push({id:e.id,title:e.origin,lnglat:[e.location.lng,e.location.lat]}):console.log(e.id,e.origin)})),this.cluster&&this.cluster.setMap(null),this.cluster=new this.AMap.MarkerCluster(this.map,t,{gridSize:60}),this.cluster.on("click",(function(e){var t=e.clusterData,a=e.lnglat,i=t[0],r=i.id,o=i.title;n.current.id=r,n.current.title=o,n.infoWindow.open(n.map,a),n.$emit("click",{id:r,title:o})})),this.map.setFitView(null,!0),this.infoWindow.close()}},methods:{initMap:function(){var e=this,n=this.$refs.amap;f().load({key:"d786ac93724ce3d6658748d66cf5be5b",version:"2.0",plugins:["AMap.MarkerCluster","AMap.AutoComplete"]}).then((function(t){e.AMap=t,e.map=new t.Map(n,{viewMode:"2D",zoom:10,center:[118.144541,39.696604]});var a=e.$refs.marker;e.infoWindow=new t.InfoWindow({anchor:"top-left",content:a})})).catch((function(e){console.log(e)}))},searchPoint:function(e){var n={city:"唐山市"},t=new this.AMap.AutoComplete(n);return new Promise((function(n,a){t.search(e.name,(function(t,i){if("OK"===i.info){var r=i.tips[0],o=r.district,c=r.name,l=r.location,s={id:e.id,origin:e.name,district:o,name:c,location:{lng:l.lng,lat:l.lat}};n(s)}else a("err")}))}))},setCenter:function(e){var n=e.location;this.map.setZoomAndCenter(17,[n.lng,n.lat],!0)}}},h=p,m=t(1001),v=(0,m.Z)(h,s,u,!1,null,"4908f708",null),g=v.exports,k=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("el-tree",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"tree",staticClass:"peoples-tree",attrs:{"node-key":"id","default-expanded-keys":e.expanded,"show-checkbox":"",data:e.treeData,props:e.defaultProps},on:{check:e.handleCheck,"node-click":e.handleClick,"node-contextmenu":e.handleContextmenu},scopedSlots:e._u([{key:"default",fn:function(n){var a=n.node,i=n.data;return t("span",{staticClass:"peoples-tree__label",class:{accurate0:3===a.level&&!i.accurate,accurate1:3===a.level&&1===i.accurate,accurate2:3===a.level&&2===i.accurate}},[e._v(" "+e._s(i.label)+" ")])}}])})},b=[],C=(t(9653),t(2707),t(7327),t(8862),{name:"PeoplesTree",data:function(){return{data:[],defaultProps:{label:"label",children:"children"},rid:0}},props:{peoples:{type:Array,default:function(){return[]}},loading:{type:Boolean,default:!1},expanded:{type:Array,default:function(){return[]}},maxIndex:{type:Number,default:0}},computed:{treeData:function(){var e=[],n=[];return this.peoples.forEach((function(t){var a,i=t.id.slice(0,1),r=t.id.slice(1);a="Q"===i?e:n;var o=t.track.map((function(e){return(0,l.Z)({label:e.origin||e.name},e)}));a.push({id:t.id,no:+r,label:"".concat(r," ").concat(t.area," (").concat(o.length,")"),children:o})})),e.sort((function(e,n){return e.no-n.no})),n.sort((function(e,n){return e.no-n.no})),[{id:"q",label:"确诊 [".concat(e.length,"]"),children:e},{id:"w",label:"无症状 [".concat(n.length,"]"),children:n}]}},watch:{maxIndex:function(e){this.rid=e}},methods:{handleCheck:function(e,n){var t=n.checkedNodes,a=t.filter((function(e){return!e.children}));this.$emit("change",a)},handleClick:function(e){e.location&&this.$emit("click",e)},handleContextmenu:function(e,n){if(n.location){var t=JSON.stringify({rid:++this.rid,district:n.district,name:n.name,location:n.location});console.log(t)}},checkAreas:function(e){var n=[];this.peoples.forEach((function(t){e.some((function(e){return e===t.area}))&&n.push(t.id)}));var t=this.$refs.tree;t.setCheckedKeys(n);var a=t.getCheckedNodes();this.handleCheck(null,{checkedNodes:a})}}}),_=C,x=(0,m.Z)(_,k,b,!1,null,"2325ce02",null),y=x.exports,w=t(6166),A=t.n(w),M=A().create({timeout:3e5}),O=M,P={name:"App",components:{PeoplesTree:y,AMap:g},data:function(){return{peoples:[],points:[],AMap:null,loading:!1,expanded:[],maxIndex:0,areas:[]}},created:function(){var e=this;f().load({key:"d786ac93724ce3d6658748d66cf5be5b",version:"2.0",plugins:["AMap.AutoComplete"]}).then((function(n){e.AMap=n,e.loadData()})).catch((function(e){console.log(e)}))},methods:{loadData:function(){var e=this;this.loading=!0,O.get("data/data.json").then((function(n){var t=n.data,a=[];e.maxIndex=t.positions.reduce((function(e,n){return e.rid>n.rid?e.rid:n.rid}));var i=t.peoples.map((function(n){var i=e.areas.find((function(e){return e.label===n.area}));i?i.count++:e.areas.push({label:n.area,checked:!1,count:1});var r=n.track.map((function(i,r){var o;return i.rid?o=(0,l.Z)((0,l.Z)({},i),t.positions.find((function(e){return e.rid===i.rid}))):(o=(0,l.Z)({},i),0!==i.accurate&&a.push(e.searchPoint(o))),o.id="".concat(n.id,"-").concat(r),o}));return(0,l.Z)((0,l.Z)({},n),{},{track:r})}));Promise.all(a).then((function(n){n.forEach((function(e){var n=e.data,t=e.pos;n.district=t.district,n.name=t.name,n.location=t.location,n.accurate=t.accurate})),e.peoples=i,e.loading=!1})).catch((function(e){console.log("err",e)}))}))},handleChange:function(e){this.points=e},handleNodeClick:function(e){this.$refs.map.setCenter(e)},handleMarkerClick:function(e){this.expanded=[e.id.slice(0,5)]},handleAreaChange:function(){var e=[];this.areas.forEach((function(n){n.checked&&e.push(n.label)})),this.$refs.tree.checkAreas(e)},searchPoint:function(e){var n=this,t={city:"唐山市"};return new Promise((function(a,i){var r=new n.AMap.AutoComplete(t);r.search(e.origin,(function(n,t){if(t){var r;if("OK"===t.info){var o=t.tips[0],c=o.district,l=o.name,s=o.location;r={district:c,name:l,location:{lng:s.lng,lat:s.lat},accurate:1}}else r={accurate:0};a({data:e,pos:r})}else i({status:n,result:t,origin:e.origin})}))}))}}},$=P,Z=(0,m.Z)($,o,c,!1,null,null,null),j=Z.exports;window._AMapSecurityConfig={securityJsCode:"30eb50807133bec74365efaac53b226a"},a["default"].use(r()),a["default"].config.productionTip=!1,new a["default"]({render:function(e){return e(j)}}).$mount("#app")}},n={};function t(a){var i=n[a];if(void 0!==i)return i.exports;var r=n[a]={exports:{}};return e[a].call(r.exports,r,r.exports,t),r.exports}t.m=e,function(){var e=[];t.O=function(n,a,i,r){if(!a){var o=1/0;for(u=0;u<e.length;u++){a=e[u][0],i=e[u][1],r=e[u][2];for(var c=!0,l=0;l<a.length;l++)(!1&r||o>=r)&&Object.keys(t.O).every((function(e){return t.O[e](a[l])}))?a.splice(l--,1):(c=!1,r<o&&(o=r));if(c){e.splice(u--,1);var s=i();void 0!==s&&(n=s)}}return n}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[a,i,r]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var a in n)t.o(n,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:n[a]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};t.O.j=function(n){return 0===e[n]};var n=function(n,a){var i,r,o=a[0],c=a[1],l=a[2],s=0;if(o.some((function(n){return 0!==e[n]}))){for(i in c)t.o(c,i)&&(t.m[i]=c[i]);if(l)var u=l(t)}for(n&&n(a);s<o.length;s++)r=o[s],t.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return t.O(u)},a=self["webpackChunkcovid_19_ts"]=self["webpackChunkcovid_19_ts"]||[];a.forEach(n.bind(null,0)),a.push=n.bind(null,a.push.bind(a))}();var a=t.O(void 0,[998],(function(){return t(204)}));a=t.O(a)})();
//# sourceMappingURL=app-legacy.82109308.js.map