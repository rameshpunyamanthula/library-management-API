// export const errorHandler = (err, req, res, next) => {
//   return res.status(400).json({
//     success: false,
//     message: err.message || 'Something went wrong'
//   });
// };


export const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
};
