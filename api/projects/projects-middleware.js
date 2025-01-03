// add middlewares here related to projects
const Projects = require('./projects-model');

async function validateProjectId(req, res, next) {
  try {
    const project = await Projects.get(req.params.id);
    if (project) {
      req.project = project;
      next();
    } else {
      next({ status: 404, message: 'project not found' });
    }
  } catch (err) {
    next(err);
  }
}

function validateProject(req, res, next) {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({ message: 'name and description required' });
  } else {
    req.name = name;
    req.description = description;
    next();
  }
}

module.exports = { validateProjectId, validateProject };