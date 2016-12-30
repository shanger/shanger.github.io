//es6语法：
import Vue from "../node_modules/vue/dist/vue.min.js";//其实不用写完，会自动查找。
//外部引入别的库都可以用这样的方式，比如jquery等。。
//引入我们编写的测试用vue文件。

// import MyApp from './components/radio.vue';
// import picker from './components/citypicker.vue';
// import autoComp from './components/autoComplet.vue';
import scrollTop2Load from './components/scrollTop2Load.vue';

Vue.config.debug = true;//开启错误提示

/*new Vue(MyApp);

new Vue(picker);

new Vue(autoComp);*/
new Vue(scrollTop2Load);
/*new Vue({   
    el: '#body',  
    components: { app }  
}) */ 