import User from "../Model/user.model.js";

//define route handler
const createuser = async (req, res) => {
  try {
    //extract title and description request body  from body
    const { Name, Gender, Bodyweight, Height, Days_in_week } = req.body;
    //create  a new todo obj and insert into db
    const response = await User.create({
      Name,
      Gender,
      Bodyweight,
      Height,
      Days_in_week,
    });
    // send a json response with a sucess flag
    res.status(200).json({
      sucsess: true,
      data: response,
      message: "Entry created succesfully",
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      sucsess: false,
      data: "internal server error ",
      message: err.message,
    });
  }
};

export default createuser;
