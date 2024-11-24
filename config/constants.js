require("dotenv").config("./.env");

module.exports.env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  PIXEL_ID: process.env.PIXEL_ID,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
};

module.exports.freeEventsData = [
  "terms_and_conditions_agree",
  "terms_and_conditions_disagree",
  "submission_form_fill",
  "submission_form_submit",
  "submission_form_cancel",
  "payment_proceed",
  "payment_success",
  "payment_failed",
  "payment_cancel",
  "newsletter_form_submission",
  "nour_chatbot_view",
  "whatsapp_service_quality_management_click",
  "sign_up_enter",
  "sign_up_exit_without_completion",
  "sign_up_complete",
  "forgot_password",
  "Reset_password_complete",
  "initiate_support_chat",
  "download_app_store",
  "download_google_play",
];
module.exports.DateRequiredEventsData = [
  "submission_form_access",
  "payment_page_access",
  "check_status_access",
  "language_selection_arabic",
  "language_selection_english",
];
