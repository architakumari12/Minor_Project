import { User } from "../../model/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import otp from "Otp-generator-random";
import { Otp } from "../../model/otp.model.js";
import { config, Sendmail } from "dotenv";
const generateOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required field id missing!"));
    }

    const exists = await User.findOne({ email });

    if (!exists) {
      return res
        .status(404)
        .send(
          new ApiResponse(404, null, "User with provied email does not exists")
        );
    }
    const otp1 = otp(6);
    console.log("Generated OTP: ", otp1);
    await Otp.create({ email, code: otp1 });
    await config(process.env.MAIL_USER, process.env.MAIL_PASS);
    await Sendmail(email, "OTP", `Your OTP IS ${otp1}`);

    res.status(200).send(new ApiResponse(200, null, "OTP Sent Successfully!"));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to generate OTP!"));
  }
};
export { generateOtp };
