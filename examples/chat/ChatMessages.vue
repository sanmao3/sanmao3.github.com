<template>
	<!-- 聊天消息 -->
	<div class="messages">
		<div class="message" v-for="(msg, msgIndex) in person.messages" :class="{self: msg.self, 'q-answer-msg': msg.qnKey}">
			<p class="datetime" v-if="showMsgTime(msgIndex)">{{formatMsgTime(msg.sendTime)}}</p>
			<img class="avater" :src="formatAvater(msg.self)" @click="viewProfile(msg.self, $event)" />
			<div class="msg-content">
				<!-- 问卷回复 -->
				<div class="q-answer" v-if="msg.type == 4 && msg.qnKey">
					{{person.name}}更新了「{{msg.content}}」，<span @click="clickMessage(msg, $event)">点击查看</span>
				</div>
				<!-- 文本 -->
				<div class="text" v-else-if="msg.type == 4">{{msg.content}}</div>
				<!-- 图片 -->
				<div class="image" v-else-if="msg.type == 5">
					<img :src="formatImageUrl(msg.content)" @click="index = indexMap['index_' + msgIndex]" />
				</div>
				<!-- 药品 -->
				<div class="card medicine link-card" v-else-if="msg.type == 6" @click="clickMessage(msg, $event)">
					<div class="inner">
						<h3>{{msg.content.name}}</h3>
						<img :src="formatImageUrl(msg.content.imageUrl)" />
						<p class="desc">{{msg.content.majorFunction}}</p>
					</div>
					<p>用药助手<span>点击查看</span></p>
				</div>
				<!-- 病历 -->
				<div class="card" v-else-if="msg.type == 7">
					<div class="inner">
						<h3>病历很重要，快去完善，扁鹊医生会更好的了解你的病情！</h3>
						<p class="desc">病历完善后，您的健康由医生实时掌握，行动起来吧！</p>
					</div>
					<p>扁鹊荟</p>
				</div>
				<!-- 问卷调查 -->
				<div class="card link-card questionnaire" v-else-if="msg.type == 8" @click="clickMessage(msg, $event)">
					<div class="inner">
						<h3>{{msg.content}}</h3>
						<p class="desc">认真填写问卷，让医生更好地掌握病情治疗情况！</p>
					</div>
					<p>扁鹊荟</p>
				</div>
				<!-- 病历 -->
				<div class="card link-card dossier" v-else-if="msg.type == 9" @click="clickMessage(msg, $event)">
					<div class="inner">
						<h3><span>【病例】&nbsp;&nbsp;</span>{{msg.dossierName}}</h3>
						<div class="detail">
							<p>姓名：{{person.name}}</p>
							<p>性别：{{formatSex(person.sex)}}</p>
							<p>年龄：{{person.age}}岁</p>
						</div>
					</div>
					<p>扁鹊荟</p>
				</div>
				<!-- 病历提醒 -->
				<div class="text" v-else-if="msg.type == 10">
					您已提醒患者上传病历，稍后可到病历夹查看。
				</div>
				<!-- 文章分享-->
				<div class="card article link-card" v-else-if="msg.type == 11" @click="clickMessage(msg, $event)">
					<div class="inner">
						<h3>{{msg.articleTitle}}</h3>
						<p class="desc" v-html="formatArticle(msg.articleContent)"></p>
					</div>
					<p>扁鹊荟</p>
				</div>
				<!-- 检查项目 -->
				<div class="card check link-card" v-else-if="msg.type == 12" @click="clickMessage(msg, $event)">
					<div class="inner">
						<h3>建议检查项目</h3>
						<p class="desc">建议到医院做该项检查，方便及时获知病情发展的情况。</p>
					</div>
					<p>扁鹊荟</p>
				</div>
				<!-- 消息类型不支持 -->
				<div class="text" v-else="msg.type > 12">
					当前版本不支持该消息，请更新到最新版本。
				</div>
			</div>
		</div>
		<!-- 图片预览 -->
		<gallery :images="images" :index="index" @close="index = null" :options="{container: '#gallery-container', continuous: false}"></gallery>
	</div>
</template>

<script>
	import Util from '__UTIL__/ChatUtil.js'
	
	import VueGallery from 'vue-gallery'
	
	import defaultHeadImage from '__IMG__/icon/headImage@2x.png'
	
	export default{
		data:function(){
			return {
				account: {},
				index: null,
				indexMap: {}
			}
		},
		props: ['person'],
		created: function(){
			this.account = ACCOUNTM.getAccountModel();
		},
		components: {
			gallery: VueGallery
		},
		computed: {
			images: function(){
				let ary = [];
				this.person.messages.forEach((item, i) => {
					if(item.type == 5){
						ary.push(this.formatImageUrl(item.content))
						this.indexMap['index_' + i] = ary.length - 1;
					}
				})
				return ary;
			}
		},
		activated: function(){
			this.scrollBottom();
		},
		watch: {
			'person.messages': function(){
				this.scrollBottom();
			}
		},
		methods: {
			scrollBottom: function(){
				let el = document.querySelector('.messages');
				
				if(el == null) return;
				
				window.setTimeout(() => {
					el.scrollTop = el.scrollHeight;
				}, 50)
			},
			// 消息发送时间
			formatMsgTime: function(sendTime){
				return Util.formatMsgDate(sendTime);
			},
			// 头像
			formatAvater: function(isSelf){
				return isSelf ? (this.account.headUrl || defaultHeadImage) : this.person.headImage
			},
			// 图片路径转换
			formatImageUrl: Util.formatImageUrl,
			formatArticle: function(content = ''){
				return content.replace(/&fxg;(r|n)?/g, '');
			},
			formatSex: function(sex){
				return sex == 2 ? '女' : '男';
			},
			// 点击头像
			viewProfile: function(isSelf, e){
				// 点击患者头像时触发
				if(!isSelf){
					this.$emit('avaterClicked', e);
				}
			},
			clickMessage: function(msg, e){
				this.$emit('messageClicked', msg, e);
			},
			showMsgTime: function(index){
				let messages = this.person.messages;
				if(index > 0){
					// 3分钟内的消息时间不显示
					if(messages[index].sendTime - messages[index - 1].sendTime < 3 * 60 * 1000){
						return false;
					}
				}
				return true;
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.messages{
		height: calc(100% - 205px);
		padding: 20px 20px 0;
		overflow: auto;
	}
	
	.message{
		margin-bottom: 20px;
		position: relative;
		
		&.self{
			text-align: right;
		}
	}
	
	.datetime{
		font-size: 12px;
		color: #8A8A8F;
		text-align: center;
		margin-bottom: 18px;
	}
	
	.avater{
		width: 32px;
		height: 32px;
		border-radius: 50%;
		position: absolute;
		bottom: 0;
	}
	
	.self .avater{
		right: 0;
	}
	
	.msg-content{
		display: inline-block;
		max-width: 78%;
		margin-left: 47px;
		color: #353C47;
		text-align: left;
		
		& > div{
			border-radius: 17.5px;
		}
	}
	
	.self .msg-content{
		margin-right: 47px;
	}
	
	.text{
		line-height: 17px;
		padding: 8px 15px;
		background: #E5E6EA;
		position: relative;
		
		&:before{
			content: '';
			display: block;
			width: 12px;
			height: 17px;
			position: absolute;
			left: -4px;
			bottom: 0;
			background: url(../img/icon/chat-arrow@2x.png) no-repeat;
			background-size: 100% auto;
		}
	}
	
	.self .text{
		background-image: linear-gradient(-180deg, #3AD88F 0%, #40B9AE 100%);
		color: #fff;
		
		&:before{
			display: none;
		}
	}
	
	.image{
		overflow: hidden;
		
		img{
			max-width: 300px;
			max-height: 200px;
		}
	}
	
	.card{
		width: 300px;
		background: #FFFFFF;
		border: 1px solid #ddd;
		cursor: default;
		
		.inner{
			min-height: 80px;
			
			h3{
				font-size: 14px;
				margin-bottom: 5px;
			}
			
			padding: 10px 100px 4px 15px;
			background-image: url(../img/icon/icon-222@1x.png);
			background-repeat: no-repeat;
			background-position: 215px center;
			
			p{
				color: #8A8A8F;
			}
		}
		
		p.desc{
			display: -webkit-box;
		    -webkit-line-clamp: 3;
		    -webkit-box-orient: vertical;
		    white-space: normal;
		    text-overflow: ellipsis;
		    overflow : hidden;
		}
		
		& > p{
			height: 22px;
			line-height: 21px;
			font-size: 9px;
			color: #40B9AE;
			border-top: 1px solid #EFEFF4;
			background: url(../img/icon/icon-153@1x.png) no-repeat;
			background-position: 15px center;
			padding-left: 33px;
			padding-right: 15px;
			
			span{
				float: right;
			}
		}
	}
	
	.card.link-card{
		cursor: pointer;
		
		&:hover{
			background: #F9F9F9;
		}
	}
	
	.q-answer-msg{
		.avater{
			display: none;
		}
		
		.msg-content{
			width: 100%;
			max-width: 100%;
			margin-left: 0;
		}
	}
	
	.q-answer{
		text-align: center;
		font-size: 12px;
		color: #8A8A8F;
		
		span{
			color: #0076FF;
			cursor: pointer;
			
			&:hover{
				text-decoration: underline;
			}
		}
	}
	
	.dossier{
		width: 250px;
		
		.inner{
			background-position: 15px 35px;
			padding: 10px 15px 4px 100px;
			
			p{
				line-height: 23px;
			}
		}
		
		h3{
			margin-bottom: 5px;
			margin-left: -90px;
		}
	}
	
	.medicine{
		.inner{
			min-height: 95px;
			background-image: none;
			padding-right: 15px;
		}
		
		img{
			width: 56px;
			height: 56px;
			float: left;
			margin-right: 10px;
		}
	}
	
	.card.questionnaire .inner{
		background-image: url(../img/icon/icon-221@1x.png);
	}
	
	.card.article .inner{
		background-image: url(../img/icon/icon-224@1x.png);;
	}
	
	.card.check .inner{
		background-image: url(../img/icon/icon-223@1x.png);
	}
</style>