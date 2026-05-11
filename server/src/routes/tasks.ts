import express, { Response } from 'express';
import Task from '../models/Task';
import Project from '../models/Project';
import { protect, admin, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.post('/', protect, admin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, status, dueDate, project, assignee } = req.body;
    
    const proj = await Project.findById(project);
    if (!proj) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      project,
      assignee
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { projectId } = req.query;
    let query: any = {};
    
    if (projectId) {
      query.project = projectId;
      const project = await Project.findById(projectId);
      if (req.user.role !== 'Admin' && project && !project.members.includes(req.user._id)) {
        res.status(403).json({ message: 'Not authorized' });
        return;
      }
    } else if (req.user.role !== 'Admin') {
      query.assignee = req.user._id;
    } else {
      // If Admin and no project specified, get tasks for all their projects
      const projects = await Project.find({ owner: req.user._id });
      const projectIds = projects.map(p => p._id);
      query.project = { $in: projectIds };
    }

    const tasks = await Task.find(query).populate('assignee', 'name email').populate('project', 'name');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    // Admins can update anything. Members can only update status of their tasks
    if (req.user.role !== 'Admin') {
      if (task.assignee?.toString() !== req.user._id.toString()) {
        res.status(403).json({ message: 'Not authorized to update this task' });
        return;
      }
      // Member can only update status
      task.status = req.body.status || task.status;
    } else {
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.status = req.body.status || task.status;
      task.dueDate = req.body.dueDate || task.dueDate;
      task.assignee = req.body.assignee || task.assignee;
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
