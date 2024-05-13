<template>
	<div class="calendar">
	  <div class="title">
	    <h1 class="green" id="calendar-title">Month</h1>
	    <h2 class="green small" id="calendar-year">Year</h2>
	    <a href="" id="prev">Prev Month</a>
	    <a href="" id="next">Next Month</a>
	  </div>
	  <div class="body">
	    <div class="lightgrey body-list">
	      <ul>
	        <li>MON</li>
	        <li>TUE</li>
	        <li>WED</li>
	        <li>THU</li>
	        <li>FRI</li>
	        <li>SAT</li>
	        <li>SUN</li>
	      </ul>
	    </div>
	    <div class="darkgrey body-list">
	      <ul id="days">
	      </ul>
	    </div>
	  </div>
	</div>
</template>

<script>
</script>

<style>
	.calendar{
		width:450px;
		height:350px;
		background:#fff;
		box-shadow:0px 1px 1px rgba(0,0,0,0.1);
	}
	.body-list ul{
		width:100%;
		font-family:arial;
		font-weight:bold;
		font-size:14px;
	}
	.body-list ul li{
		width:14.28%;
		height:36px;
		line-height:36px;
		list-style-type:none;
		display:block;
		box-sizing:border-box;
		float:left;
		text-align:center;
	}
</style>