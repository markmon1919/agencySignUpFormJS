(function(){

	window.addEventListener('load', function(){
        formatFields();
    });

	var dataId_phone = 51523791;
	var dataId_website = 51523815;
	var dataId_eOLiabilityLimits = 51523817;
	var dataId_eoLimitsHolder = 51523818;
	var keyPressVal;
	var dataId_yearEstablished = 51523814; //prod 47134549
	var dataId_duplicateMessage = 51523788;

	var dataId_hiddenReturnedAccount = 51523789;
	var dataId_dba = 51523793;

	// for Search form 
	var dataId_email = 51523792;
	
	/*
	function getAccountValue() {
		//Get
		var hiddenValue = $('#txt_name').val();

		//Set
		$('#txt_name').val(bla);
	}
	*/

	function returnHidden() {
		var hidden = loader.getEngine().getDocument().getElementById(dataId_hiddenReturnedAccount);
		//phoneValue = loader.getEngine().getDocument().getElementById(dataId_phone);
		var email = loader.getEngine().getDocument().getElementById(dataId_email);
		var dba = loader.getEngine().getDocument().getElementById(dataId_dba);
		email.on('value-change', function(){
			dba.setValue(email.getValue());
			console.log('check email.getValue() -- ' + email.getValue());
			console.log('check email.val() -- ' + email.val());
			console.log('check email.getValue().length -- ' + email.getValue().length);
		});

		/*
		var hiddenValue = loader.getEngine().getDocument().getElementById(dataId_hiddenReturnedAccount);
		var phoneValue = loader.getEngine().getDocument().getElementById(dataId_phone);
		var emailValue = loader.getEngine().getDocument().getElementById(dataId_email);
		console.log('check hiddenValue -- ' + hiddenValue.getValue());
		console.log('check phoneValue -- ' + phoneValue.getValue());
		console.log('check emailValue -- ' + emailValue.getValue());
		console.log('check dbaValue -- ' + dbaValue.val());
		*/
		dba.setValue(email.getValue());
	}

	function formatPhony() {
		var phone = loader.getEngine().getDocument().getElementById(dataId_phone);
		phone.on('value-change', function(){
			var key = e.charCode || e.keyCode || 0;
			
			if (phone.val().length === 0) {
				phone.val(phone.val() + '(');
			} else {
				var val = phone.val();
				phone.val('').val(val);
			}
			
			if(phone.val() === '('){
				keyPressVal = phone.val();
			} else {
				keyPressVal = '';
			}
			// Auto-format- do not expose the mask as the user begins to type
			if (key !== 8 && key !== 9) {
				if (phone.val().length === 4) {
					phone.val(phone.val() + ')');
				}
				if (phone.val().length === 5) {
					phone.val(phone.val() + ' ');
				}
				if (phone.val().length === 9) {
					phone.val(phone.val() + '-');
				}
				if (phone.val().length >= 14) {
					phone.val(phone.val().slice(0, 13));
				}
			}
			
			// Allow numeric (and tab, backspace, delete) keys only
			return (key == 8 ||			// backspace
				key == 9 ||
				(key >= 48 && key <= 57));	//numeric

		});
	}

	function formatPhone(){
		$("div[data-id='"+dataId_phone+"']").find("input")
			.on('keypress', function(e) {
				var key = e.charCode || e.keyCode || 0;
				var phone = $(this);
				
				if (phone.val().length === 0) {
					phone.val(phone.val() + '(');
				} else {
					var val = phone.val();
					phone.val('').val(val);
				}
				
				if(phone.val() === '('){
					keyPressVal = phone.val();
				} else {
					keyPressVal = '';
				}
				// Auto-format- do not expose the mask as the user begins to type
				if (key !== 8 && key !== 9) {
					if (phone.val().length === 4) {
						phone.val(phone.val() + ')');
					}
					if (phone.val().length === 5) {
						phone.val(phone.val() + ' ');
					}
					if (phone.val().length === 9) {
						phone.val(phone.val() + '-');
					}
					if (phone.val().length >= 14) {
						phone.val(phone.val().slice(0, 13));
					}
				}
				
				// Allow numeric (and tab, backspace, delete) keys only
				return (key == 8 ||			// backspace
					key == 9 ||
					(key >= 48 && key <= 57));	//numeric
			})
			
			.on('keyup', function(e) {
				var phone = $(this);
				var key = e.charCode || e.keyCode || 0;
				
				if (key !== 8 && key !== 9 && key >= 48 && key <= 57) {
					if(keyPressVal==="("){
						var currentKey = e.key;
						if(currentKey.length==1 && currentKey!=="!"){
							phone.val(keyPressVal+''+currentKey);
						}
					}
				}
			})
	
			.on('focus', function() {
				phone = $(this);
				if (phone.val().length === 0) {
					phone.val('(');
				} 
				else {
					var val = phone.val();
					phone.val('').val(val); // Ensure cursor remains at the end
				}
			})
	
			.on('blur', function() {
				$phone = $(this);
				if ($phone.val() === '(') {
					$phone.val('');
				}
			});
	}
	
	function formatWebsite(){
		$("div[data-id='"+dataId_website+"']").find("input")
			.on('keypress', function(e) {
				var website = $(this);
				if (website.val().length == 0) {
					website.val('http://');
				} else if(website.val() === 'http://'){
					keyPressVal = website.val();
				} else {
					keyPressVal = '';
				}
			})
			.on('focus', function(e) {
				website = $(this);
				if (website.val().length == 0) {
					website.val('http://');
				}
			})
			.on('keyup', function(e) {
				website = $(this);
				if (website.val().length == 0) {
					 website.val('http://');
				} else {
					if(keyPressVal==="http://"){
						var currentKey = e.key;
						if(currentKey.length==1){
							website.val(keyPressVal+''+currentKey);
						}
					}
				}
			})
			.on('blur', function() {
				$website = $(this);
				if ($website.val() == 'http://') {
					$website.val('');
				}
			});
	}
	
	
	function formatEOLiabilityLimits(){
		$("div[data-id='"+dataId_eOLiabilityLimits+"']").find("input")
			.on('keypress', function(e) {
				var liabilityLimits = $(this);
				if (liabilityLimits.val().length == 0) {
					liabilityLimits.val(liabilityLimits.val() + '$');
				}
			})
			
			.on('keyup', function(e) {
				var keyLimits = e.charCode || e.keyCode || 0;
				if (keyLimits != 8 && keyLimits != 9) {
						var value = liabilityLimits.val().replace("$","");
						var input = value.replace(/[\D\s\._\-]+/g, "");
						
						const formatter = new Intl.NumberFormat('en-US', {
						  style: 'currency',
						  currency: 'USD',
						  minimumFractionDigits: 0
						})
						input = formatter.format(input);
						liabilityLimits.val(input);
						
						// modify the hidden field as well 
						var priceHolder = $("div[data-id='"+dataId_eoLimitsHolder+"']").find("input");
						var priceHolderNumber = parseInt(input.replace("$","").replace(/,/g, ""));
						
						loader.engine.document.getElementById(parseInt(dataId_eoLimitsHolder)).setProperty('value.value' , priceHolderNumber);
						
				}
				return (keyLimits == 8 ||
					keyLimits == 9 ||
					keyLimits == 46 ||
					(keyLimits >= 48 && keyLimits <= 57) ||
					(keyLimits >= 96 && keyLimits <= 105));
			})
			.on('focus', function() {
				liabilityLimits = $(this);
				if (liabilityLimits.val().length == 0) {
					liabilityLimits.val('$');
				}
			})
			.on('blur', function() {
				$liabilityLimits = $(this);
				if ($liabilityLimits.val() == '$') {
					$liabilityLimits.val('');
				}
			});
	}

	function formatYearEstablished() {
		$("div[data-id='"+dataId_yearEstablished+"']").find("input")
			.on('keypress', function(e) {
				var year = $(this);
				var keyLimit = e.charCode || e.keyCode || 0;
				console.log('check length -- ' + year.val().length);
				console.log('check val -- ' + year.val());
				if (year.val().length == 0 && keyLimit == 48) {
					year.val() = year.val().replace(/^0/, '');
					year.val().length = 0;
					console.log('year.val().length eq 0 <IF> --> ' + year.val());
					//this.value = this.value.replace(/^0/, '');
				}
				if (year.val().length > 3) {
					console.log('year.val().length gt 3 <IF> --> ' + year.val());
					//this.value = this.value.slice(0,4);
				}
     		});
	}
	
	function retrieveURL(){
		var pageURL = $(location).attr("href");
		var duplicateMsg = $("div[data-id='"+dataId_duplicateMessage+"']").find("input");
		duplicateMsg.val(pageURL);
	}
	
	function formatFields(){
		// this will call all the formatters
		//formatPhony();
		returnHidden();
		formatWebsite();
		formatEOLiabilityLimits();
		formatYearEstablished();
		retrieveURL();
	}
	
})();
