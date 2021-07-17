sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        function onInit() {

            var oJSONModel = new sap.ui.model.json.JSONModel();
            var oView = this.getView();
            var i18nBundle = oView.getModel("i18n").getResourceBundle();

            oJSONModel.loadData("./localService/mockdata/Employees.json",false);
            oView.setModel(oJSONModel);
        }

        function onFilter() {
            
            var oJSON = this.getView().getModel().getData();

            var filters = [];

            if(oJSON.EmployeeId !== ""){
                filters.push(new Filter("EmployeeID", FilterOperator.EQ, oJSON.EmployeeId))
            }
            if(oJSON.CountryKey !== ""){
                filters.push(new Filter("Country", FilterOperator.EQ, oJSON.CountryKey))
            }
            
            var oList =  this.getView().byId("tableEmployee");
            var oBinding = oList.getBinding("items").filter(filters);
        
        }

        function onClearFilter(){

            var oModel = this.getView().getModel();
            oModel.setProperty("/EmployeeId","");
            oModel.setProperty("/CountryKey","");

        }

        var Main = Controller.extend("abrahamgroup.employees.controller.App", {});

        Main.prototype.onInit = onInit;
        Main.prototype.onFilter = onFilter;
        Main.prototype.onClearFilter = onClearFilter;

        return Main;
    });

