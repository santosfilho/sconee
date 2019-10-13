<template>
    <div>
        <LocalForm scope="Cadastrar" :local="local" :funcSubmit="postLocal"/>
    </div>
</template>
<script>
import LocalForm from './LocalForm'
export default {
    components: {LocalForm},
    data() {
        return {
            local: {
                localizacao: "",
                setor: "",
                capacidade: "",
                descricao: ""
            }
        }
    },
    methods:{
        postLocal(){
            this.$http.post('locais', {
                localizacao: this.local.localizacao,
                setor: this.local.setor,
                capacidade: this.local.capacidade,
                descricao: this.local.descricao
            }).then(resp => {
                if(resp.data.idLocal != null){
                    alert("Cadastrado com sucesso!")
                }
                this.$router.push("/locais");
            })
        }
    }
}
</script>