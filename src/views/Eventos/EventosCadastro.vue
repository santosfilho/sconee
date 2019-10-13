<template>
    <div>
        <EventoForm scope="Cadastrar" :evento="evento" :funcButton="postEvento"/>
    </div>
</template>
<script>

import EventoForm from './EventoForm'
export default {
    components: {EventoForm},
    data() {
        return {
            evento: {
                cron: "",
                fimCron: "",
                hora: "",
                idEquipamento: 0,
                status: 0
            }
        }
    },
    methods:{
        postEvento(){
            this.$http.post('eventos', {
                cron: this.evento.cron,
                fimCron: this.evento.fimCron,
                hora: this.evento.hora,
                idEquipamento: this.evento.idEquipamento,
                status: this.evento.status
            }).then(res => {
                if(resp.data.idEvento != null){
                    alert("Cadastrado com sucesso!")
                }
                this.$router.push("/eventos");
            });
        }
    }
}
</script>