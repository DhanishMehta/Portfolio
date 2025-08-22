# Assets Data Folder

This folder contains data files for the portfolio application.

## Files in this folder:

- `projects.json` - Project information and details
- `skills.json` - Skills and technologies data
- `experience.json` - Work experience timeline
- `socials.json` - Social media links
- `resume.pdf` - **ADD YOUR RESUME PDF HERE**

## Resume PDF Setup

To enable the download resume functionality:

1. **Add your resume PDF file** to this folder with the name `resume.pdf`
2. **Update the filename** in `src/app/services/download.service.ts` if you want to use a different filename
3. **Customize the download filename** in the service to match your name

### Example:
- Place your resume as: `src/assets/data/resume.pdf`
- The download service will automatically use this file
- Users can download it by clicking the "Download Resume" button in both the Hero and Contact sections

## File Structure:
```
src/assets/data/
├── projects.json
├── skills.json
├── experience.json
├── socials.json
├── resume.pdf (add your file here)
└── README.md
```
