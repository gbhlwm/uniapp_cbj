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

<style lang="less">
	/*每个页面公共css */
	.nowrap {
	  white-space: nowrap;
	  overflow: hidden;
	  text-overflow: ellipsis;
	}

	.nowrap_2 {
	  overflow: hidden;
	  text-overflow: ellipsis;
	  display:-webkit-box;
	  -webkit-box-orient:vertical;
	  -webkit-line-clamp:2;
	}

	.btn-default(@width, @height, @lHeight, @bc, @br, @fs, @color) {
	  width: @width; height: @height; line-height: @lHeight; background-color: @bc;
	  border-radius: @br; font-size: @fs; color: @color; text-align: center;
	}
</style>
