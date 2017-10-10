<template>
	<!-- 聊天区域 -->
	<div class="chat-area" v-on:click="hideModule">
		<div class="chat-top">
			{{patient.name}}
			<span class="add" v-if="patient.id == -1" @click="addReceivers"></span>
			<span class="more" v-else-if="patient.id" @click.stop="showModule('menu')"></span>
		</div>
		
		<ul class="menu" v-if="moduleName == 'menu'">
			<li @click.stop="showModule('medical-record')">病历夹</li>
			<li>随访记录</li>
			<li @click.stop="showModule('medicine-record')">用药记录</li>
		</ul>
		
		<div class="chat-content" v-if="patient.id" :class="{filled: receivers.length > 0}">
			<keep-alive>
				<!-- 聊天消息 -->
				<chat-messages :person="patient" v-if="patient.id != -1" v-on:avaterClicked="viewProfile" v-on:messageClicked="viewMsgDetail"></chat-messages>
				<!-- 群发聊天消息 -->
				<chat-mass-messages :chatman="patient" v-if="patient.id == -1 && receivers.length == 0"></chat-mass-messages>
			</keep-alive>
			<!-- 群发患者 -->
			<chat-mass-receivers :receivers="receivers" :editable="editable" v-if="patient.id == -1 && receivers.length > 0" v-on:closeSheet="closeReceivers"></chat-mass-receivers>
			<!-- 聊天工具栏 -->
			<div class="send-controller">
				<div class="toolbar">
					<span :title="'图片'"><input type="file" accept="image/*" @change="sendImage" /></span>
					<span :title="'随访问卷'" v-on:click.stop="showModule('library-q')"></span>
					<span :title="'药品'" v-on:click.stop="showModule('library-medicine')"></span>
					<span :title="'病历'" @click="sendDossier"></span>
					<span :title="'检查项目'" v-on:click.stop="showModule('library-check')"></span>
				</div>
				<div class="textarea" contenteditable="plaintext-only" @keydown.enter.prevent="" @keyup.enter="sendText"></div>
				<button type="button" @click="sendText">发送</button>
			</div>
		</div>
		
		<div class="chat-content empty" v-else>
			<span>未选择聊天</span>
		</div>
		
		<keep-alive>
			<!-- 患者病历夹 -->
			<medical-record class="patient-info" :patientId="patient.id" v-if="moduleName == 'medical-record'" @click.native="preventBubbling"></medical-record>
			<!-- 患者用药 -->
			<medicine-record class="patient-info" :patientId="patient.id" :isTab="true" v-if="moduleName == 'medicine-record'" @click.native="preventBubbling"></medicine-record>
			
			<!-- 可发送随访问卷 -->
			<chat-q-library class="chat-library" v-on:sendQuestionnaire="sendQuestionnaire" v-if="moduleName == 'library-q'" @click.native="preventBubbling"></chat-q-library>
			<!-- 可发送药品 -->
			<chat-medicine-library class="chat-library library-medicine" v-on:sendMedicines="sendMedicines" v-if="moduleName == 'library-medicine'" @click.native="preventBubbling"></chat-medicine-library>
			<!-- 检查项目 -->
			<chat-check-library class="chat-library library-check" v-on:sendCheckItems="sendCheckItems" v-if="moduleName == 'library-check'" @click.native="preventBubbling"></chat-check-library>
		</keep-alive>
		
		<!-- 箭头，因library需要overflow:hidden;不能使用after伪元素实现 -->
		<div class="library-arrow" v-if="arrowShown"></div>
		
		<!-- 患者简介 -->
		<div class="patient-about" v-if="moduleName == 'profile'" @click.stop="">
			<div class="profile">
				<span :class="{lady: patient.sex == 2}">{{patient.name}}</span>
				<img :src="patient.headImage" />
			</div>
			<p>{{patient.age}}岁</p>
			<p>{{patient.address}}</p>
		</div>
		
		<chat-inside-sheet v-if="sheetSwitch" :message="clickedMessage" v-on:closeSheet="closeSheet"></chat-inside-sheet>
	</div>
</template>

<script>
	import ChatMessages from '__TEMP__/ChatMessages.vue'
	import ChatMassMessages from '__TEMP__/ChatMassMessages.vue'
	import ChatMassReceivers from '__TEMP__/ChatMassReceivers.vue'
	
	import ChatQLibrary from '__TEMP__/ChatQLibrary.vue'
	import ChatMedicineLibrary from '__TEMP__/ChatMedicineLibrary.vue'
	import ChatCheckLibrary from '__TEMP__/ChatCheckLibrary.vue'
	
	import ChatInsideSheet from '__TEMP__/ChatInsideSheet.vue'
	
	import MedicalRecord from '__TEMP__/MedicalRecord.vue'
	import MedicineRecord from '__TEMP__/MedicineRecord.vue'
	
	import Util from '__UTIL__/ChatUtil.js'
	
	export default{
		data(){
			return {
				account: {},
				moduleName: '',
				sheetSwitch: false,
				clickedMessage: {},
				receivers: [],
				editable: true
			}
		},
		props: ['patient'],
		components: {
			ChatMessages,
			ChatMassMessages,
			ChatMassReceivers,
			ChatQLibrary,
			ChatMedicineLibrary,
			ChatCheckLibrary,
			MedicalRecord,
			MedicineRecord,
			ChatInsideSheet
		},
		watch: {
			patient: function(val, oldVal){
				this.closeSheet();
				this.hideModule();
				this.closeReceivers();
			}
		},
		computed: {
			arrowShown: function(){
				return this.moduleName.indexOf('library') >= 0;
			},
			messageRecevier: function(){
				if(this.patient.id == -1){
					let rid = [],
						rloginName = [],
						rname = [];
					
					this.receivers.forEach(item => {
						rid.push(item.id);
						rloginName.push(item.loginName);
						rname.push(item.name);
					})
					
					this.patient.receivers = {
						id: rid.join(','),
						loginName: rloginName.join(','),
						name: rname.join(',')
					}
				}
				
				this.closeReceivers();
				
				return this.patient;
			}
		},
		created: function () {
			this.account = ACCOUNTM.getAccountModel();
			// editable表示是否可编辑接收人
			this.$eventHub.$on('chat-mass-receivers', (receivers, editable) => {
				this.receivers = receivers;
				this.editable = editable === false ? false : true;
			})
		},
		methods: {
			showModule: function(name){
				this.moduleName = name;
			},
			hideModule: function(){
				this.moduleName = '';
			},
			preventBubbling: function(e){
				e.stopPropagation();
			},
			// 查看患者简介
			viewProfile: function(e){
				this.preventBubbling(e);
				this.showModule('profile');
			},
			viewMsgDetail: function(msg, e){
				this.clickedMessage = msg;
				this.sheetSwitch = true;
			},
			closeSheet: function(){
				this.sheetSwitch = false;
			},
			closeReceivers: function(){
				this.receivers = [];
			},
			// 发送文本
			sendText: function(){
				let el = document.querySelector('.textarea');
				if(el.innerText != ''){
					Util.sendText(this.messageRecevier, el.innerText);
					el.innerHTML = '';
				}
			},
			// 发送图片
			sendImage: function(){
				var fileInput = document.querySelector('input[type="file"]');
				Util.sendImage(this.messageRecevier, fileInput.files[0]);
			},
			// 发送问卷
			sendQuestionnaire: function(items){
				// 关闭问卷窗口
				this.hideModule();
				Util.sendQuestionnaire(this.messageRecevier, items);
			},
			// 发送药品
			sendMedicines: function(items){
				// 关闭窗口
				this.hideModule();
				Util.sendMedicines(this.messageRecevier, items);
			},
			// 发送病历
			sendDossier: function(){
				Util.sendDossier(this.messageRecevier);
			},
			// 发送检查项目
			sendCheckItems: function(items){
				// 关闭窗口
				this.hideModule();
				Util.sendCheckItems(this.messageRecevier, items);
			},
			// 添加群发接收人
			addReceivers: function(){
				VIEWM.showPop(VIEW.ARTICLE_SHARE, {
	    			id: this.patient.id
	    		});
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.chat-area{
		position: absolute;
		top: 0;
		left: 245px;
		right: 0;
		bottom: 0;
		
		background-color: #EFEFF4;
	}
	
	.chat-top{
		height: 62px;
		line-height: 62px;
		
		font-size: 16px;
		color: #353C47;
		
		padding: 0 30px;
		
		border-left: 1px solid #ECECEC;
		border-bottom: 1px solid #ECECEC;
		background-color: #FFFFFF;
	}
	
	.more{
		display: inline-block;
		width: 30px;
		height: 30px;
		float: right;
		position: relative;
		top: 16px;
		background: url(../img/icon/icon-81@1x.png) no-repeat;
		background-position: center;
		
		&:hover{
			opacity: 0.5;
		}
	}
	
	.add{
		display: inline-block;
		width: 40px;
		height: 28px;
		float: right;
		position: relative;
		top: 17px;
		background: url(../img/icon/icon-169@1x.png) no-repeat;
		background-position: center;
		border: 1px solid #E5E6EA;
		border-radius: 4px;
		
		&:hover{
			background-color: #F9F9F9;
		}
	}
	
	.menu{
		width: 204px;
		position: absolute;
		top: 30px;
		right: 45px;
		z-index: 9;
		background: #FFFFFF;
		font-size: 14px;
		border-radius: 8px;
		border: 1px solid #eee;
		box-shadow: 0px 0px 18px #ccc;
		overflow: hidden;
		
		li{
			height: 52px;
			line-height: 52px;
			padding-left: 70px;
			border-bottom: 1px solid #eee;
			cursor: default;
			
			background-image: url(../img/icon/icon-94@1x.png);
			background-repeat: no-repeat;
			background-position: 30px center;
			
			&:nth-child(2){
				background-image: url(../img/icon/icon-95@1x.png);
			}
			
			&:last-child{
				background-image: url(../img/icon/icon-96@1x.png);
				border-bottom: none;
			}
			
			&:hover{
				background-color: #F9F9F9;
			}
		}
	}
	
	.patient-about{
		width: 310px;
		position: absolute;
		top: 180px;
		left: 50px;
		background: #F9F9F9;
		border: 1px solid #E5E6EA;
		box-shadow: 0 1px 10px 0 rgba(0,0,0,0.16);
		border-radius: 6px;
		padding: 30px;
		
		.profile{
			line-height: 52px;
			font-size: 16px;
			font-weight: bold;
			color: #353C47;
			border-bottom: 1px solid #ECECEC;
			padding-bottom: 20px;
			margin-bottom: 30px;
		}
		
		span{
			background-image: url(../img/icon/icon-158@1x.png);
			background-repeat: no-repeat;
			background-position: right center;
			padding-right: 18px;
			
			/* 女 */
			&.lady{
				background-image: url(../img/icon/icon-157@1x.png);
			}
		}
		
		img{
			width: 52px;
			height: 52px;
			border-radius: 50%;
			float: right;
		}
		
		p{
			font-size: 13px;
			color: #666666;
			margin-bottom: 10px;
			
			background-image: url(../img/icon/icon-159@1x.png);
			background-repeat: no-repeat;
			background-position: left center;
			
			padding-left: 24px;
			
			&:last-child{
				background-image: url(../img/icon/icon-160@1x.png);
			}
		}
	}
	
	.chat-content{
		height: calc(100% - 62px);
		position: relative;
		
		&.filled{
			height: 100%;
			margin-top: -62px;
		}
	}
	
	.mass-messages{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
	}
	
	.send-controller{
		height: 205px;
		padding: 15px 20px;
		border-top: 1px solid #D8D8D8;;
	}
	
	.toolbar span{
		display: inline-block;
		width: 26px;
		height: 26px;
		
		position: relative;
		
		margin-right: 20px;
		background-repeat: no-repeat;
		background-position: center;
		
		&:nth-child(1){
			background-image: url(../img/icon/icon-51@1x.png);
		}
		
		&:nth-child(2){
			background-image: url(../img/icon/icon-52@1x.png);
		}
		
		&:nth-child(3){
			background-image: url(../img/icon/icon-53@1x.png);
		}
		
		&:nth-child(4){
			background-image: url(../img/icon/icon-54@1x.png);
		}
		
		&:nth-child(5){
			background-image: url(../img/icon/icon-55@1x.png);
		}
		
		input[type="file"]{
			display: block;
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			opacity: 0;
		}
	}
	
	.textarea{
		width: 100%;
		height: 84px;
		margin: 15px 0;
		color: #353C47;
		outline: none;
		cursor: text;
		overflow-x: hidden;
		overflow-y: auto;
	}
	
	button{
		width: 104px;
		height: 30px;
		float: right;
		background: #FFFFFF;
		border: 1px solid #E5E6EA;
		border-radius: 4px;
		
		&:hover{
			background: #F9F9F9;
		}
	}
	
	.empty{
		font-size: 12px;
		color: #8A8A8F;
		text-align: center;
		background: url(../img/bg/bg-2@1x.png) no-repeat;
		background-position: center;
		
		span{
			display: block;
			position: relative;
			top: calc(50% + 100px);
			transform: translateY(-50%);
			-webkit-transform: translateY(-50%);
		}
	}
	
	.patient-info{
		position: absolute;
		top: 62px;
		right: 0;
		bottom: 0;
		z-index: 9;
		width: 410px;
		background: #F9F9F9;
		box-shadow: -4px 0 10px 0 rgba(0,0,0,0.08);
		overflow: auto;
		
		&.medicine-record{
			width: 266px;
		}
	}
	
	.chat-library{
		width: 550px;
		height: 400px;
		position: absolute;
		left: -180px;
		bottom: 208px;
		border: 1px solid #D8D8D8;
		box-shadow: 0 0 16px 0 rgba(0,0,0,0.16);
		border-radius: 4px;
		overflow: hidden;
	}
	
	.chat-library.library-medicine{
		left: -135px;
	}
	
	.chat-library.library-check{
		left: -36px;
	}
	
	.chat-library ~ .library-arrow{
		width: 24px;
		height: 24px;
		background: #F9F9F9;
		
		border-right: 1px solid #D8D8D8;
		border-bottom: 1px solid #D8D8D8;
		
		border-bottom-right-radius: 8px;
		
		-webkit-transform: rotate(35deg) skewY(15deg);
		transform: rotate(35deg) skewY(15deg);
		
		position: absolute;
		left: 70px;
		bottom: 197px;
	}
	
	.chat-library.library-medicine ~ .library-arrow{
		left: 122px;
	}
	
	.chat-library.library-check ~ .library-arrow{
		left: 222px;
	}
</style>