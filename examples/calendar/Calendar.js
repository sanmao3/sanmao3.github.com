(function() {
	function formatDate(dt){
		return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
	}
	
	var Calendar = function(options) {
		this.options = {
			container: document.getElementById('container'),
			title: document.querySelector('.title span'),
			dt: new Date(),
			monthDis: 0
		};
	}
	
	Calendar.prototype.init = function(){
		var self = this;
		
		var panel = document.createElement('div');
		panel.className = 'calendar-body';
		
		this.options.container.appendChild(panel);
		
		this.renderCells();
		
		var btnPrev = this.options.container.querySelector('.prev');
		var btnNext = this.options.container.querySelector('.next');
		
		btnPrev.addEventListener('click', function(){
			self.prevMonth();
		});
		
		btnNext.addEventListener('click', function(){
			self.nextMonth();
		});
	}
	
	Calendar.prototype.renderCells = function(){
		var monthValue = this.options.dt.getMonth() + this.options.monthDis;
		
		var dt = new Date();
		
		dt.setMonth(monthValue);
		
		//console.log(dt.toLocaleDateString())
		
		var year = dt.getFullYear();
		var month = dt.getMonth();
		var day = dt.getDate();
		
		this.options.title.innerHTML = year + '年' + (month + 1) + '月';
		
		var html = '';
		
		dt.setDate(1);
		
		var firstWeekDay = dt.getDay();
		
		//console.log(firstWeekDay)
		
		for(var i = 0; i < 6; i++) {
			html += '<div class="row">';
			for(var j = 0; j < 7; j++) {
				dt = new Date();
				dt.setMonth(monthValue);
				dt.setDate(1 + j + i * 7 - firstWeekDay);
				
				var className = '';
				
				if(dt.getDate() == day){
					className = 'today'
				}else if(dt.getMonth() != month){
					className = 'expired'
				}
				
				html += '<div class="cell '+ className +'" data-date="'+ formatDate(dt) +'"><span>' + (dt.getDate()) + '</span></div>';
			}
			html += '</div>';
		}
		
		this.options.container.querySelector('.calendar-body').innerHTML = html;
	}
	
	Calendar.prototype.prevMonth = function(){
		this.options.monthDis--;
		this.renderCells();
	}
	
	Calendar.prototype.nextMonth = function(){
		this.options.monthDis++;
		this.renderCells();
	}

	var c = new Calendar();
	
	c.init();
})();