import { LightningElement, wire } from "lwc";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import USER_ID from "@salesforce/user/Id";
import NAME_FIELD from "@salesforce/schema/User.Name";
import ACTIVE_USER from "@salesforce/schema/User.IsActive";
import { GREETING_TEXT, MESSAGE, APP_CONFIG } from "./constants";

export default class WelcomeBanner extends LightningElement {
  user;
  gretingText = GREETING_TEXT;
  message = MESSAGE;
  loading = APP_CONFIG.LOADING;
  userId = USER_ID;

  @wire(getRecord, { recordId: "$userId", fields: [NAME_FIELD, ACTIVE_USER] })
  wiredUser({ error, data }) {
    if (data) {
      this.user = { data };
      console.log(data);
    } else if (error) {
      console.error(error);
    }
  }

  get userName() {
    if (!this.user?.data) return null;
    return getFieldValue(this.user.data, NAME_FIELD);
  }

  get isActive() {
    if (!this.user?.data) return null;
    const isActive = getFieldValue(this.user.data, ACTIVE_USER);
    return isActive ? APP_CONFIG.ACTIVE_STATUS : APP_CONFIG.INACTIVE_STATUS;
  }
}
