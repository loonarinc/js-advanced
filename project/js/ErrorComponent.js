Vue.component('errormsg', {
    methods: {
        errorMsg() {
            alert('Fetch Error');
        },
    },
    template: `<div class="errormsg"></div>`,
})