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

            var oView = this.getView();
            
            var oJSONModelEmployees = new sap.ui.model.json.JSONModel();
            oJSONModelEmployees.loadData("./localService/mockdata/Employees.json", false);
            oView.setModel(oJSONModelEmployees, "jsonEmployees");

            var oJSONModelCountries = new sap.ui.model.json.JSONModel();
            oJSONModelCountries.loadData("./localService/mockdata/Countries.json", false);
            oView.setModel(oJSONModelCountries, "jsonCountries");

            var oJSONModelConfig = new sap.ui.model.json.JSONModel(
                {
                visibleID: true,
                visibleName: true,
                visibleCountry: true,
                visibleCity: false,
                visibleBtnShowCity: true,
                visibleBtnHideCity: false
                }
            );
            oView.setModel(oJSONModelConfig, "jsonModelConfig");

        };

        function onFilter() {
            
            var oJSONCountries = this.getView().getModel("jsonCountries").getData();

            var filters = [];

            if(oJSONCountries.EmployeeId !== ""){
                filters.push(new Filter("EmployeeID", FilterOperator.EQ, oJSONCountries.EmployeeId))
            }
            if(oJSONCountries.CountryKey !== ""){
                filters.push(new Filter("Country", FilterOperator.EQ, oJSONCountries.CountryKey))
            }
            
            this.getView().byId("tableEmployee").getBinding("items").filter(filters);
        
        };

        function onClearFilter(){

            var oModel = this.getView().getModel("jsonCountries");
            oModel.setProperty("/EmployeeId","");
            oModel.setProperty("/CountryKey","");

        };

        function showPostalCode(oEvent){
            new sap.m.MessageToast.show(oEvent.getSource().getBindingContext("jsonEmployees").getObject().PostalCode);
        };

        function onShowCity(){
            var oJSONModelConfig = this.getView().getModel("jsonModelConfig");
            oJSONModelConfig.setProperty("/visibleCity", true);
            oJSONModelConfig.setProperty("/visibleBtnShowCity", false);
            oJSONModelConfig.setProperty("/visibleBtnHideCity", true);
        };

        function onHideCity(){
            var oJSONModelConfig = this.getView().getModel("jsonModelConfig");
            oJSONModelConfig.setProperty("/visibleCity", false);
            oJSONModelConfig.setProperty("/visibleBtnShowCity", true);
            oJSONModelConfig.setProperty("/visibleBtnHideCity", false);
        };

        var Main = Controller.extend("abrahamgroup.employees.controller.App", {});

        Main.prototype.onInit = onInit;
        Main.prototype.onFilter = onFilter;
        Main.prototype.onClearFilter = onClearFilter;
        Main.prototype.showPostalCode = showPostalCode;
        Main.prototype.onShowCity = onShowCity;
        Main.prototype.onHideCity = onHideCity;

        return Main;
    });

