(function(){"use strict";var e={9605:function(e,t,a){var n=a(8935),i=a(4549),o=a.n(i),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app",attrs:{id:"app"}},[a("peoples-tree",{ref:"tree",staticClass:"app__tree",attrs:{peoples:e.peoples,expanded:e.expanded,loading:e.loading,"max-index":e.maxIndex},on:{"update:maxIndex":function(t){e.maxIndex=t},"update:max-index":function(t){e.maxIndex=t},change:e.handleChange,click:e.handleNodeClick}}),a("div",{staticClass:"app__main"},[a("div",{staticClass:"app__filter"},[a("el-select",{staticClass:"app__filter__item",attrs:{multiple:"",placeholder:"请选择",size:"mini"},on:{change:e.filterPeoples},model:{value:e.areas,callback:function(t){e.areas=t},expression:"areas"}},e._l(e.options.areas,(function(t){return a("el-option",{key:t.value,staticClass:"app__option",attrs:{label:t.label,value:t.value}},[a("span",{staticClass:"app__option__label"},[e._v(e._s(t.label))]),a("span",{staticClass:"app__option__count"},[e._v(e._s(t.countQ)+"+"+e._s(t.countW))])])})),1),a("el-select",{staticClass:"app__filter__item",attrs:{multiple:"",placeholder:"请选择",size:"mini"},on:{change:e.filterPeoples},model:{value:e.dates,callback:function(t){e.dates=t},expression:"dates"}},e._l(e.options.dates,(function(t){return a("el-option",{key:t.value,staticClass:"app__option",attrs:{label:t.label,value:t.value}},[a("span",{staticClass:"app__option__label"},[e._v(e._s(t.label))]),a("span",{staticClass:"app__option__count"},[e._v(e._s(t.countQ)+"+"+e._s(t.countW))])])})),1),e._l(e.topPositions,(function(t){return a("el-tag",{key:t.rid,staticClass:"app__top__item",attrs:{size:"mini"},on:{click:function(a){return e.handleTagClick(t)}}},[e._v(e._s(t.name)+"["+e._s(t.count)+"] ")])}))],2),a("a-map",{ref:"map",staticClass:"app__map",attrs:{points:e.points},on:{click:e.handleMarkerClick,"marker-item-click":e.handleMarkerItemClick}})],1)],1)},l=[],r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"a-map"},[a("div",{ref:"amap",staticClass:"a-map__map"}),a("div",{ref:"marker",staticClass:"a-map__marker"},e._l(e.currentCluster,(function(t,n){return a("div",{key:n,staticClass:"a-map__marker__item",on:{click:function(a){return e.handleMarkerItemClick(t)}}},[a("p",{staticClass:"marker__title"},[e._v(e._s(t.id))]),a("p",{staticClass:"marker__content"},[e._v(e._s(t.title))])])})),0),a("div",{staticClass:"a-map__complete"},[a("el-select",{staticClass:"complete__control",attrs:{filterable:"",remote:"","reserve-keyword":"",placeholder:"请输入关键词","remote-method":e.searchAddress,loading:e.loading,size:"mini"},on:{change:e.handleCompleteChange},model:{value:e.address,callback:function(t){e.address=t},expression:"address"}},e._l(e.options,(function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})})),1)],1)])},c=[],d=a(9648),p=a.n(d),u={name:"AMap",data(){return{map:null,cluster:null,AMap:null,geocoder:null,autoComplete:null,infoWindow:null,currentCluster:[],address:null,loading:!1,options:[]}},props:{points:{type:Array,default:()=>[]}},mounted(){this.initMap()},watch:{points(e){const t=[];e.forEach((e=>{e.location?t.push({id:e.id,title:e.origin,lnglat:[e.location.lng,e.location.lat]}):console.log(e.id,e.origin)})),this.cluster&&this.cluster.setMap(null),this.cluster=new this.AMap.MarkerCluster(this.map,t,{gridSize:60}),this.cluster.on("click",(({clusterData:e,lnglat:t})=>{const a=[];e.forEach((e=>{const{id:t,title:n}=e;a.push({id:t.slice(0,5),title:n})})),this.currentCluster=a,this.infoWindow.open(this.map,t),this.$emit("click",a)})),this.map.setFitView(null,!0),this.infoWindow.close()}},methods:{initMap(){const e=this.$refs.amap;p().load({key:"d786ac93724ce3d6658748d66cf5be5b",version:"2.0",plugins:["AMap.MarkerCluster","AMap.Geocoder","AMap.AutoComplete"]}).then((t=>{this.AMap=t;const a={city:"唐山市"};this.geocoder=new this.AMap.Geocoder(a),this.autoComplete=new this.AMap.AutoComplete(a),this.map=new t.Map(e,{viewMode:"2D",zoom:10,center:[118.144541,39.696604]}),this.map.on("rightclick",(({lnglat:e})=>{this.geocoder.getAddress(e,((t,a)=>{const{regeocode:{formattedAddress:n}}=a;this.geocoder.getLocation(n,((t,a)=>{const[{location:{lng:i,lat:o}}]=a.geocodes;console.log("%s\n%s\n%s",JSON.stringify({lng:e.lng,lat:e.lat}),JSON.stringify({lng:i,lat:o}),n)}))}))}));const n=this.$refs.marker;this.infoWindow=new t.InfoWindow({anchor:"top-left",content:n})})).catch((e=>{console.log(e)}))},searchAddress(e){""!==e?(this.loading=!0,this.autoComplete.search(e,((e,t)=>{t&&(this.options=t.tips.map((({id:e,district:t,name:a,location:n,address:i})=>({value:e,label:`${a}`,location:n,district:t,address:i}))),this.loading=!1)}))):this.options=[]},setCenter({location:e}){this.map.setZoomAndCenter(17,[e.lng,e.lat],!0)},handleMarkerItemClick(e){this.$emit("marker-item-click",e.id)},handleCompleteChange(e){const t=this.options.find((t=>t.value===e)),{location:{lng:a,lat:n}}=t;console.log(JSON.stringify({lng:a,lat:n})),this.setCenter(t)}}},h=u,m=a(1001),f=(0,m.Z)(h,r,c,!1,null,"0ac1798f",null),_=f.exports,g=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-tree",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"tree",staticClass:"peoples-tree",attrs:{"node-key":"id","default-expanded-keys":e.expanded,"show-checkbox":"",data:e.treeData,props:e.defaultProps},on:{check:e.handleCheck,"node-click":e.handleClick,"node-contextmenu":e.handleContextmenu},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.node,i=t.data;return a("span",{staticClass:"peoples-tree__label",class:{accurate0:3===n.level&&!i.accurate,accurate1:3===n.level&&1===i.accurate,accurate2:3===n.level&&2===i.accurate}},[e._v(" "+e._s(i.label)+" "),i.date?a("span",{staticClass:"peoples-tree__date"},[e._v(e._s(i.date))]):e._e()])}}])})},k=[],v={name:"PeoplesTree",data(){return{data:[],defaultProps:{label:"label",children:"children"}}},props:{peoples:{type:Array,default:()=>[]},loading:{type:Boolean,default:!1},expanded:{type:Array,default:()=>[]},maxIndex:{type:Number,default:0}},computed:{treeData(){const e=[],t=[];return this.peoples.forEach((a=>{const n=a.id.slice(0,1),i=a.id.slice(1);let o;o="Q"===n?e:t;const s=a.track.map((e=>({label:e.origin||e.name,...e})));o.push({id:a.id,no:+i,label:`${i} ${a.area} (${s.length})`,date:a.date,children:s})})),e.sort(((e,t)=>e.no-t.no)),t.sort(((e,t)=>e.no-t.no)),[{id:"Q",label:`确诊 [${e.length}]`,children:e},{id:"W",label:`无症状 [${t.length}]`,children:t}]}},methods:{handleCheck(e,{checkedNodes:t}){const a=t.filter((e=>!e.children));this.$emit("change",a)},handleClick(e){e.location&&this.$emit("click",e)},handleContextmenu(e,t){if(t.location){const e=this.maxIndex+1;this.$emit("update:maxIndex",e);const a=JSON.stringify({rid:e,district:t.district,name:t.name,location:t.location});console.log(a)}},checkKeys(e){const t=this.$refs.tree;t.setCheckedKeys(e);const a=t.getCheckedNodes();this.handleCheck(null,{checkedNodes:a})}}},C=v,b=(0,m.Z)(C,g,k,!1,null,"1f8d7e99",null),x=b.exports,y=a(6166),$=a.n(y);const M=$().create({timeout:3e5});var w=M,A={name:"App",components:{PeoplesTree:x,AMap:_},data(){return{allPeoples:[],peoples:[],points:[],AMap:null,autoComplete:null,loading:!1,expanded:["Q","W"],maxIndex:0,options:{areas:[],dates:[]},areas:[],dates:[],positions:[],top:20}},computed:{topPositions(){return this.positions.slice(0,this.top)}},created(){p().load({key:"d786ac93724ce3d6658748d66cf5be5b",version:"2.0",plugins:["AMap.AutoComplete"]}).then((e=>{this.AMap=e,this.loadData();const t={city:"唐山市"};this.autoComplete=new this.AMap.AutoComplete(t)})).catch((e=>{console.log(e)}))},methods:{loadData(){this.loading=!0,w.get("data/data.json").then((({data:e})=>{const t=[];this.positions=e.positions,this.maxIndex=this.positions.reduce(((e,t)=>e.rid>t.rid?e.rid:t.rid));const a=e.peoples.map((e=>{const a=e.id.slice(0,1);let n=this.options.areas.find((t=>t.value===e.area));n?n[`count${a}`]++:(n={value:e.area,label:e.area,checked:!0,countQ:0,countW:0},n[`count${a}`]=1,this.options.areas.push(n)),n.label=`${n.value} [${n.countQ}+${n.countW}]`;let i=this.options.dates.find((t=>t.value===e.date));i?i[`count${a}`]++:(i={value:e.date,label:e.date.slice(5),checked:!0,countQ:0,countW:0},i[`count${a}`]=1,this.options.dates.push(i)),i.label=`${i.value} [${i.countQ}+${i.countW}]`;const o=e.track.map(((a,n)=>{let i;if(a.rid){const e=this.positions.find((e=>e.rid===a.rid));e.count?e.count++:e.count=1,i={...a,...e}}else i={...a},0!==a.accurate&&t.push(this.searchPoint(i,e));return i.id=`${e.id}-${n}`,i}));return{...e,track:o}}));this.areas=this.options.areas.map((e=>e.value)),this.dates=this.options.dates.map((e=>e.value)),Promise.all(t).then((e=>{this.searchCallback(e,a)})).catch((e=>{console.log("err",e)}))}))},handleChange(e){this.points=e},handleNodeClick(e){this.$refs.map.setCenter(e)},handleMarkerClick(e){const t=e.map((e=>e.id.slice(0,5)));this.expanded=t},handleMarkerItemClick(e){const{track:t}=this.peoples.find((t=>t.id===e));console.table(t.map((({id:e,origin:t})=>({id:e,origin:t}))))},handleTagClick({rid:e}){const t=[];this.peoples.forEach((({track:a})=>{a.forEach((a=>{a.rid===e&&t.push(a.id)}))})),this.$refs.tree.checkKeys(t)},filterPeoples(){this.peoples=this.allPeoples.filter((e=>{const{date:t,area:a}=e,n=this.dates.some((e=>e===t)),i=this.areas.some((e=>e===a));return n&&i}))},searchCallback(e,t){const a=[],n=[];e.forEach((({data:e,pos:t,people:i})=>{e.district=t.district,e.name=t.name,e.location=t.location,e.accurate=t.accurate,t.rid&&(a.push([i.id,JSON.stringify({rid:t.rid,accurate:1,origin:e.origin}),e.name]),-1===t.accurate&&n.push({rid:t.rid,district:t.district,name:t.name,location:t.location}))})),console.table(a),console.log(n),this.allPeoples=t,this.peoples=t,this.loading=!1,this.positions.sort(((e,t)=>t.count>e.count?1:-1)),console.table(this.positions.slice(0,2*this.top).map((({district:e,name:t,count:a})=>({district:e,name:t,count:a}))))},searchPoint(e,t){return new Promise(((a,n)=>{this.autoComplete.search(e.origin,((i,o)=>{if(o){let n={accurate:0};if("OK"===o.info){const{district:e,name:t,location:a}=o.tips[0];n={district:e,name:t,location:{lng:a.lng,lat:a.lat},accurate:1};const i=this.positions.find((({location:{lng:e,lat:t}})=>e===n.location.lng&&t===n.location.lat));i?(n.rid=i.rid,i.count?i.count++:i.count=0):(n.rid=++this.maxIndex,n.accurate=-1,this.positions.push({...n,count:1}))}a({data:e,pos:n,people:t})}else n({status:i,result:o,origin:e.origin})}))}))}}},P=A,O=(0,m.Z)(P,s,l,!1,null,null,null),I=O.exports;window._AMapSecurityConfig={securityJsCode:"30eb50807133bec74365efaac53b226a"},n["default"].use(o()),n["default"].config.productionTip=!1,new n["default"]({render:e=>e(I)}).$mount("#app")}},t={};function a(n){var i=t[n];if(void 0!==i)return i.exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,a),o.exports}a.m=e,function(){var e=[];a.O=function(t,n,i,o){if(!n){var s=1/0;for(d=0;d<e.length;d++){n=e[d][0],i=e[d][1],o=e[d][2];for(var l=!0,r=0;r<n.length;r++)(!1&o||s>=o)&&Object.keys(a.O).every((function(e){return a.O[e](n[r])}))?n.splice(r--,1):(l=!1,o<s&&(s=o));if(l){e.splice(d--,1);var c=i();void 0!==c&&(t=c)}}return t}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[n,i,o]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};a.O.j=function(t){return 0===e[t]};var t=function(t,n){var i,o,s=n[0],l=n[1],r=n[2],c=0;if(s.some((function(t){return 0!==e[t]}))){for(i in l)a.o(l,i)&&(a.m[i]=l[i]);if(r)var d=r(a)}for(t&&t(n);c<s.length;c++)o=s[c],a.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return a.O(d)},n=self["webpackChunkcovid_19_ts"]=self["webpackChunkcovid_19_ts"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=a.O(void 0,[998],(function(){return a(9605)}));n=a.O(n)})();
//# sourceMappingURL=app.c65740f7.js.map