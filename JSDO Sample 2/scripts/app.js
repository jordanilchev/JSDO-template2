var myApp = function () {
	var loginModel = new loginDataSource(),
		listModel = new listDataSource();

	document.addEventListener("deviceready", initialize);
};

function initialize() {
	try {
		progress.util.jsdoSettingsProcessor(jsdoSettings);

		if (!jsdoSettings.authenticationModel) {
			console.log("Warning: jsdoSettings.authenticationModel not specified. Default is ANONYMOUS");
		}

		if (jsdoSettings.serviceURI) {
			myApp.jsdosession = new progress.data.JSDOSession(jsdoSettings);
		} else {
			console.log("Error: jsdoSettings.serviceURI must be specified.");
		}
	} catch (ex) {
		//showError("Error creating JSDOSession: " + ex);
		console.log("Error creating JSDOSession: " + ex);
	}

	if (myApp.jsdosession && !showLoginPage()) {
		// Login as anonymous automatically, data will be available on list page
		$('#loginIcon').hide();
		myApp.loginModel.login();
	}

	app = new kendo.mobile.Application(document.body, {
		skin: "flat",
		transition: 'slide',
		initial: "views/home.html",
		layout: "tabstrip-layout"
	});
};

myApp.prototype = new baseApp();