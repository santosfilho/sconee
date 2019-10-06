import Vue from 'vue'
import axios from 'axios'

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios.create({
            baseURL:'http://localhost:8079/v0.1/',
            headers: {
                //get: {
                    "Access-Control-Allow-Origin": "*",
                    //"Authorization": "teste"
                    //'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                //}
            }
        })

        //Mostra o tipo de requisição usada
        Vue.prototype.$http.interceptors.request.use(config => {
            //console.log(config.method)
            // if(config.method == 'post'){
            //     config.method = 'put'
            // }
            return config
        }, error => Promise.reject(error))

        Vue.prototype.$http.interceptors.response.use(res =>{
            // const array = []
            // for(let chave in res.data){
            //     // ... é chamado operador spread
            //     array.push({id:chave, ...res.data[chave]})
            //     //mesma coisa que: 
            //     //array.push({id:chave, nome: res.data[chave].nome, email: res.data[chave].email})
            // }
            // res.data = array
            return res
        }, error => Promise.reject(error))
    }
})