<template>
  <div id="frontPage">
    <frontpage-user></frontpage-user>
		<img src="../assets/logo.png">
		<br>
    <button class="btn btn-success btn-lg" type="button" data-toggle="modal" data-target="#myModal">Play!</button>
  </div>

</template>


<script>
export default {
	name: "Frontpage",
	data() {
		return {
			msg: "Welcome to the frontpage!"
		};
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
	font-weight: normal;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}

#frontPage {
	text-align: center;
	margin-top: 60px;
}
</style>
