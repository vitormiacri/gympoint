import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      student: Yup.number().required('O aluno é obrigatório'),
      plan: Yup.number().required('O plano é obrigatório.'),
      start_date: Yup.date().required('A data inicial é obrigatória.'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Invalid Fields', messages: err.inner });
  }
};
