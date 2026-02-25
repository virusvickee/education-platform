export const academyOnly = (req, res, next) => {
  if (req.user && req.user.role === 'academy') {
    next();
  } else {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Academy role required.' 
    });
  }
};
