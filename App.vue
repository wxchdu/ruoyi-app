<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "lib/iconfont.css"; 
	@import 'lib/style.css';
	@import 'lib/def.css';
	button{
		margin:0;
		padding: 0;
		line-height: 1;
		background-color: #FFFFFF;
	}
	button::after{
	    position: unset !important;
	    border: unset;
	}
</style>
