(()=>{"use strict";var t=function(){function t(t){this.form=t,this.inputs=this.form.querySelectorAll("[data-form-field]"),this.submit=this.form.querySelector("[data-form-submit]"),this.isFormValid=!1,this.registerForm(),this.registerInputs(),this.handleSubmit()}return t.prototype.registerForm=function(){var t=this;this.form.addEventListener("change",(function(){t.validateForm()})),this.form.addEventListener("input",(function(){t.validateForm()}))},t.prototype.validateForm=function(){var t=this;this.isFormValid=!0,this.inputs.forEach((function(e){e.checkValidity()||(t.isFormValid=!1)})),this.isFormValid?this.submit.ariaDisabled="false":this.submit.ariaDisabled="true"},t.prototype.registerInputs=function(){var t=this;this.inputs.forEach((function(e){var r=document.getElementById("".concat(e.id,"-error"));e.addEventListener("input",(function(e){var n=e.target;t.validateInput(n,r)})),e.addEventListener("blur",(function(e){var n=e.target;t.validateInput(n,r)}))}))},t.prototype.validateInput=function(t,e){t.checkValidity()?t.dispatchEvent(new CustomEvent("input:valid",{bubbles:!0,detail:{errorField:e}})):t.dispatchEvent(new CustomEvent("input:error",{bubbles:!0,detail:{errorField:e}}))},t.prototype.handleSubmit=function(){var t=this;this.submit.addEventListener("click",(function(){t.validateForm(),t.isFormValid&&t.form.dispatchEvent(new CustomEvent("form:submit",{bubbles:!0}))}))},t}(),e=function(){function t(){var t=this;document.addEventListener("input:error",(function(e){var r=e.target,n=e.detail;return t.applyInputErrorState(r,n)})),document.addEventListener("input:valid",(function(e){var r=e.target,n=e.detail;t.resetInputErrorState(r,n)}))}return t.prototype.applyInputErrorState=function(t,e){var r=e.errorField;t.ariaInvalid="true",r.ariaHidden="false"},t.prototype.resetInputErrorState=function(t,e){var r=e.errorField;t.ariaInvalid="false",r.ariaHidden="true"},t}(),r=function(t){return t instanceof Error?t.message:""},n=function(){function t(){this.endpoint="",this.form=null,this.formData=null,this.isSubmissionProcessing=!1,this.registerSubmit()}return t.prototype.registerSubmit=function(){var t=this;document.addEventListener("form:submit",(function(e){t.isSubmissionProcessing||(t.form=e.target,t.endpoint=e.target.getAttribute("data-form"),t.formData=Object.fromEntries(new FormData(t.form)),t.handleSubmission()),t.isSubmissionProcessing=!0}))},t.prototype.handleSubmission=function(){var t,e,n,i,o,a,s,u;return o=this,a=void 0,u=function(){var o,a,s;return function(t,e){var r,n,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(s){return function(u){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;o&&(o=0,s[0]&&(a=0)),a;)try{if(r=1,n&&(i=2&s[0]?n.return:s[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,s[1])).done)return i;switch(n=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,n=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!((i=(i=a.trys).length>0&&i[i.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){a.label=s[1];break}if(6===s[0]&&a.label<i[1]){a.label=i[1],i=s;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(s);break}i[2]&&a.ops.pop(),a.trys.pop();continue}s=e.call(t,a)}catch(t){s=[6,t],n=0}finally{r=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,u])}}}(this,(function(u){switch(u.label){case 0:return u.trys.push([0,3,,4]),[4,fetch(this.endpoint,{method:"POST",body:JSON.stringify(this.formData),headers:{"Content-type":"application/json; charset=UTF-8"}})];case 1:return(o=u.sent()).ok?[4,o.json()]:(this.isSubmissionProcessing=!1,null===(t=this.form)||void 0===t||t.dispatchEvent(new CustomEvent("alert:show",{bubbles:!0,detail:{title:"Sorry, something went wrong.",body:"Please try to submit the form again.",type:"error"}})),[2]);case 2:return a=u.sent(),console.log("data: ",a),null===(e=this.form)||void 0===e||e.dispatchEvent(new CustomEvent("alert:show",{bubbles:!0,detail:{title:"Your form has been successfully submitted!",body:"We will reach out as soon as possible.",type:"success"}})),null===(n=this.form)||void 0===n||n.dispatchEvent(new CustomEvent("form:reset",{bubbles:!0})),this.isSubmissionProcessing=!1,[3,4];case 3:return s=u.sent(),null===(i=this.form)||void 0===i||i.dispatchEvent(new CustomEvent("alert:show",{bubbles:!0,detail:{title:"Sorry, something went wrong.",body:r(s),type:"error"}})),[3,4];case 4:return[2]}}))},new((s=void 0)||(s=Promise))((function(t,e){function r(t){try{i(u.next(t))}catch(t){e(t)}}function n(t){try{i(u.throw(t))}catch(t){e(t)}}function i(e){var i;e.done?t(e.value):(i=e.value,i instanceof s?i:new s((function(t){t(i)}))).then(r,n)}i((u=u.apply(o,a||[])).next())}))},t}(),i=function(){function t(){var t=this;document.addEventListener("form:reset",(function(e){t.resetForm(e.target)}))}return t.prototype.resetForm=function(t){var e=t.querySelectorAll("[data-form-field]"),r=t.querySelector("[data-form-submit]");e.forEach((function(t){t.value=""})),r.ariaDisabled="true"},t}(),o=function(){function o(){this.registerValidator();try{new e,new n,new i}catch(t){document.dispatchEvent(new CustomEvent("alert:show",{bubbles:!0,detail:{title:"Sorry, something went wrong.",body:r(t),type:"error"}}))}}return o.prototype.registerValidator=function(){document.querySelectorAll("[data-form]").forEach((function(e){try{new t(e)}catch(t){document.dispatchEvent(new CustomEvent("alert:show",{bubbles:!0,detail:{title:"Sorry, something went wrong.",body:r(t),type:"error"}}))}}))},o}(),a=function(){function t(){var t=this;this.alert=document.querySelector("[data-alert]"),this.alertTitle=this.alert.querySelector("[data-alert-title]"),this.alertBody=this.alert.querySelector("[data-alert-body]"),document.addEventListener("alert:show",(function(e){t.populateAlert(e.detail),setTimeout((function(){return t.populateAlert({title:"",body:"",type:""})}),5e3)}))}return t.prototype.populateAlert=function(t){var e=t.title,r=t.body,n=t.type;this.alert.setAttribute("data-alert",n),this.alertTitle.textContent=e,this.alertBody.textContent=r},t}();document.addEventListener("DOMContentLoaded",(function(){try{new o,new a}catch(t){document.dispatchEvent(new CustomEvent("alert:show",{bubbles:!0,detail:{title:"Sorry, something went wrong.",body:r(t),type:"error"}}))}var t=window.fetch;window.fetch=function(e,r){return"/api/test"===e?new Promise((function(t){t({status:200,ok:!0,json:function(){return Promise.resolve(JSON.parse(null==r?void 0:r.body))}})})):"/api/test/error"===e?new Promise((function(t){t({status:500,ok:!1})})):t(e,r)}}))})();