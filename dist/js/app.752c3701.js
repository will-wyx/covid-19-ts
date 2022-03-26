(function(){"use strict";var e={8680:function(e,t,n){var a=n(8935),i=n(4549),o=n.n(i),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app",attrs:{id:"app"}},[n("peoples-tree",{staticClass:"app__tree",attrs:{peoples:e.peoples,expanded:e.expanded,loading:e.loading},on:{change:e.handleChange,click:e.handleNodeClick}}),n("a-map",{ref:"map",staticClass:"app__map",attrs:{points:e.points},on:{click:e.handleMarkerClick}})],1)},l=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"a-map"},[n("div",{ref:"amap",staticClass:"a-map__map"}),n("div",{ref:"marker",staticClass:"a-map__marker"},[n("p",[e._v(e._s(e.current.id))]),n("p",[e._v(e._s(e.current.title))])])])},c=[],d=n(9648),p=n.n(d),u={name:"AMap",data(){return{map:null,cluster:null,AMap:null,infoWindow:null,current:{id:"",title:""}}},props:{points:{type:Array,default:()=>[]}},mounted(){this.initMap()},watch:{points(e){const t=[];e.forEach((e=>{e.location?t.push({id:e.id,title:e.origin,lnglat:[e.location.lng,e.location.lat]}):console.log(e.id,e.origin)})),this.cluster&&this.cluster.setMap(null),this.cluster=new this.AMap.MarkerCluster(this.map,t,{gridSize:60}),this.cluster.on("click",(({clusterData:e,lnglat:t})=>{const{id:n,title:a}=e[0];this.current.id=n,this.current.title=a,this.infoWindow.open(this.map,t),this.$emit("click",{id:n,title:a})})),this.map.setFitView(null,!0),this.infoWindow.close()}},methods:{initMap(){const e=this.$refs.amap;p().load({key:"d786ac93724ce3d6658748d66cf5be5b",version:"2.0",plugins:["AMap.MarkerCluster","AMap.AutoComplete"]}).then((t=>{this.AMap=t,this.map=new t.Map(e,{viewMode:"2D",zoom:10,center:[118.144541,39.696604]});const n=this.$refs.marker;this.infoWindow=new t.InfoWindow({anchor:"top-left",content:n})})).catch((e=>{console.log(e)}))},searchPoint(e){const t={city:"唐山市"},n=new this.AMap.AutoComplete(t);return new Promise(((t,a)=>{n.search(e.name,((n,i)=>{if("OK"===i.info){const{district:n,name:a,location:o}=i.tips[0],r={id:e.id,origin:e.name,district:n,name:a,location:{lng:o.lng,lat:o.lat}};t(r)}else a("err")}))}))},setCenter({location:e}){this.map.setZoomAndCenter(17,[e.lng,e.lat],!0)}}},h=u,f=n(3736),m=(0,f.Z)(h,s,c,!1,null,"4908f708",null),g=m.exports,v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-tree",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"peoples-tree",attrs:{"node-key":"id","default-expanded-keys":e.expanded,"show-checkbox":"",data:e.treeData,props:e.defaultProps},on:{check:e.handleCheck,"node-click":e.handleClick},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.node,i=t.data;return n("span",{staticClass:"peoples-tree__label",class:{accurate0:3===a.level&&!i.accurate,accurate1:3===a.level&&1===i.accurate,accurate2:3===a.level&&2===i.accurate}},[e._v(" "+e._s(i.label)+" ")])}}])})},k=[],b={name:"PeoplesTree",data(){return{data:[],defaultProps:{label:"label",children:"children"}}},props:{peoples:{type:Array,default:()=>[]},loading:{type:Boolean,default:!1},expanded:{type:Array,default:()=>[]}},computed:{treeData(){const e=[],t=[];return this.peoples.forEach((n=>{const a=n.id.slice(0,1),i=n.id.slice(1);let o;o="Q"===a?e:t;const r=n.track.map((e=>({label:e.origin||e.name,...e})));o.push({id:n.id,no:+i,label:`${i} ${n.area} (${r.length})`,children:r})})),e.sort(((e,t)=>e.no-t.no)),t.sort(((e,t)=>e.no-t.no)),[{id:"q",label:`确诊 [${e.length}]`,children:e},{id:"w",label:`无症状 [${t.length}]`,children:t}]}},methods:{handleCheck(e,{checkedNodes:t}){const n=t.filter((e=>!e.children));this.$emit("change",n)},handleClick(e){e.location&&this.$emit("click",e)}}},_=b,y=(0,f.Z)(_,v,k,!1,null,"5545651a",null),C=y.exports,w=n(6166),M=n.n(w);const A=M().create({timeout:3e5});var x=A,$={name:"App",components:{PeoplesTree:C,AMap:g},data(){return{peoples:[],points:[],AMap:null,loading:!1,expanded:[]}},created(){p().load({key:"d786ac93724ce3d6658748d66cf5be5b",version:"2.0",plugins:["AMap.AutoComplete"]}).then((e=>{this.AMap=e,this.loadData()})).catch((e=>{console.log(e)}))},methods:{loadData(){this.loading=!0,x.get("data/data.json").then((({data:e})=>{const t=[],n=e.peoples.map((n=>{const a=n.track.map(((a,i)=>{let o;return a.rid?o={...a,...e.positions.find((e=>e.rid===a.rid))}:(o={...a},0!==a.accurate&&t.push(this.searchPoint(o))),o.id=`${n.id}-${i}`,o}));return{...n,track:a}}));Promise.all(t).then((e=>{e.forEach((({data:e,pos:t})=>{e.district=t.district,e.name=t.name,e.location=t.location,e.accurate=t.accurate})),this.peoples=n,this.loading=!1})).catch((e=>{console.log("err",e)}))}))},handleChange(e){this.points=e},handleNodeClick(e){const t=JSON.stringify({district:e.district,name:e.name,location:e.location});console.log(t),this.$refs.map.setCenter(e)},handleMarkerClick(e){this.expanded=[e.id.slice(0,5)]},searchPoint(e){const t={city:"唐山市"};return new Promise(((n,a)=>{const i=new this.AMap.AutoComplete(t);i.search(e.origin,((t,i)=>{if(i){let t;if("OK"===i.info){const{district:e,name:n,location:a}=i.tips[0];t={district:e,name:n,location:{lng:a.lng,lat:a.lat},accurate:1}}else t={accurate:0};n({data:e,pos:t})}else a({status:t,result:i,origin:e.origin})}))}))}}},O=$,P=(0,f.Z)(O,r,l,!1,null,null,null),j=P.exports;window._AMapSecurityConfig={securityJsCode:"30eb50807133bec74365efaac53b226a"},a["default"].use(o()),a["default"].config.productionTip=!1,new a["default"]({render:e=>e(j)}).$mount("#app")}},t={};function n(a){var i=t[a];if(void 0!==i)return i.exports;var o=t[a]={exports:{}};return e[a].call(o.exports,o,o.exports,n),o.exports}n.m=e,function(){var e=[];n.O=function(t,a,i,o){if(!a){var r=1/0;for(d=0;d<e.length;d++){a=e[d][0],i=e[d][1],o=e[d][2];for(var l=!0,s=0;s<a.length;s++)(!1&o||r>=o)&&Object.keys(n.O).every((function(e){return n.O[e](a[s])}))?a.splice(s--,1):(l=!1,o<r&&(r=o));if(l){e.splice(d--,1);var c=i();void 0!==c&&(t=c)}}return t}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[a,i,o]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,a){var i,o,r=a[0],l=a[1],s=a[2],c=0;if(r.some((function(t){return 0!==e[t]}))){for(i in l)n.o(l,i)&&(n.m[i]=l[i]);if(s)var d=s(n)}for(t&&t(a);c<r.length;c++)o=r[c],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(d)},a=self["webpackChunkcovid_19_ts"]=self["webpackChunkcovid_19_ts"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(8680)}));a=n.O(a)})();
//# sourceMappingURL=app.752c3701.js.map