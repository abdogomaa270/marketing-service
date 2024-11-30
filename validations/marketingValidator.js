const joi = require("joi");
const { allEventsNames } = require("../config/constants");
const DateRequiredEventsData = [
  "submission_form_access",
  "payment_page_access",
  "check_status_access",
  "language_selection_arabic",
  "language_selection_english",
];
const processDataSchema = joi.object({
  userId: joi
    .string()
    .pattern(/^[0-9a-fA-F]{24}$/) // Regex to match MongoDB ObjectId
    .required()
    .messages({
      "string.pattern.base": "userId must be a valid MongoDB ObjectId",
    }),
  email: joi.string().email().required(),
  phones: joi
    .array()
    .items(
      joi
        .string()
        .pattern(/^\+?[0-9]{7,15}$/)
        .messages({
          "string.pattern.base":
            "Each phone number must be valid and include a country code.",
        })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "At least one phone number is required.",
    }),
  eventName: joi
    .string()
    .valid(...allEventsNames)
    .required(),
  //custom data (conditional validation)
  when: joi.date().when("eventName", {
    is: joi.string().valid(...DateRequiredEventsData),
    then: joi.date().required(),
  }),
  serviceName: joi.when("eventName", {
    is: joi.string().valid("nour_chatbot_service_click", "service_selection"),
    then: joi.string().required(),
  }),
  faq_question: joi.when("eventName", {
    is: joi.string().valid("faq_question_view"),
    then: joi.string().required(),
  }),
  timeSpent: joi.when("eventName", {
    is: joi.string().valid("end_chat_time_spent", "page_time_spent"),
    then: joi.date().required(),
  }),
  platform: joi.when("eventName", {
    is: joi.string().valid("social_media_conversion"),
    then: joi.string().required(),
  }),
});

exports.processDataValidator = (req, res, next) => {
  const { error } = processDataSchema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ error: error.details });
  return next();
};
