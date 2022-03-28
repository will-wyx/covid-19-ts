(function(){"use strict";var e={497:function(e,t,a){var n=a(8935),o=a(4549),i=a.n(o),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app",attrs:{id:"app"}},[a("peoples-tree",{ref:"tree",staticClass:"app__tree",attrs:{peoples:e.peoples,expanded:e.expanded,loading:e.loading,"max-index":e.maxIndex},on:{"update:maxIndex":function(t){e.maxIndex=t},"update:max-index":function(t){e.maxIndex=t},change:e.handleChange,click:e.handleNodeClick}}),a("div",{staticClass:"app__main"},[a("div",{staticClass:"app__filter"},[a("el-select",{staticClass:"app__filter__item",attrs:{multiple:"",placeholder:"请选择",size:"mini"},on:{change:e.filterPeoples},model:{value:e.areas,callback:function(t){e.areas=t},expression:"areas"}},e._l(e.options.areas,(function(t){return a("el-option",{key:t.value,staticClass:"app__option",attrs:{label:t.label,value:t.value}},[a("span",{staticClass:"app__option__label"},[e._v(e._s(t.label))]),a("span",{staticClass:"app__option__count"},[e._v(e._s(t.countQ)+"+"+e._s(t.countW))])])})),1),a("el-select",{staticClass:"app__filter__item",attrs:{multiple:"",placeholder:"请选择",size:"mini"},on:{change:e.filterPeoples},model:{value:e.dates,callback:function(t){e.dates=t},expression:"dates"}},e._l(e.options.dates,(function(t){return a("el-option",{key:t.value,staticClass:"app__option",attrs:{label:t.label,value:t.value}},[a("span",{staticClass:"app__option__label"},[e._v(e._s(t.label))]),a("span",{staticClass:"app__option__count"},[e._v(e._s(t.countQ)+"+"+e._s(t.countW))])])})),1),e._l(e.topPositions,(function(t){return a("el-tag",{key:t.rid,staticClass:"app__top__item",attrs:{size:"mini"}},[e._v(e._s(t.name)+"["+e._s(t.count)+"] ")])}))],2),a("a-map",{ref:"map",staticClass:"app__map",attrs:{points:e.points},on:{click:e.handleMarkerClick}})],1)],1)},l=[],c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"a-map"},[a("div",{ref:"amap",staticClass:"a-map__map"}),a("div",{ref:"marker",staticClass:"a-map__marker"},e._l(e.currentCluster,(function(t){return a("div",{key:t.id,staticClass:"a-map__marker__item"},[a("p",{staticClass:"marker__title"},[e._v(e._s(t.id))]),a("p",{staticClass:"marker__content"},[e._v(e._s(t.title))])])})),0)])},r=[],d=a(9648),p=a.n(d),u={name:"AMap",data(){return{map:null,cluster:null,AMap:null,geocoder:null,infoWindow:null,currentCluster:[]}},props:{points:{type:Array,default:()=>[]}},mounted(){this.initMap()},watch:{points(e){const t=[];e.forEach((e=>{e.location?t.push({id:e.id,title:e.origin,lnglat:[e.location.lng,e.location.lat]}):console.log(e.id,e.origin)})),this.cluster&&this.cluster.setMap(null),this.cluster=new this.AMap.MarkerCluster(this.map,t,{gridSize:60}),this.cluster.on("click",(({clusterData:e,lnglat:t})=>{const a=[];e.forEach((e=>{const{id:t,title:n}=e;a.push({id:t,title:n})})),this.currentCluster=a,this.infoWindow.open(this.map,t),this.$emit("click",a)})),this.map.setFitView(null,!0),this.infoWindow.close()}},methods:{initMap(){const e=this.$refs.amap;p().load({key:"d786ac93724ce3d6658748d66cf5be5b",version:"2.0",plugins:["AMap.MarkerCluster","AMap.Geocoder"]}).then((t=>{this.AMap=t;const a={city:"唐山市"};this.geocoder=new this.AMap.Geocoder(a),this.map=new t.Map(e,{viewMode:"2D",zoom:10,center:[118.144541,39.696604]}),this.map.on("rightclick",(({lnglat:e})=>{this.geocoder.getAddress(e,((t,a)=>{const{regeocode:{formattedAddress:n}}=a;this.geocoder.getLocation(n,((t,a)=>{const[{location:{lng:o,lat:i}}]=a.geocodes;console.log(n,{lng:e.lng,lat:e.lat},JSON.stringify({location:{lng:o,lat:i}}))}))}))}));const n=this.$refs.marker;this.infoWindow=new t.InfoWindow({anchor:"top-left",content:n})})).catch((e=>{console.log(e)}))},setCenter({location:e}){this.map.setZoomAndCenter(17,[e.lng,e.lat],!0)}}},h=u,f=a(1001),m=(0,f.Z)(h,c,r,!1,null,"670dbde9",null),_=m.exports,g=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-tree",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"tree",staticClass:"peoples-tree",attrs:{"node-key":"id","default-expanded-keys":e.expanded,"show-checkbox":"",data:e.treeData,props:e.defaultProps},on:{check:e.handleCheck,"node-click":e.handleClick,"node-contextmenu":e.handleContextmenu},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.node,o=t.data;return a("span",{staticClass:"peoples-tree__label",class:{accurate0:3===n.level&&!o.accurate,accurate1:3===n.level&&1===o.accurate,accurate2:3===n.level&&2===o.accurate}},[e._v(" "+e._s(o.label)+" "),o.date?a("span",{staticClass:"peoples-tree__date"},[e._v(e._s(o.date))]):e._e()])}}])})},v=[],C={name:"PeoplesTree",data(){return{data:[],defaultProps:{label:"label",children:"children"}}},props:{peoples:{type:Array,default:()=>[]},loading:{type:Boolean,default:!1},expanded:{type:Array,default:()=>[]},maxIndex:{type:Number,default:0}},computed:{treeData(){const e=[],t=[];return this.peoples.forEach((a=>{const n=a.id.slice(0,1),o=a.id.slice(1);let i;i="Q"===n?e:t;const s=a.track.map((e=>({label:e.origin||e.name,...e})));i.push({id:a.id,no:+o,label:`${o} ${a.area} (${s.length})`,date:a.date,children:s})})),e.sort(((e,t)=>e.no-t.no)),t.sort(((e,t)=>e.no-t.no)),[{id:"Q",label:`确诊 [${e.length}]`,children:e},{id:"W",label:`无症状 [${t.length}]`,children:t}]}},methods:{handleCheck(e,{checkedNodes:t}){const a=t.filter((e=>!e.children));this.$emit("change",a)},handleClick(e){e.location&&this.$emit("click",e)},handleContextmenu(e,t){if(t.location){const e=this.maxIndex+1;this.$emit("update:maxIndex",e);const a=JSON.stringify({rid:e,district:t.district,name:t.name,location:t.location});console.log(a)}},checkAreas(e){const t=[];this.peoples.forEach((a=>{e.some((e=>e===a.area))&&t.push(a.id)}));const a=this.$refs.tree;a.setCheckedKeys(t);const n=a.getCheckedNodes();this.handleCheck(null,{checkedNodes:n})}}},k=C,b=(0,f.Z)(k,g,v,!1,null,"ddd52f28",null),x=b.exports,y=a(6166),$=a.n(y);const w=$().create({timeout:3e5});var M=w,A={name:"App",components:{PeoplesTree:x,AMap:_},data(){return{allPeoples:[],peoples:[],points:[],AMap:null,autoComplete:null,loading:!1,expanded:["Q","W"],maxIndex:0,options:{areas:[],dates:[]},areas:[],dates:[],positions:[],top:20}},computed:{topPositions(){return this.positions.slice(0,this.top)}},created(){p().load({key:"d786ac93724ce3d6658748d66cf5be5b",version:"2.0",plugins:["AMap.AutoComplete"]}).then((e=>{this.AMap=e,this.loadData();const t={city:"唐山市"};this.autoComplete=new this.AMap.AutoComplete(t)})).catch((e=>{console.log(e)}))},methods:{loadData(){this.loading=!0,M.get("data/data.json").then((({data:e})=>{const t=[];this.positions=e.positions,this.maxIndex=this.positions.reduce(((e,t)=>e.rid>t.rid?e.rid:t.rid));const a=e.peoples.map((e=>{const a=e.id.slice(0,1);let n=this.options.areas.find((t=>t.value===e.area));n?n[`count${a}`]++:(n={value:e.area,label:e.area,checked:!0,countQ:0,countW:0},n[`count${a}`]=1,this.options.areas.push(n)),n.label=`${n.value} [${n.countQ}+${n.countW}]`;let o=this.options.dates.find((t=>t.value===e.date));o?o[`count${a}`]++:(o={value:e.date,label:e.date.slice(5),checked:!0,countQ:0,countW:0},o[`count${a}`]=1,this.options.dates.push(o)),o.label=`${o.value} [${o.countQ}+${o.countW}]`;const i=e.track.map(((a,n)=>{let o;if(a.rid){const e=this.positions.find((e=>e.rid===a.rid));e.count?e.count++:e.count=1,o={...a,...e}}else o={...a},0!==a.accurate&&t.push(this.searchPoint(o,e));return o.id=`${e.id}-${n}`,o}));return{...e,track:i}}));this.areas=this.options.areas.map((e=>e.value)),this.dates=this.options.dates.map((e=>e.value)),Promise.all(t).then((e=>{this.searchCallback(e,a)})).catch((e=>{console.log("err",e)}))}))},handleChange(e){this.points=e},handleNodeClick(e){this.$refs.map.setCenter(e)},handleMarkerClick(e){const t=e.map((e=>e.id.slice(0,5)));this.expanded=t},filterPeoples(){this.peoples=this.allPeoples.filter((e=>{const{date:t,area:a}=e,n=this.dates.some((e=>e===t)),o=this.areas.some((e=>e===a));return n&&o}))},searchCallback(e,t){const a=[],n=[];e.forEach((({data:e,pos:t,people:o})=>{e.district=t.district,e.name=t.name,e.location=t.location,e.accurate=t.accurate,t.rid&&(a.push([o.id,JSON.stringify({rid:t.rid,accurate:1,origin:e.origin}),e.name]),-1===t.accurate&&n.push({rid:t.rid,district:t.district,name:t.name,location:t.location}))})),console.table(a),console.log(n),this.allPeoples=t,this.peoples=t,this.loading=!1,this.positions.sort(((e,t)=>t.count>e.count?1:-1)),console.table(this.positions.slice(0,2*this.top).map((({district:e,name:t,count:a})=>({district:e,name:t,count:a}))))},searchPoint(e,t){return new Promise(((a,n)=>{this.autoComplete.search(e.origin,((o,i)=>{if(i){let n={accurate:0};if("OK"===i.info){const{district:e,name:t,location:a}=i.tips[0];n={district:e,name:t,location:{lng:a.lng,lat:a.lat},accurate:1};const o=this.positions.find((({location:{lng:e,lat:t}})=>e===n.location.lng&&t===n.location.lat));o?(n.rid=o.rid,o.count?o.count++:o.count=0):(n.rid=++this.maxIndex,n.accurate=-1,this.positions.push({...n,count:1}))}a({data:e,pos:n,people:t})}else n({status:o,result:i,origin:e.origin})}))}))}}},P=A,O=(0,f.Z)(P,s,l,!1,null,null,null),W=O.exports;window._AMapSecurityConfig={securityJsCode:"30eb50807133bec74365efaac53b226a"},n["default"].use(i()),n["default"].config.productionTip=!1,new n["default"]({render:e=>e(W)}).$mount("#app")}},t={};function a(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,a),i.exports}a.m=e,function(){var e=[];a.O=function(t,n,o,i){if(!n){var s=1/0;for(d=0;d<e.length;d++){n=e[d][0],o=e[d][1],i=e[d][2];for(var l=!0,c=0;c<n.length;c++)(!1&i||s>=i)&&Object.keys(a.O).every((function(e){return a.O[e](n[c])}))?n.splice(c--,1):(l=!1,i<s&&(s=i));if(l){e.splice(d--,1);var r=o();void 0!==r&&(t=r)}}return t}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[n,o,i]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};a.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,i,s=n[0],l=n[1],c=n[2],r=0;if(s.some((function(t){return 0!==e[t]}))){for(o in l)a.o(l,o)&&(a.m[o]=l[o]);if(c)var d=c(a)}for(t&&t(n);r<s.length;r++)i=s[r],a.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return a.O(d)},n=self["webpackChunkcovid_19_ts"]=self["webpackChunkcovid_19_ts"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=a.O(void 0,[998],(function(){return a(497)}));n=a.O(n)})();
//# sourceMappingURL=app.6959b605.js.map