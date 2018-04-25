<template v-if="showModal === true">
    <div>
        <div class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Welcome</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <create-user></create-user>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api/api";

export default {
	name: "FrontPageUser",
	data() {
		return {
			showModal: true,
			username: ""
		};
	},
	methods: {
		onSubmit() {
			this.showModal = false;
		}
	}
};
</script>

<style>

</style>