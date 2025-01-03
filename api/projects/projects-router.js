// Write your "projects" router here!
const Projects = require('./projects-model');
const router = require('express').Router();
const {validateProjectId, validateProject} = require('./projects-middleware');


router.get('/', (req, res, next) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch((error) => {
        next({message: "We ran into an error retrieving the projects", error});
    });
});

router.get('/:id', validateProjectId, (req, res, next) => {
  Projects.get(req.params.id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        next({message: "Project not found"});
      }
    })
    .catch((error) => {
        next({message: "We ran into an error retrieving the project", error});
    });
});



router.post('/', validateProject,  (req, res, next) => {
  Projects.insert(req.body)
    .then(newProject => {
      res.status(201).json(newProject);
    })
    .catch((error) => {
        next({message: "We ran into an error adding the project", error});
    });
});

router.put('/:id',  (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then(updatedProject => {
      res.status(200).json(updatedProject);
    })
    .catch((error) => {
        next({message: "We ran into an error updating the project", error});
    }); 
  })

router.delete('/:id',  (req, res, next) => {
  Projects.remove(req.params.id)
    .then((result) => {
      if(result) {
        res.status(200).json({message: "Project has been deleted"});
      } else {
        next({message: "Project not found"});
      }
      
    })
    .catch((error) => {
        next({message: "We ran into an error removing the project", error});
    });
});

module.exports = router;