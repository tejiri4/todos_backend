export default schema => (req, res, next)=> {
  const { error, value } = schema.validate({ ...req.body, ...req.query, ...req.params });

  // checks if error exist in request object
  if (error) {
    return res.status(400).json({
      errors: error.details.map((e) => e.message.replace(/['"]/g, ''))
    })
  }

  req.filtered = value;

  return next();
};
