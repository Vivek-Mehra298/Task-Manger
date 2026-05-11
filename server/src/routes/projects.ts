import express, { Response } from 'express';
import Project from '../models/Project';
import { protect, admin, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.post('/', protect, admin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, description, members } = req.body;
    const project = await Project.create({
      name,
      description,
      owner: req.user._id,
      members: members || []
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let projects;
    if (req.user.role === 'Admin') {
      projects = await Project.find({ owner: req.user._id }).populate('members', 'name email');
    } else {
      projects = await Project.find({ members: req.user._id }).populate('owner', 'name email');
    }
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id).populate('members', 'name email').populate('owner', 'name email');
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    
    if (req.user.role !== 'Admin' && !project.members.includes(req.user._id)) {
      res.status(403).json({ message: 'Not authorized to view this project' });
      return;
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
