<template>
    <div>
        <div id="CreateLobbyModal" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Welcome</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div class="modal-body">
                        <create-lobby></create-lobby>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: "CreateLobbyModal",
	data() {
		return {};
	},
	methods: {
		onSubmit() {}
	}
};
</script>