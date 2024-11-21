const bizSdk = require("facebook-nodejs-business-sdk");
const {
  Content,
  CustomData,
  DeliveryCategory,
  EventRequest,
  UserData,
  ServerEvent,
} = bizSdk;

const access_token = process.env.ACCESS_TOKEN;
const pixel_id = process.env.PIXEL_ID;

bizSdk.FacebookAdsApi.init(access_token);

let current_timestamp = Math.floor(new Date() / 1000); //UNIX timestamp

exports.sendEventToMeta = async (req, res) => {
  try {
    //1- create userData object
    const { userId, email, phones } = req.body;
    const userData = new UserData()
      .setEmails(["joe@eg.com"]) //TODO: use email instead of it
      .setPhones(["12345678901", "14251234567"]) //TODO: //use phones instead of it
      // It is recommended to send Client IP and User Agent for Conversions API Events.
      .setClientIpAddress(req.ip)
      .setClientUserAgent(req.headers["user-agent"])
      .setFbp("fb.1.1558571054389.1098115397") //TODO: use userId instead of it
      .setFbc("fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890");
    //------------------------
    //2- create content object
    const content = new Content()
      .setId("product123")
      .setQuantity(1)
      .setDeliveryCategory(DeliveryCategory.HOME_DELIVERY);
    //------------------------
    //3- create customData object
    //this is the predefined way to customize data
    const customData = new CustomData()
      .setContents([content])
      .setCurrency("usd")
      .setValue(123.45);

    // OR use this to customize data for specific event
    // const customData = new CustomData().setCustomProperties({
    //   currency: "usd",
    //   value:15
    // });
    //--------------------------
    //4- create serverEvent object => combine all the above objects
    const serverEvent = new ServerEvent()
      .setEventName("Purchase")
      .setEventTime(current_timestamp)
      .setUserData(userData)
      .setCustomData(customData)
      .setEventSourceUrl("http://jaspers-market.com/product/123")
      .setActionSource("website");
    //5- create eventRequest object
    const eventsData = [serverEvent];
    const eventRequest = new EventRequest(access_token, pixel_id).setEvents(
      eventsData
    );
    //6- excute the eventRequest
    const response = await eventRequest.execute();
    console.log(response);
    return res.status(200).json({ status: `success`, response: response });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: `failed`, error: err.message });
  }
};
