import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '../lib/utils'
import type { ProjectData } from '../data/projects'

interface ProjectEntry {
  title: string
  eyebrow?: string
  playcount: string
  description: string
  chips?: string[]
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
      <DialogContent className="bg-[#0c1022]/95 backdrop-blur-xl border border-white/8 text-white/92 sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          {entry.eyebrow && (
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-emerald-400 mb-1">
              {entry.eyebrow}
            </p>
          )}
          <DialogTitle className="text-white/92 text-xl font-semibold">{entry.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {project.thumbnail && (
            <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/8 relative">
              <img
                src={project.thumbnail}
                alt={entry.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#080c18]/50 to-[#080c18]">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-mono text-[11px] text-emerald-400">{entry.playcount}</p>
                </div>
              </div>
            </div>
          )}

          <p className="text-[14px] leading-[1.7] text-white/55">{entry.description}</p>

          {entry.chips && entry.chips.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {entry.chips.map((chip) => (
                <span
                  key={chip}
                  className="font-mono text-[10px] px-2.25 py-0.75 rounded-full border border-white/8 text-white/30"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}

          <Button
            render={<a href={project.link} target="_blank" rel="noopener noreferrer" />}
            variant="outline"
            className={cn(
              'font-mono text-[12px] tracking-[0.08em] uppercase',
              'border-white/8 text-white/55 hover:border-emerald-400/40 hover:text-emerald-400',
              'transition-all duration-200',
            )}
          >
            {linkLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
