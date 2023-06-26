const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  res.json({
    status: "success",
    status: 200,
    data: {
      user: {
        name,
        email,
      },
    },
  });
};

module.exports = getCurrent;
