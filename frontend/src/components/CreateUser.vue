<template>
	<form>
		<div class="form-group">
			<label for="usernameInput">User Name</label>
			<input type="text" class="form-control" id="usernameInput" aria-describedby="usernameHelp" placeholder="Enter user name">
			<small id="usernameHelp" class="form-text text-muted">The nick name that other user will see</small>
		</div>
		<button type="submit" class="btn btn-primary">Submit</button>
	</form>
</template>

<script>
export default {
	name: "CreateUser",
	data() {
		return {};
	}
};
</script>

<style>

</style>