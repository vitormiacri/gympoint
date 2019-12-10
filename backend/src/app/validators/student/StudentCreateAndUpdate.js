import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required('O nome é obrigatório'),
      email: Yup.string()
        .email()
        .required('O email é obrigatório.'),
      age: Yup.number().required('A idade é obrigatória.'),
      weight: Yup.number().required('O peso é obrigatório.'),
      height: Yup.number().required('A altura é obrigatória.'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Invalid Fields', messages: err.inner });
  }
};
