import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { ProjectData } from '../data/projects'

interface ProjectEntry {
  title: string
  playcount: string
  description: string
}

interface ProjectModalProps {
  project: ProjectData
  entry: ProjectEntry
  linkLabel: string
  open: boolean
  onClose: () => void
}

export function ProjectModal({ project, entry, linkLabel, open, onClose }: ProjectModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <DialogContent className="bg-slate-950/90 backdrop-blur-xl border-slate-700/40 text-slate-100 sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-slate-100">{entry.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {project.thumbnail && (
            <div className="w-full aspect-video rounded-lg overflow-hidden bg-slate-900 relative">
              <img
                src={project.thumbnail}
                alt={entry.title}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-950/50 to-slate-950">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-emerald-400">{entry.playcount}</p>
                </div>
              </div>
            </div>
          )}

          <p className="text-slate-400 leading-relaxed">{entry.description}</p>

          <Button
            render={<a href={project.link} target="_blank" rel="noopener noreferrer" />}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
          >
            {linkLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
