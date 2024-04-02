const validateSchema = (schema) => (req, res, next) => {
  const fieldname = req.file?.fieldname;
  const originalname = req.file?.originalname;
  const encoding = req.file?.encoding;
  const mimetype = req.file?.mimetype;
  const size = req.file?.size;

  const { error, value } = schema.validate({
    ...req.body,
    ...(fieldname
      ? {
          image: {
            fieldname: req.file.fieldname,
            originalname: req.file.originalname,
            encoding: req.file.encoding,
            mimetype: req.file.mimetype,
            size: req.file.size,
          },
        }
      : {}),
  });
  if (error) {
    return res.status(400).json({ erroras: error.details[0].message });
  }
  req.validatedData = value;

  next();
};

export default validateSchema;
