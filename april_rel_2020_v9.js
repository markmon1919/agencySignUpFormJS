(function($){
	window.addEventListener('load', function(){
        formatFields();
        //return returnHiddenValue(); //for testing only hiddenValue
    });

	var dataId_phone = '51523791';
	var dataId_website = '51523815';
	var dataId_eOLiabilityLimits = '51523817';
	var dataId_eoLimitsHolder = '51523818';
	var keyPressVal;
	var dataId_yearEstablished = 51523814; //prod 47134549
	var dataId_duplicateMessage = '51523788';
	
	// for Search form 
	var dataId_email = '51523792';
	var dataId_hiddenReturnedAccount = 51523789;
	var dataId_checker = 62227210;
	
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
                var key = e.charCode || e.keyCode || 0;            
                if (year.val().length == 0 && key == 48) {
                	return false;	// zero not allowed as first digit
                }
                if (year.val().length >= 4) {
                	year.val(year.val().slice(0, 3));
                }
				// Allow numeric (and tab, backspace, delete) keys only
				return (key == 8 ||			// backspace
					key == 9 ||
					(key >= 48 && key <= 57));	//numeric
        });
	}
	
	function retrieveURL(){
		var pageURL = $(location).attr("href");
		var duplicateMsg = $("div[data-id='"+dataId_duplicateMessage+"']").find("input");
		duplicateMsg.val(pageURL);
	}
    
	function formatFields(){
		// this will call all the formatters
		formatPhone();
		formatWebsite();
		formatEOLiabilityLimits();
		formatYearEstablished();
		//retrieveURL();
	}
	
})(jQuery);
