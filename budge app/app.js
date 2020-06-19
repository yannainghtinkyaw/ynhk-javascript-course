
// BUDGE CONTROLLER
var budgeController=(function(){

	//Function Constructor(Class)
	var Expense=function(id,description,value){
		this.id=id;
		this.description=description;
		this.value=value;
		this.percentage=-1;
	};

	// Calculate ပီး ဘဃ်မှာသီမ်းမှာလဲ
	// UI ကရလားတဲ exp value တွေယူပီး တွက်ရမယ်
	Expense.prototype.calPercentage=function(totalIncome){

		if(totalIncome > 0 ){

			this.percentage=Math.round((this.value / totalIncome)*100);

		}else{

			this.percentage=-1;

		}

	};

	Expense.prototype.getPercentage=function(){
		return this.percentage;
	};

	var Income=function(id,description,value){
		this.id=id;
		this.description=description;
		this.value=value;
	};


	var CalculateByEachOperator = function(operator) {
      	var sum = 0;
       	DataBase.allItems[operator].forEach(function(cur) {
            sum += cur.value;
        });

        DataBase.totalItems[operator] = sum;
   	};


	// THINK===>ဒေတာတွေက်ု ဘာနဲ inherit လုပ်ပီး(Object) ဘယ်မှာသိမ်းရမလဲ ဘာနဲသိမ်းမှာလဲ(Object,Array)?
	// Database Array(Bind data with ***Object*** and storge in database ***Array***)
	var DataBase={
		allItems:{
			exp:[],
			inc:[],
		},

		totalItems:{
			exp:0,
			inc:0,
		},

		budge:0,
		percentage:-1,
	};

	return{
	// Insert Data to Data Base
	 insertItem:function(operator,description,value){
			var newItem,ID;
			//PreviousID +1 
			 if (DataBase.allItems[operator].length > 0) {
                ID = DataBase.allItems[operator][DataBase.allItems[operator].length - 1].id + 1;
            } else {
                ID = 0;
            }

			// Bind with object according to type
			if(operator==='exp'){
				newItem=new Expense(ID,description,value)
			}else if(operator==='inc'){
				newItem=new Income(ID,description,value)
			}

			// Insert Data to Dabase Base
			DataBase.allItems[operator].push(newItem);

			return newItem;
	},

	deleteItem(operator,id){
		var itemIDs,indexNo;

		itemIDs=DataBase.allItems[operator].map(function(cur){

			return cur.id;
		});

		indexNo=itemIDs.indexOf(id);

		if(indexNo !== -1 ){

			DataBase.allItems[operator].splice(indexNo,1);

		} 
	},

	calculatePercentages(){

		// Exp တစ်ခုချင်းစီ ရဲ value တွေကိုဃူပီး Expanse Object ထဲက caluPercentage prototype function နဲတွက်
		DataBase.allItems.exp.forEach(function(cur){

			cur.calPercentage(DataBase.totalItems.inc)
		});
	},

	getPercentages(){

		var allPer=DataBase.allItems.exp.map(function(cur){

			return cur.getPercentage;
		});

	},

	calculateBudge:function(){

		//1. Calculate Total Value By Each Operator
		CalculateByEachOperator('exp');
		CalculateByEachOperator('inc');

		//2. Calculate Total Different Value By Each Oprator(income & expane)
		DataBase.budge=DataBase.totalItems.inc - DataBase.totalItems.exp;

		//3. Percentage By Total Different Value
		// Check Income Must not be 0
		if(DataBase.totalItems.inc > 0 ){
			DataBase.percentage=Math.round((DataBase.totalItems.exp / DataBase.totalItems.inc) * 100);
		}else{
			DataBase.percentage=-1;
		}
	},

	testing: function() {
        console.log(DataBase);
    },

	getBudge:function(){
		return {
			budge:DataBase.budge,
			percentage:DataBase.percentage,
			totalIncome:DataBase.totalItems.inc,
			totalExpane:DataBase.totalItems.exp,
		};
	}	
};

})();

// UiCONTROLLER
var UiController=(function(){

	var DOMStrings={
		inputOperator:'.add__type',
		inputDescription:'.add__description',
		inputValue:'.add__value',
		inputBtn:'.add__btn',
		expenseContainer:'.expenses__list',
		incomeContianer:'.income__list',
		budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container:'.container',
        expPercentageLabel:'.item__percentage',
        dateMonthLabel:'.budget__title--month'
	};

	var formatNumber=function(num,type){
			var numSplit,int,dec,type;

			//1. Two Dicimal Number
			num = Math.abs(num);

			num = num.toFixed(2);

			numSplit = num.split('.')

			int = numSplit[0];

			if(int.length > 3){
				int=int.substr(0,int.length - 3) + ',' + int.substr(int.length - 3,3);
			}

			dec = numSplit[1];

			return (type === 'exp' ? '-':'+') +' '+int +'.'+ dec;
	};

	var nodeListForEach=function(list,callback){
				for(var i=0;i <list.length;i++)
				callback(list[i],i)
	};	

	return{
		getInputData:function(){
			return{
				operator:document.querySelector(DOMStrings.inputOperator).value,
				description:document.querySelector(DOMStrings.inputDescription).value,		
				value:parseFloat(document.querySelector(DOMStrings.inputValue).value) //Change String to number float
			};
		},


		addNewItemList:function(operator,obj){
			var html,element,newHtml;

			if(operator==='exp'){
				element=DOMStrings.expenseContainer;
				html='<div class="item clearfix" id="exp-%id%">'
				+'<div class="item__description">%description%</div>'
				+'<div class="right clearfix">'
				+'<div class="item__value">%value%</div>'
				+'<div class="item__percentage">21%</div>'
				+'<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>'
                +' </div> </div>';        


			}else if(operator==='inc'){
				element=DOMStrings.incomeContianer;
				html='<div class="item clearfix" id="inc-%id%">'
					+'<div class="item__description">%description%</div>'
					+'<div class="right clearfix"><div class="item__value">%value%</div>'
					+'<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>'
                	+'</div></div>';             

			}

			newHtml=html.replace('%id%',obj.id);
			newHtml=newHtml.replace('%description%',obj.description);
			newHtml=newHtml.replace('%value%',this.formatNumber(obj.value,operator));

			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);


		},

		deleteItemList:function(selectorId){
			var el;

			el=document.getElementById(selectorId);
			el.parentNode.removeChild(el);

		},

		clearFields:function(){
			var fields,fieldsArray;

			// Input Field Data to Change List
			fields=document.querySelectorAll(DOMStrings.inputDescription+','+DOMStrings.inputValue);

			//Change List to Array(Need to call slice,but Array prototype is need)
			fieldsArray=Array.prototype.slice.call(fields);

			//For Get 3 Argument(current value,index,original array)
			fieldsArray.forEach(function(current,index,array){
					current.value="";
			});

			fieldsArray[0].focus();
		},

		displayBudge:function(obj){
			var operator;
			obj.budge > 0 ? operator='inc' :operator= 'exp'
			document.querySelector(DOMStrings.budgetLabel).textContent=formatNumber(obj.budge,operator);
			document.querySelector(DOMStrings.incomeLabel).textContent =formatNumber(obj.totalIncome,'inc');
            document.querySelector(DOMStrings.expensesLabel).textContent =formatNumber(obj.totalExpane,'exp');
            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }

		},

		displayPercentage:function(percentages){
			var fields=document.querySelector(DOMStrings.expPercentageLabel);
		
			nodeListForEach(fields,function(current,index){
				if(percentages > 0){
					current.textContent=percentages[index] + '%';
				}else{
					urrent.textContent='---';
				}

			});

		},

		displayMonth:function(){
			var now,month,months,year;

			now=new Date();

			year=now.getFullYear();

			months=['January','Febuary','March','April','May','June','July','August','September','October','November','December'];

			month=now.getMonth();

			document.querySelector(DOMStrings.dateMonthLabel).textContent=months[month]+' '+year;
		},

		 changedType: function() {
            
            var fields = document.querySelectorAll(
                DOMStrings.inputOperator + ',' +
                DOMStrings.inputDescription + ',' +
                DOMStrings.inputValue);
            
            nodeListForEach(fields, function(cur) {
               cur.classList.toggle('red-focus'); 
            });
            
            document.querySelector(DOMStrings.inputBtn).classList.toggle('red');
            
        },

		getDOMStrings:function(){
			return DOMStrings;
		}
	};

})();


// GLOBAL APP CONTROLLER
var connectorController=(function(budgeCrt,UiCrt){

		var eventListenerSetUp=function(){

			var DOM=UiCrt.getDOMStrings();

			document.querySelector(DOM.inputBtn).addEventListener('click',crtAddItem);
			document.addEventListener('keypress',function(event){
				if(event.keyCode===13 || event.which===13){
					crtAddItem();
				}
			});

			document.querySelector(DOM.container).addEventListener('click',crtDeleteItem)
			document.querySelector(DOM.inputOperator).addEventListener('change', UiCrt.changedType);    

		};

		var updateBudge=function(){

			//1. Get Calculate data from Databse(budge controller)
			budgeCrt.calculateBudge();

			//2. return budge data
			var budge=budgeCrt.getBudge();

			//3. Display data on the UI(UI display)
			UiCrt.displayBudge(budge);
		};

		var updatePercenteage=function(){

			//1. Calculate Percentage
			budgeCrt.calculatePercentages();

			//2.Get percentages data from DataBase
			var percentages=budgeCrt.getPercentages();

			//3. Update on Ui
			UiCrt.displayPercentage(percentages)

		};

		var crtAddItem=function(){
			var input,newItem;

			//1. Get input field data(Get Ui Input)
			input=UiController.getInputData();

			//Check Input Value(Empty,Not A Number,Not 0)
			if(input.description !=="" || !isNaN(input.value) || input.value >0){

			
				//2. Add input field data to Database(Send Budge Controller)
				newItem=budgeController.insertItem(input.operator,input.description,input.value)
			
				//3. Get Database data to Ui(Get Budge Controller)
				UiCrt.addNewItemList(input.operator,newItem)

				//3.1 Clear input Field when button clicked
				UiCrt.clearFields();

				//4.Calculate & Display Data in UI
				updateBudge();

				//5.Update Percentage
				updatePercenteage();

			}				
		};

		var crtDeleteItem=function(event){
			var itemID,splitItem,operator,ID;

			//1. Get Parent node id
			itemID=event.target.parentNode.parentNode.parentNode.parentNode.id;

			//2. Split data oprator and id
			if(itemID){
				splitItem=itemID.split('-');
				operator=splitItem[0];
				ID=parseInt(splitItem[1]);
			}

			//3. Delete Data from Database
			budgeCrt.deleteItem(operator,ID);

			//4. Delete ItemList from UI
			UiCrt.deleteItemList(itemID);

			//5. Update Calculate & Display Data in UI
			updateBudge();

			//6.Update Percentage
			updatePercenteage();

		};

		return{
			init:function(){
				console.log('Application Started Run !')
				UiCrt.displayMonth();
				UiCrt.displayBudge({
					budge:0,
					percentage:-1,
					totalIncome:0,
					totalExpane:0,
				});
				eventListenerSetUp();
			}
		};

		

})(budgeController,UiController)

// Main Method Start Run
connectorController.init();
